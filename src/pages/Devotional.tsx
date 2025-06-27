
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { devotionals } from '@/data/devotionals';
import { devotionalService } from '@/services/devotionalService';
import { DevotionalStart } from '@/components/devotional/DevotionalStart';
import { DevotionalTeaching } from '@/components/devotional/DevotionalTeaching';
import { DevotionalPrayer } from '@/components/devotional/DevotionalPrayer';
import { DevotionalReflection } from '@/components/devotional/DevotionalReflection';
import { DevotionalComplete } from '@/components/devotional/DevotionalComplete';
import { useToast } from '@/hooks/use-toast';

// Mock user data - replace with actual auth
const mockUser = {
  id: 'user123',
  partnerId: 'partner123',
  partnerName: 'Sarah'
};

type DevotionalStep = 'start' | 'teaching' | 'prayer' | 'reflection' | 'complete' | 'view';

const Devotional: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<DevotionalStep>('start');
  const [currentDay, setCurrentDay] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);
  const [weeklyStats, setWeeklyStats] = useState({ completed: 0, total: 7 });
  const [userReflection, setUserReflection] = useState('');
  const [partnerReflection, setPartnerReflection] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const currentDevotion = devotionals[currentDay - 1] || devotionals[0];

  useEffect(() => {
    loadDevotionalData();
  }, []);

  const loadDevotionalData = async () => {
    try {
      const day = await devotionalService.getCurrentDevotionalDay(mockUser.id);
      const completed = await devotionalService.isTodayCompleted(mockUser.id);
      const stats = await devotionalService.getWeeklyStats(mockUser.id);
      
      setCurrentDay(day);
      setIsCompleted(completed);
      setWeeklyStats(stats);

      if (completed) {
        setCurrentStep('complete');
        // Load today's reflection and partner's reflection
        const today = new Date().toISOString().split('T')[0];
        if (mockUser.partnerId) {
          const partnerRefl = await devotionalService.getPartnerReflection(
            mockUser.partnerId, 
            day, 
            today
          );
          setPartnerReflection(partnerRefl);
        }
      }
    } catch (error) {
      console.error('Error loading devotional data:', error);
      // Set defaults if error occurs
      setCurrentDay(1);
      setIsCompleted(false);
      setWeeklyStats({ completed: 0, total: 7 });
    }
  };

  const handleBeginDevotion = () => {
    setCurrentStep('teaching');
  };

  const handleNextToReflection = () => {
    setCurrentStep('reflection');
  };

  const handleNextToPrayer = () => {
    setCurrentStep('prayer');
  };

  const handleCompleteDevotion = async (reflectionComment: string) => {
    setIsLoading(true);
    try {
      await devotionalService.completeDevotion(
        mockUser.id,
        mockUser.partnerId,
        currentDay,
        reflectionComment
      );

      setUserReflection(reflectionComment);
      
      // Try to get partner's reflection
      if (mockUser.partnerId) {
        const today = new Date().toISOString().split('T')[0];
        const partnerRefl = await devotionalService.getPartnerReflection(
          mockUser.partnerId,
          currentDay,
          today
        );
        setPartnerReflection(partnerRefl);
      }

      // Update stats
      const newStats = await devotionalService.getWeeklyStats(mockUser.id);
      setWeeklyStats(newStats);

      setCurrentStep('complete');
      toast({
        title: "Devotion Complete!",
        description: "Your daily devotion has been saved.",
      });
    } catch (error) {
      console.error('Error completing devotion:', error);
      toast({
        title: "Error",
        description: "Failed to save your devotion. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewDevotion = () => {
    setCurrentStep('view');
  };

  const handleReturnHome = () => {
    navigate('/');
  };

  if (!currentDevotion) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center">
        <p>Loading devotion...</p>
      </div>
    );
  }

  switch (currentStep) {
    case 'start':
      return (
        <DevotionalStart
          title={currentDevotion.title}
          scripture={currentDevotion.scripture}
          verse={currentDevotion.verse}
          dayNumber={currentDay}
          onBegin={handleBeginDevotion}
          weeklyStats={weeklyStats}
        />
      );

    case 'teaching':
      return (
        <DevotionalTeaching
          title={currentDevotion.title}
          scripture={currentDevotion.scripture}
          verse={currentDevotion.verse}
          teaching={currentDevotion.teaching}
          onNext={handleNextToPrayer}
        />
      );

    case 'prayer':
      return (
        <DevotionalPrayer
          title={currentDevotion.title}
          prayer={currentDevotion.prayer}
          onNext={handleNextToReflection}
        />
      );

    case 'reflection':
      return (
        <DevotionalReflection
          title={currentDevotion.title}
          reflection={currentDevotion.reflection}
          onComplete={handleCompleteDevotion}
          isLoading={isLoading}
        />
      );

    case 'complete':
      return (
        <DevotionalComplete
          title={currentDevotion.title}
          dayNumber={currentDay}
          userReflection={userReflection}
          partnerReflection={partnerReflection}
          partnerName={mockUser.partnerName}
          weeklyStats={weeklyStats}
          onViewDevotion={handleViewDevotion}
          onHome={handleReturnHome}
        />
      );

    case 'view':
      return (
        <DevotionalTeaching
          title={currentDevotion.title}
          scripture={currentDevotion.scripture}
          verse={currentDevotion.verse}
          teaching={currentDevotion.teaching}
          onNext={handleReturnHome}
        />
      );

    default:
      return null;
  }
};

export default Devotional;
