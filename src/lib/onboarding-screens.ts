import type { ScreenConfig } from "./onboarding-types";

// Sub-categories per category
export const subCategories: Record<string, string[]> = {
  food: ["Bakery / Cafe", "Cloud kitchen", "Tiffin service", "Street food stall", "Catering", "Meal prep", "Coffee / Chai stall", "Sweet shop"],
  fashion: ["Boutique / Store", "Tailoring", "Jewellery making", "Saree draping", "Styling session", "Reselling", "Visual merchandising"],
  creative: ["Photography studio", "Music session", "Painting / Art", "Mehendi art", "Graphic design", "Video production", "Dance class", "Pottery / Crafts"],
  tech: ["Web development", "App building", "UI/UX design", "Social media", "SEO / Marketing", "Data work", "Content writing", "YouTube / Video editing"],
  education: ["School tuition", "Exam coaching", "Language teaching", "Skill workshop", "Career mentoring", "Kids activities", "Online course creation"],
  finance: ["GST / Tax filing", "Bookkeeping", "Financial planning", "Insurance advisory", "Legal documentation", "Company setup"],
  fitness: ["Yoga session", "Personal training", "Nutrition plan", "Zumba / Dance fitness", "Meditation", "Sports coaching"],
  local: ["Event planning", "Interior styling", "Home organising", "Pet care", "Gardening", "Photography (events)", "Astrology / Vastu"],
};

// ─── EXPERIENCER PATH: "I want to experience" ───
// These people want to TRY working in something new. They WORK and GET PAID.
export const experiencerScreens: ScreenConfig[] = [
  {
    id: "s1",
    type: "question-multi",
    path: "seeker",
    dataKey: "sidekaam_categories",
    title: "What would you love to try?",
    subtitle: "Pick what excites you — you'll get to work there and earn.",
    options: [
      { id: "food", icon: "flame", label: "Food & Culinary" },
      { id: "fashion", icon: "shopping-bag", label: "Fashion & Styling" },
      { id: "creative", icon: "palette", label: "Creative & Arts" },
      { id: "tech", icon: "monitor", label: "Tech & Digital" },
      { id: "education", icon: "book-open", label: "Teaching & Coaching" },
      { id: "finance", icon: "landmark", label: "Finance & Consulting" },
      { id: "fitness", icon: "dumbbell", label: "Fitness & Wellness" },
      { id: "local", icon: "home", label: "Lifestyle & Local" },
    ],
  },
  {
    id: "s2",
    type: "question-chips",
    path: "seeker",
    dataKey: "sidekaam_subcategories",
    title: "Anything specific?",
    subtitle: "The more specific, the better experiences we'll find for you.",
  },
  {
    id: "s2b",
    type: "motivation",
    path: "seeker",
    motivationProps: {
      icon: "flame",
      color: "text-sk-amber",
      bg: "bg-sk-amber/10",
      headline: "Great taste!",
      message: "Thousands of professionals just like you are already experiencing something new on weekends. You're in the right place.",
    },
  },
  {
    id: "s3",
    type: "question-single",
    path: "seeker",
    dataKey: "hourly_rate_band",
    title: "What's the minimum you'd accept per hour?",
    subtitle: "You'll work, learn, and earn. What feels fair?",
    options: [
      { id: "2000+", icon: "trending-up", label: "₹2,000+ / hour" },
      { id: "1000-2000", icon: "wallet", label: "₹1,000 - ₹2,000 / hour" },
      { id: "500-1000", icon: "banknote", label: "₹500 - ₹1,000 / hour" },
      { id: "300-500", icon: "coins", label: "₹300 - ₹500 / hour" },
      { id: "lt300", icon: "heart", label: "Any amount — the experience matters more" },
    ],
  },
  {
    id: "s4",
    type: "question-single",
    path: "seeker",
    dataKey: "sidekaam_hours_band",
    title: "How much time can you give?",
    subtitle: "Around your regular schedule — no commitment needed.",
    options: [
      { id: "2-4", icon: "hourglass", label: "2-4 hours/week", sublabel: "Quick weekend try" },
      { id: "4-8", icon: "clock-3", label: "4-8 hours/week", sublabel: "Evenings + weekends" },
      { id: "8-15", icon: "clock-8", label: "8-15 hours/week", sublabel: "Proper deep dive" },
      { id: "15+", icon: "calendar", label: "15+ hours/week", sublabel: "Full immersion" },
    ],
  },
  {
    id: "s4b",
    type: "motivation",
    path: "seeker",
    motivationProps: {
      icon: "coffee",
      color: "text-sk-teal",
      bg: "bg-sk-teal/10",
      headline: "Almost there!",
      message: "Just a couple more questions and we'll start finding experiences that match your schedule, city, and interests perfectly.",
    },
  },
  {
    id: "s5",
    type: "question-multi",
    path: "seeker",
    dataKey: "schedule_slots",
    title: "When are you usually free?",
    options: [
      { id: "morning", icon: "clock", label: "Early mornings" },
      { id: "evening", icon: "moon", label: "Evenings" },
      { id: "weekends", icon: "calendar", label: "Weekends" },
      { id: "flexible", icon: "refresh-cw", label: "Flexible — anytime" },
    ],
  },
  {
    id: "s6",
    type: "question-search",
    path: "seeker",
    dataKey: "city",
    title: "Which city?",
    subtitle: "We'll find experiences near you — or remote ones.",
  },
  {
    id: "s7",
    type: "question-single",
    path: "seeker",
    dataKey: "sidekaam_work_mode",
    title: "In-person, online, or both?",
    subtitle: "Some experiences need you to be there. Others don't.",
    options: [
      { id: "online", icon: "home", label: "Online / from home" },
      { id: "local", icon: "map-pin", label: "In-person — I want the real thing" },
      { id: "both", icon: "globe", label: "Both work for me" },
    ],
  },
  {
    id: "s8",
    type: "motivation",
    path: "seeker",
    motivationProps: {
      icon: "rocket",
      color: "text-sk-emerald",
      bg: "bg-sk-emerald/10",
      headline: "You're all set!",
      message: "Your first experience is just around the corner. Let's see what's waiting for you.",
    },
  },
];

// ─── PROVIDER PATH: "I want to provide an experience" ───
// These people have work/opportunity to offer. They PAY someone to come experience it.
export const providerScreens: ScreenConfig[] = [
  {
    id: "f1",
    type: "question-multi",
    path: "finder",
    dataKey: "need_categories",
    title: "What experience do you offer?",
    subtitle: "Pick your area — someone out there wants to try it.",
    options: [
      { id: "food", icon: "flame", label: "Food & Culinary" },
      { id: "fashion", icon: "shopping-bag", label: "Fashion & Styling" },
      { id: "creative", icon: "palette", label: "Creative & Arts" },
      { id: "tech", icon: "monitor", label: "Tech & Digital" },
      { id: "education", icon: "book-open", label: "Teaching & Coaching" },
      { id: "finance", icon: "landmark", label: "Finance & Consulting" },
      { id: "fitness", icon: "dumbbell", label: "Fitness & Wellness" },
      { id: "local", icon: "home", label: "Lifestyle & Local" },
    ],
  },
  {
    id: "f1b",
    type: "motivation",
    path: "finder",
    motivationProps: {
      icon: "star",
      color: "text-sk-indigo",
      bg: "bg-sk-indigo/10",
      headline: "Smart move!",
      message: "Enthusiastic people who genuinely want to learn your craft are the best kind of help. Let's find them for you.",
    },
  },
  {
    id: "f2",
    type: "question-single",
    path: "finder",
    dataKey: "budget_band",
    title: "What would you pay per hour?",
    subtitle: "Someone will come work, learn, and contribute. What's fair?",
    options: [
      { id: "lt500", icon: "coins", label: "Under ₹500/hour" },
      { id: "500-1000", icon: "banknote", label: "₹500 - ₹1,000/hour" },
      { id: "1000-2000", icon: "wallet", label: "₹1,000 - ₹2,000/hour" },
      { id: "2000+", icon: "trending-up", label: "₹2,000+/hour — attracting top talent" },
      { id: "flexible", icon: "heart", label: "Depends on the person" },
    ],
  },
  {
    id: "f3",
    type: "question-single",
    path: "finder",
    dataKey: "need_when",
    title: "When do you need someone?",
    options: [
      { id: "asap", icon: "zap", label: "This week" },
      { id: "soon", icon: "calendar", label: "In the next 2 weeks" },
      { id: "planning", icon: "clock", label: "Just setting things up" },
      { id: "recurring", icon: "refresh-cw", label: "Ongoing — regular basis" },
    ],
  },
  {
    id: "f4",
    type: "question-search",
    path: "finder",
    dataKey: "need_where",
    title: "Where's the experience?",
    subtitle: "Your city — we'll find the right people nearby.",
  },
  {
    id: "f5",
    type: "motivation",
    path: "finder",
    motivationProps: {
      icon: "party-popper",
      color: "text-sk-emerald",
      bg: "bg-sk-emerald/10",
      headline: "Let's find your people!",
      message: "Motivated professionals who are excited to work with you — not just looking for a paycheque. That's the SideKaam difference.",
    },
  },
];

// ─── SHARED SCREENS ───
export const sharedScreens: ScreenConfig[] = [
  { id: "x1", type: "loading", path: "shared", title: "Finding the perfect connections..." },
  { id: "x2", type: "reveal", path: "shared", title: "{count} experiences waiting for you!" },
  { id: "x3", type: "email-capture", path: "shared", dataKey: "email", title: "Let's verify you", subtitle: "Enter your email — we'll send a quick verification code." },
  { id: "x4", type: "paywall", path: "shared", dataKey: "selected_plan", title: "Prove that you're serious." },
];

// Build the full flow based on user_type
export function getScreenFlow(userType: string): ScreenConfig[] {
  const pathSelector: ScreenConfig = {
    id: "0",
    type: "path-selector",
    path: "shared",
    title: "Kaam nahi, Side Kaam.",
  };

  // "seeker" = experiencer (wants to try, gets paid)
  // "finder" = provider (has work, pays someone)
  if (userType === "seeker") return [pathSelector, ...experiencerScreens, ...sharedScreens];
  if (userType === "finder") return [pathSelector, ...providerScreens, ...sharedScreens];
  return [pathSelector];
}
