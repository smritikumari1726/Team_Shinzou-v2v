import { useState } from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Users,
  Star,
  Calendar,
  Clock,
  Heart,
  MessageCircle,
  Send,
  Award,
  TrendingUp,
  Sparkles,
  ChevronRight,
  BookOpen,
  Video,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const stats = [
  { label: 'Mentors', value: '500+', icon: Users },
  { label: 'Sessions', value: '2000+', icon: Video },
  { label: 'Rating', value: '4.8', icon: Star },
];

interface Mentor {
  initials: string;
  name: string;
  title: string;
  company: string;
  expertise: string[];
  years: number;
  rating: number;
  gradient: string;
  available: boolean;
}

const mentors: Mentor[] = [
  {
    initials: 'PS',
    name: 'Priya Sharma',
    title: 'VP of Engineering',
    company: 'Razorpay',
    expertise: ['Fintech', 'Leadership', 'System Design'],
    years: 15,
    rating: 4.9,
    gradient: 'from-violet-500 to-fuchsia-500',
    available: true,
  },
  {
    initials: 'AM',
    name: 'Anita Mehta',
    title: 'Chief Marketing Officer',
    company: 'Nykaa',
    expertise: ['Marketing', 'Brand Strategy', 'D2C'],
    years: 18,
    rating: 5.0,
    gradient: 'from-pink-500 to-rose-500',
    available: true,
  },
  {
    initials: 'DK',
    name: 'Deepa Kapoor',
    title: 'Director, Operations',
    company: 'Flipkart',
    expertise: ['Supply Chain', 'Logistics', 'Ops'],
    years: 12,
    rating: 4.8,
    gradient: 'from-amber-400 to-orange-500',
    available: true,
  },
  {
    initials: 'RN',
    name: 'Radhika Nair',
    title: 'Head of AI/ML',
    company: 'Google India',
    expertise: ['AI/ML', 'Deep Learning', 'Research'],
    years: 20,
    rating: 5.0,
    gradient: 'from-cyan-500 to-blue-500',
    available: true,
  },
  {
    initials: 'SP',
    name: 'Sunita Patel',
    title: 'Founder & CEO',
    company: 'StyleCracker',
    expertise: ['Fashion Tech', 'Startups', 'Fundraising'],
    years: 10,
    rating: 4.7,
    gradient: 'from-emerald-400 to-teal-500',
    available: true,
  },
  {
    initials: 'KR',
    name: 'Kavita Reddy',
    title: 'Product Lead',
    company: 'BYJU\'S',
    expertise: ['EdTech', 'Product Mgmt', 'Growth'],
    years: 8,
    rating: 4.5,
    gradient: 'from-indigo-500 to-purple-600',
    available: true,
  },
];

interface Session {
  date: string;
  time: string;
  mentor: string;
  topic: string;
  type: string;
}

const upcomingSessions: Session[] = [
  {
    date: 'Jul 12, 2026',
    time: '10:00 AM IST',
    mentor: 'Priya Sharma',
    topic: 'Breaking into Engineering Leadership',
    type: '1-on-1 Video',
  },
  {
    date: 'Jul 14, 2026',
    time: '3:30 PM IST',
    mentor: 'Radhika Nair',
    topic: 'Transitioning to AI/ML Careers',
    type: 'Group Workshop',
  },
  {
    date: 'Jul 17, 2026',
    time: '11:00 AM IST',
    mentor: 'Anita Mehta',
    topic: 'Building a Personal Brand in Marketing',
    type: '1-on-1 Video',
  },
];

interface FeedPost {
  author: string;
  avatar: string;
  gradient: string;
  content: string;
  likes: number;
  comments: number;
  time: string;
}

const communityFeed: FeedPost[] = [
  {
    author: 'Meera Joshi',
    avatar: 'MJ',
    gradient: 'from-violet-500 to-purple-600',
    content:
      'Just finished an incredible session with Priya on scaling engineering teams. The frameworks she shared for delegation are game-changing! 🚀',
    likes: 42,
    comments: 8,
    time: '2h ago',
  },
  {
    author: 'Fatima Khan',
    avatar: 'FK',
    gradient: 'from-pink-500 to-rose-500',
    content:
      'Looking for advice on negotiating a promotion. Has anyone used the strategies from Anita\'s workshop on salary benchmarking?',
    likes: 28,
    comments: 15,
    time: '4h ago',
  },
  {
    author: 'Lakshmi Iyer',
    avatar: 'LI',
    gradient: 'from-amber-400 to-orange-500',
    content:
      'Thrilled to share that I landed my dream role as a Product Manager after 3 months of mentorship here. This community is everything! 💜',
    likes: 134,
    comments: 31,
    time: '6h ago',
  },
  {
    author: 'Neha Gupta',
    avatar: 'NG',
    gradient: 'from-cyan-500 to-blue-500',
    content:
      'Starting a study group for the upcoming AI/ML workshop with Radhika. DM me if you want to join — all levels welcome!',
    likes: 56,
    comments: 12,
    time: '8h ago',
  },
];

/* ------------------------------------------------------------------ */
/*  Animations                                                         */
/* ------------------------------------------------------------------ */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 260, damping: 20 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function MentorshipHub() {
  const navigate = useNavigate();
  const [discussion, setDiscussion] = useState('');
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());

  const toggleLike = (idx: number) => {
    setLikedPosts((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/40">
      {/* ---- Decorative blobs ---- */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
        <div className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-purple-200/30 blur-3xl" />
        <div className="absolute top-1/3 -left-60 h-[500px] w-[500px] rounded-full bg-pink-200/20 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-violet-200/20 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* ============================================================= */}
        {/*  HEADER                                                        */}
        {/* ============================================================= */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mb-14 text-center"
        >
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-purple-600 shadow-lg shadow-purple-300/40">
            <Users className="h-8 w-8 text-white" />
          </div>

          <h1 className="font-display text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Mentorship&nbsp;
            <span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
              Hub
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl font-sans text-lg text-slate-500">
            Connect with trailblazing women leaders who have walked the path
            before you. Get personalised guidance, accelerate your career, and
            pay it forward.
          </p>

          {/* Stats */}
          <div className="mx-auto mt-10 flex max-w-xl flex-wrap items-center justify-center gap-6">
            {stats.map((s) => (
              <motion.div
                key={s.label}
                whileHover={{ scale: 1.06 }}
                className="flex items-center gap-3 rounded-2xl border border-white/60 bg-white/80 px-6 py-3 shadow-md backdrop-blur-xl"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-purple-600 text-white shadow-sm">
                  <s.icon className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <p className="font-display text-xl font-bold text-slate-900">
                    {s.value}
                  </p>
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                    {s.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ============================================================= */}
        {/*  MENTOR GRID                                                   */}
        {/* ============================================================= */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={containerVariants}
          className="mb-20"
        >
          <div className="mb-8 flex items-center gap-3">
            <Award className="h-6 w-6 text-violet-600" />
            <h2 className="font-display text-2xl font-bold text-slate-900">
              Featured Mentors
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {mentors.map((m) => (
              <motion.div
                key={m.name}
                variants={cardVariants}
                whileHover={{ y: -6, scale: 1.02 }}
                className="group relative overflow-hidden rounded-2xl border border-white/60 bg-white/80 p-6 shadow-lg backdrop-blur-xl transition-shadow hover:shadow-xl"
              >
                {/* Availability dot */}
                <span className="absolute right-4 top-4 flex items-center gap-1.5 text-xs font-medium text-emerald-600">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  </span>
                  Available
                </span>

                {/* Avatar */}
                <div
                  className={`mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br ${m.gradient} text-2xl font-bold text-white shadow-lg`}
                >
                  {m.initials}
                </div>

                {/* Info */}
                <h3 className="font-display text-center text-lg font-bold text-slate-900">
                  {m.name}
                </h3>
                <p className="text-center text-sm text-slate-500">
                  {m.title}
                </p>
                <p className="mb-3 text-center text-xs font-semibold uppercase tracking-wider text-violet-500">
                  {m.company}
                </p>

                {/* Expertise tags */}
                <div className="mb-4 flex flex-wrap justify-center gap-2">
                  {m.expertise.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Meta row */}
                <div className="mb-5 flex items-center justify-center gap-4 text-sm text-slate-500">
                  <span className="flex items-center gap-1">
                    <TrendingUp className="h-4 w-4 text-violet-500" />
                    {m.years} yrs
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    {m.rating.toFixed(1)}
                  </span>
                </div>

                {/* CTA */}
                <button
                  onClick={() => navigate(`/mentorship/book/${m.initials.toLowerCase()}`)}
                  className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500 py-2.5 text-sm font-semibold text-white shadow-md shadow-purple-300/30 transition-all hover:shadow-lg hover:shadow-purple-400/40 active:scale-[0.98]"
                >
                  Book Session
                </button>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ============================================================= */}
        {/*  UPCOMING SESSIONS                                             */}
        {/* ============================================================= */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={containerVariants}
          className="mb-20"
        >
          <div className="mb-8 flex items-center gap-3">
            <Calendar className="h-6 w-6 text-violet-600" />
            <h2 className="font-display text-2xl font-bold text-slate-900">
              Upcoming Sessions
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {upcomingSessions.map((s, i) => (
              <motion.div
                key={i}
                variants={cardVariants}
                whileHover={{ y: -4 }}
                className="relative overflow-hidden rounded-2xl border border-white/60 bg-white/80 p-6 shadow-md backdrop-blur-xl"
              >
                {/* Accent bar */}
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-violet-600 to-fuchsia-500" />

                <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700">
                  <Video className="h-3.5 w-3.5" />
                  {s.type}
                </span>

                <h3 className="font-display text-base font-bold text-slate-900">
                  {s.topic}
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  with&nbsp;
                  <span className="font-semibold text-violet-600">
                    {s.mentor}
                  </span>
                </p>

                <div className="mt-4 flex items-center gap-4 text-sm text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4 text-violet-500" />
                    {s.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-violet-500" />
                    {s.time}
                  </span>
                </div>

                <button className="mt-5 flex items-center gap-1 text-sm font-semibold text-violet-600 transition-colors hover:text-fuchsia-600">
                  Join Session <ChevronRight className="h-4 w-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ============================================================= */}
        {/*  COMMUNITY FEED                                                */}
        {/* ============================================================= */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
          className="mb-20"
        >
          <div className="mb-8 flex items-center gap-3">
            <Sparkles className="h-6 w-6 text-violet-600" />
            <h2 className="font-display text-2xl font-bold text-slate-900">
              Community Feed
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {communityFeed.map((post, i) => (
              <motion.div
                key={i}
                variants={cardVariants}
                className="rounded-2xl border border-white/60 bg-white/80 p-5 shadow-md backdrop-blur-xl"
              >
                {/* Author */}
                <div className="mb-3 flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${post.gradient} text-sm font-bold text-white shadow`}
                  >
                    {post.avatar}
                  </div>
                  <div>
                    <p className="font-display text-sm font-bold text-slate-900">
                      {post.author}
                    </p>
                    <p className="text-xs text-slate-400">{post.time}</p>
                  </div>
                </div>

                {/* Content */}
                <p className="mb-4 font-sans text-sm leading-relaxed text-slate-600">
                  {post.content}
                </p>

                {/* Actions */}
                <div className="flex items-center gap-5 text-sm text-slate-400">
                  <button
                    onClick={() => toggleLike(i)}
                    className={`flex items-center gap-1.5 transition-colors ${
                      likedPosts.has(i)
                        ? 'text-rose-500'
                        : 'hover:text-rose-500'
                    }`}
                  >
                    <Heart
                      className={`h-4 w-4 ${
                        likedPosts.has(i) ? 'fill-rose-500' : ''
                      }`}
                    />
                    {post.likes + (likedPosts.has(i) ? 1 : 0)}
                  </button>
                  <button className="flex items-center gap-1.5 transition-colors hover:text-violet-500">
                    <MessageCircle className="h-4 w-4" />
                    {post.comments}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ============================================================= */}
        {/*  START A DISCUSSION                                            */}
        {/* ============================================================= */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mb-12"
        >
          <div className="mb-6 flex items-center gap-3">
            <BookOpen className="h-6 w-6 text-violet-600" />
            <h2 className="font-display text-2xl font-bold text-slate-900">
              Start a Discussion
            </h2>
          </div>

          <div className="rounded-2xl border border-white/60 bg-white/80 p-6 shadow-md backdrop-blur-xl">
            <textarea
              value={discussion}
              onChange={(e) => setDiscussion(e.target.value)}
              placeholder="Share your thoughts, ask a question, or celebrate a win…"
              rows={4}
              className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-3 font-sans text-sm text-slate-700 placeholder:text-slate-400 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-200 transition"
            />
            <div className="mt-4 flex justify-end">
              <button
                disabled={!discussion.trim()}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-purple-300/30 transition-all hover:shadow-lg hover:shadow-purple-400/40 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-4 w-4" />
                Post
              </button>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
