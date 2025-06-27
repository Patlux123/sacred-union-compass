
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

interface DevotionalPrayerProps {
  title: string;
  prayer: string;
  onNext: () => void;
}

export const DevotionalPrayer: React.FC<DevotionalPrayerProps> = ({
  title,
  prayer,
  onNext
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-4">
      <div className="max-w-md mx-auto">
        <Card className="shadow-lg">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl font-bold text-gray-800">
              {title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Prayer</h3>
              <blockquote className="text-gray-700 leading-relaxed italic">
                {prayer}
              </blockquote>
            </div>
            
            <div className="bg-pink-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 text-center">
                Take a moment to pray together or individually
              </p>
            </div>
            
            <Button 
              onClick={onNext}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white py-3"
            >
              Continue to Reflection
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
