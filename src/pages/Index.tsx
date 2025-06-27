import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Heart } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-4">
      <div className="max-w-md mx-auto space-y-6">
        {renderDevotionalCard()}
      </div>
    </div>
  );
};

export default Index;
