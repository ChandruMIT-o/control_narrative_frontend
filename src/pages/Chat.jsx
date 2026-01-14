import { useEffect, useRef, useState } from "react";
import Sidebar from "../components/Sidebar";
import ModeSelector from "../components/ModeSelector";
import ChatWindow from "../components/ChatWindow";
import MessageInput from "../components/MessageInput";
import RightSidebar from "../components/RightSidebar";
import { createChat, sendMessage, getChats } from "../api/chat";

export default function ChatPage() {
  const [mode, setMode] = useState("RAG"); // default
  const [chatId, setChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [chats, setChats] = useState([]);
  const [selectedDocs, setSelectedDocs] = useState(new Set());
  const [selectedTemplates, setSelectedTemplates] = useState(new Set());

  const scrollRef = useRef(null);

  useEffect(() => {
    // Load chat list on mount
    (async () => {
      try {
        const res = await getChats();
        setChats(res.data || []);
      } catch (e) {
        console.error("Failed to load chats", e);
      }
    })();
  }, []);

  const handleCreateChat = async (name) => {
    const res = await createChat({ name, mode, document_ids: Array.from(selectedDocs) });
    setChatId(res.data.chat_id);
    setChats(prev => [res.data, ...prev]);
    setMessages([]);
  };

  const handleSend = async (text) => {
    if (!text.trim()) return;
    const userMsg = { id: Math.random().toString(36).slice(2), role: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    try {
      const payload = {
        message: text,
        mode,
        document_ids: Array.from(selectedDocs),
        template_ids: Array.from(selectedTemplates),
      };

      // sendMessage handles streaming or returns full response
      const stream = await sendMessage(chatId, payload);

      // For now assume it returns final message in stream.data
      const assistant = { id: Math.random().toString(36).slice(2), role: 'assistant', text: stream.data?.text || 'No response' };

      setMessages(prev => [...prev, assistant]);
    } catch (e) {
      console.error("Send failed", e);
      setMessages(prev => [...prev, { id: Math.random().toString(36).slice(2), role: 'assistant', text: "Error: failed to get response" }]);
    } finally {
      setIsTyping(false);
      if (scrollRef.current) scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1 p-6">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold">Chat with Documents</h2>
            <div className="flex items-center gap-3">
              <ModeSelector mode={mode} onChange={setMode} />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden grid grid-cols-1 lg:grid-cols-4">
            <div className="lg:col-span-3 p-4 flex flex-col gap-3 min-h-[60vh]">
              <ChatWindow messages={messages} isTyping={isTyping} />

              <div className="mt-auto">
                <MessageInput onSend={handleSend} disabled={isTyping} mode={mode} selectedDocsCount={selectedDocs.size} selectedTemplatesCount={selectedTemplates.size} />
              </div>

              <div ref={scrollRef} />
            </div>

            <div className="lg:col-span-1 border-l border-gray-100">
              <RightSidebar
                chats={chats}
                selectedDocs={selectedDocs}
                setSelectedDocs={setSelectedDocs}
                selectedTemplates={selectedTemplates}
                setSelectedTemplates={setSelectedTemplates}
                onCreateChat={handleCreateChat}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
