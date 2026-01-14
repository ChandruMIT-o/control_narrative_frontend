import React, { useEffect, useRef } from "react";

export default function ChatWindow({ messages = [], isTyping }) {
  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  return (
    <div className="h-[56vh] overflow-y-auto p-2" ref={listRef}>
      {messages.length === 0 && (
        <div className="text-center text-gray-400 mt-8">No messages yet — start the conversation.</div>
      )}

      <div className="space-y-3">
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.role === 'assistant' ? 'justify-start' : 'justify-end'}`}>
            <div className={`max-w-[75%] p-3 rounded-lg ${m.role === 'assistant' ? 'bg-gray-100 text-gray-900' : 'bg-blue-600 text-white'}`}>
              <div className="whitespace-pre-wrap text-sm">{m.text}</div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="max-w-[50%] p-2 rounded-lg bg-gray-100 text-gray-700 text-sm">
              <span className="animate-pulse">Assistant is typing...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
