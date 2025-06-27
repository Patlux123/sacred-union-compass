
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

interface DevotionalTeachingProps {
  title: string;
  scripture: string;
  verse: string;
  teaching: string;
  onNext: () => void;
}

export const DevotionalTeaching: React.FC<DevotionalTeachingProps> = ({
  title,
  scripture,
  verse,
  teaching,
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
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600 mb-2">{scripture}</p>
              <blockquote className="text-base italic text-gray-800 leading-relaxed mb-4">
                "{verse}"
              </blockquote>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Teaching</h3>
              <p className="text-gray-700 leading-relaxed">
                {teaching}
              </p>
            </div>
            
            <Button 
              onClick={onNext}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white py-3"
            >
              Continue to Prayer
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
