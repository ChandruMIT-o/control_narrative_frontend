import React from "react";

const MODES = [
  { key: "RAG", label: "RAG", desc: "Retrieve & answer from docs (default)" },
  { key: "ReACT", label: "ReACT", desc: "Act + reason chains for complex logic" },
  { key: "Flare", label: "Flare", desc: "Generative/creative mode with context" },
];

export default function ModeSelector({ mode, onChange }) {
  return (
    <div className="flex items-center gap-2">
      {MODES.map((m) => (
        <button
          key={m.key}
          onClick={() => onChange(m.key)}
          className={`text-sm px-3 py-1 rounded-md border transition ${mode === m.key ? 'bg-gray-900 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
          title={m.desc}
        >
          {m.label}
        </button>
      ))}
    </div>
  );
}
