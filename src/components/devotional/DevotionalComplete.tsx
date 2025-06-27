
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Heart } from "lucide-react";

interface DevotionalCompleteProps {
  title: string;
  dayNumber: number;
  userReflection: string;
  partnerReflection?: string;
  partnerName?: string;
  weeklyStats: { completed: number; total: number };
  onViewDevotion: () => void;
  onHome: () => void;
}

export const DevotionalComplete: React.FC<DevotionalCompleteProps> = ({
  title,
  dayNumber,
  userReflection,
  partnerReflection,
  partnerName,
  weeklyStats,
  onViewDevotion,
  onHome
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Success header */}
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Devotion Complete!</h1>
            <Badge variant="outline" className="mt-2">
              Day {dayNumber} - {title}
            </Badge>
          </div>
        </div>

        {/* Weekly progress */}
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-lg font-semibold text-gray-800">
                {weeklyStats.completed}/{weeklyStats.total}
              </p>
              <p className="text-sm text-gray-600">devotions completed this week</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-gradient-to-r from-pink-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(weeklyStats.completed / weeklyStats.total) * 100}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reflections */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Your Reflection</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed">{userReflection}</p>
          </CardContent>
        </Card>

        {partnerReflection && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Heart className="w-5 h-5 text-pink-500" />
                {partnerName}'s Reflection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">{partnerReflection}</p>
            </CardContent>
          </Card>
        )}

        {/* Actions */}
        <div className="space-y-3">
          <Button 
            onClick={onViewDevotion}
            variant="outline"
            className="w-full"
          >
            View Full Devotion
          </Button>
          <Button 
            onClick={onHome}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
          >
            Return Home
          </Button>
        </div>
      </div>
    </div>
  );
};
