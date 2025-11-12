/*
Gerenciador de Códigos - Single-file React component (App.jsx)

Como usar (rápido):
1) Crie um projeto com Vite + React: `npm create vite@latest my-snippets -- --template react` 
2) Instale dependências: `npm install prismjs react-icons` 
3) Instale Tailwind (opcional) ou use seu CSS. O código abaixo usa classes Tailwind.
4) Cole este arquivo em `src/App.jsx`, importe o CSS do Prism (veja comentário abaixo) e rode `npm run dev`.

Funcionalidades incluídas:
- Criar / editar / excluir snippets de código (título, linguagem, tags, conteúdo)
- Busca por título/código/tags
- Filtrar por linguagem ou tags
- Exportar / importar JSON (backup)
- Copiar para área de transferência
- Destaque de sintaxe com Prism.js (você precisa importar o CSS do Prism no seu index.css)
- Armazenamento local via localStorage

Nota: este é um ponto de partida funcional. Se quiser, converto para React Native / Flutter / PWA com build configurado.
*/

import React, { useEffect, useState, useRef } from "react";
import { FiEdit, FiTrash2, FiCopy, FiDownload, FiUpload, FiPlus } from "react-icons/fi";
import Prism from "prismjs";
// Se quiser suporte a linguagens extras, importe os componentes prism correspondentes, ex:
// import "prismjs/components/prism-python";
// import "prismjs/components/prism-java";
// e importe o CSS do tema Prism no seu index.css: @import 'prismjs/themes/prism.css';

const STORAGE_KEY = "snippets.v1";

export default function App() {
  const [snippets, setSnippets] = useState([]);
  const [query, setQuery] = useState("");
  const [languageFilter, setLanguageFilter] = useState("");
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: "", language: "javascript", tags: "", code: "" });
  const fileInputRef = useRef(null);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        setSnippets(JSON.parse(raw));
      } catch (e) {
        console.error("Erro ao ler snippets do storage", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(snippets));
    // re-run Prism highlight after render
    Prism.highlightAll();
  }, [snippets]);

  function resetForm() {
    setForm({ title: "", language: "javascript", tags: "", code: "" });
    setEditing(null);
  }

  function handleSave(e) {
    e.preventDefault();
    const tagsArr = form.tags.split(",").map(t => t.trim()).filter(Boolean);
    if (!form.title.trim()) return alert("Informe um título");

    if (editing !== null) {
      // editar
      setSnippets(prev => prev.map(s => s.id === editing ? { ...s, ...form, tags: tagsArr } : s));
    } else {
      const newSnippet = { id: Date.now().toString(), ...form, tags: tagsArr, createdAt: new Date().toISOString() };
      setSnippets(prev => [newSnippet, ...prev]);
    }
    resetForm();
  }

  function handleEdit(snippet) {
    setEditing(snippet.id);
    setForm({ title: snippet.title, language: snippet.language, tags: snippet.tags.join(", "), code: snippet.code });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleDelete(id) {
    if (!confirm("Excluir este snippet?")) return;
    setSnippets(prev => prev.filter(s => s.id !== id));
  }

  function handleCopy(text) {
    navigator.clipboard.writeText(text).then(() => {
      alert("Copiado para a área de transferência!");
    }).catch(() => alert("Falha ao copiar"));
  }

  function exportJSON() {
    const blob = new Blob([JSON.stringify(snippets, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `snippets_backup_${new Date().toISOString()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function importJSON(file) {
    const reader = new FileReader();
    reader.onload = e => {
      try {
        const parsed = JSON.parse(e.target.result);
        if (!Array.isArray(parsed)) throw new Error("Formato inválido");
        // mesclar: preferir importar sem sobrescrever ids existentes
        const existingIds = new Set(snippets.map(s => s.id));
        const normalized = parsed.map(item => ({ ...item, id: item.id || Date.now().toString() + Math.random() }));
        const merged = [...normalized.filter(p => !existingIds.has(p.id)), ...snippets];
        setSnippets(merged);
        alert("Importação concluída");
      } catch (err) {
        alert("Erro ao importar: " + err.message);
      }
    };
    reader.readAsText(file);
  }

  const languages = Array.from(new Set(["javascript", "typescript", "python", "java", "c", "cpp", "go", "php", "html", "css", ...snippets.map(s => s.language || "javascript")]));

  const filtered = snippets.filter(s => {
    const q = query.toLowerCase();
    if (languageFilter && s.language !== languageFilter) return false;
    if (!q) return true;
    return s.title.toLowerCase().includes(q) || s.code.toLowerCase().includes(q) || s.tags.join(" ").toLowerCase().includes(q);
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Gerenciador de Códigos</h1>
          <div className="flex gap-2">
            <button className="btn" onClick={() => { exportJSON(); }} title="Exportar backup">
              <FiDownload />
            </button>
            <button className="btn" onClick={() => fileInputRef.current.click()} title="Importar JSON">
              <FiUpload />
            </button>
            <input type="file" accept="application/json" ref={fileInputRef} className="hidden" onChange={e => { if (e.target.files?.[0]) importJSON(e.target.files[0]); e.target.value = null; }} />
          </div>
        </header>

        <form onSubmit={handleSave} className="bg-white p-4 rounded shadow mb-6">
          <div className="flex flex-col md:flex-row gap-2">
            <input className="flex-1 input" placeholder="Título" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
            <select className="input w-48" value={form.language} onChange={e => setForm(f => ({ ...f, language: e.target.value }))}>
              {languages.map(lang => <option key={lang} value={lang}>{lang}</option>)}
            </select>
            <input className="input w-48" placeholder="tags (separadas por ,)" value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))} />
          </div>
          <textarea rows={8} className="input mt-3 font-mono" placeholder="Cole seu código aqui" value={form.code} onChange={e => setForm(f => ({ ...f, code: e.target.value }))} />
          <div className="flex gap-2 mt-3">
            <button className="btn-primary" type="submit"><FiPlus /> {editing ? 'Salvar' : 'Adicionar'}</button>
            <button type="button" className="btn-ghost" onClick={resetForm}>Limpar</button>
          </div>
        </form>

        <div className="flex items-center gap-2 mb-4">
          <input className="input flex-1" placeholder="Buscar por título/código/tags" value={query} onChange={e => setQuery(e.target.value)} />
          <select className="input w-48" value={languageFilter} onChange={e => setLanguageFilter(e.target.value)}>
            <option value="">Todas as linguagens</option>
            {languages.map(lang => <option key={lang} value={lang}>{lang}</option>)}
          </select>
        </div>

        <div className="space-y-4">
          {filtered.length === 0 && <div className="text-center text-gray-500">Nenhum snippet encontrado</div>}
          {filtered.map(snippet => (
            <article key={snippet.id} className="bg-white p-4 rounded shadow">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-semibold">{snippet.title}</h2>
                  <div className="text-sm text-gray-500">{snippet.language} • {snippet.tags.join(", ")}</div>
                </div>
                <div className="flex gap-2">
                  <button className="btn" onClick={() => handleCopy(snippet.code)} title="Copiar"><FiCopy /></button>
                  <button className="btn" onClick={() => handleEdit(snippet)} title="Editar"><FiEdit /></button>
                  <button className="btn-danger" onClick={() => handleDelete(snippet.id)} title="Excluir"><FiTrash2 /></button>
                </div>
              </div>

              <pre className="mt-3 overflow-auto"><code className={`language-${snippet.language}`}>{snippet.code}</code></pre>
            </article>
          ))}
        </div>

        <footer className="mt-8 text-center text-sm text-gray-500">
          Salvo no armazenamento local do navegador. Use exportar/importar para backup.
        </footer>
      </div>

      {/* Styles embutidos simples para botões/inputs quando Tailwind não estiver instalado */}
      <style>{`
        .input { padding: 0.5rem 0.75rem; border: 1px solid #e5e7eb; border-radius: 0.375rem; }
        .btn { padding: 0.45rem 0.6rem; border-radius: 0.375rem; border: 1px solid #e5e7eb; background: white; display:flex; align-items:center; gap:0.4rem }
        .btn-primary { padding: 0.5rem 0.75rem; background: #2563eb; color: white; border-radius: 0.375rem; display:flex; gap:0.5rem; align-items:center }
        .btn-ghost { padding: 0.45rem 0.6rem; background: transparent; border: 1px dashed #cbd5e1 }
        .btn-danger { padding: 0.45rem 0.6rem; background: #fee2e2; border: 1px solid #fecaca }
        pre { background: #0b1220; color: #e6edf3; padding: 1rem; border-radius: 0.5rem }
        .font-mono { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, "Roboto Mono", "Courier New", monospace }
      `}</style>
    </div>
  );
}
