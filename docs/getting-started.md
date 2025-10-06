# iTaxRoll — Deployable Code Package

This document contains the primary code files requested for the iTaxRoll deployable package. Each file is provided as a code block you can copy into your project. Update environment-specific variables (n8n webhook URLs, SendGrid/Twilio credentials, backend endpoints) before deploying.

---

## 1) `frontend/src/services/payroll.js`

```javascript
// payroll.js
// Payroll calculation utilities for iTaxRoll

// NOTE: update PAYE brackets to match the current Zambian law before production.
const NAPSA_RATE = 0.05;   // 5%
const NHIMA_RATE = 0.015;  // 1.5%

// Simplified PAYE calculation (placeholder). Replace with official progressive logic as required.
const PAYE_BRACKETS = [
  { upTo: 396000, rate: 0.25 },     // example bracket
  { upTo: 3960000, rate: 0.30 },    // example bracket
  { upTo: Infinity, rate: 0.37 }
];

export function calculateGrossPay(emp) {
  const basic = Number(emp.basicPay || 0);
  const housing = Number(emp.housingAllowance || 0);
  const transport = Number(emp.transportAllowance || 0);
  return basic + housing + transport;
}

export function calculatePAYE(employee) {
  // Monthly PAYE from annual gross using simplified bracket logic
  const annualGross = calculateGrossPay(employee) * 12;
  let payeAnnual = 0;

  // This is simplified: apply first matching bracket rate to the whole amount.
  // Replace with progressive cumulative calculation if required.
  for (const bracket of PAYE_BRACKETS) {
    if (annualGross <= bracket.upTo) {
      payeAnnual = annualGross * bracket.rate;
      break;
    }
  }

  return payeAnnual / 12;
}

export function calculateStatutoryDeductions(employee) {
  const gross = calculateGrossPay(employee);
  const napsa = gross * NAPSA_RATE;
  const nhima = gross * NHIMA_RATE;
  const paye = calculatePAYE(employee);
  return { paye, napsa, nhima };
}

export function calculateGratuity(employee) {
  const years = Number(employee.yearsWorked || 0);
  if (years >= 5) {
    // 25% of annual gross
    return calculateGrossPay(employee) * 12 * 0.25;
  }
  return 0;
}

export function calculateNetSalary(employee) {
  const grossPay = calculateGrossPay(employee);
  const overtimeHours = Number(employee.overtimeHours || 0);
  const overtimeRateMultiplier = 1.5; // can be customized per policy
  const overtimePay = (grossPay / 160) * overtimeHours * overtimeRateMultiplier;
  const { paye, napsa, nhima } = calculateStatutoryDeductions(employee);
  const loan = Number(employee.loanDeduction || 0);
  const other = Number(employee.otherDeductions || 0);
  const bonus = Number(employee.bonus || 0);
  const gratuity = calculateGratuity(employee);

  const totalDeductions = paye + napsa + nhima + loan + other;
  const netSalary = grossPay + overtimePay + bonus + gratuity - totalDeductions;

  return {
    grossPay,
    overtimePay,
    gratuity,
    paye,
    napsa,
    nhima,
    totalDeductions,
    netSalary
  };
}

export function updateLeave(employee, leaveTaken) {
  const accrued = Number(employee.leaveDaysAccrued || 0);
  employee.leaveDaysTaken = Number(leaveTaken || 0);
  employee.leaveDaysRemaining = Math.max(0, accrued - employee.leaveDaysTaken);
  return employee;
}
```

---

## 2) `frontend/src/services/bankCSV.js`

```javascript
// bankCSV.js
// Generate bank-ready CSV files for different banks
import { saveAs } from 'file-saver';

const formatNumber = (n) => {
  // Ensure two decimal places and replace any commas
  return Number(n || 0).toFixed(2);
};

const BANK_FORMATS = {
  ABSA: (employees) => employees.map(emp => ({
    AccountNumber: emp.bankAccount || '',
    AccountName: emp.name || '',
    Amount: formatNumber(emp.netSalary),
    Currency: 'ZMW',
    Reference: emp.reference || `Payroll ${new Date().toLocaleDateString()}`
  })),

  ZANACO: (employees) => {
    // Simple header + rows example (ZANACO variations exist per bank spec)
    return employees.map(emp => ({
      CustomerName: emp.name || '',
      AccountNo: emp.bankAccount || '',
      Amount: formatNumber(emp.netSalary),
      Description: emp.reference || `Payroll ${new Date().toLocaleDateString()}`
    }));
  },

  Stanbic: (employees) => employees.map(emp => ({
    BankCode: emp.bankCode || '021',
    AccountNumber: emp.bankAccount || '',
    BeneficiaryName: emp.name || '',
    Amount: formatNumber(emp.netSalary),
    Narration: emp.reference || `Payroll ${new Date().toLocaleDateString()}`
  }))
};

export function exportPayrollCSV(employees = [], selectedBank = 'ABSA') {
  if (!selectedBank) throw new Error('Select a bank');
  const formatter = BANK_FORMATS[selectedBank];
  if (!formatter) throw new Error('Bank format not supported');

  const rows = formatter(employees);
  if (!rows || rows.length === 0) return null;

  const headers = Object.keys(rows[0]);
  const csvLines = [headers.join(',')];
  for (const r of rows) {
    const values = headers.map(h => {
      const v = r[h] === null || r[h] === undefined ? '' : String(r[h]);
      // Escape commas and quotes
      return `"${v.replace(/"/g, '""')}"`;
    });
    csvLines.push(values.join(','));
  }

  const csvContent = csvLines.join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, `iTaxRoll_Payroll_${selectedBank}_${new Date().toISOString().slice(0,10)}.csv`);
  return csvContent;
}
```

---

## 3) `frontend/src/components/EmployeeTable.jsx`

```javascript
import React, { useEffect, useState } from 'react';
import { calculateNetSalary, updateLeave } from '../services/payroll';
import OvertimeUpload from './OvertimeUpload'; // assumes OvertimeUpload component exists

export default function EmployeeTable({ employeesProp = [], onEmployeesChange }) {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    // initialize from prop or sample data
    if (employeesProp && employeesProp.length) setEmployees(employeesProp);
    else {
      setEmployees([
        { id: 1, name: 'Alice Mwansa', basicPay: 10000, housingAllowance: 3000, transportAllowance: 2000, yearsWorked: 6, leaveDaysAccrued: 20, leaveDaysTaken: 5, bankAccount: '1234567890' },
        { id: 2, name: 'Brian Chanda', basicPay: 15000, housingAllowance: 4000, transportAllowance: 2500, yearsWorked: 4, leaveDaysAccrued: 18, leaveDaysTaken: 2, bankAccount: '0987654321' }
      ]);
    }
  }, [employeesProp]);

  useEffect(() => {
    // compute derived payroll fields whenever employees change
    const updated = employees.map(e => {
      const calc = calculateNetSalary(e);
      return { ...e, ...calc };
    });
    setEmployees(updated);
    if (onEmployeesChange) onEmployeesChange(updated);
  }, []);

  const handleFieldChange = (id, field, value) => {
    const updated = employees.map(emp => {
      if (emp.id === id) emp[field] = value;
      return emp;
    });
    // Recalculate
    const recalculated = updated.map(e => ({ ...e, ...calculateNetSalary(e) }));
    setEmployees(recalculated);
    if (onEmployeesChange) onEmployeesChange(recalculated);
  };

  const handleLeaveChange = (id, val) => {
    const updated = employees.map(emp => {
      if (emp.id === id) return updateLeave(emp, Number(val));
      return emp;
    });
    const recalculated = updated.map(e => ({ ...e, ...calculateNetSalary(e) }));
    setEmployees(recalculated);
    if (onEmployeesChange) onEmployeesChange(recalculated);
  };

  const handleHoursExtracted = (id, hours) => {
    handleFieldChange(id, 'overtimeHours', Number(hours));
  };

  return (
    <div className="bg-card p-4 rounded shadow mb-6">
      <h2 className="text-accent1 font-semibold mb-4">Employee Payroll</h2>
      <table className="min-w-full table-auto text-sm">
        <thead>
          <tr className="bg-background text-textSecondary">
            <th>Name</th>
            <th>Basic</th>
            <th>Housing</th>
            <th>Transport</th>
            <th>Gross</th>
            <th>Overtime Hrs</th>
            <th>OT Pay</th>
            <th>Loan</th>
            <th>Other</th>
            <th>Bonus</th>
            <th>PAYE</th>
            <th>NAPSA</th>
            <th>NHIMA</th>
            <th>Gratuity</th>
            <th>Net Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp.id} className="border-b border-background">
              <td className="px-2 py-1">{emp.name}</td>
              <td className="px-2 py-1">{emp.basicPay}</td>
              <td className="px-2 py-1">{emp.housingAllowance}</td>
              <td className="px-2 py-1">{emp.transportAllowance}</td>
              <td className="px-2 py-1">{emp.grossPay}</td>
              <td className="px-2 py-1">
                <input type="number" value={emp.overtimeHours || 0} onChange={e => handleFieldChange(emp.id, 'overtimeHours', Number(e.target.value))} className="w-20 p-1 rounded bg-background text-primary" />
                <div className="mt-2"><OvertimeUpload onHoursExtracted={(hours) => handleHoursExtracted(emp.id, hours)} /></div>
              </td>
              <td className="px-2 py-1">{emp.overtimePay?.toFixed(2)}</td>
              <td className="px-2 py-1"><input type="number" value={emp.loanDeduction || 0} onChange={e => handleFieldChange(emp.id, 'loanDeduction', Number(e.target.value))} className="w-20 p-1 rounded bg-background" /></td>
              <td className="px-2 py-1"><input type="number" value={emp.otherDeductions || 0} onChange={e => handleFieldChange(emp.id, 'otherDeductions', Number(e.target.value))} className="w-20 p-1 rounded bg-background" /></td>
              <td className="px-2 py-1"><input type="number" value={emp.bonus || 0} onChange={e => handleFieldChange(emp.id, 'bonus', Number(e.target.value))} className="w-20 p-1 rounded bg-background" /></td>
              <td className="px-2 py-1">{emp.paye?.toFixed(2)}</td>
              <td className="px-2 py-1">{emp.napsa?.toFixed(2)}</td>
              <td className="px-2 py-1">{emp.nhima?.toFixed(2)}</td>
              <td className="px-2 py-1">{emp.gratuity?.toFixed(2)}</td>
              <td className="px-2 py-1 font-semibold">{emp.netSalary?.toFixed(2)}</td>
              <td className="px-2 py-1">
                <button className="bg-accent1 px-2 py-1 rounded mr-2" onClick={() => { const c = calculateNetSalary(emp); handleFieldChange(emp.id, 'netSalary', c.netSalary); }}>Recalc</button>
                <button className="bg-accent2 px-2 py-1 rounded" onClick={() => { /* open payslip preview */ }}>Payslip</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

---

## 4) `n8n/workflows/iTaxRollPayroll.json` (starter workflow)

> This JSON is a starter n8n workflow that you can import into your n8n instance. It contains nodes for Webhook trigger, a Function node to compute payroll, and a File/HTTP node stub for CSV generation and payslip handling. You should replace placeholders with your actual endpoints and credentials.

```json
{
  "name": "iTaxRoll Payroll Automation - Starter",
  "nodes": [
    {
      "parameters": {
        "httpMethod": "POST",
        "path": "payroll-run"
      },
      "name": "Webhook Payroll Run",
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 1,
      "position": [250, 300]
    },
    {
      "parameters": {
        "functionCode": "// items[0].json should be { employees: [...] }\nconst employees = items[0].json.employees || [];\nconst results = employees.map(emp => {\n  const grossPay = (Number(emp.basicPay||0) + Number(emp.housingAllowance||0) + Number(emp.transportAllowance||0));\n  const overtimePay = (grossPay / 160) * (Number(emp.overtimeHours||0)) * 1.5;\n  const gratuity = (Number(emp.yearsWorked||0) >= 5) ? grossPay * 12 * 0.25 : 0;\n  // Simplified statutory
  const paye = (grossPay * 0.2);\n  const napsa = grossPay * 0.05;\n  const nhima = grossPay * 0.015;\n  const totalDeductions = paye + napsa + nhima + (Number(emp.loanDeduction||0)) + (Number(emp.otherDeductions||0));\n  const netSalary = grossPay + overtimePay + (Number(emp.bonus||0)) + gratuity - totalDeductions;\n  return { json: { ...emp, grossPay, overtimePay, gratuity, paye, napsa, nhima, totalDeductions, netSalary } };\n});\nreturn results;"
      },
      "name": "Function - Calculate Payroll",
      "type": "n8n-nodes-base.function",
      "typeVersion": 1,
      "position": [550, 300]
    },
    {
      "parameters": {
        "functionCode": "// Build CSV rows for ABSA and attach to flow (simple example)\nconst employees = items.map(i => i.json);\nconst headers = ['AccountNumber','AccountName','Amount','Currency','Reference'];\nconst lines = [headers.join(',')];\nemployees.forEach(emp => {\n  const row = [emp.bankAccount||'', emp.name||'', (emp.netSalary||0).toFixed(2), 'ZMW', `Payroll ${new Date().toLocaleDateString()}`];\n  lines.push(row.map(v=>`\"${String(v||'').replace(/\"/g,'\"\"')}\"`).join(','));\n});\nreturn [{ json: { csv: lines.join('\n') } }];"
      },
      "name": "Function - Build Bank CSV",
      "type": "n8n-nodes-base.function",
      "typeVersion": 1,
      "position": [850, 300]
    },
    {
      "parameters": {
        "url": "={{$json[\"csvFileUploadUrl\"] || ''}}",
        "options": {}
      },
      "name": "HTTP Request - Upload CSV (stub)",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 1,
      "position": [1100, 300]
    }
  ],
  "connections": {
    "Webhook Payroll Run": { "main": [[{ "node": "Function - Calculate Payroll", "type": "main", "index": 0 }]] },
    "Function - Calculate Payroll": { "main": [[{ "node": "Function - Build Bank CSV", "type": "main", "index": 0 }]] },
    "Function - Build Bank CSV": { "main": [[{ "node": "HTTP Request - Upload CSV (stub)", "type": "main", "index": 0 }]] }
  }
}
```

> **Notes:**
>
> * Import the JSON file into n8n (Workflows → Import).\
> * Replace simplified PAYE and HTTP upload steps with your accurate tax calculation and bank file transfer method (SFTP, bank portal, email, or API).

---

## Next steps & suggestions

1. Replace the placeholder PAYE logic with official ZRA progressive bands (or connect to a reliable tax service).\
2. Configure n8n nodes with real credentials for Twilio (WhatsApp), SendGrid (email), and bank transfer methods (SFTP or bank API).\
3. Add server-side authentication (backend/server.js) if you want server-verified JWT issuance.\
4. Test OCR on a few handwritten timesheets to tune regex parsing.

---

If you want, I can now:

* Generate the actual file ZIP (ready for download), or
* Create additional frontend components (Login, PayslipViewer, OvertimeUpload) as separate files in this package, or
* Implement a more accurate PAYE progressive calculator (I can look up current Zambia rates first).

Which would you like next?
