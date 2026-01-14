import React, { useEffect, useState } from "react";
import { getDocuments } from "../api/documents";

export default function RightSidebar({ chats = [], selectedDocs, setSelectedDocs, selectedTemplates, setSelectedTemplates, onCreateChat }) {
  const [documents, setDocuments] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [loadingDocs, setLoadingDocs] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await getDocuments(1);
        setDocuments(res.data.documents || []);
      } catch (e) {
        console.error("Failed to load documents", e);
      } finally {
        setLoadingDocs(false);
      }
    })();

    // TODO: fetch templates; placeholder for now
    setTemplates([ { id: 't1', title: 'Compliance Q/A' }, { id: 't2', title: 'Design Rationale' } ]);
  }, []);

  const toggleDoc = (id) => {
    const copy = new Set(selectedDocs);
    if (copy.has(id)) copy.delete(id);
    else copy.add(id);
    setSelectedDocs(copy);
  };

  const toggleTemplate = (id) => {
    const copy = new Set(selectedTemplates);
    if (copy.has(id)) copy.delete(id);
    else copy.add(id);
    setSelectedTemplates(copy);
  };

  return (
    <div className="p-3">
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium">Chat History</div>
          <button className="text-xs text-blue-600">New</button>
        </div>

        <div className="mt-2 space-y-2 text-sm">
          {chats.length === 0 ? <div className="text-gray-400">No chats</div> : chats.map(c => (
            <div key={c.chat_id} className="p-2 rounded hover:bg-gray-50 cursor-pointer">{c.name || c.chat_id}</div>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <div className="text-sm font-medium mb-2">Documents</div>
        {loadingDocs ? (
          <div className="space-y-2">
            <div className="h-6 bg-gray-100 rounded animate-pulse" />
            <div className="h-6 bg-gray-100 rounded animate-pulse" />
          </div>
        ) : (
          <div className="space-y-2 text-sm">
            {documents.map(d => (
              <label key={d._id} className="flex items-center gap-2">
                <input type="checkbox" checked={selectedDocs.has(d._id)} onChange={() => toggleDoc(d._id)} />
                <div className="truncate">{d.filename}</div>
              </label>
            ))}
          </div>
        )}
      </div>

      <div>
        <div className="text-sm font-medium mb-2">Request + Response Templates</div>
        <div className="space-y-2 text-sm">
          {templates.map(t => (
            <label key={t.id} className="flex items-center gap-2">
              <input type="checkbox" checked={selectedTemplates.has(t.id)} onChange={() => toggleTemplate(t.id)} />
              <div>{t.title}</div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
