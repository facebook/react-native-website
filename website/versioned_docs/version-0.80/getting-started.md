import React, { useState, useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip);

export default function App() {
  const [mode, setMode] = useState("offline");
  const [rounds, setRounds] = useState(Array(5).fill(""));
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [wsConnected, setWsConnected] = useState(false);
  const [alertActive, setAlertActive] = useState(false);
  const seuilAlert = 0.4;
  const wsRef = useRef(null);

  useEffect(() => {
    setRounds(mode === "offline" ? Array(5).fill("") : Array(30).fill(""));
    setResult(null);
    if (mode === "online") {
      startWebSocket();
      fetchRounds();
    } else {
      closeWebSocket();
    }
  }, [mode]);

  const startWebSocket = () => {
    if (wsRef.current) return;
    const ws = new WebSocket("ws://localhost:8000/ws");
    ws.onopen = () => setWsConnected(true);
    ws.onclose = () => {
      setWsConnected(false);
      wsRef.current = null;
    };
    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.new_round) {
        setRounds((r) => {
          let newArr = [...r];
          if (newArr.length >= 30) newArr.shift();
          newArr.push(data.new_round);
          return newArr;
        });
      }
    };
    wsRef.current = ws;
  };

  const closeWebSocket = () => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
  };

  const fetchRounds = async () => {
    try {
      const res = await fetch("http://localhost:8000/rounds");
      const data = await res.json();
      if (data.rounds && data.rounds.length > 0) {
        setRounds(data.rounds.slice(-30));
      }
    } catch {}
  };

  useEffect(() => {
    if (result && result.prob_over_2x >= seuilAlert) {
      if (!alertActive) {
        setAlertActive(true);
        playSound();
        setTimeout(() => setAlertActive(false), 5000);
      }
    }
  }, [result]);

  const playSound = () => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(440, audioCtx.currentTime);
    oscillator.connect(audioCtx.destination);
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.3);
  };

  const handleChange = (i, val) => {
    const newRounds = [...rounds];
    newRounds[i] = val;
    setRounds(newRounds);
  };

  const isValidInput = () =>
    rounds.every((r) => r !== "" && !isNaN(parseFloat(r)) && parseFloat(r) > 0);

  const handleSubmit = async () => {
    if (!isValidInput()) {
      alert("Remplissez tous les champs avec des nombres positifs.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rounds: rounds.map(Number) }),
      });
      const data = await res.json();
      setResult(data);
    } catch {
      alert("Erreur serveur.");
    } finally {
      setLoading(false);
    }
  };

  const handleImport = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("http://localhost:8000/import", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.message) {
        alert(data.message);
        fetchRounds();
      } else if (data.error) {
        alert("Erreur import : " + data.error);
      }
    } catch {
      alert("Erreur serveur lors de l'import.");
    }
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(rounds);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "rounds_history.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const chartData = {
    labels: rounds.map((_, i) => i + 1),
    datasets: [
      {
        label: "Multiplicateur",
        data: rounds.map(Number),
        borderColor: "#2563EB",
        fill: false,
        tension: 0.3,
        pointRadius: 3,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        max: Math.max(...rounds.map(Number), 10) + 1,
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-4 font-sans text-center">
      <h1 className="text-3xl font-bold mb-8">Crash Predictor</h1>

      <div className="mb-6 flex justify-center gap-3">
        <button
          onClick={() => setMode("offline")}
          className={`px-4 py-2 rounded ${
            mode === "offline"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          Hors ligne (5 rounds)
        </button>
        <button
          onClick={() => setMode("online")}
          className={`px-4 py-2 rounded ${
            mode === "online"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          En ligne (30 rounds)
        </button>
      </div>

      <div
        className={`grid gap-2 mb-6 ${
          mode === "offline" ? "grid-cols-5" : "grid-cols-10"
        }`}
      >
        {rounds.map((val, i) => (
          <input
            key={i}
            type="number"
            min="0"
            step="0.01"
            placeholder={`R${i + 1}`}
            value={val}
            onChange={(e) => handleChange(i, e.target.value)}
            className="border border-gray-400 rounded p-2 text-center"
          />
        ))}
      </div>

      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded disabled:opacity-50"
        >
          {loading ? "Calcul en cours..." : "Calculer"}
        </button>

        <label className="bg-gray-300 px-4 py-2 rounded cursor-pointer">
          Importer JSON
          <input
            type="file"
            accept=".json"
            onChange={handleImport}
            className="hidden"
          />
        </label>

        <button
          onClick={handleExport}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Exporter JSON
        </button>
      </div>

      {result && (
        <div className="mt-6 text-lg font-semibold space-y-3">
          {result.error && <div className="text-red-600">{result.error}</div>}
          {result.warning && (
            <div className="text-yellow-600">{result.warning}</div>
          )}
          {!result.error && !result.warning && (
            <>
              <div>Moyenne : {result.mean}x</div>
              <div>Proba &gt; 2.0x : {(result.prob_over_2x * 100).toFixed(1)}%</div>
              <div>Proba &gt; 5.0x : {(result.prob_over_5x * 100).toFixed(1)}%</div>
              <div
                className={
                  result.recommandation === "Parier"
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
                {result.recommandation}
              </div>
            </>
          )}
        </div>
      )}

      <div className="mt-8 max-w-4xl mx-auto">
        <Line data={chartData} options={chartOptions} />
      </div>

      <div className="mt-4 text-sm text-gray-500">
        WebSocket: {wsConnected ? "Connecté" : "Déconnecté"}
      </div>

      {alertActive && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded shadow-lg animate-pulse">
          Bon moment pour parier !
        </div>
      )}
    </div>
  );
}
