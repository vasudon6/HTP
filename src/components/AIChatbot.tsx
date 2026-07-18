import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send } from 'lucide-react';
import { useAdmin } from '../store/AdminContext';

export default function AIChatbot() {
  const { publicData } = useAdmin();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model', text: string }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();

        const websiteContext = `
Doctors: ${publicData.doctors?.map(d => d.name + ' - ' + d.title + ' (' + d.experience + ' yrs)').join(', ')}
Services: ${publicData.services?.map(s => s.title + ': ' + s.description).join('\n')}

Custom Clinic Knowledge Base:
${publicData.clinicContext || 'No additional context provided by admin.'}
`;

    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          history: messages.slice(-10), // Send last 10 messages for context
          apiKey: publicData.aiApiKey,
          websiteContext: websiteContext
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setMessages(prev => [...prev, { role: 'model', text: data.reply }]);
      } else {
        setMessages(prev => [...prev, { role: 'model', text: 'माफ़ कीजिए, कोई तकनीकी समस्या आई है।' }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: 'माफ़ कीजिए, कनेक्शन में समस्या है।' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className={`fixed right-4 bottom-[100px] sm:bottom-6 sm:right-6 z-[110] flex-col items-center gap-2 ${isOpen ? 'hidden' : 'flex'}`}>
        <motion.div
          animate={{ y: [0, -6, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs px-3 py-1.5 sm:text-sm font-bold sm:px-4 sm:py-2 rounded-full shadow-[0_4px_20px_rgba(16,185,129,0.5)] whitespace-nowrap border border-white/20 relative"
        >
          Ask anything ✨
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-teal-600 rotate-45 border-r border-b border-white/20"></div>
        </motion.div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="w-12 h-12 sm:w-16 sm:h-16 bg-teal-600 text-white rounded-full flex items-center justify-center shadow-[0_8px_30px_rgba(13,148,136,0.4)]"
          aria-label="Open AI Assistant"
        >
          <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7" />
        </motion.button>
      </div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed right-2 left-2 bottom-[100px] sm:right-6 sm:left-auto sm:bottom-6 sm:w-[380px] h-[400px] sm:h-[450px] bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-slate-200 z-[110] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-teal-600 px-4 py-3 flex items-center justify-between text-white shrink-0">
              <div className="flex items-center gap-2">
                <MessageCircle size={20} />
                <span className="font-bold text-sm tracking-wide">AI Assistant</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-teal-700 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
              {messages.length === 0 && (
                <div className="text-center text-slate-500 text-sm mt-4">
                  नमस्ते! मैं क्लिनिक का AI असिस्टेंट हूँ। मैं आपकी कैसे मदद कर सकता हूँ?
                </div>
              )}
              {messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm ${
                      msg.role === 'user' 
                        ? 'bg-teal-600 text-white rounded-tr-sm' 
                        : 'bg-white text-slate-700 border border-slate-200 rounded-tl-sm shadow-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div>
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 bg-white border-t border-slate-100 shrink-0">
              <form onSubmit={sendMessage} className="flex items-center gap-2">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="अपना सवाल पूछें..."
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-slate-700"
                />
                <button 
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="w-9 h-9 shrink-0 bg-teal-600 text-white rounded-full flex items-center justify-center disabled:opacity-50 disabled:bg-slate-300 hover:bg-teal-700 transition-colors"
                >
                  <Send size={16} className="ml-[-2px] mt-[1px]" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
