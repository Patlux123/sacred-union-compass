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
import { supabase } from "@/lib/utils";

interface User {
  id: string;
  name?: string;
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
  },
  {
    id: 26,
    title: "God's Perfect Timing",
    scripture: "Ecclesiastes 3:11",
    verse: "He has made everything beautiful in its time.",
    teaching: "Waiting is one of the hardest things couples face — waiting for a new job, financial breakthrough, healing, children, or direction. Our human tendency is to rush, to grasp for control, and to grow anxious. But God's timing is not just delayed; it is deliberate. What feels like waiting is often preparation. In marriage, trusting God's timing together deepens unity. Instead of striving, couples are invited to pray together, trust together, and hold space for what God is forming in the unseen.",
    reflection: "Where are we tempted to rush ahead instead of trusting God's process? How can we encourage each other in the waiting?",
    prayer: "Father, help us rest in Your timing. When impatience rises, remind us that You are faithful and that Your plans are for our good. Grow our trust and deepen our unity as we wait. Amen."
  },
  {
    id: 27,
    title: "Speak Life",
    scripture: "Proverbs 18:21",
    verse: "The tongue has the power of life and death, and those who love it will eat its fruit.",
    teaching: "Words are like seeds — they either grow into flourishing gardens of encouragement or into weeds of bitterness. In marriage, daily words shape the atmosphere of the relationship. Criticism, sarcasm, or dismissiveness can slowly fracture intimacy, while intentional encouragement, affirmation, and gentle speech nurture security and love. Speaking life means calling out the good in one another, declaring truth over fears, and using words to heal, not harm.",
    reflection: "Are our words creating an atmosphere of safety, love, and growth? What negative speech patterns do we need to repent of and change?",
    prayer: "Lord, convict us when our words cause harm. Teach us to be slow to speak, quick to listen, and eager to encourage. Help us speak life, love, and truth over one another daily. Amen."
  },
  {
    id: 28,
    title: "Love Without Conditions",
    scripture: "1 John 4:19",
    verse: "We love because he first loved us.",
    teaching: "Conditional love says, 'I'll love you if...' or 'I'll love you when...' but the love of Christ is unconditional. In marriage, it's easy to fall into the trap of measuring love by performance: how helpful, romantic, or patient the other is. But God models covenant love — love that is steady even when feelings waver. Choosing to love unconditionally mirrors the gospel in action within marriage. This kind of love transforms both the giver and the receiver.",
    reflection: "Are there moments when I withhold love — emotionally, physically, or spiritually — based on unmet expectations? How can I reflect Christ's unconditional love today?",
    prayer: "Jesus, teach us to love as You love — freely, sacrificially, without conditions. Let our marriage be a living testimony of Your unchanging love. Amen."
  },
  {
    id: 29,
    title: "Forgiveness Frees Us",
    scripture: "Colossians 3:13",
    verse: "Bear with each other and forgive one another if any of you has a grievance... Forgive as the Lord forgave you.",
    teaching: "Even the healthiest marriages involve moments of hurt, misunderstanding, and disappointment. Unforgiveness is like carrying a heavy backpack — it weighs down joy, communication, and intimacy. When couples hold grudges, even over small things, resentment builds. But forgiveness doesn't mean forgetting or minimizing pain; it means choosing freedom over bondage. When we forgive, we align with God's grace — letting mercy flow through us to our spouse.",
    reflection: "Is there anything — big or small — I am holding against my spouse? How can we make forgiveness a daily habit, not just a crisis response?",
    prayer: "Father, thank You for the endless forgiveness You give us. Help us extend that same mercy to one another quickly, fully, and sincerely. Free us from bitterness and fill our marriage with grace. Amen."
  },
  {
    id: 30,
    title: "Sacred Simplicity",
    scripture: "Proverbs 15:16",
    verse: "Better a little with the fear of the Lord than great wealth with turmoil.",
    teaching: "Modern life constantly pressures couples to chase more — more money, more achievements, more possessions. But more doesn't equal better. Simplicity is a spiritual discipline that makes space for presence, peace, and purpose. A marriage built on shared moments, laughter, prayer, and meaningful connection — rather than the endless pursuit of things — is rich in what matters most.",
    reflection: "Are we filling our life with unnecessary busyness or material pursuits? How can we simplify our schedule, finances, or home to create more space for what matters?",
    prayer: "God, help us embrace simplicity. Strip away distractions that steal our attention from You and from each other. Let our home be filled with peace, presence, and purpose. Amen."
  },
  {
    id: 31,
    title: "Serving One Another",
    scripture: "Galatians 5:13",
    verse: "Serve one another humbly in love.",
    teaching: "Jesus washed feet — a job reserved for the lowest servant. This was a radical act of humility and love. In marriage, serving one another is a sacred rhythm — not out of obligation but out of delight. When both partners ask, 'How can I lighten your load?' rather than 'What do I get?' marriage becomes a reflection of the Kingdom — selfless, joy-filled, and deeply bonded.",
    reflection: "How can I serve my spouse today — practically, emotionally, or spiritually? Do I wait to be served, or do I lead in service?",
    prayer: "Lord Jesus, You modeled humble service. Teach us to serve one another with joyful hearts. Let our acts of love be small reflections of Your great love. Amen."
  },
  {
    id: 32,
    title: "Joy in the Journey",
    scripture: "Nehemiah 8:10",
    verse: "The joy of the Lord is your strength.",
    teaching: "Joy isn't just found in vacations, milestones, or celebrations — it's in the everyday. A shared joke while washing dishes. A quiet coffee together before the day starts. A walk hand-in-hand. Couples who learn to cultivate joy in simple things find themselves strengthened against life's pressures. God designed joy as fuel — not a luxury, but a necessity.",
    reflection: "How can we intentionally weave joy into our everyday routines? What small joys do we often overlook?",
    prayer: "Father, help us see and savor the joy in ordinary moments. Let laughter and gratitude fill our marriage. Let our joy be rooted in You. Amen."
  },
  {
    id: 33,
    title: "Faith Over Fear",
    scripture: "Deuteronomy 31:6",
    verse: "Do not be afraid... For the Lord your God goes with you; he will never leave you nor forsake you.",
    teaching: "Fear whispers lies — about the future, finances, health, or the strength of the marriage itself. But faith drowns out fear. Couples who choose faith remind each other of God's sovereignty, presence, and promises. Fear isolates, but faith draws couples together — holding hands through uncertainty, anchored in the One who never fails.",
    reflection: "What fears are we carrying today? How can we replace them with trust in God?",
    prayer: "God, You are bigger than our fears. Help us trust You together — with our future, our family, our finances, and our marriage. Anchor us in Your love. Amen."
  },
  {
    id: 34,
    title: "The Power of Touch",
    scripture: "Romans 16:16",
    verse: "Greet one another with a holy kiss.",
    teaching: "Physical affection isn't optional in marriage; it's vital. Non-sexual touch — holding hands, cuddling, a hand on the shoulder — fosters emotional security, safety, and bonding. In times of stress or conflict, a gentle touch can de-escalate tension. Couples who prioritize affectionate touch stay connected not just physically but emotionally and spiritually.",
    reflection: "Are we intentional about physical affection, or have we let busyness or stress rob us of this gift?",
    prayer: "Lord, thank You for the gift of touch. Help us to use it to comfort, connect, and express love daily. Let our affection be a reflection of Your tenderness toward us. Amen."
  },
  {
    id: 35,
    title: "Praying Together Daily",
    scripture: "Matthew 18:20",
    verse: "For where two or three gather in my name, there am I with them.",
    teaching: "Couples who pray together stay together — this isn't just a saying; it's a spiritual reality. Prayer aligns hearts with God and with each other. It softens conflict, fosters intimacy, and invites God's presence into every decision, joy, and struggle. Prayer can be simple — a whispered blessing before bed, holding hands in silence, or crying out together in need. The point is consistency, not perfection.",
    reflection: "How can we cultivate a daily rhythm of prayer — no matter how short or simple?",
    prayer: "Jesus, teach us to pray together daily. Let prayer be the heartbeat of our marriage, drawing us closer to You and to each other. Amen."
  },
  {
    id: 36,
    title: "Forgiving Like Christ",
    scripture: "Ephesians 4:32",
    verse: "Be kind and compassionate to one another, forgiving each other, just as in Christ God forgave you.",
    teaching: "Every marriage encounters moments of hurt — whether minor annoyances or deep wounds. Forgiveness isn't a one-time decision; it's an ongoing practice that mirrors Jesus' mercy toward us. Holding onto unforgiveness creates distance, bitterness, and spiritual heaviness. When we forgive, we're not excusing wrongs but choosing freedom — for ourselves and our marriage. Forgiveness invites healing and restores what the enemy tries to fracture.",
    reflection: "Is there anything between us — past hurts, unspoken offenses, or disappointments — that needs forgiving? How can we reflect Christ's forgiveness to each other today?",
    prayer: "Father, thank You for the endless grace You show us. Help us forgive as You forgive — quickly, fully, and from the heart. Heal any hidden hurts between us and draw us closer in Your love. Amen."
  },
  {
    id: 37,
    title: "Keeping the Flame Alive",
    scripture: "Song of Solomon 1:2",
    verse: "Let him kiss me with the kisses of his mouth— for your love is more delightful than wine.",
    teaching: "Romance is not a bonus; it's part of God's design for marriage. Over time, responsibilities can overshadow passion. Rekindling romance requires intentionality — pursuing one another with the same curiosity, excitement, and tenderness as when love was new. God celebrates marital affection. It honors Him when couples nurture physical and emotional intimacy.",
    reflection: "Are we intentionally pursuing romance, or has routine dulled our connection? What simple gestures could reignite our passion?",
    prayer: "Father, reignite the fire of love between us. Help us pursue one another with joy, tenderness, and excitement. Let our romance glorify You. Amen."
  },
  {
    id: 38,
    title: "Building on the Rock",
    scripture: "Matthew 7:24",
    verse: "Therefore everyone who hears these words of mine and puts them into practice is like a wise man who built his house on the rock.",
    teaching: "A marriage built on trends, emotions, or culture is unstable. But a marriage grounded in God's Word withstands storms — whether financial, relational, or spiritual. Regular time in Scripture as a couple isn't just a good habit; it's essential for long-term stability.",
    reflection: "Is our marriage truly built on God's Word, or are there areas we've neglected to surrender? How can we make Scripture central in our relationship?",
    prayer: "Jesus, help us build our marriage on You — the solid rock. Teach us to seek Your Word together and apply it daily. Strengthen us for every storm. Amen."
  },
  {
    id: 39,
    title: "Peace in the Storm",
    scripture: "John 14:27",
    verse: "Peace I leave with you; my peace I give you... Do not let your hearts be troubled and do not be afraid.",
    teaching: "Life's storms are inevitable — sickness, loss, job challenges, family tension. But peace isn't the absence of storms; it's the presence of Christ within them. Couples who fix their eyes on Jesus in turbulent seasons learn to weather the storm together, leaning on God and each other instead of retreating into fear or blame.",
    reflection: "What storm are we currently facing or fearing? How can we remind each other of God's peace?",
    prayer: "Lord Jesus, speak peace into our storm. Calm our anxious hearts and remind us that You are with us, no matter what comes. Amen."
  },
  {
    id: 40,
    title: "Marriage Mirrors Christ",
    scripture: "Ephesians 5:25",
    verse: "Husbands, love your wives, just as Christ loved the church and gave himself up for her.",
    teaching: "Marriage is not just for our happiness — it's a reflection of the gospel. Husbands are called to love sacrificially; wives are called to respond with respect and love. This mutual submission models how Christ loves His church. Marriage becomes a living parable to the world — showcasing grace, forgiveness, and covenant love.",
    reflection: "How does our marriage reflect the gospel to others? Are there ways we need to realign with Christ's example?",
    prayer: "Father, make our marriage a reflection of Your love for the church. Teach us to love, serve, and sacrifice like Jesus. Let others see You in us. Amen."
  },
  {
    id: 41,
    title: "Pursuing Purpose Together",
    scripture: "Ephesians 2:10",
    verse: "For we are God's handiwork, created in Christ Jesus to do good works.",
    teaching: "Marriage isn't just about each other — it's about what God wants to do through you as a couple. Whether raising children, serving the church, hosting others, or pursuing missions, God invites couples to pursue Kingdom purpose together. Purpose fuels connection and joy beyond mere self-fulfillment.",
    reflection: "What Kingdom purpose has God placed on our hearts? How can we step into that calling together?",
    prayer: "Lord, reveal the purpose You have for us as a couple. Let us use our marriage to serve others, glorify You, and advance Your Kingdom. Amen."
  },
  {
    id: 42,
    title: "Guarding Your Marriage",
    scripture: "Proverbs 4:23",
    verse: "Above all else, guard your heart, for everything you do flows from it.",
    teaching: "The enemy seeks to divide what God has joined. Couples must be proactive — guarding against comparison, pornography, emotional affairs, or neglect. Safeguards — like accountability, boundaries, and honest communication — protect the sacred space of marriage.",
    reflection: "Are there any open doors — attitudes, habits, or influences — that threaten our unity? How can we guard our marriage more intentionally?",
    prayer: "Lord, protect our marriage. Expose any hidden dangers and give us the wisdom and courage to guard what You have entrusted to us. Amen."
  },
  {
    id: 43,
    title: "Growth Through Trials",
    scripture: "James 1:2–3",
    verse: "Consider it pure joy... whenever you face trials of many kinds, because you know that the testing of your faith produces perseverance.",
    teaching: "Difficult seasons in marriage aren't signs of failure; they're opportunities for growth. Trials refine — burning away selfishness, sharpening communication, and deepening reliance on God. What the enemy means for harm, God transforms into strength.",
    reflection: "How have our past challenges made us stronger? Are we embracing current struggles as opportunities for growth?",
    prayer: "Father, help us see trials not as punishment but as refinement. Use every challenge to grow our faith, unity, and resilience. Amen."
  },
  {
    id: 44,
    title: "The Power of Gratitude",
    scripture: "1 Thessalonians 5:18",
    verse: "Give thanks in all circumstances; for this is God's will for you in Christ Jesus.",
    teaching: "Gratitude shifts focus from what's lacking to what's abundant. Couples who practice daily gratitude — thanking God for one another, for provision, for small blessings — cultivate joy, resilience, and intimacy. Gratitude transforms the atmosphere of the home.",
    reflection: "Are we more focused on what's missing or what we've been given? How can we practice daily gratitude together?",
    prayer: "Lord, open our eyes to the blessings around us. Let gratitude fill our hearts and home, drawing us closer to You and each other. Amen."
  },
  {
    id: 45,
    title: "Rest as Worship",
    scripture: "Matthew 11:28",
    verse: "Come to me, all you who are weary and burdened, and I will give you rest.",
    teaching: "A culture of busyness suffocates relationships. Rest isn't laziness — it's worship. Couples who prioritize rest — spiritual, emotional, and physical — create margin for connection and renewal. Sabbath rhythms remind couples that their worth isn't in productivity but in being loved by God.",
    reflection: "Are we making space for rest, or has busyness taken over? How can we build rhythms of Sabbath into our lives?",
    prayer: "Jesus, teach us to rest. Let our marriage find renewal in stillness, worship, and slowing down together in Your presence. Amen."
  },
  {
    id: 46,
    title: "Shared Spiritual Disciplines",
    scripture: "Colossians 4:2",
    verse: "Devote yourselves to prayer, being watchful and thankful.",
    teaching: "Spiritual disciplines — prayer, fasting, Scripture, Sabbath, worship — aren't just individual practices. Couples who engage in them together grow spiritually and relationally. These rhythms become anchors in both calm and chaotic seasons.",
    reflection: "What spiritual practices are we cultivating together? How can we grow in consistency?",
    prayer: "Lord, deepen our spiritual roots. Teach us to seek You not only as individuals but as one flesh, united in devotion to You. Amen."
  },
  {
    id: 47,
    title: "Confession Brings Freedom",
    scripture: "James 5:16",
    verse: "Confess your sins to each other and pray for each other so that you may be healed.",
    teaching: "Confession isn't weakness — it's strength. Vulnerability about struggles, temptations, and failures fosters trust. When couples create a safe space for honest confession, shame loses power and healing begins.",
    reflection: "Are there areas we're hiding out of fear or shame? How can we foster a safe environment for transparency?",
    prayer: "Father, help us be brave in confession — with You and with each other. Let honesty bring healing, and let Your grace fill every broken place. Amen."
  },
  {
    id: 48,
    title: "Generosity Together",
    scripture: "2 Corinthians 9:7",
    verse: "Each of you should give what you have decided in your heart to give... for God loves a cheerful giver.",
    teaching: "Generosity isn't just about money — it's about time, energy, hospitality, and compassion. Couples who practice generosity reflect God's heart and experience His provision. Giving together bonds hearts, aligns priorities, and blesses communities.",
    reflection: "Are we living generously — with our time, resources, and hearts? What's one step we can take together toward greater generosity?",
    prayer: "God, make us a generous couple. Help us give freely, joyfully, and sacrificially, trusting that You are our provider. Amen."
  },
  {
    id: 49,
    title: "Embracing Change Together",
    scripture: "Isaiah 43:19",
    verse: "See, I am doing a new thing! Now it springs up; do you not perceive it?",
    teaching: "Life is full of transitions — new jobs, moving, parenting, loss, aging. Couples who face change together with faith rather than fear grow stronger. God often uses change to bring new opportunities, deeper faith, and refined purpose.",
    reflection: "What change are we facing, and how can we embrace it with trust and unity?",
    prayer: "Lord, You are the God of new beginnings. Help us embrace change together, trusting that You are leading us into something good. Amen."
  },
  {
    id: 50,
    title: "Persevering in Love",
    scripture: "Galatians 6:9",
    verse: "Let us not become weary in doing good, for at the proper time we will reap a harvest if we do not give up.",
    teaching: "Some seasons of marriage feel like planting with no visible harvest — acts of kindness unnoticed, prayers unanswered, love unreciprocated. But God promises that faithful love always yields fruit in time. Perseverance is love's long game — steady, patient, and resilient.",
    reflection: "Where are we tempted to give up or withdraw? How can we choose perseverance in love today?",
    prayer: "Father, strengthen us to love persistently — not based on feelings but on covenant. Let us reap the harvest of faithfulness in due time. Amen."
  }
];

const prayerCategories = [
  {
    id: 1,
    name: "Connection & Unity",
    icon: "💑",
    prayers: [
      {
        id: 1,
        title: "Prayer for Unity in Our Marriage",
        content: "Heavenly Father, we come before You as one flesh, asking for Your divine unity to bind our hearts together. Help us to be of one mind and one spirit, united in love and purpose. Remove any walls of division between us and fill our marriage with Your perfect peace. Let our love for each other reflect Your love for us. In Jesus' name, Amen."
      },
      {
        id: 2,
        title: "Prayer for Strong Communication",
        content: "Lord, teach us to communicate with love, patience, and understanding. Help us to listen with our hearts, speak with kindness, and always seek to understand before being understood. Give us wisdom to know when to speak and when to be silent. Let our words build each other up and strengthen our bond. Amen."
      },
      {
        id: 3,
        title: "Prayer for Deep Emotional Intimacy",
        content: "Father, draw our hearts closer together in emotional intimacy. Help us to be vulnerable with each other, sharing our deepest thoughts, fears, and dreams. Create a safe space where we can be completely honest and accepted. Let our emotional connection grow deeper with each passing day. Amen."
      },
      {
        id: 4,
        title: "Prayer for Rekindling Romance",
        content: "Lord, reignite the flame of romance in our marriage. Help us to pursue each other with the same excitement and tenderness as when we first fell in love. Give us creative ways to show our affection and keep the spark alive. Let our love story continue to be beautiful and passionate. Amen."
      },
      {
        id: 5,
        title: "Prayer for Growing Trust and Transparency",
        content: "God, build unshakable trust between us. Help us to be completely transparent with each other, hiding nothing and sharing everything. Give us the courage to be honest about our struggles and the grace to receive each other's confessions with love. Let trust be the foundation of our relationship. Amen."
      },
      {
        id: 6,
        title: "Prayer for Physical Intimacy and Affection",
        content: "Lord, bless our physical intimacy and help us to express our love through affectionate touch. Teach us to be tender and loving with each other, honoring the gift of our bodies. Let our physical connection strengthen our emotional and spiritual bond. Amen."
      },
      {
        id: 7,
        title: "Prayer for Patience and Understanding",
        content: "Father, give us patience and understanding with each other. Help us to see things from each other's perspective and to be slow to anger. Teach us to listen with compassion and to respond with love, even when we don't understand. Amen."
      },
      {
        id: 8,
        title: "Prayer for Peace in Our Conversations",
        content: "God, bring peace to our conversations. Help us to speak with gentleness and to listen with open hearts. Let our words build each other up and create an atmosphere of love and respect in our home. Amen."
      },
      {
        id: 9,
        title: "Prayer for Respecting One Another Daily",
        content: "Lord, help us to respect each other daily in our words, actions, and attitudes. Teach us to honor each other's feelings, opinions, and needs. Let respect be the foundation of our communication and interactions. Amen."
      },
      {
        id: 10,
        title: "Prayer for Mutual Kindness and Compassion",
        content: "Father, fill our hearts with kindness and compassion for each other. Help us to be gentle with each other's weaknesses and to celebrate each other's strengths. Let our love be marked by tenderness and care. Amen."
      }
    ]
  },
  {
    id: 2,
    name: "Protection & Spiritual Warfare",
    icon: "🛡️",
    prayers: [
      {
        id: 11,
        title: "Prayer for Guarding Our Marriage from Temptation",
        content: "Heavenly Father, protect our marriage from all forms of temptation. Guard our hearts, minds, and bodies from anything that could harm our relationship. Give us strength to resist the enemy's attacks and wisdom to recognize his schemes. Let our love for each other and for You be our shield. Amen."
      },
      {
        id: 12,
        title: "Prayer for Protection Against Spiritual Attack",
        content: "Lord, we put on the full armor of God to protect our marriage from spiritual attacks. Cover us with Your blood and surround us with Your angels. Break any curses or negative influences that try to come against us. Let Your light dispel all darkness in our relationship. Amen."
      },
      {
        id: 13,
        title: "Prayer for Strength to Resist Worldly Influences",
        content: "Father, help us to resist the pressures and values of this world that could harm our marriage. Give us discernment to recognize what is from You and what is not. Let us be in the world but not of it, keeping our marriage pure and holy before You. Amen."
      },
      {
        id: 14,
        title: "Prayer for Breaking Generational Curses or Negative Patterns",
        content: "Lord, break any generational curses or negative patterns that could affect our marriage. Heal the wounds from our past and our families' past. Let us start fresh with You, creating a new legacy of love, faithfulness, and blessing for future generations. Amen."
      },
      {
        id: 15,
        title: "Prayer for Guarding Our Minds and Hearts",
        content: "God, guard our minds and hearts from impure thoughts, negative influences, and harmful media. Help us to think on whatever is true, noble, right, pure, lovely, and admirable. Let our thoughts and emotions be captive to Christ and focused on building each other up. Amen."
      },
      {
        id: 16,
        title: "Prayer for Protection Over Our Home",
        content: "Lord, protect our home from all harm and negative influences. Let Your presence fill every room and Your peace guard our hearts. Keep our home as a sanctuary of love, joy, and safety for our family. Amen."
      },
      {
        id: 17,
        title: "Prayer for Discernment Against Subtle Dangers",
        content: "Father, give us discernment to recognize subtle dangers that could harm our marriage. Help us to see through deception and to make wise choices that protect our relationship. Let Your wisdom guide our decisions. Amen."
      },
      {
        id: 18,
        title: "Prayer for Safeguarding Our Commitment",
        content: "God, help us to safeguard our commitment to each other and to You. Give us the strength to remain faithful in thought, word, and deed. Let our commitment be unshakeable and our love unwavering. Amen."
      },
      {
        id: 19,
        title: "Prayer for Staying Faithful in Heart, Mind, and Action",
        content: "Lord, help us to stay faithful to each other in our hearts, minds, and actions. Guard us from any temptation that could lead us astray. Let our faithfulness be a testimony of Your love and grace. Amen."
      },
      {
        id: 20,
        title: "Prayer for Armor of God Over Our Marriage",
        content: "Father, we put on the full armor of God over our marriage. Clothe us with truth, righteousness, peace, faith, salvation, and Your Word. Let us stand firm against any attack and be victorious in Your strength. Amen."
      }
    ]
  },
  {
    id: 3,
    name: "Healing & Restoration",
    icon: "🕊️",
    prayers: [
      {
        id: 21,
        title: "Prayer for Healing from Past Hurts",
        content: "Heavenly Father, heal the wounds from our past that could affect our marriage. Pour Your healing balm over any pain, rejection, or trauma we've experienced. Let Your love mend our broken places and make us whole. Help us to forgive those who have hurt us and move forward in freedom. Amen."
      },
      {
        id: 22,
        title: "Prayer for Forgiveness and Reconciliation",
        content: "Lord, teach us to forgive as You have forgiven us. Help us to let go of grudges, bitterness, and resentment. Give us the humility to ask for forgiveness and the grace to extend it freely. Let reconciliation be a regular rhythm in our marriage. Amen."
      },
      {
        id: 23,
        title: "Prayer for Peace After Arguments",
        content: "Father, bring peace to our hearts after disagreements. Help us to resolve conflicts quickly and lovingly. Give us the wisdom to know when to speak and when to listen. Let us never go to bed angry, but always seek reconciliation before the day ends. Amen."
      },
      {
        id: 24,
        title: "Prayer for Restoration After Betrayal or Broken Trust",
        content: "God, we pray for restoration in our marriage. If trust has been broken, help us to rebuild it step by step. Give us the courage to be honest about our mistakes and the grace to forgive. Let Your redemption power work in our relationship. Amen."
      },
      {
        id: 25,
        title: "Prayer for Overcoming Resentment",
        content: "Lord, help us to overcome any resentment we may be holding onto. Show us how to communicate our feelings without building walls. Give us the strength to let go of past offenses and focus on the present and future of our marriage. Amen."
      },
      {
        id: 26,
        title: "Prayer for Letting Go of Offenses",
        content: "Father, help us to let go of offenses and to choose forgiveness over bitterness. Teach us to release the hurt and to focus on healing and growth. Let Your grace flow through us and restore our relationship. Amen."
      },
      {
        id: 27,
        title: "Prayer for Healing Emotional Wounds",
        content: "Lord, heal the emotional wounds in our marriage. Pour Your love into the broken places and restore our hearts. Help us to be gentle with each other's pain and to support each other in healing. Amen."
      },
      {
        id: 28,
        title: "Prayer for Grace in Conflict Resolution",
        content: "God, give us grace in resolving conflicts. Help us to approach disagreements with love and humility. Teach us to listen, to understand, and to find solutions that honor both of us. Amen."
      },
      {
        id: 29,
        title: "Prayer for Rebuilding Broken Communication",
        content: "Father, help us to rebuild any broken communication in our marriage. Teach us to speak with love and to listen with understanding. Let our words heal and strengthen our bond. Amen."
      },
      {
        id: 30,
        title: "Prayer for Stress Relief and Calming Tensions",
        content: "Lord, relieve the stress in our marriage and calm any tensions between us. Help us to find peace in Your presence and to support each other during difficult times. Let Your peace rule in our hearts. Amen."
      }
    ]
  },
  {
    id: 4,
    name: "Growth & Purpose",
    icon: "🌱",
    prayers: [
      {
        id: 31,
        title: "Prayer for Spiritual Growth as a Couple",
        content: "Heavenly Father, help us to grow spiritually together. Draw us closer to You and to each other through prayer, Bible study, and worship. Let our faith be the foundation of our marriage and our relationship with You be our highest priority. Amen."
      },
      {
        id: 32,
        title: "Prayer for Discovering God's Purpose Together",
        content: "Lord, reveal Your purpose for us as a couple. Show us how You want to use our marriage to serve others and glorify You. Give us clarity about our calling and the courage to step into it together. Let our lives be a testimony of Your love and grace. Amen."
      },
      {
        id: 33,
        title: "Prayer for Wisdom in Decision-Making",
        content: "Father, give us wisdom in all our decisions. Help us to seek Your guidance together and to be united in the choices we make. Let us not lean on our own understanding but trust in You with all our hearts. Amen."
      },
      {
        id: 34,
        title: "Prayer for Building a Legacy of Faith",
        content: "God, help us to build a legacy of faith that will bless future generations. Let our marriage be a model of Your love and faithfulness. Teach us to pass on our values and beliefs to our children and others who look to us. Amen."
      },
      {
        id: 35,
        title: "Prayer for Growing in Humility and Servant-Heartedness",
        content: "Lord, teach us to serve each other with humility and love. Help us to put each other's needs before our own and to follow Your example of servant leadership. Let our marriage be marked by mutual respect and selflessness. Amen."
      },
      {
        id: 36,
        title: "Prayer for Courage to Live Boldly for Christ",
        content: "Father, give us courage to live boldly for Christ as a couple. Help us to be unashamed of our faith and to share Your love with others. Let our marriage be a light in the darkness and a testimony of Your power. Amen."
      },
      {
        id: 37,
        title: "Prayer for Developing Shared Dreams and Goals",
        content: "Lord, help us to develop shared dreams and goals that align with Your will. Give us vision for our future together and the wisdom to pursue what matters most. Let our dreams bring us closer to You and to each other. Amen."
      },
      {
        id: 38,
        title: "Prayer for Strength to Obey God's Will Together",
        content: "God, give us strength to obey Your will together, even when it's difficult. Help us to trust Your plan and to follow Your leading. Let our obedience bring blessing and honor to Your name. Amen."
      },
      {
        id: 39,
        title: "Prayer for Growing a Generous Heart as a Couple",
        content: "Father, help us to grow generous hearts as a couple. Teach us to give freely of our time, resources, and love. Let our generosity reflect Your heart and bless others. Amen."
      },
      {
        id: 40,
        title: "Prayer for Becoming a Light to Others Through Our Marriage",
        content: "Lord, make our marriage a light to others. Help us to reflect Your love and grace in everything we do. Let our relationship draw others to You and inspire them in their own marriages. Amen."
      }
    ]
  },
  {
    id: 5,
    name: "Family & Future",
    icon: "👨‍👩‍👧‍👦",
    prayers: [
      {
        id: 41,
        title: "Prayer for God's Guidance in Our Future Plans",
        content: "Heavenly Father, guide us in planning our future together. Help us to seek Your will in all our decisions about career, family, and ministry. Let our plans align with Your purposes and bring glory to Your name. Amen."
      },
      {
        id: 42,
        title: "Prayer for Wisdom and Patience in Parenting",
        content: "Lord, give us wisdom and patience as we raise our children. Help us to be united in our parenting approach and to model Your love and grace. Give us the strength to be consistent, loving, and firm when needed. Amen."
      },
      {
        id: 43,
        title: "Prayer for Financial Provision and Stewardship",
        content: "Father, provide for our financial needs and teach us to be good stewards of what You give us. Help us to manage our money wisely, to give generously, and to trust You for our provision. Let our finances be a tool for blessing others. Amen."
      },
      {
        id: 44,
        title: "Prayer for Peace in Major Life Transitions",
        content: "God, give us peace during major life transitions. Whether it's moving, changing jobs, having children, or facing other big changes, help us to support each other and trust in Your plan. Let us grow stronger through every transition. Amen."
      },
      {
        id: 45,
        title: "Prayer for Strength to Handle Work and Family Balance",
        content: "Lord, help us to balance our work and family responsibilities. Give us wisdom to prioritize what matters most and to make time for each other and our family. Let our work be a blessing to our family, not a burden. Amen."
      },
      {
        id: 46,
        title: "Prayer for Protection Over Our Children",
        content: "Father, protect our children from all harm and negative influences. Cover them with Your love and surround them with Your angels. Help us to raise them in Your ways and to be good examples of Your love. Amen."
      },
      {
        id: 47,
        title: "Prayer for Harmony with Extended Family",
        content: "Lord, bring harmony in our relationships with extended family. Help us to love and respect our in-laws and relatives while maintaining healthy boundaries. Let our family relationships be a blessing, not a burden. Amen."
      },
      {
        id: 48,
        title: "Prayer for a Healthy and Flourishing Home Environment",
        content: "God, create a healthy and flourishing environment in our home. Let it be a place of love, peace, joy, and growth. Help us to cultivate an atmosphere where our family can thrive and grow closer to You. Amen."
      },
      {
        id: 49,
        title: "Prayer for God's Blessing Over Our Dreams and Career Paths",
        content: "Father, bless our dreams and career paths. Help us to pursue work that honors You and provides for our family. Let our careers be a means of serving others and glorifying Your name. Amen."
      },
      {
        id: 50,
        title: "Prayer for Fruitfulness in Every Area of Our Life Together",
        content: "Lord, make us fruitful in every area of our life together. Bless our marriage, our family, our work, and our ministry. Let everything we do bring glory to You and blessing to others. Amen."
      }
    ]
  },
  {
    id: 6,
    name: "Gratitude & Joy",
    icon: "✨",
    prayers: [
      {
        id: 51,
        title: "Prayer of Thanksgiving for Our Marriage",
        content: "Heavenly Father, we thank You for the gift of our marriage. Thank You for bringing us together and for the love You've given us for each other. Help us to never take each other for granted and to always express our gratitude. Amen."
      },
      {
        id: 52,
        title: "Prayer for Cultivating Daily Gratitude",
        content: "Lord, help us to cultivate an attitude of gratitude in our marriage. Open our eyes to see the blessings You give us each day. Help us to express thankfulness for the big and small things in our relationship. Amen."
      },
      {
        id: 53,
        title: "Prayer for Joy in Our Daily Life Together",
        content: "Father, fill our marriage with Your joy. Help us to find delight in each other and in the life we share. Let our home be filled with laughter, love, and the joy that comes from knowing You. Amen."
      },
      {
        id: 54,
        title: "Prayer for Celebrating Milestones and Victories",
        content: "God, help us to celebrate the milestones and victories in our marriage. Whether big or small, let us acknowledge and rejoice in the good things You do in our relationship. Let our celebrations bring glory to You. Amen."
      },
      {
        id: 55,
        title: "Prayer for Contentment in Every Season",
        content: "Lord, teach us to be content in every season of our marriage. Help us to find satisfaction in what we have and where we are, while still growing and dreaming together. Let contentment be the foundation of our happiness. Amen."
      },
      {
        id: 56,
        title: "Prayer for Learning to Find Joy in Simple Things",
        content: "Father, teach us to find joy in the simple things of life. Help us to appreciate the small moments, the everyday blessings, and the quiet times together. Let our hearts be full of gratitude for Your goodness. Amen."
      },
      {
        id: 57,
        title: "Prayer for a Spirit of Playfulness and Fun in Our Marriage",
        content: "Lord, give us a spirit of playfulness and fun in our marriage. Help us to laugh together, to enjoy each other's company, and to not take ourselves too seriously. Let our relationship be marked by joy and lightheartedness. Amen."
      },
      {
        id: 58,
        title: "Prayer for Grateful Hearts During Hard Times",
        content: "God, help us to maintain grateful hearts even during difficult times. Teach us to see Your hand at work in every situation and to trust that You are working all things for our good. Let gratitude be our anchor in the storm. Amen."
      },
      {
        id: 59,
        title: "Prayer for Recognizing God's Blessings in Each Other",
        content: "Father, help us to recognize and appreciate Your blessings in each other. Open our eyes to see the good qualities and gifts You've given our spouse. Let us be thankful for the person You've made them to be. Amen."
      },
      {
        id: 60,
        title: "Prayer for Rest and Sabbath Together",
        content: "Lord, teach us to rest and observe Sabbath together. Help us to set aside time to be still, to worship, and to enjoy each other's company. Let our rest be a time of renewal and reconnection. Amen."
      }
    ]
  },
  {
    id: 7,
    name: "Strength in Trials",
    icon: "⭐",
    prayers: [
      {
        id: 61,
        title: "Prayer for Strength When One of Us Feels Weak",
        content: "Heavenly Father, when one of us feels weak, help the other to be strong. Give us the wisdom to know how to support and encourage each other. Let us be each other's strength and comfort in times of weakness. Amen."
      },
      {
        id: 62,
        title: "Prayer for Peace in Times of Anxiety",
        content: "Lord, calm our anxious hearts and minds. When worry threatens to overwhelm us, remind us of Your presence and Your promises. Help us to cast our anxieties on You and to find peace in Your love. Amen."
      },
      {
        id: 63,
        title: "Prayer for Courage During Uncertain Seasons",
        content: "Father, give us courage to face uncertain seasons together. Help us to trust in Your plan even when we can't see the way forward. Let our faith in You give us the courage to take the next step. Amen."
      },
      {
        id: 64,
        title: "Prayer for Trust in Seasons of Waiting",
        content: "God, help us to trust You during seasons of waiting. Whether we're waiting for answers, breakthroughs, or changes, help us to wait with patience and hope. Let our waiting draw us closer to You and to each other. Amen."
      },
      {
        id: 65,
        title: "Prayer for Endurance During Trials and Hardships",
        content: "Lord, give us endurance to persevere through trials and hardships. Help us to support each other and to keep our eyes fixed on You. Let our trials make us stronger and our love deeper. Amen."
      },
      {
        id: 66,
        title: "Prayer for Comfort in Times of Grief or Loss",
        content: "Father, comfort us in times of grief or loss. Help us to support each other through difficult emotions and to find hope in Your promises. Let Your peace and comfort surround us and bring healing to our hearts. Amen."
      },
      {
        id: 67,
      }
    ]
  }
];

const Index = () => {
  const [user, setUser] = useState<any>(null);
  const [currentSection, setCurrentSection] = useState('devotionals');
  const [showProfile, setShowProfile] = useState(false);
  const [currentDevotional, setCurrentDevotional] = useState(0);
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [completedDays, setCompletedDays] = useState<number[]>([]);
  const [selectedPrayerCategory, setSelectedPrayerCategory] = useState<any>(null);
  const [selectedPrayer, setSelectedPrayer] = useState<any>(null);

  const handleLogin = (email: string, password: string, name?: string) => {
    const newUser = {
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

  const handleSignUp = async () => {
    setError('');
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) setError(error.message);
    else setUser(data.user);
  };

  const handleLogIn = async () => {
    setError('');
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) setError(error.message);
    else setUser(data.user);
  };

  const handleCloseProfile = () => setShowProfile(false);

  const handlePrayerCategorySelect = (category: any) => {
    setSelectedPrayerCategory(category);
    setSelectedPrayer(null);
  };

  const handlePrayerSelect = (prayer: any) => {
    setSelectedPrayer(prayer);
  };

  const handleBackToCategories = () => {
    setSelectedPrayerCategory(null);
    setSelectedPrayer(null);
  };

  const handleBackToPrayers = () => {
    setSelectedPrayer(null);
  };

  // Supabase functions for devotional reflections
  const saveReflection = async (reflection: string, devotionalIndex: number) => {
    try {
      const { data, error } = await supabase
        .from('devotional_responses')
        .upsert({
          user_id: user?.id,
          day: currentDevotional + 1,
          devotional_index: devotionalIndex,
          reflection: reflection,
          completed: true,
          date: new Date().toISOString().split('T')[0]
        });

      if (error) {
        console.error('Error saving reflection:', error);
        toast({
          title: "Error",
          description: "Failed to save your reflection. Please try again.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Reflection saved!",
          description: "Your reflection has been saved and shared with your partner.",
        });
      }
    } catch (error) {
      console.error('Error saving reflection:', error);
    }
  };

  const fetchReflections = async (devotionalIndex: number) => {
    try {
      const today = new Date().toISOString().split('T')[0];
      
      // Fetch user's reflection
      const { data: userReflection, error: userError } = await supabase
        .from('devotional_responses')
        .select('*')
        .eq('user_id', user?.id)
        .eq('devotional_index', devotionalIndex)
        .eq('date', today)
        .single();

      // Fetch partner's reflection if user has a partner
      let partnerReflection = null;
      if (user?.partnerId) {
        const { data: partnerData, error: partnerError } = await supabase
          .from('devotional_responses')
          .select('*')
          .eq('user_id', user.partnerId)
          .eq('devotional_index', devotionalIndex)
          .eq('date', today)
          .single();
        
        if (!partnerError && partnerData) {
          partnerReflection = partnerData;
        }
      }

      return { userReflection, partnerReflection };
    } catch (error) {
      console.error('Error fetching reflections:', error);
      return { userReflection: null, partnerReflection: null };
    }
  };

  const checkBothCompleted = async (devotionalIndex: number) => {
    try {
      const today = new Date().toISOString().split('T')[0];
      
      // Check if both user and partner have completed today's devotional
      const { data: userCompleted } = await supabase
        .from('devotional_responses')
        .select('completed')
        .eq('user_id', user?.id)
        .eq('devotional_index', devotionalIndex)
        .eq('date', today)
        .single();

      const { data: partnerCompleted } = await supabase
        .from('devotional_responses')
        .select('completed')
        .eq('user_id', user?.partnerId)
        .eq('devotional_index', devotionalIndex)
        .eq('date', today)
        .single();

      return userCompleted?.completed && partnerCompleted?.completed;
    } catch (error) {
      console.error('Error checking completion:', error);
      return false;
    }
  };

  if (showProfile) {
    return (
      <UserProfile
        user={user || { id: '', name: 'Guest', email: '' }}
        onUpdateProfile={handleUpdateProfile}
        onLinkPartner={handleLinkPartner}
        onLogout={handleLogout}
        onBack={handleCloseProfile}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <MobileHeader user={user || { id: '', name: 'Guest', email: '' }} currentSection={currentSection} />
      
      <div className="p-4 max-w-md mx-auto space-y-4">
        {user?.partnerId && (
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
            {/* Prayer Categories View */}
            {!selectedPrayerCategory && !selectedPrayer && (
              <div className="space-y-4">
                <div className="text-center mb-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-2">Prayer Categories</h2>
                  <p className="text-sm text-gray-600">Choose a category to find prayers for your specific needs</p>
                </div>
                {prayerCategories.map((category) => (
                  <Card 
                    key={category.id} 
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => handlePrayerCategorySelect(category)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{category.icon}</span>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800">{category.name}</h3>
                          <p className="text-sm text-gray-600">{category.prayers.length} prayers</p>
                        </div>
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Prayers in Category View */}
            {selectedPrayerCategory && !selectedPrayer && (
              <div className="space-y-4">
                <div className="flex items-center space-x-3 mb-4">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleBackToCategories}
                    className="p-0 h-auto"
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Back to Categories
                  </Button>
                </div>
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <span className="text-2xl">{selectedPrayerCategory.icon}</span>
                    <h2 className="text-xl font-bold text-gray-800">{selectedPrayerCategory.name}</h2>
                  </div>
                  <p className="text-sm text-gray-600">Choose a prayer to read together</p>
                </div>
                {selectedPrayerCategory.prayers.map((prayer: any) => (
                  <Card 
                    key={prayer.id} 
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => handlePrayerSelect(prayer)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-gray-800">{prayer.title}</h3>
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Individual Prayer View */}
            {selectedPrayer && (
              <div className="space-y-4">
                <div className="flex items-center space-x-3 mb-4">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleBackToPrayers}
                    className="p-0 h-auto"
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Back to Prayers
                  </Button>
                </div>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{selectedPrayer.title}</CardTitle>
                    <CardDescription>{selectedPrayerCategory?.name}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-gray-700 leading-relaxed text-sm italic">
                        "{selectedPrayer.content}"
                      </p>
                    </div>
                    <div className="mt-4 text-center">
                      <Button 
                        onClick={() => {
                          // Optional: Add functionality to mark prayer as prayed
                          toast({
                            title: "Prayer prayed together",
                            description: "May God bless your time of prayer.",
                          });
                        }}
                        className="bg-gradient-to-r from-pink-500 to-purple-600"
                      >
                        Pray Together
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
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
