import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Download, Menu, X } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import ChatArea from '../components/ChatArea';
import { generateGeminiResponse, isGeminiConfigured } from '../../utils/gemini';

const Chat = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get intent from URL parameters
  const urlParams = new URLSearchParams(location.search);
  const selectedIntent = urlParams.get('intent');

  const [chatHistory, setChatHistory] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [currentMessages, setCurrentMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  
  // Mobile sidebar state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Intent configuration
  const intentConfig = {
    'mood-checkin': {
      title: 'Mood Check-in Session',
      welcomeMessage: "Hello! I'm your Mood Tracking Assistant. I'll help you identify and understand your current emotional state. How are you feeling right now? Please describe your mood on a scale of 1-10 and what might be influencing it.",
      icon: '💝'
    },
    'anxiety-support': {
      title: 'Anxiety Support Session',
      welcomeMessage: "I'm here as your Anxiety Support Specialist. I'll help you manage anxious feelings with specific techniques. What anxiety symptoms are you experiencing right now? Let's rate your anxiety level from 1-10.",
      icon: '🛡️'
    },
    'depression-support': {
      title: 'Depression Support Session',
      welcomeMessage: "Welcome, I'm your Depression Support Specialist. I'm here to help you work through depressive feelings with practical strategies. How has your mood been lately? Can you describe your energy levels and motivation on a scale of 1-10?",
      icon: '☀️'
    },
    'stress-management': {
      title: 'Stress Management Session',
      welcomeMessage: "Hi, I'm your Stress Management Coach. I'll help you identify stress sources and provide relief techniques. What's causing you stress right now? Rate your current stress level from 1-10.",
      icon: '⚡'
    },
    'crisis-support': {
      title: 'Crisis Support Session',
      welcomeMessage: "I'm here as your Crisis Support Specialist for immediate help. Your safety is the priority. If you're in immediate danger, please contact emergency services (911) or crisis hotline (988). How are you feeling right now? Are you safe?",
      icon: '🚨'
    },
    'grief-loss': {
      title: 'Grief & Loss Support Session',
      welcomeMessage: "I'm your Grief & Loss Support Specialist. I understand you're processing a difficult loss. Grief is natural and everyone experiences it differently. Would you like to share what you're going through? Take your time.",
      icon: '🌸'
    }
  };

  // Language options
  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
    { code: 'bn', name: 'বাংলা', flag: '🇧🇩' }
  ];

  // Initialize with welcome message based on intent
  useEffect(() => {
    if (selectedIntent && intentConfig[selectedIntent]) {
      const config = intentConfig[selectedIntent];
      const welcomeMessage = {
        type: 'bot',
        content: config.welcomeMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setCurrentMessages([welcomeMessage]);
    } else if (!selectedIntent) {
      // If no intent is selected, redirect to selection page
      navigate('/selection');
    }
  }, [selectedIntent, navigate]);

  // Check API configuration on component mount
  useEffect(() => {
    if (!isGeminiConfigured()) {
      console.warn('⚠️  Gemini API is not properly configured. Please add your API key.');
    } else {
      console.log('✅ Gemini API is configured and ready!');
    }
  }, []);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNewChat = () => {
    setActiveChatId(null);
    setIsSidebarOpen(false); 
    if (selectedIntent && intentConfig[selectedIntent]) {
      const config = intentConfig[selectedIntent];
      const welcomeMessage = {
        type: 'bot',
        content: config.welcomeMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setCurrentMessages([welcomeMessage]);
    } else {
      setCurrentMessages([]);
    }
  };

  const handleSelectChat = (chatId) => {
    const selectedChat = chatHistory.find(chat => chat.id === chatId);
    if (selectedChat) {
      setActiveChatId(chatId);
      setCurrentMessages(selectedChat.messages);
      setIsSidebarOpen(false); 
    }
  };

  const handleSendMessage = async (message) => {
    if (!message.trim()) return;

    const userMessage = {
      type: 'user',
      content: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setCurrentMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      console.log('Generating response for:', message, 'with intent:', selectedIntent);
      const aiResponse = await generateGeminiResponse(message, currentMessages, selectedLanguage, selectedIntent);
      
      const botMessage = {
        type: 'bot',
        content: aiResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      // Add bot message
      setCurrentMessages(prev => [...prev, botMessage]);

      // Update chat history
      updateChatHistory(userMessage, botMessage, message);

    } catch (error) {
      console.error('Error in handleSendMessage:', error);
      
      // Add error message
      const errorMessage = {
        type: 'bot',
        content: "I'm sorry, I encountered an error while trying to respond. Please try again, and if the problem persists, consider reaching out to a mental health professional.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setCurrentMessages(prev => [...prev, errorMessage]);
      updateChatHistory(userMessage, errorMessage, message);
      
    } finally {
      setIsLoading(false);
    }
  };

  const updateChatHistory = (userMessage, botMessage, originalMessage) => {
    if (activeChatId) {
      setChatHistory(prev => prev.map(chat => 
        chat.id === activeChatId 
          ? { 
              ...chat, 
              messages: [...chat.messages, userMessage, botMessage],
              lastMessage: originalMessage.slice(0, 50) + (originalMessage.length > 50 ? '...' : ''),
              timestamp: 'Just now'
            }
          : chat
      ));
    } else {
      const newChatId = Date.now().toString();
      const intentTitle = selectedIntent && intentConfig[selectedIntent] 
        ? intentConfig[selectedIntent].title 
        : originalMessage.slice(0, 30) + (originalMessage.length > 30 ? '...' : '');
      
      const newChat = {
        id: newChatId,
        title: intentTitle,
        lastMessage: originalMessage.slice(0, 50) + (originalMessage.length > 50 ? '...' : ''),
        timestamp: 'Just now',
        messages: currentMessages.filter(msg => msg.type === 'bot').concat([userMessage, botMessage])
      };
      
      setChatHistory(prev => [newChat, ...prev]);
      setActiveChatId(newChatId);
    }
  };

  const handleDeleteChat = (chatId) => {
    setChatHistory(prev => prev.filter(chat => chat.id !== chatId));
    if (activeChatId === chatId) {
      setActiveChatId(null);
      handleNewChat(); // Reset to welcome message
    }
  };

  const handleChangeIntent = () => {
    navigate('/selection');
  };

  // PDF Generation Function
  const generatePDF = async () => {
    if (currentMessages.length <= 1) {
      alert('No conversation to export. Please have a conversation first.');
      return;
    }

    setIsGeneratingPDF(true);

    try {
      // Create PDF content
      const currentDate = new Date().toLocaleDateString();
      const intentTitle = selectedIntent && intentConfig[selectedIntent] 
        ? intentConfig[selectedIntent].title 
        : 'Mental Health Session';

      let pdfContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>${intentTitle} - Session Report</title>
    <style>
        body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            line-height: 1.6; 
            margin: 40px; 
            color: #333; 
        }
        .header { 
            text-align: center; 
            border-bottom: 3px solid #4A90E2; 
            padding-bottom: 20px; 
            margin-bottom: 30px; 
        }
        .session-info { 
            background: #f8f9fa; 
            padding: 15px; 
            border-left: 4px solid #4A90E2; 
            margin-bottom: 30px; 
            border-radius: 5px;
        }
        .message { 
            margin-bottom: 20px; 
            padding: 15px; 
            border-radius: 8px; 
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .user-message { 
            background: #e3f2fd; 
            border-left: 4px solid #2196f3; 
        }
        .bot-message { 
            background: #f1f8e9; 
            border-left: 4px solid #4caf50; 
        }
        .timestamp { 
            font-size: 12px; 
            color: #666; 
            float: right; 
        }
        .message-label { 
            font-weight: bold; 
            margin-bottom: 5px; 
        }
        .footer { 
            margin-top: 40px; 
            padding-top: 20px; 
            border-top: 1px solid #ddd; 
            font-size: 12px; 
            color: #666; 
            text-align: center; 
        }
        .disclaimer {
            background: #fff3cd;
            border: 1px solid #ffeaa7;
            border-radius: 5px;
            padding: 15px;
            margin: 20px 0;
            color: #856404;
        }
        h1 { color: #4A90E2; margin-bottom: 10px; }
        h2 { color: #333; margin-top: 30px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>${intentTitle}</h1>
        <p>Mental Health Support Session Report</p>
    </div>
    
    <div class="session-info">
        <h2>Session Information</h2>
        <p><strong>Date:</strong> ${currentDate}</p>
        <p><strong>Session Type:</strong> ${intentTitle}</p>
        <p><strong>Language:</strong> ${languages.find(l => l.code === selectedLanguage)?.name || 'English'}</p>
        <p><strong>Total Messages:</strong> ${currentMessages.length}</p>
    </div>

    <div class="disclaimer">
        <strong>⚠️ Important Disclaimer:</strong> This conversation is with an AI assistant and should not replace professional mental health care. If you're experiencing a mental health crisis, please contact emergency services (911) or the National Suicide Prevention Lifeline (988) immediately.
    </div>

    <h2>Conversation History</h2>
`;

      currentMessages.forEach((message, index) => {
        const messageClass = message.type === 'user' ? 'user-message' : 'bot-message';
        const messageLabel = message.type === 'user' ? '👤 You' : '🤖 Mental Mate';
        
        pdfContent += `
    <div class="message ${messageClass}">
        <div class="timestamp">${message.timestamp}</div>
        <div class="message-label">${messageLabel}</div>
        <div>${message.content.replace(/\n/g, '<br>')}</div>
    </div>
`;
      });

      pdfContent += `
    <div class="footer">
        <p>Generated on ${new Date().toLocaleString()}</p>
        <p>Mental Mate - AI Mental Health Companion</p>
        <p><em>This report is for personal reference only and should not be used as a substitute for professional medical advice.</em></p>
    </div>
</body>
</html>`;

      const blob = new Blob([pdfContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Mental-Mate-Session-${selectedIntent}-${currentDate.replace(/\//g, '-')}.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setTimeout(() => {
        alert('Session report downloaded! You can open the HTML file in your browser and use "Print to PDF" to save as PDF.');
      }, 500);

    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate session report. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const currentIntentConfig = selectedIntent ? intentConfig[selectedIntent] : null;

  return (
    <div className="flex h-screen bg-black relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 md:w-64 md:h-64 bg-white opacity-2 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 md:w-80 md:h-80 bg-white opacity-1 rounded-full blur-3xl animate-pulse" style={{animationDelay: '3s'}}></div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Desktop: Always visible, Mobile: Slide in overlay */}
      <div className={`
        fixed md:relative z-50 md:z-10 h-full
        transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <Sidebar
          chatHistory={chatHistory}
          onNewChat={handleNewChat}
          onSelectChat={handleSelectChat}
          activeChatId={activeChatId}
          onDeleteChat={handleDeleteChat}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative z-10 w-full md:w-auto">
        {/* Header with mobile menu button, intent info, and controls */}
        <div className="p-3 md:p-6 border-b border-gray-800 bg-gradient-to-r from-gray-900/80 via-black/90 to-gray-900/80 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-2 md:gap-4">
            
            {/* Mobile Menu Button + Current Intent Display */}
            <div className="flex items-center gap-2 md:gap-4 min-w-0 flex-1">
              {/* Mobile hamburger menu */}
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>

              {/* Current Intent Display */}
              {currentIntentConfig && (
                <div className="flex items-center gap-2 md:gap-4 group min-w-0">
                  <div className="relative flex-shrink-0">
                    <div className="absolute -inset-2 bg-white/10 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                    <span className="relative text-xl md:text-3xl filter drop-shadow-lg">{currentIntentConfig.icon}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-white font-bold text-sm md:text-lg tracking-wide truncate">{currentIntentConfig.title}</h2>
                    <button 
                      onClick={handleChangeIntent}
                      className="text-xs text-gray-400 hover:text-white transition-all duration-300 group-hover:translate-x-1 flex items-center gap-1"
                    >
                      <span className="hidden sm:inline">Change focus area</span>
                      <span className="sm:hidden">Change</span>
                      <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Controls: Language Selector and PDF Download */}
            <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
              {/* Language Selector */}
              <div className="flex items-center gap-1 md:gap-3">
                <span className="text-gray-400 text-xs md:text-sm font-medium hidden sm:inline">Language:</span>
                <div className="relative group">
                  <div className="absolute -inset-1 bg-white/10 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="relative bg-black/50 border border-gray-600 rounded-lg md:rounded-xl px-2 md:px-4 py-1 md:py-2 text-white text-xs md:text-sm focus:outline-none focus:border-white hover:border-gray-400 transition-all duration-300 backdrop-blur-sm cursor-pointer"
                  >
                    {languages.map((lang) => (
                      <option key={lang.code} value={lang.code} className="bg-black">
                        {lang.flag} <span className="hidden sm:inline">{lang.name}</span>
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* PDF Download Button */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-blue-500/20 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                <button
                  onClick={generatePDF}
                  disabled={isGeneratingPDF || currentMessages.length <= 1}
                  className={`
                    relative flex items-center gap-1 md:gap-2 px-2 md:px-4 py-1 md:py-2 rounded-lg md:rounded-xl text-xs md:text-sm font-medium transition-all duration-300 backdrop-blur-sm border
                    ${currentMessages.length > 1 && !isGeneratingPDF
                      ? 'bg-blue-600/20 border-blue-500/50 text-blue-400 hover:bg-blue-600/30 hover:border-blue-400 hover:text-blue-300'
                      : 'bg-gray-800/50 border-gray-600/50 text-gray-500 cursor-not-allowed'
                    }
                  `}
                  title="Download Session Report"
                >
                  {isGeneratingPDF ? (
                    <>
                      <div className="w-3 h-3 md:w-4 md:h-4 border-2 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
                      <span className="hidden sm:inline">Generating...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-3 h-3 md:w-4 md:h-4" />
                      <span className="hidden sm:inline">Download Report</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Chat Area - Full remaining height */}
        <div className="flex-1 overflow-hidden">
          <ChatArea
            messages={currentMessages}
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;