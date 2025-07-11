import React, { useState, useEffect } from 'react';
import { AuthForm } from '@/components/auth/AuthForm';
import { UserProfile } from '@/components/profile/UserProfile';
import { MobileNavigation } from '@/components/mobile/MobileNavigation';
import { MobileHeader } from '@/components/mobile/MobileHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Book, Calendar, Users, Star, CheckCircle, Lightbulb, ChevronLeft, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: string;
  name: string;
  email: string;
  partnerCode?: string;
  partnerId?: string;
  partnerName?: string;
}

const devotionals = [
  {
    id: 1,
    title: "Christ at the Center",
    scripture: "Matthew 6:33",
    verse: "But seek first his kingdom and his righteousness, and all these things will be given to you as well.",
    teaching: "When Jesus is at the center of your marriage, everything else aligns better — communication, intimacy, finances, and purpose. Couples who prioritize God together experience a deeper unity. Busyness, stress, and worldly distractions try to steal that focus, but coming back to Christ daily recalibrates your relationship.",
    reflection: "How can we seek God first in our marriage today?",
    prayer: "Jesus, we invite You into the center of our marriage. Help us prioritize Your presence over all else. Let Your will shape our relationship. Amen."
  },
  {
    id: 2,
    title: "Choosing Peace Over Pride",
    scripture: "Romans 12:18",
    verse: "If it is possible, as far as it depends on you, live at peace with everyone.",
    teaching: "Pride often whispers, 'I'm right.' But peace says, 'Let's understand each other.' In marriage, winning an argument is less important than winning each other's hearts. Humility is the gateway to peace.",
    reflection: "Is there anywhere I've let pride create distance between us?",
    prayer: "Lord, teach us humility. Help us choose peace over pride and unity over being right. Amen."
  },
  {
    id: 3,
    title: "Bound Together in Forgiveness",
    scripture: "Colossians 3:13",
    verse: "Bear with each other and forgive one another if any of you has a grievance against someone. Forgive as the Lord forgave you.",
    teaching: "Forgiveness isn't just for major offenses — it's a daily choice. Small irritations, unmet expectations, or careless words can quietly build walls. But forgiveness tears down those walls, creating space for grace, growth, and deeper love.",
    reflection: "What small (or big) offense do I need to let go of today?",
    prayer: "God, thank You for forgiving us. Help us extend that same forgiveness freely, so nothing divides our hearts. Amen."
  },
  {
    id: 4,
    title: "The Power of Gentle Words",
    scripture: "Proverbs 15:1",
    verse: "A gentle answer turns away wrath, but a harsh word stirs up anger.",
    teaching: "Words can either build bridges or burn them. In marriage, harsh words can leave lasting wounds, while gentle words foster safety, trust, and love. Practicing gentle communication doesn't mean avoiding hard conversations; it means having them with kindness and respect.",
    reflection: "How can I use my words today to uplift rather than wound?",
    prayer: "Lord, guard our tongues. Let our words be filled with kindness, understanding, and grace. Amen."
  },
  {
    id: 5,
    title: "Growing Together Spiritually",
    scripture: "Proverbs 27:17",
    verse: "As iron sharpens iron, so one person sharpens another.",
    teaching: "A strong marriage doesn't just grow emotionally but spiritually. Praying together, reading Scripture, and serving together strengthens not just your individual faith but your bond as a couple. Spiritual growth is one of the deepest forms of intimacy.",
    reflection: "What is one spiritual habit we can start or improve together?",
    prayer: "God, help us grow together in faith. Sharpen one another lovingly as we walk with You. Amen."
  },
  {
    id: 6,
    title: "Loving Like Christ Loves",
    scripture: "Ephesians 5:25",
    verse: "Husbands, love your wives, just as Christ loved the church and gave himself up for her.",
    teaching: "Christ's love is sacrificial, unconditional, and patient. It's not about receiving but about giving — even when it's hard. When both spouses commit to loving like Christ, marriage becomes a reflection of heaven on earth.",
    reflection: "What does sacrificial love look like for us today?",
    prayer: "Jesus, teach us to love each other the way You love us — selflessly, patiently, and fully. Amen."
  },
  {
    id: 7,
    title: "Trusting God With the Unknown",
    scripture: "Proverbs 3:5-6",
    verse: "Trust in the Lord with all your heart and lean not on your own understanding.",
    teaching: "Life brings uncertainty — financial challenges, health scares, family decisions. Together, couples must learn to trust God rather than letting fear dictate their responses. Trust is a choice repeated daily, together.",
    reflection: "Where do we need to let go of control and trust God more?",
    prayer: "Father, we release our fears to You. Help us lean on Your wisdom rather than our limited understanding. Amen."
  },
  {
    id: 8,
    title: "Serving Each Other Daily",
    scripture: "Galatians 5:13",
    verse: "Serve one another humbly in love.",
    teaching: "Marriage thrives when both partners serve one another — not out of obligation but out of love. Whether it's taking over chores, offering a massage, or simply listening well, service is a daily opportunity to say 'I choose you.'",
    reflection: "What simple act of service can I do for my spouse today?",
    prayer: "Lord, give us hearts that serve each other joyfully, just as You served us. Amen."
  },
  {
    id: 9,
    title: "Protecting Our Marriage",
    scripture: "Proverbs 4:23",
    verse: "Above all else, guard your heart, for everything you do flows from it.",
    teaching: "The world throws many distractions and temptations at marriages — busyness, comparison, emotional distance. Guarding your marriage means being intentional: creating boundaries, spending quality time, and covering your relationship in prayer.",
    reflection: "What area of our marriage needs more protection or intentionality?",
    prayer: "God, help us guard our hearts and our marriage. Keep us alert to anything that could harm our bond. Amen."
  },
  {
    id: 10,
    title: "Gratitude Changes Everything",
    scripture: "1 Thessalonians 5:18",
    verse: "Give thanks in all circumstances; for this is God's will for you in Christ Jesus.",
    teaching: "Gratitude shifts focus from what's lacking to what's blessed. In marriage, regularly expressing thanks for each other fosters joy, reduces conflict, and deepens affection. Gratitude is spiritual armor against bitterness and entitlement.",
    reflection: "What is one thing about my spouse I'm thankful for today?",
    prayer: "Father, help us cultivate grateful hearts. Let thanksgiving flow easily between us, reminding us of Your goodness and each other's value. Amen."
  },
  {
    id: 11,
    title: "Faith in the Storm",
    scripture: "Isaiah 43:2",
    verse: "When you pass through the waters, I will be with you; and when you pass through the rivers, they will not sweep over you.",
    teaching: "Storms will come — illness, financial stress, loss. But God promises presence, not absence of trouble. Couples who cling to God and to each other in trials come out stronger, more resilient, and deeply bonded.",
    reflection: "What storm are we facing, and how can we face it with faith?",
    prayer: "Lord, remind us that You are with us in every storm. Strengthen our faith and our unity. Amen."
  },
  {
    id: 12,
    title: "Kindness is Contagious",
    scripture: "Ephesians 4:32",
    verse: "Be kind and compassionate to one another, forgiving each other, just as in Christ God forgave you.",
    teaching: "Small acts of kindness — a smile, a note, a gentle word — can transform the atmosphere of a home. Kindness fosters warmth, safety, and love. It disarms tension and refreshes the soul.",
    reflection: "How can I show my spouse an unexpected kindness today?",
    prayer: "Jesus, teach us to outdo one another in kindness. Fill our home with compassion. Amen."
  },
  {
    id: 13,
    title: "Building Trust Brick by Brick",
    scripture: "Proverbs 12:22",
    verse: "The Lord detests lying lips, but he delights in people who are trustworthy.",
    teaching: "Trust is built slowly through honesty, consistency, and integrity. It's destroyed quickly by deceit, secrecy, or broken promises. Couples who prioritize transparency grow unshakable trust over time.",
    reflection: "Is there anything we need to be more honest or transparent about?",
    prayer: "God, help us be trustworthy in word and deed. Let trust be the foundation of our marriage. Amen."
  },
  {
    id: 14,
    title: "Renewed Mercies Each Morning",
    scripture: "Lamentations 3:22-23",
    verse: "Because of the Lord's great love we are not consumed, for his compassions never fail. They are new every morning.",
    teaching: "Yesterday's mistakes don't define today. In marriage, grace must be renewed daily — forgiving offenses, letting go of irritations, and choosing love again. God's mercy models how we treat each other.",
    reflection: "What burden or hurt from yesterday do we need to release?",
    prayer: "Father, thank You for new mercies today. Help us extend that mercy to one another. Amen."
  },
  {
    id: 15,
    title: "Inviting God Into Decisions",
    scripture: "Proverbs 16:3",
    verse: "Commit to the Lord whatever you do, and he will establish your plans.",
    teaching: "From financial choices to parenting decisions to where to live, involving God isn't optional — it's essential. When couples commit decisions to God together, He brings clarity and peace.",
    reflection: "What decision do we need to surrender to God today?",
    prayer: "Lord, guide our decisions. Lead us by Your wisdom, not just our desires. Amen."
  },
  {
    id: 16,
    title: "Celebrating Each Other",
    scripture: "1 Thessalonians 5:11",
    verse: "Encourage one another and build each other up.",
    teaching: "Marriage flourishes where celebration lives. Celebrating each other's wins, progress, character, and small victories fosters joy and intimacy. Neglecting this leads to discouragement.",
    reflection: "What can I celebrate about my spouse today?",
    prayer: "God, help us to notice and affirm the good in each other. Let celebration be part of our love language. Amen."
  },
  {
    id: 17,
    title: "Patience in the Waiting",
    scripture: "Psalm 37:7",
    verse: "Be still before the Lord and wait patiently for him.",
    teaching: "Waiting seasons — waiting for a job, a child, healing, or a breakthrough — are refining. Patience in marriage means holding hands through the waiting, trusting God's timing together.",
    reflection: "Where are we waiting on God, and how can we support each other in it?",
    prayer: "Father, teach us patience. Let waiting grow our trust in You and deepen our bond. Amen."
  },
  {
    id: 18,
    title: "Anchored in Hope",
    scripture: "Hebrews 6:19",
    verse: "We have this hope as an anchor for the soul, firm and secure.",
    teaching: "Hope anchors a marriage through disappointments and hardship. It's not wishful thinking; it's the assurance that God is faithful. Couples who nurture hope together endure the storms.",
    reflection: "How can we encourage hope in each other today?",
    prayer: "God, anchor our hearts in hope. Let us remind each other of Your promises daily. Amen."
  },
  {
    id: 19,
    title: "Honoring God With Our Finances",
    scripture: "Proverbs 3:9",
    verse: "Honor the Lord with your wealth, with the firstfruits of all your crops.",
    teaching: "Money is a common source of tension — or blessing — in marriage. Couples who honor God with tithing, generosity, and wise stewardship experience freedom and peace financially.",
    reflection: "Are we honoring God with our finances? What needs to change?",
    prayer: "Lord, teach us to steward our finances in a way that honors You. Make us generous, content, and wise. Amen."
  },
  {
    id: 20,
    title: "Rooted in God's Word",
    scripture: "Psalm 1:1-3",
    verse: "Blessed is the one... whose delight is in the law of the Lord... That person is like a tree planted by streams of water.",
    teaching: "Couples rooted in Scripture are resilient against trials. Reading, studying, and meditating on God's Word together deepens spiritual intimacy and equips them for life's challenges.",
    reflection: "How can we incorporate more Scripture into our daily life together?",
    prayer: "God, root our marriage in Your Word. Let it nourish, guide, and sustain us. Amen."
  },
  {
    id: 21,
    title: "Rest for the Weary",
    scripture: "Matthew 11:28",
    verse: "Come to me, all you who are weary and burdened, and I will give you rest.",
    teaching: "Busyness and burnout harm marriages. Rest isn't laziness — it's obedience. Sabbath rest, intentional downtime, and spiritual rest restore joy and connection.",
    reflection: "Are we prioritizing rest — spiritually, emotionally, and physically — as a couple?",
    prayer: "Jesus, we come to You for rest. Restore our souls and refresh our marriage. Amen."
  },
  {
    id: 22,
    title: "Fanning the Flame of Romance",
    scripture: "Song of Solomon 1:2",
    verse: "Let him kiss me with the kisses of his mouth—for your love is more delightful than wine.",
    teaching: "Romance isn't just for the honeymoon phase. It's an intentional pursuit. Date nights, flirting, thoughtful gestures, and physical intimacy are holy expressions of love in marriage.",
    reflection: "What can we do this week to nurture romance?",
    prayer: "God, help us keep the flame of romance alive. Let our affection reflect Your joy and delight. Amen."
  },
  {
    id: 23,
    title: "Handling Conflict God's Way",
    scripture: "James 1:19",
    verse: "Everyone should be quick to listen, slow to speak and slow to become angry.",
    teaching: "Conflict is inevitable but manageable. Healthy conflict involves listening well, speaking gently, and seeking reconciliation, not victory. Godly conflict strengthens rather than destroys.",
    reflection: "How can we improve the way we handle conflict?",
    prayer: "Lord, teach us to listen more than we speak. Let love guide every disagreement. Amen."
  },
  {
    id: 24,
    title: "Shared Purpose and Mission",
    scripture: "Matthew 28:19",
    verse: "Therefore go and make disciples of all nations...",
    teaching: "A marriage with shared purpose thrives. Whether it's serving in church, mentoring others, raising godly children, or being a light in your community, purpose unites couples beyond themselves.",
    reflection: "What mission has God placed on our marriage?",
    prayer: "Father, show us how to serve You together. Let our marriage be a beacon of Your love and truth. Amen."
  },
  {
    id: 25,
    title: "The Gift of Daily Gratitude",
    scripture: "Psalm 107:1",
    verse: "Give thanks to the Lord, for he is good; his love endures forever.",
    teaching: "Gratitude is the heartbeat of a joyful marriage. A daily habit of saying thank you — to God and each other — transforms perspectives and strengthens bonds.",
    reflection: "What are three things we're thankful for today, in each other and in our life?",
    prayer: "Lord, fill our hearts with gratitude. Let thanksgiving overflow from our lips and strengthen our love. Amen."
  }
];

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentSection, setCurrentSection] = useState('devotionals');
  const [showProfile, setShowProfile] = useState(false);
  const [currentDevotional, setCurrentDevotional] = useState(0);
  const { toast } = useToast();

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
        partnerName: 'Sarah Johnson'
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

  const nextDevotional = () => {
    setCurrentDevotional((prev) => (prev + 1) % devotionals.length);
  };

  const prevDevotional = () => {
    setCurrentDevotional((prev) => (prev - 1 + devotionals.length) % devotionals.length);
  };

  if (!user) {
    return <AuthForm onLogin={handleLogin} />;
  }

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

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <MobileHeader user={user} currentSection={currentSection} />
      
      <div className="p-4 max-w-md mx-auto space-y-4">
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

        {currentSection === 'devotionals' && (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Book className="h-5 w-5 text-purple-600" />
                    Today's Devotional
                  </CardTitle>
                  <Badge variant="outline">Day {currentDevotional + 1}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={prevDevotional}
                    className="flex items-center gap-1"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Prev
                  </Button>
                  <span className="text-sm text-gray-500">
                    {currentDevotional + 1} of {devotionals.length}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={nextDevotional}
                    className="flex items-center gap-1"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">{devotionals[currentDevotional].title}</h3>
                  <p className="text-sm text-purple-600 mb-3">{devotionals[currentDevotional].scripture}</p>
                  <div className="bg-purple-50 p-3 rounded-lg mb-4">
                    <p className="text-sm italic text-purple-800">"{devotionals[currentDevotional].verse}"</p>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">
                    {devotionals[currentDevotional].teaching}
                  </p>
                  <div className="bg-gray-50 p-3 rounded-lg mb-4">
                    <p className="text-sm font-medium text-gray-800 mb-1">Reflection:</p>
                    <p className="text-sm text-gray-600">{devotionals[currentDevotional].reflection}</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg mb-4">
                    <p className="text-sm font-medium text-blue-800 mb-1">Prayer:</p>
                    <p className="text-sm italic text-blue-700">"{devotionals[currentDevotional].prayer}"</p>
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-600">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Mark as Complete
                </Button>
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
