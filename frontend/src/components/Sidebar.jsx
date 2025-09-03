import React from 'react';
import { Plus, MessageSquare, Trash2 } from 'lucide-react';

const Sidebar = ({ chatHistory, onNewChat, onSelectChat, activeChatId, onDeleteChat }) => {
  return (
    <div className="w-80 bg-gray-900 border-r border-gray-700 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <button
          onClick={onNewChat}
          className="w-full flex items-center gap-3 px-4 py-3 bg-black text-white border-2 border-gray-600 rounded-lg hover:border-white hover:bg-gray-800 transition-all duration-200 font-medium"
        >
          <Plus className="w-5 h-5" />
          New Chat
        </button>
      </div>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-2">
          {chatHistory.length === 0 ? (
            <div className="text-center py-8">
              <MessageSquare className="w-12 h-12 text-gray-600 mx-auto mb-3" />
              <p className="text-gray-500 text-sm">No conversations yet</p>
              <p className="text-gray-600 text-xs mt-1">Start a new chat to begin</p>
            </div>
          ) : (
            <div className="space-y-2">
              {chatHistory.map((chat) => (
                <div
                  key={chat.id}
                  className={`
                    group relative p-3 rounded-lg cursor-pointer transition-all duration-200
                    ${activeChatId === chat.id 
                      ? 'bg-gray-800 border border-gray-600' 
                      : 'bg-gray-900 hover:bg-gray-800 border border-transparent hover:border-gray-600'
                    }
                  `}
                  onClick={() => onSelectChat(chat.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-medium text-sm truncate mb-1">
                        {chat.title}
                      </h3>
                      <p className="text-gray-400 text-xs truncate mb-2">
                        {chat.lastMessage}
                      </p>
                      <p className="text-gray-500 text-xs">
                        {chat.timestamp}
                      </p>
                    </div>
                    
                    {/* Delete Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteChat(chat.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1 text-gray-500 hover:text-red-400 transition-all duration-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700">
        <div className="text-center">
          <p className="text-xs text-gray-500 mb-2">Mental Mate AI</p>
          <p className="text-xs text-gray-600">Your AI Therapy Companion</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;