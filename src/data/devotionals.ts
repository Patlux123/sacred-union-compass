export interface Devotional {
  id: number;
  title: string;
  scripture: string;
  verse: string;
  teaching: string;
  reflection: string;
  prayer: string;
}

export const devotionals: Devotional[] = [
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
  }
];
