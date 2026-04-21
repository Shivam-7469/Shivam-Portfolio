import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, Sparkles, X, Minimize2 } from 'lucide-react';
import { ChatMessage, ChatRole } from '../types';
import { sendMessageToGemini } from '../services/geminiService';

const Assistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: ChatRole.MODEL, text: "I am the Abstract Assistant. How can I guide your creative vision today?" }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMsg: ChatMessage = { role: ChatRole.USER, text: inputText };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    try {
      const responseText = await sendMessageToGemini([...messages, userMsg], inputText);
      
      const modelMsg: ChatMessage = { role: ChatRole.MODEL, text: responseText };
      setMessages(prev => [...prev, modelMsg]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="glass-panel w-[90vw] md:w-[400px] h-[500px] rounded-2xl mb-6 flex flex-col overflow-hidden shadow-2xl shadow-stone-900/50"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
              <div className="flex items-center space-x-2">
                <Sparkles size={16} className="text-amber-200/70" />
                <span className="text-xs font-bold tracking-widest uppercase text-stone-300">Creative Guide</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-stone-500 hover:text-white transition-colors">
                <Minimize2 size={18} />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex ${msg.role === ChatRole.USER ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
                      msg.role === ChatRole.USER 
                        ? 'bg-stone-100/10 text-stone-100 rounded-br-none backdrop-blur-md' 
                        : 'bg-black/20 text-stone-300 rounded-bl-none border border-white/5'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-black/20 p-3 rounded-2xl rounded-bl-none border border-white/5 flex space-x-1">
                    <motion.div 
                      className="w-1.5 h-1.5 bg-stone-400 rounded-full"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                    />
                    <motion.div 
                      className="w-1.5 h-1.5 bg-stone-400 rounded-full"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                    />
                    <motion.div 
                      className="w-1.5 h-1.5 bg-stone-400 rounded-full"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                    />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-white/10 bg-black/20 backdrop-blur-xl">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask for creative consultation..."
                  className="flex-1 bg-transparent border-none outline-none text-sm text-stone-200 placeholder-stone-600 font-light"
                />
                <button 
                  onClick={handleSend}
                  disabled={!inputText.trim()}
                  className="p-2 rounded-full hover:bg-white/10 text-stone-400 hover:text-white transition-colors disabled:opacity-30"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="glass-panel w-14 h-14 rounded-full flex items-center justify-center relative group"
      >
        <div className="absolute inset-0 bg-stone-500/10 rounded-full blur-md group-hover:bg-stone-400/20 transition-all duration-500"></div>
        {isOpen ? <X size={24} className="text-stone-300" /> : <MessageSquare size={24} className="text-stone-300" />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-stone-100 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-stone-200"></span>
          </span>
        )}
      </motion.button>
    </div>
  );
};

export default Assistant;
