
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface DevotionalReflectionProps {
  title: string;
  reflection: string;
  onComplete: (comment: string) => void;
  isLoading?: boolean;
}

export const DevotionalReflection: React.FC<DevotionalReflectionProps> = ({
  title,
  reflection,
  onComplete,
  isLoading = false
}) => {
  const [comment, setComment] = useState('');

  const handleComplete = () => {
    onComplete(comment);
  };

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
              <h3 className="font-semibold text-gray-800 mb-3">Reflection</h3>
              <p className="text-gray-700 leading-relaxed">
                {reflection}
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="reflection-comment">Your Thoughts</Label>
              <Textarea
                id="reflection-comment"
                placeholder="Share your thoughts and reflections..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                className="resize-none"
              />
            </div>
            
            <Button 
              onClick={handleComplete}
              disabled={!comment.trim() || isLoading}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white py-3"
            >
              {isLoading ? 'Completing...' : 'Complete Devotion'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
