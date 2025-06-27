
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface DevotionalStartProps {
  title: string;
  scripture: string;
  verse: string;
  dayNumber: number;
  onBegin: () => void;
  weeklyStats: { completed: number; total: number };
}

export const DevotionalStart: React.FC<DevotionalStartProps> = ({
  title,
  scripture,
  verse,
  dayNumber,
  onBegin,
  weeklyStats
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header with stats */}
        <div className="text-center space-y-2">
          <Badge variant="outline" className="text-lg px-4 py-2">
            Day {dayNumber}
          </Badge>
          <div className="text-sm text-gray-600">
            This week: {weeklyStats.completed}/{weeklyStats.total} completed
          </div>
        </div>

        {/* Main devotional card */}
        <Card className="shadow-lg">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl font-bold text-gray-800">
              {title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600 mb-2">{scripture}</p>
              <blockquote className="text-lg italic text-gray-800 leading-relaxed">
                "{verse}"
              </blockquote>
            </div>
            
            <Button 
              onClick={onBegin}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white py-3 text-lg"
            >
              Begin Daily Devotion
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
