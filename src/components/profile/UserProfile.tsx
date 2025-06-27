
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, Link, Copy, Check, Settings, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  partnerCode?: string;
  partnerId?: string;
  partnerName?: string;
}

interface UserProfileProps {
  user: User;
  onUpdateProfile: (updates: Partial<User>) => void;
  onLinkPartner: (partnerCode: string) => void;
  onLogout: () => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({ user, onUpdateProfile, onLinkPartner, onLogout }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [partnerCode, setPartnerCode] = useState('');
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleSaveProfile = () => {
    onUpdateProfile({ name });
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile has been saved successfully.",
    });
  };

  const handleCopyCode = async () => {
    if (user.partnerCode) {
      await navigator.clipboard.writeText(user.partnerCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        title: "Code copied!",
        description: "Share this code with your partner to link your profiles.",
      });
    }
  };

  const handleLinkPartner = () => {
    if (partnerCode.trim()) {
      onLinkPartner(partnerCode.trim());
      setPartnerCode('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-4">
      <div className="max-w-md mx-auto space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            Profile
          </h1>
          <Button variant="ghost" size="icon" onClick={onLogout}>
            <LogOut className="h-5 w-5" />
          </Button>
        </div>

        {/* Profile Card */}
        <Card>
          <CardHeader className="text-center">
            <Avatar className="w-20 h-20 mx-auto mb-4">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="text-2xl bg-gradient-to-r from-pink-500 to-purple-600 text-white">
                {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {isEditing ? (
              <div className="space-y-2">
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                />
                <div className="flex gap-2">
                  <Button onClick={handleSaveProfile} size="sm">Save</Button>
                  <Button onClick={() => setIsEditing(false)} variant="outline" size="sm">Cancel</Button>
                </div>
              </div>
            ) : (
              <div>
                <CardTitle className="text-xl">{user.name}</CardTitle>
                <p className="text-sm text-gray-600">{user.email}</p>
                <Button onClick={() => setIsEditing(true)} variant="ghost" size="sm" className="mt-2">
                  <Settings className="h-4 w-4 mr-1" />
                  Edit Profile
                </Button>
              </div>
            )}
          </CardHeader>
        </Card>

        {/* Partner Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-pink-500" />
              Partner Connection
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {user.partnerId ? (
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <Heart className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <p className="font-medium text-green-800">Connected to {user.partnerName}</p>
                <p className="text-sm text-green-600">You're now sharing your spiritual journey together!</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Your Partner Code</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      value={user.partnerCode || 'Generating...'}
                      readOnly
                      className="font-mono"
                    />
                    <Button
                      onClick={handleCopyCode}
                      variant="outline"
                      size="icon"
                      disabled={!user.partnerCode}
                    >
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Share this code with your partner</p>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or</span>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">Enter Partner's Code</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      value={partnerCode}
                      onChange={(e) => setPartnerCode(e.target.value)}
                      placeholder="Enter your partner's code"
                      className="font-mono uppercase"
                    />
                    <Button onClick={handleLinkPartner} disabled={!partnerCode.trim()}>
                      <Link className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
