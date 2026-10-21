export type Category = { id: string; name: string; emoji: string; description: string; items: string[] };

export const categories: Category[] = [
  { id: "beginner", name: "Beginner", emoji: "🌱", description: "Short, simple everyday sentences.", items: [
    "Hello, my name is Alex and I like reading books.",
    "The weather is very nice today.",
    "I drink a cup of tea every morning.",
    "My favorite color is blue.",
    "We are going to the park this afternoon.",
  ]},
  { id: "intermediate", name: "Intermediate", emoji: "📘", description: "Longer sentences with richer vocabulary.", items: [
    "Learning a new language takes patience and regular practice.",
    "I usually take the train to work because it is faster than driving.",
    "Last weekend we visited a beautiful museum in the city center.",
    "Reading the news every day helps me understand the world better.",
  ]},
  { id: "advanced", name: "Advanced", emoji: "🚀", description: "Complex structures and ideas.", items: [
    "Technological innovation has fundamentally transformed the way we communicate.",
    "Despite the challenges, the team persevered and delivered an exceptional result.",
    "Sustainable development requires balancing economic growth with environmental protection.",
  ]},
  { id: "conversation", name: "Daily Conversation", emoji: "💬", description: "Phrases you use every day.", items: [
    "Could you please tell me where the nearest bus stop is?",
    "I would like to order a coffee with milk, please.",
    "How was your weekend? Did you do anything interesting?",
    "Sorry, could you repeat that a little more slowly?",
  ]},
  { id: "interview", name: "Interview Practice", emoji: "💼", description: "Answer common interview questions.", items: [
    "Tell me about yourself and your professional background.",
    "My greatest strength is my ability to solve problems under pressure.",
    "I am interested in this role because it matches my skills and goals.",
    "In five years, I see myself leading a small and successful team.",
  ]},
  { id: "public", name: "Public Speaking", emoji: "🎤", description: "Build confidence for presentations.", items: [
    "Good morning everyone, thank you for being here today.",
    "Today I want to share three ideas that changed the way I work.",
    "Let me conclude by thanking you all for your time and attention.",
  ]},
  { id: "pronunciation", name: "Pronunciation", emoji: "🔤", description: "Tongue twisters and tricky sounds.", items: [
    "She sells seashells by the seashore.",
    "Red lorry, yellow lorry, red lorry, yellow lorry.",
    "The thirty three thieves thought that they thrilled the throne.",
    "Peter Piper picked a peck of pickled peppers.",
  ]},
];

export const dailyTopics = [
  "Describe your perfect weekend in three or four sentences.",
  "Talk about a book or movie you enjoyed recently.",
  "Explain how you would introduce yourself at a new job.",
  "Describe your hometown to someone who has never visited.",
  "Talk about a skill you would like to learn and why.",
  "Describe your morning routine from start to finish.",
  "Share a memorable trip you have taken.",
  "Explain your favorite hobby to a beginner.",
  "Talk about a person who inspires you.",
  "Describe your favorite meal and how it is made.",
];

export function todayKey(d = new Date()) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function topicForDate(d = new Date()) {
  const dayIndex = Math.floor(new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime() / 86400000);
  return dailyTopics[((dayIndex % dailyTopics.length) + dailyTopics.length) % dailyTopics.length] ?? dailyTopics[0]!;
}
