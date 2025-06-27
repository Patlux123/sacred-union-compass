
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileHeader } from '@/components/mobile/MobileHeader';
import { MobileNavigation } from '@/components/mobile/MobileNavigation';
import { UserProfile } from '@/components/profile/UserProfile';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Calendar, HandHeart, Users, Heart, Target, Coffee, MessageCircle, Lightbulb, Shield } from "lucide-react";

// Mock user data - replace with actual auth later
const mockUser = {
  id: 'user123',
  name: 'John Doe',
  email: 'john@example.com',
  partnerId: 'partner123',
  partnerName: 'Sarah',
  partnerCode: 'ABC123'
};

const Index = () => {
  const [currentSection, setCurrentSection] = useState('devotionals');
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();

  const handleProfileUpdate = (updates: any) => {
    console.log('Profile updates:', updates);
  };

  const handleLinkPartner = (partnerCode: string) => {
    console.log('Linking partner with code:', partnerCode);
  };

  const handleLogout = () => {
    console.log('Logging out...');
  };

  const handleProfileBack = () => {
    setShowProfile(false);
  };

  if (showProfile) {
    return (
      <UserProfile
        user={mockUser}
        onUpdateProfile={handleProfileUpdate}
        onLinkPartner={handleLinkPartner}
        onLogout={handleLogout}
        onBack={handleProfileBack}
      />
    );
  }

  const renderDevotionalCard = () => (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
      <CardContent className="p-0">
        <div className="bg-gradient-to-br from-pink-500 to-purple-600 text-white p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Daily Devotional</h3>
                <p className="text-pink-100">Grow together spiritually</p>
              </div>
            </div>
          </div>
          <Button 
            className="w-full bg-white/20 hover:bg-white/30 border-white/30"
            variant="outline"
            onClick={() => navigate('/devotional')}
          >
            Start Today's Devotion
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderPrayersSection = () => (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HandHeart className="h-5 w-5 text-purple-600" />
            Prayer Requests
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">Share your prayer requests with your partner</p>
          <Button className="w-full">Add Prayer Request</Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Answered Prayers</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Celebrate God's faithfulness together</p>
        </CardContent>
      </Card>
    </div>
  );

  const renderChallengesSection = () => (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-purple-600" />
            Weekly Challenge
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">Complete challenges together to strengthen your bond</p>
          <Button className="w-full">View This Week's Challenge</Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderHabitsSection = () => (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-purple-600" />
            Habit Tracker
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">Track your spiritual habits together</p>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <span>Daily Prayer</span>
              <div className="flex space-x-1">
                {[1,2,3,4,5,6,7].map(day => (
                  <div key={day} className="w-6 h-6 bg-green-200 rounded-full"></div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <span>Bible Reading</span>
              <div className="flex space-x-1">
                {[1,2,3,4,5,6,7].map(day => (
                  <div key={day} className="w-6 h-6 bg-blue-200 rounded-full"></div>
                ))}
              </div>
            </div>
          </div>
          <Button className="w-full mt-4">Add New Habit</Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderSectionContent = () => {
    switch (currentSection) {
      case 'devotionals':
        return renderDevotionalCard();
      case 'prayers':
        return renderPrayersSection();
      case 'challenges':
        return renderChallengesSection();
      case 'habits':
        return renderHabitsSection();
      default:
        return renderDevotionalCard();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <MobileHeader user={mockUser} currentSection={currentSection} />
      
      <div className="px-4 pt-6 pb-20">
        <div className="max-w-md mx-auto">
          {renderSectionContent()}
        </div>
      </div>

      <MobileNavigation
        currentSection={currentSection}
        onSectionChange={setCurrentSection}
        onProfileClick={() => setShowProfile(true)}
      />
    </div>
  );
};

export default Index;
