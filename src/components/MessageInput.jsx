import React, { useState } from "react";
import { Send } from "lucide-react";

export default function MessageInput({ onSend, disabled, mode, selectedDocsCount, selectedTemplatesCount }) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text.trim());
    setText("");
  };

  return (
    <div className="border-t border-gray-100 p-3">
      <div className="flex items-center gap-2 mb-2">
        <div className="text-xs text-gray-500">Mode:</div>
        <div className="text-xs font-medium text-gray-700">{mode}</div>
        <div className="ml-4 text-xs text-gray-400">Docs: {selectedDocsCount}</div>
        <div className="text-xs text-gray-400">Templates: {selectedTemplatesCount}</div>
      </div>

      <div className="flex gap-2">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={2}
          className="flex-1 p-2 rounded-md border border-gray-200 resize-none focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Ask a question about your documents..."
        />

        <button onClick={handleSend} disabled={disabled} className="bg-blue-600 hover:bg-blue-700 text-white px-3 rounded-md flex items-center gap-2">
          <Send size={14} /> Send
        </button>
      </div>
    </div>
  );
}
