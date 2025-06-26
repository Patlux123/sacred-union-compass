
import React from 'react';
import { Heart, Bell, Settings } from 'lucide-react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface User {
  id: string;
  name: string;
  email: string;
  partnerId?: string;
  partnerName?: string;
}

interface MobileHeaderProps {
  user: User;
  currentSection: string;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({ user, currentSection }) => {
  const getSectionTitle = (section: string) => {
    switch (section) {
      case 'devotionals': return 'Daily Devotionals';
      case 'prayers': return 'Prayer Time';
      case 'challenges': return 'Couple Challenges';
      case 'habits': return 'Habit Tracker';
      case 'dates': return 'Date Ideas';
      case 'blessings': return 'Blessing Board';
      case 'conflict': return 'Conflict Resolution';
      case 'journal': return 'Shared Journal';
      default: return 'Sacred Union';
    }
  };

  return (
    <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-4 safe-area-pt">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-white/20 text-white text-sm">
              {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">Hi, {user.name.split(' ')[0]}!</p>
            {user.partnerId && (
              <p className="text-xs text-white/80">Connected to {user.partnerName}</p>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {user.partnerId && <Heart className="h-5 w-5 text-pink-200" />}
          <Bell className="h-5 w-5 text-white/80" />
        </div>
      </div>
      <h1 className="text-xl font-bold">{getSectionTitle(currentSection)}</h1>
    </div>
  );
};
