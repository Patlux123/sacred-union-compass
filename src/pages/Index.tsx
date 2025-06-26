
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Heart, Book, Users, Calendar, CheckCircle, MessageSquare, Plus } from 'lucide-react';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [checkedHabits, setCheckedHabits] = useState<string[]>([]);
  const [blessings, setBlessings] = useState<string[]>([
    "Thankful for how you encouraged me before my interview.",
    "Grateful to God for the laughter we shared tonight."
  ]);
  const [newBlessing, setNewBlessing] = useState('');

  const devotionals = [
    {
      title: "Trusting God Together",
      scripture: "Trust in the Lord with all your heart and lean not on your own understanding. — Proverbs 3:5–6",
      teaching: "Trust is vital in marriage, both with each other and with God. It's easy to rely on our own plans, assumptions, or expectations, but scripture reminds us to lean on God's wisdom. Trusting God together can deepen your intimacy, reduce anxiety, and help you navigate life's uncertainties as a united team.",
      reflection: "Where do we need to trust God more together?",
      prayer: "Father, help us lean on You and not our own understanding. Guide our marriage, our choices, and our hearts. Teach us to trust You and each other more deeply. Amen."
    },
    {
      title: "Choosing Forgiveness",
      scripture: "Be kind and compassionate to one another, forgiving each other, just as in Christ God forgave you. — Ephesians 4:32",
      teaching: "Forgiveness is not always easy, but it is necessary. Marriage will inevitably include moments of disappointment or hurt. Jesus calls us to forgive as we have been forgiven. Forgiveness doesn't mean forgetting; it means releasing bitterness and choosing love.",
      reflection: "Is there anything I need to forgive, or ask forgiveness for today?",
      prayer: "Lord, give us hearts that forgive quickly and fully. Teach us to reflect Your mercy in how we treat one another. Amen."
    }
  ];

  const prayerTemplates = [
    {
      category: "Marriage Strength",
      title: "Prayer for Unity",
      text: "Lord, bind us together in Your love. Remove division and strengthen our commitment to one another. Help us walk in step with Your Spirit. Amen."
    },
    {
      category: "Conflict Resolution",
      title: "Prayer During Conflict",
      text: "Father, calm our hearts. Let us be slow to anger and quick to listen. Help us to forgive, understand, and speak kindly. Amen."
    },
    {
      category: "Future Planning",
      title: "Prayer for Future Plans",
      text: "Guide us, Lord, as we plan our future. Help our goals reflect Your will. Lead us toward purpose, peace, and partnership in You. Amen."
    },
    {
      category: "Protection",
      title: "Prayer for Protection from Temptation",
      text: "God, guard our hearts and minds. Protect our marriage from anything that seeks to divide or distract. Help us flee temptation and choose righteousness. Amen."
    },
    {
      category: "Intimacy",
      title: "Prayer for Intimacy",
      text: "Lord, help us cultivate both emotional and physical closeness. Remind us that our intimacy reflects Your love — full of trust, safety, and joy. Amen."
    }
  ];

  const bibleVerses = {
    Love: [
      "Love is patient, love is kind. It does not envy, it does not boast, it is not proud. — 1 Corinthians 13:4–7",
      "We love because he first loved us. — 1 John 4:19",
      "Many waters cannot quench love; rivers cannot sweep it away. — Song of Solomon 8:7",
      "Be devoted to one another in love. Honor one another above yourselves. — Romans 12:10",
      "Be completely humble and gentle; be patient, bearing with one another in love. — Ephesians 4:2"
    ],
    Trust: [
      "Trust in the Lord with all your heart and lean not on your own understanding. — Proverbs 3:5–6",
      "Those who know your name trust in you, for you, Lord, have never forsaken those who seek you. — Psalm 9:10",
      "You will keep in perfect peace those whose minds are steadfast, because they trust in you. — Isaiah 26:3–4",
      "The Lord is good, a refuge in times of trouble. He cares for those who trust in him. — Nahum 1:7",
      "Blessed is the one who trusts in the Lord, whose confidence is in him. — Jeremiah 17:7"
    ],
    Forgiveness: [
      "Be kind and compassionate to one another, forgiving each other, just as in Christ God forgave you. — Ephesians 4:32",
      "For if you forgive other people when they sin against you, your heavenly Father will also forgive you. — Matthew 6:14–15",
      "Bear with each other and forgive one another if any of you has a grievance against someone. — Colossians 3:13",
      "Do not judge, and you will not be judged. Do not condemn, and you will not be condemned. Forgive, and you will be forgiven. — Luke 6:37",
      "Above all, love each other deeply, because love covers over a multitude of sins. — 1 Peter 4:8"
    ]
  };

  const habits = [
    "Pray together (daily)",
    "Read scripture together (daily/weekly)",
    "Express gratitude to each other (daily)",
    "Send an encouraging message or compliment (daily)",
    "Date night (weekly)",
    "Serve someone together (weekly or monthly)",
    "Speak one affirmation to your spouse (daily)",
    "Avoid criticism for a day (or longer)",
    "Check in emotionally (ask 'How's your heart today?')",
    "Plan future goals together (monthly)"
  ];

  const challenges = [
    {
      title: "7 Days of Gratitude for Each Other",
      days: [
        "Share one thing you love about your spouse's character.",
        "Thank God together for a blessing in your marriage.",
        "Write a note/text of appreciation to each other.",
        "Verbally affirm something your spouse did this week.",
        "Thank God for your partner's strengths.",
        "Do an unexpected act of kindness for them.",
        "Pray a prayer of thanksgiving together for your relationship."
      ]
    },
    {
      title: "30 Days of Speaking Life Challenge",
      description: "No criticism, sarcasm, or negative speech for 30 days.",
      dailyTask: "Speak one life-giving sentence to your spouse.",
      verse: "Ephesians 4:29",
      reflection: "How did this change our mood today?"
    }
  ];

  const dateIdeas = {
    "At-Home": [
      "Cook a new meal together + pray before eating",
      "Board game + read Psalm 118 before or after",
      "Watch a Christian documentary or sermon + discuss"
    ],
    "Outdoors": [
      "Sunset walk while discussing goals + pray at the end",
      "Visit a lake or forest — read Genesis 1 and reflect on creation"
    ],
    "Service": [
      "Volunteer at a food bank or church",
      "Deliver baked goods to neighbors + pray over their homes together"
    ]
  };

  const conflictResolution = [
    {
      step: "Step 1: Pause and Pray Together",
      content: "Lord, calm our minds. Help us listen with love."
    },
    {
      step: "Step 2: Heart Check Prompts",
      content: "Am I seeking to win or understand? Am I assuming the worst or believing the best?"
    },
    {
      step: "Step 3: Communication Template",
      content: "I feel ___ when ___. What I need is ___."
    },
    {
      step: "Step 4: Forgiveness Prompt",
      content: "I forgive you for ___. Help me release bitterness and heal."
    },
    {
      step: "Step 5: Peace Verse to Read Together",
      content: "Be completely humble and gentle; be patient, bearing with one another in love. — Ephesians 4:2"
    }
  ];

  const journalPrompts = [
    "What did God teach us this week?",
    "What do we hope and pray for in our future together?",
    "How can I love and serve you better this week?",
    "Where did we see God move in our relationship recently?",
    "What's one thing we're grateful for about each other today?"
  ];

  const toggleHabit = (habit: string) => {
    setCheckedHabits(prev => 
      prev.includes(habit) 
        ? prev.filter(h => h !== habit)
        : [...prev, habit]
    );
  };

  const addBlessing = () => {
    if (newBlessing.trim()) {
      setBlessings(prev => [...prev, newBlessing.trim()]);
      setNewBlessing('');
    }
  };

  if (activeSection === 'home') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Heart className="w-10 h-10 text-pink-500" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Together in Faith
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Strengthen your marriage through faith, prayer, and intentional connection
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer group" onClick={() => setActiveSection('devotionals')}>
              <CardHeader className="text-center">
                <Book className="w-12 h-12 text-purple-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <CardTitle className="text-purple-700">Daily Devotionals</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  Strengthen your spiritual bond with guided devotions for couples
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer group" onClick={() => setActiveSection('prayers')}>
              <CardHeader className="text-center">
                <Users className="w-12 h-12 text-blue-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <CardTitle className="text-blue-700">Prayer Templates</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  Guided prayers for every season of your marriage
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer group" onClick={() => setActiveSection('verses')}>
              <CardHeader className="text-center">
                <Book className="w-12 h-12 text-green-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <CardTitle className="text-green-700">Bible Verses</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  Scripture organized by themes for marriage growth
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer group" onClick={() => setActiveSection('habits')}>
              <CardHeader className="text-center">
                <CheckCircle className="w-12 h-12 text-orange-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <CardTitle className="text-orange-700">Habit Tracker</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  Build healthy spiritual habits together
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer group" onClick={() => setActiveSection('challenges')}>
              <CardHeader className="text-center">
                <Calendar className="w-12 h-12 text-red-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <CardTitle className="text-red-700">Couple Challenges</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  Fun challenges to deepen your connection
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer group" onClick={() => setActiveSection('more')}>
              <CardHeader className="text-center">
                <Plus className="w-12 h-12 text-indigo-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <CardTitle className="text-indigo-700">More Tools</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  Date ideas, conflict resolution, and journal prompts
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" onClick={() => setActiveSection('home')}>
            ← Back to Home
          </Button>
          <div className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-pink-500" />
            <h1 className="text-2xl font-bold text-gray-800">Together in Faith</h1>
          </div>
        </div>

        {activeSection === 'devotionals' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-center text-purple-700 mb-8">Daily Devotionals</h2>
            {devotionals.map((devotional, index) => (
              <Card key={index} className="max-w-4xl mx-auto">
                <CardHeader>
                  <CardTitle className="text-2xl text-purple-700">{devotional.title}</CardTitle>
                  <p className="text-lg italic text-blue-600 border-l-4 border-blue-200 pl-4">{devotional.scripture}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Teaching</h4>
                    <p className="text-gray-700 leading-relaxed">{devotional.teaching}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Reflection</h4>
                    <p className="text-gray-700 italic">"{devotional.reflection}"</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-lg mb-2 text-green-700">Prayer</h4>
                    <p className="text-green-800 italic">"{devotional.prayer}"</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeSection === 'prayers' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">Prayer Templates</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
              {prayerTemplates.map((prayer, index) => (
                <Card key={index}>
                  <CardHeader>
                    <Badge className="w-fit mb-2">{prayer.category}</Badge>
                    <CardTitle className="text-xl text-blue-700">{prayer.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 italic leading-relaxed">"{prayer.text}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'verses' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-center text-green-700 mb-8">Bible Verse Library</h2>
            <Tabs defaultValue="Love" className="max-w-4xl mx-auto">
              <TabsList className="grid w-full grid-cols-3">
                {Object.keys(bibleVerses).map(theme => (
                  <TabsTrigger key={theme} value={theme}>{theme}</TabsTrigger>
                ))}
              </TabsList>
              {Object.entries(bibleVerses).map(([theme, verses]) => (
                <TabsContent key={theme} value={theme}>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-2xl text-green-700">{theme}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {verses.map((verse, index) => (
                          <div key={index} className="border-l-4 border-green-200 pl-4 py-2">
                            <p className="text-gray-700 italic">{verse}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        )}

        {activeSection === 'habits' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-center text-orange-700 mb-8">Habit Tracker</h2>
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-xl text-orange-700">Suggested Couple Habits</CardTitle>
                <p className="text-gray-600">Check off habits as you complete them together</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {habits.map((habit, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
                      <input
                        type="checkbox"
                        checked={checkedHabits.includes(habit)}
                        onChange={() => toggleHabit(habit)}
                        className="w-5 h-5 text-orange-500"
                      />
                      <span className={`${checkedHabits.includes(habit) ? 'line-through text-gray-500' : 'text-gray-700'}`}>
                        {habit}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeSection === 'challenges' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-center text-red-700 mb-8">Couple Challenges</h2>
            <div className="max-w-4xl mx-auto space-y-6">
              {challenges.map((challenge, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-2xl text-red-700">{challenge.title}</CardTitle>
                    {challenge.description && (
                      <p className="text-gray-600">{challenge.description}</p>
                    )}
                  </CardHeader>
                  <CardContent>
                    {challenge.days && (
                      <div className="space-y-3">
                        {challenge.days.map((day, dayIndex) => (
                          <div key={dayIndex} className="flex items-start space-x-3">
                            <Badge variant="outline" className="mt-1">Day {dayIndex + 1}</Badge>
                            <p className="text-gray-700">{day}</p>
                          </div>
                        ))}
                      </div>
                    )}
                    {challenge.dailyTask && (
                      <div className="space-y-3">
                        <div>
                          <strong>Daily Task:</strong> {challenge.dailyTask}
                        </div>
                        <div>
                          <strong>Featured Verse:</strong> {challenge.verse}
                        </div>
                        <div>
                          <strong>Reflection:</strong> {challenge.reflection}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'more' && (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-center text-indigo-700 mb-8">More Tools</h2>
            
            <Tabs defaultValue="dates" className="max-w-6xl mx-auto">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="dates">Date Ideas</TabsTrigger>
                <TabsTrigger value="blessings">Blessing Board</TabsTrigger>
                <TabsTrigger value="conflict">Conflict Resolution</TabsTrigger>
                <TabsTrigger value="journal">Journal Prompts</TabsTrigger>
              </TabsList>

              <TabsContent value="dates">
                <div className="space-y-6">
                  {Object.entries(dateIdeas).map(([category, ideas]) => (
                    <Card key={category}>
                      <CardHeader>
                        <CardTitle className="text-xl text-indigo-700">{category} Ideas</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {ideas.map((idea, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <span className="text-indigo-500 mt-1">•</span>
                              <span className="text-gray-700">{idea}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="blessings">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl text-indigo-700">Blessing Board - Gratitude Wall</CardTitle>
                    <p className="text-gray-600">Share what you're grateful for together</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 mb-4">
                      {blessings.map((blessing, index) => (
                        <div key={index} className="bg-yellow-50 p-3 rounded-lg border-l-4 border-yellow-400">
                          <p className="text-gray-700 italic">"{blessing}"</p>
                        </div>
                      ))}
                    </div>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={newBlessing}
                        onChange={(e) => setNewBlessing(e.target.value)}
                        placeholder="Add a new blessing..."
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        onKeyPress={(e) => e.key === 'Enter' && addBlessing()}
                      />
                      <Button onClick={addBlessing}>Add</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="conflict">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl text-indigo-700">Conflict Resolution Toolkit</CardTitle>
                    <p className="text-gray-600">A step-by-step guide for working through disagreements</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {conflictResolution.map((step, index) => (
                        <div key={index} className="border-l-4 border-indigo-200 pl-4">
                          <h4 className="font-semibold text-lg text-indigo-700 mb-2">{step.step}</h4>
                          <p className="text-gray-700">{step.content}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="journal">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl text-indigo-700">Shared Journal Prompts</CardTitle>
                    <p className="text-gray-600">Questions to explore together in your couple's journal</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {journalPrompts.map((prompt, index) => (
                        <div key={index} className="bg-indigo-50 p-4 rounded-lg">
                          <p className="text-indigo-800 font-medium">{prompt}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
