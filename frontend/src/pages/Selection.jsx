import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Shield, Sun, Zap, AlertTriangle, Flower2 } from 'lucide-react';

const Selection = () => {
  const navigate = useNavigate();
  const [selectedIntent, setSelectedIntent] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMouseMoving, setIsMouseMoving] = useState(false);
  const containerRef = useRef(null);
  const mouseTimeoutRef = useRef(null);

  const intents = [
    {
      id: 'mood-checkin',
      title: 'Mood Check-in',
      subtitle: '"How are you feeling today?"',
      description: 'Share your current emotional state and get personalized guidance',
      icon: Heart,
      color: 'from-pink-500 to-rose-500',
      borderColor: 'border-pink-500/30',
      hoverColor: 'hover:border-pink-500',
      bgColor: 'bg-pink-500/10'
    },
    {
      id: 'anxiety-support',
      title: 'Anxiety Support',
      subtitle: 'Recognizing anxiety-related concerns',
      description: 'Get support for anxious thoughts, worry, and overwhelming feelings',
      icon: Shield,
      color: 'from-blue-500 to-indigo-500',
      borderColor: 'border-blue-500/30',
      hoverColor: 'hover:border-blue-500',
      bgColor: 'bg-blue-500/10'
    },
    {
      id: 'depression-support',
      title: 'Depression Support',
      subtitle: 'Identifying depressive thoughts or feelings',
      description: 'Find support for low mood, sadness, and lack of motivation',
      icon: Sun,
      color: 'from-amber-500 to-orange-500',
      borderColor: 'border-amber-500/30',
      hoverColor: 'hover:border-amber-500',
      bgColor: 'bg-amber-500/10'
    },
    {
      id: 'stress-management',
      title: 'Stress Management',
      subtitle: 'Work, relationship, or general stress',
      description: 'Learn techniques to manage and cope with daily stressors',
      icon: Zap,
      color: 'from-purple-500 to-violet-500',
      borderColor: 'border-purple-500/30',
      hoverColor: 'hover:border-purple-500',
      bgColor: 'bg-purple-500/10'
    },
    {
      id: 'crisis-support',
      title: 'Crisis Support',
      subtitle: 'Immediate distress or urgent situations',
      description: 'Get immediate support for urgent mental health concerns',
      icon: AlertTriangle,
      color: 'from-red-500 to-pink-500',
      borderColor: 'border-red-500/30',
      hoverColor: 'hover:border-red-500',
      bgColor: 'bg-red-500/10'
    },
    {
      id: 'grief-loss',
      title: 'Grief/Loss',
      subtitle: 'Processing bereavement or major losses',
      description: 'Find support while navigating through loss and grief',
      icon: Flower2,
      color: 'from-teal-500 to-cyan-500',
      borderColor: 'border-teal-500/30',
      hoverColor: 'hover:border-teal-500',
      bgColor: 'bg-teal-500/10'
    }
  ];

  // Handle mouse movement for cursor effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top + window.scrollY
        });
        
        // Set mouse as moving
        setIsMouseMoving(true);
        
        // Clear existing timeout
        if (mouseTimeoutRef.current) {
          clearTimeout(mouseTimeoutRef.current);
        }
        
        // Set timeout to hide cursor effect when mouse stops
        mouseTimeoutRef.current = setTimeout(() => {
          setIsMouseMoving(false);
        }, 150); // Hide after 150ms of no movement
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => {
        container.removeEventListener('mousemove', handleMouseMove);
        if (mouseTimeoutRef.current) {
          clearTimeout(mouseTimeoutRef.current);
        }
      };
    }
  }, []);

  const handleIntentSelect = (intentId) => {
    setSelectedIntent(intentId);
  };

  const handleStartSession = () => {
    if (selectedIntent) {
      navigate(`/chat?intent=${selectedIntent}`);
    }
  };

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-black relative overflow-hidden">
      {/* Cursor following effect - only visible when mouse is moving */}
      <div 
        className={`fixed pointer-events-none z-50 transition-all duration-300 ease-out ${
          isMouseMoving ? 'opacity-100' : 'opacity-10'
        }`}
        style={{
          left: mousePosition.x - 150,
          top: mousePosition.y - 150,
          transform: 'translate(-50%, -50%)'
        }}
      >
        <div className="w-80 h-80 bg-sky-400 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute inset-0 w-96 h-96 bg-sky-700/25 rounded-full blur-[100px]"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 pt-8 pb-4">
        <div className="max-w-6xl mx-auto px-4">
          <button
            onClick={handleGoBack}
            className="mb-8 text-gray-300 hover:text-black transition-all duration-300 flex items-center gap-2 group backdrop-blur-sm bg-black px-4 py-2 rounded-full border hover:bg-white hover:border-black font-bold cursor-pointer"
          >
            <span>←</span>
            Back to Home
          </button>
          
          <div className="text-center mb-16">
            <div className="relative mb-6">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight">
                Choose Your
                <span className="block bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                  Support Focus
                </span>
              </h1>
              <div className="absolute -inset-4 bg-gradient-to-r from-transparent via-white/5 to-transparent blur-xl"></div>
            </div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Select the area where you'd like personalized support and guidance today
            </p>
            <div className="mt-6 w-24 h-1 bg-gradient-to-r from-transparent via-white to-transparent mx-auto"></div>
          </div>
        </div>
      </div>

      {/* Intent Selection Cards */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
          {intents.map((intent, index) => {
            const IconComponent = intent.icon;
            const isSelected = selectedIntent === intent.id;
            
            return (
              <div
                key={intent.id}
                onClick={() => handleIntentSelect(intent.id)}
                className={`
                  relative group cursor-pointer transform transition-all duration-300 hover:scale-105
                  ${isSelected ? 'scale-105 z-20' : 'hover:z-10'}
                `}
              >
                {/* Glowing background effect */}
                <div className={`
                  absolute -inset-1 bg-gradient-to-r from-white/20 via-white/10 to-white/20 rounded-3xl blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500
                  ${isSelected ? 'opacity-100' : 'opacity-10'}
                `}></div>
                
                <div className={`
                  relative p-8 rounded-3xl border-2 backdrop-blur-xl transition-all duration-300 overflow-hidden
                  ${isSelected 
                    ? 'border-white bg-gradient-to-br from-white/10 via-white/5 to-white/10 shadow-2xl shadow-white/20' 
                    : 'border-gray-700 bg-gradient-to-br from-black/40 via-gray-900/60 to-black/40 hover:border-gray-400'
                  }
                `}>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className={`
                      w-20 h-20 rounded-2xl mb-6 flex items-center justify-center transition-all duration-300
                      ${isSelected 
                        ? 'bg-white shadow-lg shadow-white/30' 
                        : 'bg-gradient-to-br from-white via-gray-100 to-white group-hover:shadow-lg group-hover:shadow-white/20'
                      }
                    `}>
                      <IconComponent className="w-10 h-10 text-black" />
                    </div>
                    
                    {/* Text content */}
                    <h3 className={`text-2xl font-bold mb-3 transition-colors duration-300 ${isSelected ? 'text-white' : 'text-white group-hover:text-gray-100'}`}>
                      {intent.title}
                    </h3>
                    
                    <p className="text-sm text-gray-400 mb-4 italic font-medium">
                      {intent.subtitle}
                    </p>
                    
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {intent.description}
                    </p>
                    
                    {/* Selection indicator */}
                    {isSelected && (
                      <div className="absolute top-6 right-6">
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-lg shadow-white/30">
                          <div className="w-4 h-4 rounded-full bg-black"></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Start Session Button */}
        <div className="flex justify-center">
          <div className="relative group">
            {/* Button glow effect */}
            <div className={`
              absolute -inset-1 bg-gradient-to-r from-white/30 via-white/20 to-white/30 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500
            `}></div>
            
            <button
              onClick={handleStartSession}
              disabled={!selectedIntent}
              className={`
                relative px-16 py-5 rounded-3xl font-bold text-xl transition-all duration-300 transform border-2 backdrop-blur-sm
                ${selectedIntent
                  ? 'bg-black hover:border-black hover:border-2 text-white border-white hover:bg-white hover:text-black hover:scale-105 shadow-2xl cursor-pointer hover:shadow-white'
                  : 'bg-gray-800/50 text-gray-500 border-gray-600 cursor-not-allowed backdrop-blur-sm'
                }
              `}
            >
              <span className="relative z-10">
                {selectedIntent ? 'Start Therapy Session' : 'Select a Focus Area'}
              </span>
              
              {/* Button inner glow */}
              {selectedIntent && (
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
              )}
            </button>
          </div>
        </div>

        {/* Crisis Support Notice */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 max-w-3xl mx-auto">
            <strong className="text-red-400">Important:</strong> If you're experiencing a mental health crisis or having thoughts of self-harm, 
            please contact emergency services (911) or the National Suicide Prevention Lifeline (988) immediately. 
            This AI assistant is not a substitute for professional mental health care.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Selection;