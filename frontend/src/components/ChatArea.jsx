import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';

const ChatArea = ({ messages, onSendMessage, isLoading }) => {
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputMessage.trim() && !isLoading) {
      onSendMessage(inputMessage);
      setInputMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };


  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  };

  return (
    <div className="flex flex-col h-full bg-black relative overflow-hidden">
    
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-white opacity-1 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-1/3 left-1/4 w-24 h-24 bg-white opacity-2 rounded-full blur-2xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8 relative z-10">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center relative">
       
            <div className="relative mb-8">
              <div className="absolute -inset-8 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
              <div className="relative p-8 rounded-full bg-gradient-to-br from-white/10 via-gray-800/30 to-white/10 border border-white/20 backdrop-blur-sm">
                <Bot className="w-20 h-20 text-white animate-pulse" />
              </div>
            </div>
            
            <div className="max-w-2xl">
              <h3 className="text-3xl text-white font-bold mb-4 tracking-wide">Welcome to Mental Mate AI</h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                I'm here to provide support and guidance. Share what's on your mind, and let's work through it together.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <Sparkles className="w-8 h-8 text-white mx-auto mb-3" />
                  <p className="text-gray-300 text-sm">AI-Powered Support</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <Bot className="w-8 h-8 text-white mx-auto mb-3" />
                  <p className="text-gray-300 text-sm">24/7 Available</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <User className="w-8 h-8 text-white mx-auto mb-3" />
                  <p className="text-gray-300 text-sm">Personalized Care</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-6 ${
                message.type === 'user' ? 'justify-end' : 'justify-start'
              }`}
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              {message.type === 'bot' && (
                <div className="flex-shrink-0">
                  <div className="relative group">
                    <div className="absolute -inset-2 bg-white/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                    <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-white/15 via-gray-800/50 to-white/10 border border-white/30 flex items-center justify-center backdrop-blur-sm">
                      <Bot className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
              )}
              
              <div className="relative group max-w-3xl">
                <div className={`absolute -inset-1 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500 ${
                  message.type === 'user' 
                    ? 'bg-white/10' 
                    : 'bg-white/5'
                }`}></div>
                
                <div
                  className={`relative px-6 py-4 rounded-3xl backdrop-blur-sm transition-all duration-300 ${
                    message.type === 'user'
                      ? 'bg-gradient-to-br from-white/15 via-gray-700/30 to-white/10 text-white border border-white/30 shadow-xl shadow-white/10'
                      : 'bg-gradient-to-br from-gray-900/70 via-black/80 to-gray-800/60 text-gray-100 border border-gray-700/50 hover:border-gray-600'
                  }`}
                >
                  <p className="whitespace-pre-wrap leading-relaxed text-base">{message.content}</p>
                  <div className="flex items-center justify-between mt-3">
                    <p className="text-xs text-gray-500 font-medium">{message.timestamp}</p>
                    {message.type === 'bot' && (
                      <div className="flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-gray-500" />
                        <span className="text-xs text-gray-500">AI</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {message.type === 'user' && (
                <div className="flex-shrink-0">
                  <div className="relative group">
                    <div className="absolute -inset-2 bg-white/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                    <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-white via-gray-100 to-white border border-gray-300 flex items-center justify-center shadow-lg">
                      <User className="w-6 h-6 text-black" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
        
        {isLoading && (
          <div className="flex gap-6 justify-start">
            <div className="flex-shrink-0">
              <div className="relative">
                <div className="absolute -inset-2 bg-white/20 rounded-full blur-lg animate-pulse"></div>
                <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-white/15 via-gray-800/50 to-white/10 border border-white/30 flex items-center justify-center backdrop-blur-sm">
                  <Bot className="w-6 h-6 text-white animate-pulse" />
                </div>
              </div>
            </div>
            <div className="max-w-3xl px-6 py-4 rounded-3xl bg-gradient-to-br from-gray-900/70 via-black/80 to-gray-800/60 border border-gray-700/50 backdrop-blur-sm">
              <div className="flex items-center space-x-3">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span className="text-gray-400 text-sm font-medium">AI is thinking...</span>
                <Sparkles className="w-4 h-4 text-gray-400 animate-pulse" />
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-gray-800 p-6 bg-gradient-to-r from-gray-900/80 via-black/90 to-gray-900/80 backdrop-blur-xl relative z-10">
        <form onSubmit={handleSubmit} className="flex gap-4 items-end max-w-4xl mx-auto">
          <div className="flex-1 relative group">
      
            <div className="absolute -inset-1 bg-white/10 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-all duration-500"></div>
            <textarea
              ref={textareaRef}
              value={inputMessage}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Share what's on your mind..."
              className="relative w-full px-6 py-4 bg-gradient-to-r from-black/60 via-gray-900/80 to-black/60 border border-gray-700 rounded-3xl text-white placeholder-gray-400 resize-none focus:outline-none focus:border-white hover:border-gray-500 transition-all duration-300 max-h-32 backdrop-blur-sm text-base leading-relaxed"
              rows={1}
              disabled={isLoading}
            />
          </div>
          
          <div className="relative group">
            <div className={`absolute -inset-1 rounded-2xl blur-lg transition-all duration-500 ${
              inputMessage.trim() && !isLoading 
                ? 'bg-white/20 opacity-0 group-hover:opacity-100' 
                : 'opacity-0'
            }`}></div>
            <button
              type="submit"
              disabled={!inputMessage.trim() || isLoading}
              className={`relative p-4 rounded-2xl transition-all duration-500 transform backdrop-blur-sm ${
                inputMessage.trim() && !isLoading
                  ? 'bg-gradient-to-r from-white via-gray-100 to-white text-black hover:scale-110 shadow-xl shadow-white/20 border-2 border-white'
                  : 'bg-gray-800/50 text-gray-500 cursor-not-allowed border-2 border-gray-700'
              }`}
            >
              <Send className={`w-6 h-6 transition-transform duration-300 ${
                inputMessage.trim() && !isLoading ? 'transform rotate-45' : ''
              }`} />
            </button>
          </div>
        </form>
        
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500 leading-relaxed">
            This AI assistant provides support but is not a substitute for professional mental health care.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;