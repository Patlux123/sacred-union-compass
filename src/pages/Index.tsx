
import React, { useState, useEffect } from 'react';
import { AuthForm } from '@/components/auth/AuthForm';
import { UserProfile } from '@/components/profile/UserProfile';
import { MobileNavigation } from '@/components/mobile/MobileNavigation';
import { MobileHeader } from '@/components/mobile/MobileHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Book, Calendar, Users, Star, CheckCircle, Lightbulb } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: string;
  name: string;
  email: string;
  partnerCode?: string;
  partnerId?: string;
  partnerName?: string;
}

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentSection, setCurrentSection] = useState('devotionals');
  const [showProfile, setShowProfile] = useState(false);
  const { toast } = useToast();

  // Simulate user login
  const handleLogin = (email: string, password: string, name?: string) => {
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: name || 'John Doe',
      email,
      partnerCode: Math.random().toString(36).substr(2, 8).toUpperCase(),
    };
    setUser(newUser);
    toast({
      title: "Welcome!",
      description: name ? "Account created successfully!" : "Signed in successfully!",
    });
  };

  const handleUpdateProfile = (updates: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updates });
    }
  };

  const handleLinkPartner = (partnerCode: string) => {
    if (user) {
      setUser({
        ...user,
        partnerId: 'partner-id',
        partnerName: 'Sarah Johnson' // Simulated partner name
      });
      toast({
        title: "Partner linked!",
        description: "You're now connected with your partner. Start your journey together!",
      });
      setShowProfile(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setShowProfile(false);
    setCurrentSection('devotionals');
  };

  // If not logged in, show auth form
  if (!user) {
    return <AuthForm onLogin={handleLogin} />;
  }

  // If showing profile
  if (showProfile) {
    return (
      <UserProfile
        user={user}
        onUpdateProfile={handleUpdateProfile}
        onLinkPartner={handleLinkPartner}
        onLogout={handleLogout}
      />
    );
  }

  // Main app content
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <MobileHeader user={user} currentSection={currentSection} />
      
      <div className="p-4 max-w-md mx-auto space-y-4">
        {/* Quick Stats */}
        {user.partnerId && (
          <Card className="bg-gradient-to-r from-pink-50 to-purple-50 border-pink-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Heart className="h-5 w-5 text-pink-500" />
                  <span className="font-medium text-pink-800">Together for 12 days</span>
                </div>
                <Badge variant="secondary" className="bg-pink-100 text-pink-800">
                  Streak: 5
                </Badge>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Today's Content */}
        {currentSection === 'devotionals' && (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Book className="h-5 w-5 text-purple-600" />
                    Today's Devotional
                  </CardTitle>
                  <Badge variant="outline">Day 3</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Trusting God Together</h3>
                  <p className="text-sm text-purple-600 mb-3">Proverbs 3:5-6</p>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">
                    Trust is vital in marriage, both with each other and with God. It's easy to rely on our own plans, 
                    assumptions, or expectations, but scripture reminds us to lean on God's wisdom. Trusting God together 
                    can deepen your intimacy, reduce anxiety, and help you navigate life's uncertainties as a united team.
                  </p>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm font-medium text-gray-800 mb-1">Reflection:</p>
                    <p className="text-sm text-gray-600">"Where do we need to trust God more together?"</p>
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-600">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Mark as Complete
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Prayer for Today</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-sm italic leading-relaxed">
                  "Father, help us lean on You and not our own understanding. Guide our marriage, our choices, 
                  and our hearts. Teach us to trust You and each other more deeply. Amen."
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {currentSection === 'prayers' && (
          <div className="space-y-4">
            {[
              { title: 'Prayer for Unity', category: 'Marriage Strength' },
              { title: 'Prayer During Conflict', category: 'Conflict Resolution' },
              { title: 'Prayer for Future Plans', category: 'Future Planning' },
              { title: 'Prayer for Protection', category: 'Protection' },
            ].map((prayer, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{prayer.title}</CardTitle>
                  <CardDescription>{prayer.category}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    Read Prayer
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {currentSection === 'challenges' && (
          <div className="space-y-4">
            <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-orange-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-orange-500" />
                  Active Challenge
                </CardTitle>
              </CardHeader>
              <CardContent>
                <h3 className="font-semibold mb-2">7 Days of Gratitude</h3>
                <p className="text-sm text-gray-600 mb-3">Day 3: Write a note of appreciation to each other</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-orange-600">Progress: 3/7 days</span>
                  <Button size="sm">Complete Today</Button>
                </div>
              </CardContent>
            </Card>

            {[
              '30 Days of Speaking Life',
              'Acts of Service Week',
              'Prayer Partner Challenge',
              'Date Night Adventure'
            ].map((challenge, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{challenge}</h3>
                      <p className="text-sm text-gray-500">Start together</p>
                    </div>
                    <Button variant="outline" size="sm">Start</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {currentSection === 'habits' && (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Today's Habits</CardTitle>
                <CardDescription>Build your spiritual routine together</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { habit: 'Pray together', completed: true },
                  { habit: 'Express gratitude', completed: true },
                  { habit: 'Read scripture', completed: false },
                  { habit: 'Send encouragement', completed: false },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className={`text-sm ${item.completed ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
                      {item.habit}
                    </span>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      item.completed 
                        ? 'bg-green-500 border-green-500' 
                        : 'border-gray-300 hover:border-purple-500 cursor-pointer'
                    }`}>
                      {item.completed && <CheckCircle className="h-4 w-4 text-white" />}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}
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
