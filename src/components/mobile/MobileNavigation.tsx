
import React from 'react';
import { Heart, Book, HandHeart, Calendar, Users, User } from 'lucide-react';

interface MobileNavigationProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
  onProfileClick: () => void;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({ 
  currentSection, 
  onSectionChange, 
  onProfileClick 
}) => {
  const navItems = [
    { id: 'devotionals', icon: Book, label: 'Devotionals' },
    { id: 'prayers', icon: HandHeart, label: 'Prayers' },
    { id: 'challenges', icon: Users, label: 'Together' },
    { id: 'habits', icon: Calendar, label: 'Habits' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 safe-area-pb">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                isActive 
                  ? 'text-purple-600 bg-purple-50' 
                  : 'text-gray-600 hover:text-purple-600 hover:bg-gray-50'
              }`}
            >
              <Icon className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
        <button
          onClick={onProfileClick}
          className="flex flex-col items-center py-2 px-3 rounded-lg transition-colors text-gray-600 hover:text-purple-600 hover:bg-gray-50"
        >
          <User className="h-5 w-5 mb-1" />
          <span className="text-xs font-medium">Profile</span>
        </button>
      </div>
    </div>
  );
};
