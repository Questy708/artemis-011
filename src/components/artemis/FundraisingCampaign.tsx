'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import SubPageFooter from '@/components/artemis/SubPageFooter';
import OnThisPageNav, { useActiveSection } from '@/components/artemis/OnThisPageNav';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, Shield, Zap, Star, Crown, Building2,
  Home, FlaskConical, GraduationCap, BookOpen, Compass, Mail, Hash,
  Users, Globe, MapPin, Video, Trophy,
  ChevronDown, Check, Lock, Bitcoin, Wallet, CreditCard,
  Banknote, Repeat, Rocket, Landmark, Flame,
  Sparkles, CircleDot, Gem, Orbit, Heart, ChevronRight,
  Briefcase, FileText, Gift, HandCoins, Building, LandmarkPlot, Phone
} from 'lucide-react';

interface Props {
  goToPage: (page: string) => void;
}

/* ─── Data ─── */
const CAMPAIGN = { goal: 100_000_000, raised: 2_100_000, donors: 342, currency: 'USD' };
const fmtNum = (n: number) => n.toLocaleString('en-US');
const fmtShort = (n: number) => n >= 1_000_000 ? `${(n/1_000_000).toFixed(n%1_000_000===0?0:1)}M` : n >= 1_000 ? `${(n/1_000).toFixed(0)}K` : fmtNum(n);
const sym = '$';
const pct = Math.round((CAMPAIGN.raised / CAMPAIGN.goal) * 100);

const MILESTONES = [
  { title: 'Digital Foundation', target: 5_000_000, reached: true, desc: 'Core platform and global access layer deployed. The digital backbone of a borderless university \u2014 live and operational. The Artemis Collegium Network connects our first scholars across three continents.', icon: Rocket, date: 'Completed Dec 2025', deliverables: ['Core platform live with ACN operational', 'Digital admissions and enrolment system deployed', 'First virtual residencies and seminars running'] },
  { title: 'First Residential Hub', target: 15_000_000, reached: false, desc: 'Geneva \u2014 our first physical node with residential colleges, faculty offices, seminar rooms, and a dedicated research wing. A living proof-of-concept for the Artemis model of borderless education.', icon: Globe, date: 'Target 2027', deliverables: ['Geneva hub operational with full services', 'Founding faculty of 25 scholars in residence', 'First residential cohort of 120 students enrolled'] },
  { title: 'Inaugural Cohort', target: 30_000_000, reached: false, desc: 'Full scholarship fund for 500 students across multiple nodes with dedicated faculty, mentorship networks, and cross-node residency programmes ensuring access regardless of background.', icon: GraduationCap, date: 'Target 2028', deliverables: ['500 full scholarships funded', 'Mentorship network connecting students across nodes', 'Cross-node residency programme for inaugural class'] },
  { title: 'Research Endowment', target: 55_000_000, reached: false, desc: 'Perpetual endowment for ten flagship institutes with a 20-year runway \u2014 freeing researchers from the grant cycle permanently and ensuring intellectual independence across every discipline.', icon: FlaskConical, date: 'Target 2031', deliverables: ['Ten flagship research institutes permanently endowed', '20-year operational runway secured for each', 'Centres of Inquiry fully staffed and publishing'] },
  { title: 'Ten-Node Network', target: 75_000_000, reached: false, desc: 'Ten nodes operational across six continents with the infrastructure and endowment to scale to 50+ nodes \u2014 a planetary university with borderless access, self-sustaining and permanently independent.', icon: Landmark, date: 'Target 2033', deliverables: ['Ten nodes operational across six continents', 'Self-sustaining endowment \u2014 no tuition dependency', 'Foundation laid for 50+ node global network'] },
  { title: 'Global Scale', target: 100_000_000, reached: false, desc: 'Complete the founding campaign with a fully endowed global university \u2014 2,000 students, 200 faculty, and a perpetual endowment that ensures Artemis endures for centuries as an independent institution.', icon: Landmark, date: 'Target 2036', deliverables: ['Full founding campaign completed', 'Perpetual endowment securing centuries of independence', 'Artemis established as a permanent global institution'] },
];

const CONSTELLATIONS = [
  { id: 'c1', title: 'The Cipher', desc: 'A cryptographic token permanently recording your contribution on the Artemis ledger. Your name, encrypted, becomes part of the university\'s foundation \u2014 visible forever on the public chain. Every donor at this level receives a unique hash that proves they were among the first to believe.', min: 25, icon: Hash, color: '#8A0000', magnitude: 1 },
  { id: 'c2', title: 'The Dispatch', desc: 'Quarterly intelligence brief from the Chancellor \u2014 exclusive essays, research previews, and strategic updates from inside the founding. Not a newsletter. A window into the build. Each dispatch includes unreleased data from our research nodes and early access to Artemis publications.', min: 100, icon: Mail, color: '#8A0000', magnitude: 2 },
  { id: 'c3', title: 'The Passage', desc: 'Priority invitation to visit any Artemis node worldwide during the founding year. Walk the spaces, meet the community, witness the construction of something unprecedented. Includes guided access to restricted research areas and private sessions with resident faculty.', min: 500, icon: Compass, color: '#8A0000', magnitude: 3 },
  { id: 'c4', title: 'The Codex', desc: 'A limited-edition leather-bound volume documenting the founding of Artemis \u2014 your name inscribed in the founding roll. Printed on archival paper. Meant to last centuries. Only 200 copies will ever be produced, each numbered and signed by the founding Chancellor.', min: 1000, icon: BookOpen, color: '#8A0000', magnitude: 4 },
  { id: 'c5', title: 'The Patron', desc: 'Fully fund a named micro-scholarship for one student. You choose the focus \u2014 AI ethics, marine biology, civic design. They carry your name through their Artemis journey. You receive annual impact reports from your scholar and are invited to their thesis defence.', min: 2500, icon: GraduationCap, color: '#8A0000', magnitude: 5 },
  { id: 'c6', title: 'The Dedication', desc: 'Name a research lab within a node. A permanent plaque, a dedication ceremony, annual reports from the researchers. Your name becomes synonymous with discovery. The lab operates under your chosen name for the lifetime of the institution.', min: 10000, icon: FlaskConical, color: '#8A0000', magnitude: 6 },
  { id: 'c7', title: 'The Commons', desc: 'Name one of the Living Commons. Your name becomes part of daily life at Artemis \u2014 spoken by every resident, written on every map, etched into the identity of a community. Includes a dedication ceremony attended by the inaugural cohort and the Chancellor.', min: 50000, icon: Home, color: '#8A0000', magnitude: 7 },
  { id: 'c8', title: 'The Apex', desc: 'Become the patron of an entire Artemis node. The building bears your name. The community carries your legacy. A seat on the Founders\' Council. The highest honour in the founding of a university that will endure for centuries.', min: 500000, icon: Building2, color: '#8A0000', magnitude: 8 },
];

const FOUNDING_OPPORTUNITIES = [
  { title: 'Micro-Scholarship for One Student', amount: 15000, desc: 'Fully fund a graduate student\'s tuition and living expenses for one year at any Artemis node. You choose the focus area \u2014 from synthetic intelligence to cosmological humanities. Your scholar carries your name and provides annual impact reports.', icon: GraduationCap, type: 'Scholarship' },
  { title: 'Undergraduate Scholarship (Four Years)', amount: 60000, desc: 'Support a student through their entire Artemis journey \u2014 from matriculation to commencement. A named four-year scholarship that transforms one person\'s life and creates a ripple effect across the global network.', icon: BookOpen, type: 'Scholarship' },
  { title: 'Artemis Dispatch Fellowship', amount: 100000, desc: 'Underwrite fellows per year in the Dispatch programme \u2014 the university\'s signature public intellectual initiative. Fellows produce research, writing, and public engagement that reaches millions.', icon: Compass, type: 'Fellowship' },
  { title: 'Junior Research Fellowship', amount: 500000, desc: 'Endow a named Junior Fellowship supporting early-career researchers annually. Fellows receive full funding, dedicated workspace at a node, and mentorship from senior Artemis faculty \u2014 launching the next generation of independent scholars.', icon: Star, type: 'Fellowship' },
  { title: 'Senior Fellowship & Faculty Chair', amount: 2000000, desc: 'Permanently endow a named senior faculty chair \u2014 securing world-class teaching and research at Artemis in perpetuity. The chair holder operates independently of the grant cycle, free to pursue the most ambitious and long-term research.', icon: Crown, type: 'Endowment' },
  { title: 'Research Lab or Seminar Room', amount: 5000000, desc: 'Name a research laboratory or seminar room within an Artemis node. A permanent dedication in a space where breakthroughs happen \u2014 from computational labs to humanities seminar rooms to maker spaces.', icon: FlaskConical, type: 'Naming' },
  { title: 'Residential College Living Commons', amount: 10000000, desc: 'Name a Living Commons within a residential college \u2014 the heart of daily life at Artemis. Your name becomes part of the community\'s identity, spoken by every resident, written on every map, for the lifetime of the institution.', icon: Home, type: 'Naming' },
  { title: 'Centre of Inquiry', amount: 15000000, desc: 'Name one of the flagship Centres of Inquiry \u2014 a permanently endowed, independently operating research centre. Each centre carries a 20-year runway and the freedom to pursue truth without institutional pressure.', icon: FlaskConical, type: 'Naming' },
  { title: 'Academic or Residential Building', amount: 5000000, range: '$5M \u2013 $15M', desc: 'Name a landmark academic or residential building at any Artemis node. From lecture halls to libraries, from laboratories to living commons \u2014 these are the physical spaces where the future of knowledge takes shape.', icon: Landmark, type: 'Naming' },
];

const WAYS_TO_GIVE = [
  { title: 'Online', desc: 'Make a one-time or recurring gift by card, PayPal, or cryptocurrency directly on this page. Fast, secure, and immediate confirmation of your contribution.', icon: CreditCard },
  { title: 'Bank or Wire Transfer', desc: 'Transfer directly from your bank. Suitable for large contributions and international donors. See the donation form for our account details, or contact our advancement team for assistance with international transfers.', icon: Banknote },
  { title: 'Cryptocurrency', desc: 'Donate Bitcoin (BTC) or Ethereum (ETH) directly to Artemis. Crypto donations are recorded on the public chain, making your contribution a permanent part of the university\'s founding record. Contact crypto@artemis.edu with your transaction hash.', icon: Bitcoin },
  { title: 'Securities and Stock', desc: 'Donate appreciated stocks, bonds, or mutual funds to avoid capital gains tax while maximising your impact. Our advancement team will facilitate the transfer and provide all necessary documentation for your records.', icon: Briefcase },
  { title: 'Planned Giving', desc: 'Include Artemis in your estate plan through a will, trust, or beneficiary designation. Planned gifts create a permanent legacy and may provide significant tax benefits. We work with your advisors to structure a gift that aligns with your financial goals.', icon: FileText },
  { title: 'Employer Matching', desc: 'Many employers match charitable contributions dollar-for-dollar. Check with your HR department to see if your company participates \u2014 your gift to Artemis could be doubled at no additional cost to you.', icon: HandCoins },
  { title: 'Donor-Advised Funds', desc: 'Recommend a grant from your donor-advised fund (DAF) to the University of Artemis. DAF gifts are a tax-efficient way to support the founding while maintaining flexibility in your giving strategy.', icon: Gift },
  { title: 'In-Kind Contributions', desc: 'Donate equipment, technology, library materials, real estate, or professional services. In-kind gifts that support the academic mission are valued and recognised in the same way as financial contributions.', icon: Heart },
];

const FINANCIAL_GOALS = [
  { category: 'Student Access & Scholarships', amount: 30000000, pct: 30, desc: 'Full scholarships, travel grants, and living stipends ensuring that admission to Artemis is never determined by a student\'s ability to pay.' },
  { category: 'Research Endowment', amount: 25000000, pct: 25, desc: 'Perpetual endowment for ten flagship Centres of Inquiry with 20-year operational runways \u2014 freeing researchers from the grant cycle.' },
  { category: 'Faculty & Fellows', amount: 20000000, pct: 20, desc: 'Recruitment and retention of world-class senior and junior fellows, endowed chairs, and the academic staff that make the Artemis model possible.' },
  { category: 'Physical Nodes & Facilities', amount: 15000000, pct: 15, desc: 'Acquisition, construction, and outfitting of residential colleges, hubs, and shared spaces across the global network.' },
  { category: 'Digital Infrastructure', amount: 10000000, pct: 10, desc: 'The ACN platform, global learning tools, synchronised teaching systems, and the data backbone connecting every node.' },
];

const EVENTS = [
  { title: 'The Founding Convocation', type: 'Gala', desc: 'An evening of vision and commitment. Meet the Chancellor and founding faculty at the Geneva node. Black tie. Historic.', date: '15 Sep 2026', weekday: 'Mon', location: 'Geneva', virtual: false, capacity: 200, registered: 87, price: 500, icon: Crown },
  { title: 'Inside the Build', type: 'Webinar', desc: 'Walk through the digital and physical architecture of Artemis with the design team. Live Q&A with founding engineers.', date: '22 Jul 2026', weekday: 'Wed', location: 'Online', virtual: true, capacity: 1000, registered: 432, price: 0, icon: Video },
  { title: 'Double Impact Day', type: 'Matching', desc: 'Every dollar donated is matched by the Catalyst Foundation. Your $1 becomes $2. 24 hours only.', date: '1 Oct 2026', weekday: 'Thu', location: 'Global', virtual: true, capacity: null, registered: 0, price: null, icon: Zap },
  { title: 'The Artemis Auction', type: 'Auction', desc: 'Bid on naming rights, original artwork, and exclusive experiences. All proceeds fund the Global Scholars Fund.', date: '20 Nov 2026', weekday: 'Fri', location: 'London', virtual: false, capacity: 150, registered: 34, price: 250, icon: Star },
  { title: 'Hack the Future', type: 'Hackathon', desc: 'A founding-weekend hackathon where donors and students co-build tools for the Artemis platform.', date: '8 Aug 2026', weekday: 'Sat', location: 'San Francisco', virtual: false, capacity: 100, registered: 61, price: 0, icon: Flame },
  { title: 'Spring Benefactor Dinner', type: 'Dinner', desc: 'An intimate dinner for major donors at the Valletta node. Michelin-starred cuisine and the future of knowledge.', date: '14 Mar 2027', weekday: 'Sun', location: 'Valletta', virtual: false, capacity: 80, registered: 22, price: 1000, icon: Gem },
];

const DONORS = [
  { name: 'The Nordgren Foundation', amount: 100000, date: '28 Apr', msg: 'Investing in the infrastructure of imagination.', tier: 'chancellors' },
  { name: 'Chen Wei Laboratories', amount: 50000, date: '4 May', msg: null, tier: 'founders' },
  { name: 'Dr. Elena Vasquez', amount: 25000, date: '10 May', msg: 'For the students who will change everything.', tier: 'founders' },
  { name: 'Anonymous Patron', amount: 40000, date: '7 May', msg: 'Because knowledge should have no borders.', tier: 'chancellors' },
  { name: 'The Matsuo Trust', amount: 30000, date: '18 Apr', msg: null, tier: 'founders' },
  { name: 'Liu Fang Foundation', amount: 15000, date: '25 Apr', msg: null, tier: 'guild' },
  { name: 'James & Priya Okonkwo', amount: 5000, date: '8 May', msg: null, tier: 'guild' },
  { name: 'The Al-Rashidi Family', amount: 3000, date: '5 May', msg: 'In memory of Fatima Al-Rashidi.', tier: 'guild' },
  { name: 'Dr. Robert & Sarah Kimani', amount: 2500, date: '22 Apr', msg: 'For the next generation of African scholars.', tier: 'guild' },
  { name: 'Sven & Astrid Lindqvist', amount: 5000, date: '20 Apr', msg: 'For the north, and for everywhere.', tier: 'guild' },
  { name: 'Anonymous', amount: 1000, date: '23 Apr', msg: null, tier: 'community' },
  { name: 'Takeshi Yamamoto', amount: 500, date: '2 May', msg: null, tier: 'community' },
  { name: 'Maria Santos', amount: 250, date: '3 May', msg: 'Proud to be part of the founding.', tier: 'community' },
  { name: 'Amara Osei', amount: 100, date: '27 Apr', msg: 'Every great university starts with a first believer.', tier: 'community' },
  { name: 'Isla McGregor', amount: 150, date: '15 Apr', msg: 'A small stone in a great cathedral.', tier: 'community' },
];

const TIER_COLORS: Record<string, string> = { chancellors: '#8A0000', founders: '#4338ca', guild: '#0e7490', community: '#15803d' };
const TIER_LABELS: Record<string, string> = { chancellors: "Chancellor's Circle", founders: "Founder's Society", guild: 'Guild Partners', community: 'Community' };
const CRYPTO = { BTC: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', ETH: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F' };
const PRESETS = [25, 100, 500, 1000, 5000, 10000];

/* ─── Hooks ─── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ─── Animation helpers ─── */
const clipReveal = (visible: boolean) => ({
  initial: { clipPath: 'inset(0 0 100% 0)', opacity: 0 },
  animate: visible ? { clipPath: 'inset(0 0 0% 0)', opacity: 1 } : {},
  transition: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] },
});

const slideLeft = (visible: boolean, delay = 0) => ({
  initial: { x: -60, opacity: 0 },
  animate: visible ? { x: 0, opacity: 1 } : {},
  transition: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] },
});

const slideRight = (visible: boolean, delay = 0) => ({
  initial: { x: 60, opacity: 0 },
  animate: visible ? { x: 0, opacity: 1 } : {},
  transition: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] },
});

const scaleIn = (visible: boolean, delay = 0) => ({
  initial: { scale: 0.85, opacity: 0 },
  animate: visible ? { scale: 1, opacity: 1 } : {},
  transition: { duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] },
});

const fadeUp = (visible: boolean, delay = 0) => ({
  initial: { y: 30, opacity: 0 },
  animate: visible ? { y: 0, opacity: 1 } : {},
  transition: { duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] },
});

/* ─── Animated Counter Component ─── */
function AnimatedCounter({ value, prefix = '', suffix = '', className = '' }: { value: number; prefix?: string; suffix?: string; className?: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !hasAnimated) {
        setHasAnimated(true);
        const duration = 2000;
        const start = performance.now();
        const tick = (now: number) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay(Math.round(eased * value));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        obs.unobserve(el);
      }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [value, hasAnimated]);

  const formatted = display >= 1000 ? display.toLocaleString('en-GB') : display.toString();
  return <span ref={ref} className={className}>{prefix}{formatted}{suffix}</span>;
}

/* ─── Main Component ─── */
export default function FundraisingCampaign({ goToPage }: Props) {
  const activeSection = useActiveSection(['case', 'goals', 'phases', 'opportunities', 'ways', 'give', 'founders', 'beyond']);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorMessage, setDonorMessage] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurringFreq, setRecurringFreq] = useState('monthly');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank' | 'crypto' | 'paypal'>('card');
  const [cryptoCoin, setCryptoCoin] = useState<'BTC' | 'ETH'>('BTC');
  const [selectedPerk, setSelectedPerk] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [donationResult, setDonationResult] = useState<{ success: boolean; message: string } | null>(null);

  const heroAnim = useInView(0);
  const caseAnim = useInView(0);
  const goalsAnim = useInView(0);
  const phasesAnim = useInView(0);
  const opportunitiesAnim = useInView(0);
  const waysAnim = useInView(0);
  const giveAnim = useInView(0);
  const foundersAnim = useInView(0);
  const beyondAnim = useInView(0);

  const effectiveAmount = selectedAmount || parseFloat(customAmount) || 0;

  const handleDonate = useCallback(async () => {
    const amount = selectedAmount || parseFloat(customAmount);
    if (!amount || amount <= 0 || !donorEmail) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/donations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          donorEmail, donorName: isAnonymous ? null : donorName, donorAnonymous: isAnonymous,
          amount, currency: CAMPAIGN.currency, paymentMethod: paymentMethod === 'crypto' ? `crypto_${cryptoCoin.toLowerCase()}` : paymentMethod,
          perkId: selectedPerk, isRecurring, recurringFreq: isRecurring ? recurringFreq : null, message: donorMessage || null,
        }),
      });
      const data = await res.json();
      setDonationResult(data.success ? { success: true, message: data.message } : { success: false, message: data.error || 'Something went wrong.' });
    } catch { setDonationResult({ success: false, message: 'Network error.' }); }
    finally { setSubmitting(false); }
  }, [selectedAmount, customAmount, donorEmail, donorName, isAnonymous, paymentMethod, cryptoCoin, selectedPerk, isRecurring, recurringFreq, donorMessage]);

  return (
    <div className="flex flex-col bg-white">

      {/* ══════════════════════════════════════════
          1. HERO — Matches site pattern
          ══════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden">
        <div className="max-w-[1600px] mx-auto">
          <div className="relative w-full h-[40vh] sm:h-[45vh] min-h-[300px] sm:min-h-[360px] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1624555130296-e551faf8969b?auto=format&fit=crop&q=80&w=1800"
              alt="Igniting the Light — The Founders Campaign"
              className="absolute inset-0 w-full h-full object-cover grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="relative z-10 flex flex-col justify-end h-full max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 pb-10 sm:pb-16">
              <div ref={heroAnim.ref} className={`transition-all duration-700 ${heroAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div className="mb-8 flex items-center space-x-3">
                  <span className="w-8 h-[1px] bg-[#8A0000]"></span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">The Founding Campaign</span>
                </div>
                <h1 className="text-[30px] sm:text-[44px] md:text-[56px] font-extrabold leading-[1.05] tracking-tighter text-white mb-4 uppercase">
                  Igniting the Light
                </h1>
                <p className="text-[15px] sm:text-[18px] text-white/70 max-w-xl leading-relaxed font-light mb-6 sm:mb-8">
                  The Founders Campaign for the University of Artemis. Help us build a borderless university that will endure for centuries.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button onClick={() => document.getElementById('give')?.scrollIntoView({ behavior: 'smooth' })} className="flex items-center space-x-3 px-8 py-4 bg-[#8A0000] text-white text-[12px] font-bold uppercase tracking-[0.25em] hover:bg-[#6B0000] transition-colors group">
                    <span>Give Now</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button onClick={() => document.getElementById('case')?.scrollIntoView({ behavior: 'smooth' })} className="flex items-center space-x-3 px-8 py-4 border border-white/25 text-white/60 text-[12px] font-bold uppercase tracking-[0.25em] hover:bg-white/10 hover:text-white transition-colors">
                    <span>Read the Case</span>
                    <ChevronDown size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          ANIMATED GOAL BAR — Live Campaign Pulse
          ══════════════════════════════════════════ */}
      <section className="bg-white py-12 sm:py-20 lg:py-28 border-b border-gray-100">
        <div className="max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">

            {/* LEFT — Animated circular progress */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] md:w-[260px] md:h-[260px]">
                {/* Outer pulsing ring */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-[#8A0000]/10"
                  animate={{ scale: [1, 1.06, 1], opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                  className="absolute inset-2 rounded-full border border-[#8A0000]/5"
                  animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.5, 0.2] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                />

                {/* SVG progress ring */}
                <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
                  <circle cx="100" cy="100" r="88" fill="none" stroke="#f3f3f3" strokeWidth="6" />
                  <motion.circle
                    cx="100" cy="100" r="88" fill="none" stroke="#8A0000" strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 88}
                    initial={{ strokeDashoffset: 2 * Math.PI * 88 }}
                    whileInView={{ strokeDashoffset: 2 * Math.PI * 88 * (1 - pct / 100) }}
                    transition={{ duration: 2.5, ease: 'easeOut', delay: 0.3 }}
                    viewport={{ once: true }}
                  />
                </svg>

                {/* Center content — animated counter */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <AnimatedCounter value={pct} suffix="%" className="text-[36px] sm:text-[48px] md:text-[56px] font-black text-[#8A0000] leading-none" />
                  <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-gray-400 mt-2">funded</span>
                </div>

                {/* Floating dot on progress edge */}
                <motion.div
                  className="absolute w-3 h-3 rounded-full bg-[#8A0000] shadow-[0_0_12px_rgba(138,0,0,0.5)]"
                  style={{
                    top: '50%',
                    left: '50%',
                    transformOrigin: '0 0',
                  }}
                  animate={{
                    x: Math.cos((pct / 100) * 2 * Math.PI - Math.PI / 2) * 88 - 6,
                    y: Math.sin((pct / 100) * 2 * Math.PI - Math.PI / 2) * 88 - 6,
                  }}
                  transition={{ duration: 2.5, ease: 'easeOut', delay: 0.3 }}
                />
              </div>
            </div>

            {/* RIGHT — Stats + shimmer bar */}
            <div className="lg:col-span-8">
              <div className="mb-6 sm:mb-8">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#8A0000] block mb-3">Campaign Progress</span>
                <div className="flex items-baseline gap-2 flex-wrap">
                  <AnimatedCounter value={CAMPAIGN.raised} prefix={sym} className="text-[26px] sm:text-[32px] md:text-[40px] font-black tracking-tighter text-[#141414]" />
                  <span className="text-[14px] sm:text-[16px] font-normal text-gray-400 tracking-normal">raised of {sym}{fmtShort(CAMPAIGN.goal)}</span>
                </div>
              </div>

              {/* Shimmer progress bar */}
              <div className="relative h-4 bg-gray-100 w-full overflow-hidden mb-8">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#8A0000] to-[#a01010]"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${pct}%` }}
                  transition={{ duration: 2, ease: 'easeOut' }}
                  viewport={{ once: true }}
                />
                {/* Shimmer overlay */}
                <motion.div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  style={{ width: '40%' }}
                  animate={{ x: ['-100%', `${pct * 10}%`] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', repeatDelay: 3 }}
                />
                {/* Breathing glow at the tip */}
                <motion.div
                  className="absolute top-0 h-full w-4 bg-[#8A0000]/30 blur-sm"
                  initial={{ left: 0 }}
                  whileInView={{ left: `${pct}%` }}
                  transition={{ duration: 2, ease: 'easeOut' }}
                  viewport={{ once: true }}
                  animate={{ opacity: [0.4, 1, 0.4] }}
                />
              </div>

              {/* Milestone markers on the bar */}
              <div className="relative w-full mb-12 h-6">
                {[25, 50, 75].map((m) => (
                  <div
                    key={m}
                    className="absolute top-0 flex flex-col items-center"
                    style={{ left: `${m}%`, transform: 'translateX(-50%)' }}
                  >
                    <div className={`w-[1px] h-3 ${pct >= m ? 'bg-[#8A0000]' : 'bg-gray-300'}`} />
                    <span className={`text-[9px] font-bold uppercase tracking-widest mt-1 ${pct >= m ? 'text-[#8A0000]' : 'text-gray-300'}`}>{m}%</span>
                  </div>
                ))}
              </div>

              {/* Live stats row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
                {[
                  { label: 'Donors', value: CAMPAIGN.donors, animate: true, icon: Users },
                  { label: 'Avg. Gift', value: Math.round(CAMPAIGN.raised / CAMPAIGN.donors), prefix: sym, animate: true, icon: CreditCard },
                  { label: 'Countries', value: 14, animate: false, icon: Globe },
                  { label: 'Days Left', value: 247, animate: false, icon: Zap },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-10 h-10 flex items-center justify-center bg-gray-50 shrink-0">
                      <stat.icon size={16} className="text-[#8A0000]" />
                    </div>
                    <div>
                      {stat.animate ? (
                        <AnimatedCounter
                          value={stat.value}
                          prefix={stat.prefix}
                          className="text-[20px] font-black text-[#141414] leading-none"
                        />
                      ) : (
                        <div className="text-[20px] font-black text-[#141414] leading-none">
                          {stat.prefix || ''}{stat.value.toLocaleString()}
                        </div>
                      )}
                      <div className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mt-1">{stat.label}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <OnThisPageNav
        sections={[
          { id: 'case', label: 'The Case' },
          { id: 'goals', label: 'Your Gift' },
          { id: 'phases', label: 'Phases' },
          { id: 'opportunities', label: 'Opportunities' },
          { id: 'ways', label: 'Ways to Give' },
          { id: 'give', label: 'Give Now' },
          { id: 'founders', label: 'Founders' },
          { id: 'beyond', label: 'Beyond' },
        ]}
        activeSection={activeSection}
      />

      {/* ══════════════════════════════════════════
          2. THE CASE — Asymmetric Editorial Layout
          ══════════════════════════════════════════ */}
      <section id="case" className="scroll-mt-[110px] py-16 sm:py-24 lg:py-36">
        <div ref={caseAnim.ref} className="max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* LEFT — Big editorial headline + body */}
            <div className="lg:col-span-7">
              <motion.h2 {...slideLeft(caseAnim.visible)} className="text-[32px] sm:text-[44px] md:text-[60px] lg:text-[72px] font-black leading-[0.92] tracking-tighter text-[#141414] mb-8 sm:mb-12">
                Why Artemis?<br />
                <span className="text-[#8A0000]">Why now?</span>
              </motion.h2>
              <motion.div {...fadeUp(caseAnim.visible, 0.2)} className="space-y-5 text-[16px] text-gray-600 leading-[1.75]">
                <p>Across the world, brilliant minds are locked out of the institutions that shape knowledge &mdash; not by a lack of talent, but by geography, cost, and the closed architecture of legacy universities. The model that served the nineteenth century cannot serve the twenty-first. Artemis exists to change this.</p>
                <p>We believe that <em className="text-gray-800">access to world-class education should not depend on where you were born</em>. That <strong className="text-gray-900">academic excellence and global inclusion are not competing values &mdash; they are the same value</strong>. And that a university dedicated to <strong className="text-gray-900">freedom of thought, freedom of inquiry, and freedom of expression</strong> is not merely desirable &mdash; it is necessary for the progress of civilisation itself.</p>
                <p>Artemis is a borderless, network-native university built on three pillars: <strong className="text-gray-900">Broadening Access</strong> &mdash; bridging the gap between talent and opportunity regardless of geography or means; <strong className="text-gray-900">Advancing Excellence</strong> &mdash; personalised, research-driven education sustained by rigorous standards and technological innovation; and <strong className="text-gray-900">Guarding Freedom</strong> &mdash; upholding the democratic, humane, and international values that make the pursuit of truth possible, with freedom of thought and inquiry as non-negotiable commitments.</p>
                <p>Our operating philosophy is one of <strong className="text-gray-900">Foundational Efficiency</strong> &mdash; ninety cents of every dollar goes directly to academic programmes, student access, and research. We have no redundant campuses, no bloated administration. We have scholars, students, and a mission. The Founding Campaign provides the strategic capital to endow our first residential colleges, launch our Centres of Inquiry, and build the digital infrastructure that makes a borderless university possible.</p>
              </motion.div>
              <motion.button {...fadeUp(caseAnim.visible, 0.4)} onClick={() => document.getElementById('give')?.scrollIntoView({ behavior: 'smooth' })} className="flex items-center space-x-4 py-2 mt-10 border-b-2 border-[#8A0000] text-[#8A0000] text-[12px] font-bold uppercase tracking-[0.2em] hover:text-[#141414] hover:border-[#141414] transition-all group">
                <span>Support the Campaign</span>
                <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
              </motion.button>
            </div>

            {/* RIGHT — Three pillars as large statements */}
            <div className="lg:col-span-5">
              <motion.div {...slideRight(caseAnim.visible, 0.15)} className="space-y-6 sm:space-y-10 mb-8 sm:mb-12">
                {[
                  { value: 'Broaden', label: 'Access', desc: 'Talent has no postcode. Opportunity should not either.' },
                  { value: 'Advance', label: 'Excellence', desc: 'Research-driven rigour, powered by innovation, not inertia.' },
                  { value: 'Guard', label: 'Freedom', desc: 'Thought, inquiry, and expression \u2014 non-negotiable.' },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="text-[36px] sm:text-[64px] lg:text-[96px] font-black text-[#8A0000] leading-none tracking-tighter">{item.value}</div>
                    <div className="flex items-baseline gap-2 sm:gap-3 mt-1">
                      <span className="text-[11px] sm:text-[13px] font-bold uppercase tracking-[0.2em] text-[#141414]">{item.label}</span>
                      <span className="text-[11px] sm:text-[13px] text-gray-400">&mdash;</span>
                      <span className="text-[11px] sm:text-[13px] text-gray-500">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Strategic initiatives — Full-width horizontal band (4 initiatives) */}
          <motion.div {...fadeUp(caseAnim.visible, 0.3)} className="grid grid-cols-1 md:grid-cols-2 gap-0 mt-12 sm:mt-20 border-t border-gray-200">
            <div className="border-l-4 border-[#8A0000] p-5 sm:p-8 lg:p-10 bg-white hover:bg-gray-50 transition-colors">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#8A0000] block mb-3">Strategic Initiative</span>
              <h4 className="text-[20px] font-bold text-[#141414] mb-3">Endowment for Autonomous Research</h4>
              <p className="text-[14px] text-gray-600 leading-relaxed">A permanent endowment supporting interdisciplinary research hubs that operate independently of state or commercial agendas &mdash; each with a 20-year operational runway that frees researchers from the grant cycle and protects the independence that real discovery demands.</p>
            </div>
            <div className="border-l-4 border-[#8A0000] p-5 sm:p-8 lg:p-10 bg-white hover:bg-gray-50 transition-colors">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#8A0000] block mb-3">Strategic Initiative</span>
              <h4 className="text-[20px] font-bold text-[#141414] mb-3">The Global Scholars Fund</h4>
              <p className="text-[14px] text-gray-600 leading-relaxed">Full-ride scholarships, virtual residencies, and travel grants for scholars from every corner of the world &mdash; ensuring that admission to Artemis is determined by the quality of your mind, never by the limits of your means.</p>
            </div>
            <div className="border-l-4 border-[#8A0000] p-5 sm:p-8 lg:p-10 bg-white hover:bg-gray-50 transition-colors border-t border-gray-200">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#8A0000] block mb-3">Strategic Initiative</span>
              <h4 className="text-[20px] font-bold text-[#141414] mb-3">Residential Colleges &amp; Global Hubs</h4>
              <p className="text-[14px] text-gray-600 leading-relaxed">Living-learning environments across continents where the Artemis community takes physical form &mdash; residential colleges with communal dining, seminar rooms, maker spaces, and the daily intellectual collision that only shared space can create.</p>
            </div>
            <div className="border-l-4 border-[#8A0000] p-5 sm:p-8 lg:p-10 bg-white hover:bg-gray-50 transition-colors border-t border-gray-200">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#8A0000] block mb-3">Strategic Initiative</span>
              <h4 className="text-[20px] font-bold text-[#141414] mb-3">Senior &amp; Junior Fellows Programme</h4>
              <p className="text-[14px] text-gray-600 leading-relaxed">Endowed fellowships for distinguished senior scholars and the most promising early-career researchers &mdash; building the intellectual core of Artemis by attracting minds that refuse to be constrained by borders, fixed-term contracts, or the grant cycle.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          3. WHERE YOUR GIFT GOES — Financial Goals + Pull Quote
          ══════════════════════════════════════════ */}
      <section id="goals" className="scroll-mt-[110px] bg-gray-50 py-16 sm:py-24 lg:py-36">
        <div ref={goalsAnim.ref} className="max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* LEFT — Campaign summary as a clean table */}
            <div className="lg:col-span-5">
              <motion.h2 {...slideLeft(goalsAnim.visible)} className="text-[32px] sm:text-[44px] md:text-[56px] font-black leading-[0.92] tracking-tighter text-[#141414] mb-4">
                Where your<br />gift goes
              </motion.h2>
              <motion.p {...fadeUp(goalsAnim.visible, 0.15)} className="text-[16px] text-gray-600 max-w-md leading-relaxed mb-12">Every dollar donated is a strategic investment in the future of knowledge. Here is how the {sym}{fmtShort(CAMPAIGN.goal)} founding goal is allocated.</motion.p>

              <motion.div {...fadeUp(goalsAnim.visible, 0.25)} className="bg-white">
                <div className="divide-y divide-gray-100">
                  {[
                    { label: 'Campaign Goal', value: `${sym}${fmtShort(CAMPAIGN.goal)}`, highlight: false },
                    { label: 'Raised to Date', value: `${sym}${fmtShort(CAMPAIGN.raised)}`, highlight: true },
                    { label: 'Remaining', value: `${sym}${fmtShort(CAMPAIGN.goal - CAMPAIGN.raised)}`, highlight: false },
                    { label: 'Founding Donors', value: fmtNum(CAMPAIGN.donors), highlight: false },
                  ].map((row, i) => (
                    <div key={i} className="flex items-center justify-between py-4 sm:py-5 px-4 sm:px-6">
                      <span className="text-[11px] sm:text-[13px] font-bold text-gray-500 uppercase tracking-[0.15em]">{row.label}</span>
                      <span className={`text-[22px] sm:text-[28px] font-black leading-none ${row.highlight ? 'text-[#8A0000]' : 'text-[#141414]'}`}>{row.value}</span>
                    </div>
                  ))}
                </div>
                <div className="px-6 py-5 bg-gray-50">
                  <p className="text-[13px] text-gray-500 leading-relaxed">90% of all contributions go directly to academic programmes, student access, and research.</p>
                  <button onClick={() => document.getElementById('give')?.scrollIntoView({ behavior: 'smooth' })} className="flex items-center space-x-3 mt-4 px-6 py-3 bg-[#8A0000] text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#6B0000] transition-colors group">
                    <span>Contribute Now</span><ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            </div>

            {/* RIGHT — Bar chart */}
            <div className="lg:col-span-7">
              <div className="space-y-6">
                {FINANCIAL_GOALS.map((g, i) => (
                  <motion.div key={i} {...slideRight(goalsAnim.visible, i * 0.1)}>
                    <div className="flex items-baseline justify-between mb-2 gap-2">
                      <span className="text-[13px] sm:text-[15px] font-bold text-[#141414]">{g.category}</span>
                      <span className="text-[13px] sm:text-[14px] font-black text-[#8A0000] shrink-0">{sym}{fmtShort(g.amount)}</span>
                    </div>
                    <div className="h-4 bg-gray-200 w-full overflow-hidden">
                      <motion.div className="h-full bg-[#8A0000]" initial={{ width: 0 }} whileInView={{ width: `${g.pct}%` }} transition={{ duration: 1.4, delay: i * 0.12, ease: 'easeOut' }} viewport={{ once: true }} />
                    </div>
                    <div className="flex items-start justify-between mt-2 gap-2">
                      <span className="text-[11px] sm:text-[12px] text-gray-500 leading-snug">{g.desc}</span>
                      <span className="text-[11px] sm:text-[12px] font-black text-gray-400 shrink-0">{g.pct}%</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Pull Quote — Breaking out of container slightly */}
          <motion.div {...scaleIn(goalsAnim.visible, 0.4)} className="mt-16 sm:mt-24 lg:mt-32 relative">
            <div className="border-l-4 border-[#8A0000] pl-5 sm:pl-8 lg:pl-12 lg:-ml-8 max-w-[900px]">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-[#8A0000] opacity-20 mb-4 sm:mb-6" viewBox="0 0 24 24" fill="currentColor"><path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"/></svg>
              <blockquote className="text-[16px] sm:text-[22px] md:text-[28px] font-light text-[#141414] leading-[1.5] mb-4 sm:mb-6 italic">
                The function of the university is not simply to teach bread-winning, or to furnish teachers for the public schools, or to be a centre of polite society; it is, above all, to be the organ of that fine adjustment between real life and the growing knowledge of life, an adjustment which forms the secret of civilisation.
              </blockquote>
              <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">W.E.B. Du Bois</div>
              <div className="text-[11px] text-gray-400 mt-1">The Talented Tenth (1903)</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          4. THREE PHASES TO LAUNCH — Vertical Timeline
          ══════════════════════════════════════════ */}
      <section id="phases" className="scroll-mt-[110px] py-16 sm:py-24 lg:py-36">
        <div ref={phasesAnim.ref} className="max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20">
          {/* Phase indicator */}
          <motion.div {...clipReveal(phasesAnim.visible)} className="mb-10 sm:mb-16">
            <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
              {['I', 'II', 'III', 'IV', 'V'].map((num, i) => (
                <React.Fragment key={i}>
                  <span className="text-[24px] sm:text-[48px] md:text-[64px] font-black text-[#8A0000] leading-none">{num}</span>
                  {i < 4 && <ArrowRight size={14} className="text-gray-300 hidden sm:block" />}
                </React.Fragment>
              ))}
            </div>
            <h2 className="text-[32px] sm:text-[44px] md:text-[56px] font-black leading-[0.92] tracking-tighter text-[#141414] mb-4">
              Five milestones<br />to launch
            </h2>
            <p className="text-[16px] text-gray-600 max-w-xl leading-relaxed">Each phase has concrete deliverables. Not aspirations &mdash; commitments. Track our progress as we climb from foundation to global scale.</p>
          </motion.div>

          {/* Vertical timeline */}
          <div className="relative">
            {/* Crimson connected line */}
            <div className="absolute left-[19px] lg:left-[23px] top-0 bottom-0 w-[2px] bg-gray-200">
              <motion.div
                className="w-full bg-[#8A0000]"
                initial={{ height: 0 }}
                whileInView={{ height: `${(MILESTONES.filter(m => m.reached).length / MILESTONES.length) * 100}%` }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                viewport={{ once: true }}
              />
            </div>

            {/* Timeline items */}
            <div className="space-y-0">
              {MILESTONES.map((ms, i) => {
                const Icon = ms.icon;
                return (
                  <motion.div
                    key={i}
                    {...slideLeft(phasesAnim.visible, i * 0.12)}
                    className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start py-10"
                  >
                    {/* Left — Phase node */}
                    <div className="lg:col-span-1 flex items-start pt-1">
                      <div className={`w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center border-2 relative z-10 ${ms.reached ? 'bg-[#8A0000] border-[#8A0000]' : 'bg-white border-gray-300'}`}>
                        <Icon size={18} className={ms.reached ? 'text-white' : 'text-gray-400'} />
                      </div>
                    </div>

                    {/* Middle — Content */}
                    <div className="lg:col-span-6">
                      <div className="flex items-baseline gap-3 mb-2">
                        <h4 className="text-[24px] font-bold text-[#141414]">{ms.title}</h4>
                        {ms.reached && <Check size={18} className="text-[#8A0000] shrink-0" />}
                      </div>
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-[14px] font-black text-[#8A0000]">{sym}{fmtShort(ms.target)}</span>
                        <span className="text-[13px] text-gray-400">{ms.date}</span>
                      </div>
                      <p className="text-[15px] text-gray-600 leading-relaxed mb-5">{ms.desc}</p>
                      <ul className="space-y-2">
                        {ms.deliverables.map((d, j) => (
                          <li key={j} className="flex items-start gap-2">
                            <Check size={13} className={`mt-1 shrink-0 ${ms.reached ? 'text-[#8A0000]' : 'text-gray-300'}`} />
                            <span className="text-[13px] text-gray-600">{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Right — Progress indicator */}
                    <div className="lg:col-span-5 lg:pt-2">
                      <div className="lg:ml-auto lg:max-w-[280px]">
                        <div className="h-2 bg-gray-200 w-full overflow-hidden mb-2">
                          <div className={`h-full transition-all duration-1000 ${ms.reached ? 'bg-[#8A0000]' : 'bg-gray-300'}`} style={{ width: ms.reached ? '100%' : `${Math.max(5, Math.min(95, (CAMPAIGN.raised / ms.target) * 100))}%` }} />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">{ms.reached ? 'Complete' : 'In progress'}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          5. FOUNDING OPPORTUNITIES — Table + Constellation Strip
          ══════════════════════════════════════════ */}
      <section id="opportunities" className="scroll-mt-[110px] bg-gray-50 py-16 sm:py-24 lg:py-36">
        <div ref={opportunitiesAnim.ref} className="max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20">
          {/* Intro — opens with just text, no red line label */}
          <motion.h2 {...clipReveal(opportunitiesAnim.visible)} className="text-[32px] sm:text-[44px] md:text-[56px] font-black leading-[0.92] tracking-tighter text-[#141414] mb-4">
            Founding<br />opportunities
          </motion.h2>
          <motion.p {...fadeUp(opportunitiesAnim.visible, 0.15)} className="text-[15px] sm:text-[16px] text-gray-600 max-w-2xl leading-relaxed mb-4">We are building the first borderless, network-native university in history. We are looking for donors and partners who share our vision and are excited about this legacy-building opportunity.</motion.p>
          <motion.p {...fadeUp(opportunitiesAnim.visible, 0.2)} className="text-[13px] sm:text-[14px] text-gray-500 mb-10 sm:mb-16">Contact our advancement team at <a href="mailto:donate@artemis.edu" className="text-[#8A0000] font-bold hover:underline">donate@artemis.edu</a> to learn how you can become an Artemis Founder.</motion.p>

          {/* Table-style layout — cards on mobile, table on desktop */}
          <motion.div {...fadeUp(opportunitiesAnim.visible, 0.25)} className="mb-12 sm:mb-20">
            {/* Desktop table */}
            <div className="hidden md:block bg-white border border-gray-200 overflow-hidden">
              {/* Table header */}
              <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-200 bg-white">
                <div className="col-span-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Type</div>
                <div className="col-span-5 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Opportunity</div>
                <div className="col-span-5 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 text-right">Amount</div>
              </div>
              {/* Table rows */}
              {FOUNDING_OPPORTUNITIES.map((opp, i) => {
                const Icon = opp.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-12 gap-4 px-6 py-5 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors group cursor-default items-center"
                  >
                    <div className="col-span-2 flex items-center gap-2">
                      <Icon size={14} className="text-[#8A0000]" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#8A0000]">{opp.type}</span>
                    </div>
                    <div className="col-span-5">
                      <h4 className="text-[15px] font-bold text-[#141414] group-hover:text-[#8A0000] transition-colors">{opp.title}</h4>
                    </div>
                    <div className="col-span-5 text-right">
                      <div className="text-[20px] font-black text-[#8A0000] leading-none">{opp.range || `${sym}${fmtShort(opp.amount)}`}</div>
                      <span className="text-[10px] text-gray-400">{opp.type === 'Naming' ? 'Naming opportunity' : opp.type === 'Endowment' ? 'Per named chair' : 'Naming opportunity'}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Mobile cards */}
            <div className="md:hidden space-y-3">
              {FOUNDING_OPPORTUNITIES.map((opp, i) => {
                const Icon = opp.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                    viewport={{ once: true }}
                    className="bg-white border border-gray-200 p-4 hover:bg-gray-50 transition-colors group cursor-default"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Icon size={14} className="text-[#8A0000]" />
                      <span className="text-[9px] font-bold uppercase tracking-widest text-[#8A0000]">{opp.type}</span>
                    </div>
                    <h4 className="text-[15px] font-bold text-[#141414] mb-2">{opp.title}</h4>
                    <div className="flex items-baseline justify-between">
                      <div className="text-[20px] font-black text-[#8A0000] leading-none">{opp.range || `${sym}${fmtShort(opp.amount)}`}</div>
                      <span className="text-[10px] text-gray-400">{opp.type === 'Naming' ? 'Naming opportunity' : opp.type === 'Endowment' ? 'Per named chair' : 'Naming opportunity'}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Constellations — Circular universe in motion */}
          <motion.div {...clipReveal(opportunitiesAnim.visible)}>
            <div className="flex items-center gap-4 mb-2">
              <h3 className="text-[28px] font-bold text-[#141414]">The Constellation</h3>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">8 Stars</span>
            </div>
            <p className="text-[14px] text-gray-500 mb-10">Every contribution places a star in the founding constellation. The greater the gift, the brighter the star. Click a star to explore its orbit.</p>

            <div className="flex flex-col lg:flex-row gap-10 items-center lg:items-start">
              {/* Circular constellation universe */}
              <div className="relative w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] md:w-[420px] md:h-[420px] shrink-0 mx-auto lg:mx-0">
                {/* Outer rotating ring — slow drift */}
                <motion.div
                  className="absolute inset-0 rounded-full border border-gray-200"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
                />
                {/* Mid rotating ring — opposite direction */}
                <motion.div
                  className="absolute inset-6 rounded-full border border-dashed border-gray-200"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
                />
                {/* Inner rotating ring */}
                <motion.div
                  className="absolute inset-12 rounded-full border border-gray-100"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                />
                {/* Center glow */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-[#8A0000]/5 flex items-center justify-center">
                    <Orbit size={20} className="text-[#8A0000]/40" />
                  </div>
                </div>
                {/* Faint radial lines from center */}
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                  <div
                    key={angle}
                    className="absolute top-1/2 left-1/2 w-[1px] bg-gray-100 origin-top"
                    style={{ height: '46%', transform: `translate(-50%, 0) rotate(${angle}deg)` }}
                  />
                ))}

                {/* Constellation nodes — positioned in orbit */}
                {CONSTELLATIONS.map((c, i) => {
                  const Icon = c.icon;
                  const isSelected = selectedPerk === c.id;
                  const angle = (i / CONSTELLATIONS.length) * 2 * Math.PI - Math.PI / 2;
                  const orbitPct = 30 + c.magnitude * 3.5; // % from center
                  const offsetX = Math.cos(angle) * orbitPct;
                  const offsetY = Math.sin(angle) * orbitPct;
                  const size = 28 + c.magnitude * 5; // circle size grows with magnitude
                  return (
                    <motion.button
                      key={c.id}
                      className="absolute z-10"
                      style={{
                        top: `calc(50% + ${offsetY}% - ${size / 2}px)`,
                        left: `calc(50% + ${offsetX}% - ${size / 2}px)`,
                      }}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + i * 0.1, duration: 0.5, type: 'spring', stiffness: 200 }}
                      viewport={{ once: true }}
                      onClick={() => { setSelectedPerk(isSelected ? null : c.id); if (!isSelected) { setSelectedAmount(c.min); setCustomAmount(''); } }}
                    >
                      {/* Glow behind selected */}
                      {isSelected && (
                        <motion.div
                          className="absolute rounded-full bg-[#8A0000]/10"
                          animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0.2, 0.6] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          style={{ inset: '-30%' }}
                        />
                      )}
                      <div
                        className={`rounded-full flex items-center justify-center transition-all cursor-pointer border-2 ${
                          isSelected
                            ? 'bg-[#8A0000] border-[#8A0000] shadow-[0_0_20px_rgba(138,0,0,0.3)]'
                            : 'bg-white border-gray-200 hover:border-[#8A0000]/50 hover:shadow-md'
                        }`}
                        style={{ width: size, height: size }}
                      >
                        <Icon
                          size={Math.max(12, size * 0.35)}
                          className={isSelected ? 'text-white' : 'text-[#8A0000]'}
                        />
                      </div>
                      {/* Label below circle */}
                      <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1 whitespace-nowrap">
                        <span className={`text-[9px] font-bold uppercase tracking-wider ${isSelected ? 'text-[#8A0000]' : 'text-gray-400'}`}>{c.title}</span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Detail panel — right side */}
              <div className="flex-1 w-full min-h-[240px]">
                <AnimatePresence mode="wait">
                  {selectedPerk ? (() => {
                    const c = CONSTELLATIONS.find(x => x.id === selectedPerk);
                    if (!c) return null;
                    const Icon = c.icon;
                    return (
                      <motion.div
                        key={c.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.35 }}
                        className="bg-white border-2 border-[#8A0000]/20 p-5 sm:p-8 lg:p-10"
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 rounded-full bg-[#8A0000] flex items-center justify-center">
                            <Icon size={18} className="text-white" />
                          </div>
                          <div>
                            <h3 className="text-[24px] font-extrabold text-[#141414]">{c.title}</h3>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Magnitude {c.magnitude} of 8</span>
                          </div>
                        </div>
                        <p className="text-[15px] text-gray-600 leading-relaxed mb-6">{c.desc}</p>
                        <div className="flex items-baseline gap-3 mb-6">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-[#8A0000]">From</span>
                          <span className="text-[36px] font-black text-[#141414] leading-none">{sym}{fmtShort(c.min)}</span>
                        </div>
                        {/* Magnitude dots */}
                        <div className="flex gap-1.5 mb-6">
                          {Array.from({ length: 8 }).map((_, j) => (
                            <div key={j} className={`w-2.5 h-2.5 rounded-full transition-colors ${j < c.magnitude ? 'bg-[#8A0000]' : 'bg-gray-200'}`} />
                          ))}
                        </div>
                        <button onClick={() => document.getElementById('give')?.scrollIntoView({ behavior: 'smooth' })} className="flex items-center space-x-3 px-8 py-3 bg-[#8A0000] text-white text-[11px] font-bold uppercase tracking-widest hover:bg-[#6B0000] transition-colors group">
                          <span>Claim This Star</span><ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                      </motion.div>
                    );
                  })() : (
                    <motion.div
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="bg-white border border-gray-200 p-5 sm:p-8 flex flex-col items-center justify-center text-center min-h-[240px]"
                    >
                      <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-4">
                        <Orbit size={24} className="text-gray-300" />
                      </div>
                      <p className="text-[15px] text-gray-400 leading-relaxed">Select a star in the constellation to explore its orbit and discover the perks that await.</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          6. WAYS TO GIVE — Icon Grid
          ══════════════════════════════════════════ */}
      <section id="ways" className="scroll-mt-[110px] py-16 sm:py-24 lg:py-36">
        <div ref={waysAnim.ref} className="max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20">
          <motion.h2 {...clipReveal(waysAnim.visible)} className="text-[32px] sm:text-[44px] md:text-[56px] font-black leading-[0.92] tracking-tighter text-[#141414] mb-8 sm:mb-12">
            Ways to give
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-gray-200">
            {WAYS_TO_GIVE.map((w, i) => {
              const Icon = w.icon;
              return (
                <motion.div
                  key={i}
                  {...fadeUp(waysAnim.visible, i * 0.06)}
                  className={`p-5 sm:p-8 lg:p-10 hover:bg-gray-50 transition-colors group border-b border-gray-200 last:border-b-0 md:border-b-0 ${i % 2 === 1 ? 'md:border-l md:border-gray-200' : ''} ${i < WAYS_TO_GIVE.length - 2 ? 'md:border-b md:border-gray-200' : ''} ${i >= WAYS_TO_GIVE.length - 2 && i % 2 === 1 ? 'md:border-l md:border-gray-200' : ''}`}
                >
                  <div className="flex items-start gap-4 sm:gap-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-[#8A0000]/10 shrink-0">
                      <Icon size={18} className="sm:hidden text-[#8A0000]" />
                      <Icon size={22} className="hidden sm:block text-[#8A0000]" />
                    </div>
                    <div>
                      <h4 className="text-[16px] sm:text-[18px] font-bold text-[#141414] mb-1 sm:mb-2 group-hover:text-[#8A0000] transition-colors">{w.title}</h4>
                      <p className="text-[13px] sm:text-[14px] text-gray-500 leading-relaxed">{w.desc}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Contact CTA band */}
          <motion.div {...fadeUp(waysAnim.visible, 0.5)} className="mt-8 sm:mt-12 p-4 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-4 bg-gray-50 border border-gray-100">
            <div className="flex items-center gap-3 text-center md:text-left">
              <Phone size={16} className="text-[#8A0000] shrink-0" />
              <span className="text-[13px] sm:text-[14px] text-gray-600">Questions about giving? Our advancement team is here to help.</span>
            </div>
            <a href="mailto:donate@artemis.edu" className="flex items-center space-x-3 px-6 py-2.5 border-2 border-[#8A0000] text-[#8A0000] text-[10px] font-bold uppercase tracking-widest hover:bg-[#8A0000] hover:text-white transition-colors group shrink-0">
              <span>donate@artemis.edu</span>
              <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          7. GIVE NOW — The Donation Form
          ══════════════════════════════════════════ */}
      <section id="give" className="scroll-mt-[110px] bg-gray-50 py-16 sm:py-24 lg:py-36">
        <div ref={giveAnim.ref} className="max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20">
          <motion.h2 {...clipReveal(giveAnim.visible)} className="text-[32px] sm:text-[44px] md:text-[56px] font-black leading-[0.92] tracking-tighter text-[#141414] mb-4">
            Give now
          </motion.h2>
          <motion.p {...fadeUp(giveAnim.visible, 0.1)} className="text-[14px] sm:text-[16px] text-gray-600 max-w-2xl leading-relaxed mb-8 sm:mb-12">Choose your amount, select your payment method, and join the founding. For major gifts and naming opportunities, contact <a href="mailto:donate@artemis.edu" className="text-[#8A0000] font-bold hover:underline">donate@artemis.edu</a>.</motion.p>

          {/* AMOUNT section — Full-width */}
          <motion.div {...fadeUp(giveAnim.visible, 0.15)} className="bg-white border border-gray-200 p-5 sm:p-8 lg:p-10 mb-6">
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-gray-900 mb-5">Select your amount</h3>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-5">
              {PRESETS.map(amt => (
                <button key={amt} onClick={() => { setSelectedAmount(amt); setCustomAmount(''); }} className={`py-3 text-[13px] font-bold border-2 transition-all ${selectedAmount === amt ? 'bg-[#8A0000] text-white border-[#8A0000]' : 'bg-white text-gray-700 border-gray-200 hover:border-[#8A0000] hover:text-[#8A0000]'}`}>
                  {sym}{fmtShort(amt)}
                </button>
              ))}
            </div>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[16px] font-bold text-gray-300">{sym}</span>
              <input type="number" value={customAmount} onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(null); }} placeholder="Custom amount" className="w-full pl-8 pr-4 py-3 bg-white border-2 border-gray-200 focus:border-[#8A0000] focus:outline-none text-[16px] font-bold text-[#141414] placeholder:text-gray-300" />
            </div>
            {effectiveAmount > 0 && (
              <div className="mt-5 p-4 bg-gray-50 border border-gray-100">
                <div className="flex items-center gap-2">
                  <Heart size={14} className="text-[#8A0000]" />
                  <span className="text-[13px] text-gray-600">
                    {effectiveAmount >= 500000 && 'Patron of an entire Artemis node. The building bears your name.'}
                    {effectiveAmount >= 50000 && effectiveAmount < 500000 && 'Names a Living Commons. Your name becomes part of daily life at Artemis.'}
                    {effectiveAmount >= 10000 && effectiveAmount < 50000 && 'Names a research lab in perpetuity. A permanent dedication.'}
                    {effectiveAmount >= 2500 && effectiveAmount < 10000 && 'Funds a named micro-scholarship for one student.'}
                    {effectiveAmount >= 500 && effectiveAmount < 2500 && 'Sponsors a student\'s travel to an Artemis node.'}
                    {effectiveAmount >= 100 && effectiveAmount < 500 && 'Funds one week of digital infrastructure.'}
                    {effectiveAmount > 0 && effectiveAmount < 100 && 'Every star counts in the founding constellation.'}
                  </span>
                </div>
              </div>
            )}

            {/* Recurring toggle */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Repeat size={16} className="text-[#8A0000]" />
                  <span className="text-[14px] font-bold text-[#141414]">Make it recurring</span>
                  <span className="text-[12px] text-gray-400">&mdash; multiply your impact</span>
                </div>
                <button onClick={() => setIsRecurring(!isRecurring)} className={`w-11 h-5 rounded-full transition-colors relative ${isRecurring ? 'bg-[#8A0000]' : 'bg-gray-300'}`}>
                  <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-all shadow-sm ${isRecurring ? 'left-[24px]' : 'left-0.5'}`} />
                </button>
              </div>
              {isRecurring && (
                <div className="flex gap-2 mt-4">
                  {['monthly', 'quarterly', 'annual'].map(f => (
                    <button key={f} onClick={() => setRecurringFreq(f)} className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest border-2 transition-all ${recurringFreq === f ? 'bg-[#8A0000] text-white border-[#8A0000]' : 'bg-white text-gray-500 border-gray-200 hover:border-[#8A0000]'}`}>{f}</button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* SPLIT: Donor details LEFT, Payment + summary RIGHT */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* LEFT — Donor info */}
            <motion.div {...slideLeft(giveAnim.visible, 0.2)} className="bg-white border border-gray-200 p-5 sm:p-8 lg:p-10 space-y-5">
              <h3 className="text-[11px] font-bold uppercase tracking-widest text-gray-900 mb-2">Your Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-gray-900 uppercase tracking-[0.15em] mb-2">Name</label>
                  <input type="text" value={donorName} onChange={(e) => setDonorName(e.target.value)} disabled={isAnonymous} placeholder={isAnonymous ? 'Anonymous' : 'Your name'} className={`w-full border border-gray-300 bg-white px-4 py-3 text-[15px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#8A0000]/30 focus:border-[#8A0000] transition-all ${isAnonymous ? 'opacity-40' : ''}`} />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-900 uppercase tracking-[0.15em] mb-2">Email *</label>
                  <input type="email" value={donorEmail} onChange={(e) => setDonorEmail(e.target.value)} placeholder="you@email.com" className="w-full border border-gray-300 bg-white px-4 py-3 text-[15px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#8A0000]/30 focus:border-[#8A0000] transition-all" />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => setIsAnonymous(!isAnonymous)} className={`w-5 h-5 border-2 flex items-center justify-center transition-colors ${isAnonymous ? 'bg-[#8A0000] border-[#8A0000]' : 'bg-white border-gray-300'}`}>
                  {isAnonymous && <Check size={12} className="text-white" />}
                </button>
                <span className="text-[13px] text-gray-600">Give anonymously</span>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-900 uppercase tracking-[0.15em] mb-2">Message (optional)</label>
                <textarea value={donorMessage} onChange={(e) => setDonorMessage(e.target.value)} placeholder="Why you're supporting Artemis..." rows={3} className="w-full border border-gray-300 bg-white px-4 py-3 text-[15px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#8A0000]/30 focus:border-[#8A0000] transition-all resize-none" />
              </div>
            </motion.div>

            {/* RIGHT — Payment method */}
            <motion.div {...slideRight(giveAnim.visible, 0.2)} className="bg-white border border-gray-200 p-5 sm:p-8 lg:p-10">
              <h3 className="text-[11px] font-bold uppercase tracking-widest text-gray-900 mb-5">Payment method</h3>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  { key: 'card' as const, icon: CreditCard, label: 'Card' },
                  { key: 'bank' as const, icon: Banknote, label: 'Bank Transfer' },
                  { key: 'crypto' as const, icon: Bitcoin, label: 'Crypto' },
                  { key: 'paypal' as const, icon: Wallet, label: 'PayPal' },
                ].map(m => (
                  <button key={m.key} onClick={() => setPaymentMethod(m.key)} className={`flex items-center gap-3 p-4 border-2 transition-all ${paymentMethod === m.key ? 'bg-[#8A0000]/5 border-[#8A0000] text-[#8A0000]' : 'bg-white border-gray-200 text-gray-500 hover:border-[#8A0000]/50'}`}>
                    <m.icon size={16} />
                    <span className="text-[11px] font-bold uppercase tracking-widest">{m.label}</span>
                  </button>
                ))}
              </div>

              {paymentMethod === 'crypto' && (
                <div className="mb-6 p-5 bg-gray-50 border border-gray-100">
                  <div className="flex items-center gap-3 mb-4"><Bitcoin size={18} className="text-[#8A0000]" /><span className="text-[14px] font-bold text-[#141414]">Cryptocurrency</span></div>
                  <div className="flex gap-2 mb-4">
                    {(['BTC', 'ETH'] as const).map(coin => (
                      <button key={coin} onClick={() => setCryptoCoin(coin)} className={`px-4 py-2 text-[11px] font-bold uppercase tracking-widest border-2 transition-all ${cryptoCoin === coin ? 'bg-[#8A0000] text-white border-[#8A0000]' : 'bg-white text-gray-500 border-gray-200'}`}>{coin}</button>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="text-[12px] text-gray-600 bg-white px-3 py-2 flex-1 break-all font-mono border border-gray-100">{CRYPTO[cryptoCoin]}</code>
                    <button onClick={() => navigator.clipboard?.writeText(CRYPTO[cryptoCoin])} className="px-3 py-2 bg-gray-100 text-gray-600 text-[9px] font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors">Copy</button>
                  </div>
                  <p className="text-[12px] text-gray-400 mt-3">After sending, email crypto@artemis.edu with your transaction hash to receive your constellation perk.</p>
                </div>
              )}

              {paymentMethod === 'bank' && (
                <div className="mb-6 p-5 bg-gray-50 border border-gray-100">
                  <div className="flex items-center gap-3 mb-4"><Banknote size={18} className="text-[#8A0000]" /><span className="text-[14px] font-bold text-[#141414]">Bank Transfer</span></div>
                  <div className="space-y-0">
                    {[['Account', 'Artemis University Founding Fund'],['Sort Code', '20-45-78'],['Account No', '73128945'],['IBAN', 'GB29 BARC 2045 7873 1289 45'],['Reference', 'ARTEMIS-FOUNDING']].map(([label, value], i) => (
                      <div key={i} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
                        <span className="text-[12px] text-gray-500">{label}</span>
                        <div className="flex items-center gap-2">
                          <code className="text-[12px] font-bold text-[#141414] font-mono">{value}</code>
                          <button onClick={() => navigator.clipboard?.writeText(value)} className="text-[9px] text-[#8A0000] font-bold uppercase tracking-widest hover:underline">Copy</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Summary at bottom */}
          <motion.div {...fadeUp(giveAnim.visible, 0.35)} className="bg-white border-2 border-gray-200 p-5 sm:p-8 lg:p-10 mt-6 shadow-sm">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              <div className="flex items-center gap-4 sm:gap-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center bg-[#8A0000]/10"><Heart size={20} className="sm:hidden text-[#8A0000]" /><Heart size={24} className="hidden sm:block text-[#8A0000]" /></div>
                <div>
                  <div className="text-[24px] sm:text-[36px] font-black text-[#141414] leading-none">{sym}{fmtShort(effectiveAmount || 0)}</div>
                  {isRecurring && <div className="text-[12px] text-[#8A0000] font-bold mt-1">{recurringFreq} &middot; {sym}{fmtShort(effectiveAmount * (recurringFreq === 'monthly' ? 12 : recurringFreq === 'quarterly' ? 4 : 1))}/yr</div>}
                </div>
              </div>
              {selectedPerk && (() => { const c = CONSTELLATIONS.find(x => x.id === selectedPerk); if (!c) return null; const Icon = c.icon; return (<div className="p-4 bg-[#8A0000]/5 border border-[#8A0000]/20"><span className="text-[10px] font-bold uppercase tracking-widest text-[#8A0000]">Your Constellation</span><div className="flex items-center gap-2 mt-1"><Icon size={14} className="text-[#8A0000]" /><span className="text-[14px] font-bold text-[#141414]">{c.title}</span></div></div>); })()}
              <button onClick={handleDonate} disabled={submitting || !donorEmail || effectiveAmount <= 0} className={`w-full lg:w-auto px-8 sm:px-12 py-4 text-[12px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${submitting || !donorEmail || effectiveAmount <= 0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-[#8A0000] text-white hover:bg-[#6B0000]'}`}>
                {submitting ? 'Processing...' : 'Complete Donation'} {!submitting && <ArrowRight size={14} />}
              </button>
            </div>
            <div className="flex items-center gap-2 mt-4 justify-center"><Lock size={10} className="text-gray-300" /><span className="text-[10px] text-gray-400">256-bit SSL encrypted</span></div>
          </motion.div>

          <AnimatePresence>
            {donationResult && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className={`mt-8 p-8 border-2 ${donationResult.success ? 'bg-emerald-50 border-emerald-300' : 'bg-red-50 border-red-300'}`}>
                <span className={`text-[16px] font-bold block mb-2 ${donationResult.success ? 'text-emerald-700' : 'text-red-700'}`}>{donationResult.success ? 'Thank you for your generosity.' : 'Donation failed.'}</span>
                <p className={`text-[14px] ${donationResult.success ? 'text-emerald-600' : 'text-red-600'}`}>{donationResult.message}</p>
                {donationResult.success && <button onClick={() => { setDonationResult(null); setSelectedAmount(null); setCustomAmount(''); setDonorName(''); setDonorEmail(''); setDonorMessage(''); setSelectedPerk(null); }} className="mt-4 text-[11px] font-bold uppercase tracking-widest text-[#8A0000] border-b border-[#8A0000] pb-1 hover:text-[#141414] hover:border-[#141414] transition-colors">Make another contribution</button>}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          8. THE FOUNDERS — Donor Wall + Events
          ══════════════════════════════════════════ */}
      <section id="founders" className="scroll-mt-[110px] py-16 sm:py-24 lg:py-36">
        <div ref={foundersAnim.ref} className="max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20">
          {/* Tier legend horizontal bar */}
          <motion.div {...clipReveal(foundersAnim.visible)} className="mb-10 sm:mb-16">
            <h2 className="text-[32px] sm:text-[44px] md:text-[56px] font-black leading-[0.92] tracking-tighter text-[#141414] mb-6 sm:mb-8">The founders</h2>
            <div className="flex flex-wrap gap-6 lg:gap-12 pb-8 border-b border-gray-200">
              {[
                { name: "Chancellor's Circle", range: '$500K+', icon: Crown, color: '#8A0000' },
                { name: "Founder's Society", range: '$50K\u2013$500K', icon: Star, color: '#4338ca' },
                { name: 'Guild Partners', range: '$5K\u2013$50K', icon: Trophy, color: '#0e7490' },
                { name: 'Community', range: 'Up to $5K', icon: Heart, color: '#15803d' },
              ].map((t, i) => {
                const TIcon = t.icon;
                return (
                  <div key={i} className="flex items-center gap-3">
                    <TIcon size={18} style={{ color: t.color }} />
                    <div>
                      <div className="text-[13px] font-bold text-[#141414]">{t.name}</div>
                      <div className="text-[11px] text-gray-400">{t.range}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* LEFT — Donor wall (wider) */}
            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {DONORS.map((d, i) => (
                  <motion.div key={i} {...fadeUp(foundersAnim.visible, i * 0.04)} className="flex items-start gap-3 p-4 bg-gray-50 hover:bg-white hover:border-gray-300 border border-gray-100 transition-colors">
                    <div className="shrink-0 w-9 h-9 flex items-center justify-center text-[13px] font-bold" style={{ backgroundColor: TIER_COLORS[d.tier] + '15', color: TIER_COLORS[d.tier] }}>{d.name.charAt(0)}</div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[13px] font-bold text-[#141414] truncate">{d.name}</span>
                        <span className="text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 shrink-0" style={{ color: TIER_COLORS[d.tier], backgroundColor: TIER_COLORS[d.tier] + '10' }}>{TIER_LABELS[d.tier]}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[12px] font-bold text-[#8A0000]">{sym}{fmtShort(d.amount)}</span>
                        <span className="text-[10px] text-gray-400">{d.date}</span>
                      </div>
                      {d.msg && <p className="text-[11px] text-gray-400 mt-1 italic truncate">&ldquo;{d.msg}&rdquo;</p>}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* RIGHT — Upcoming events */}
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-[180px]">
                <h3 className="text-[18px] font-bold text-[#141414] mb-6">Upcoming Events</h3>
                <div className="space-y-0">
                  {EVENTS.map((ev, i) => {
                    const Icon = ev.icon;
                    const dateParts = ev.date.split(' ');
                    return (
                      <motion.div key={i} {...fadeUp(foundersAnim.visible, i * 0.08)} className="group flex items-start gap-4 py-4 border-b border-gray-100 last:border-0 hover:border-[#8A0000] transition-colors cursor-default">
                        <div className="shrink-0 w-[48px] text-center pt-0.5">
                          <div className="text-[10px] font-bold uppercase tracking-widest text-[#8A0000] mb-0.5">{ev.weekday}</div>
                          <div className="text-[18px] font-black text-[#141414] leading-none tabular-nums">{dateParts[0]}</div>
                          <div className="text-[10px] text-gray-400 uppercase">{dateParts[1]}</div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-[9px] font-bold uppercase tracking-widest text-[#8A0000]">{ev.type}</span>
                            {ev.virtual && <span className="text-[8px] font-bold uppercase tracking-widest px-1.5 py-0.5 bg-gray-100 text-gray-500">Virtual</span>}
                          </div>
                          <h4 className="text-[14px] font-bold text-[#141414] group-hover:text-[#8A0000] transition-colors leading-tight mb-0.5">{ev.title}</h4>
                          <div className="flex items-center gap-3 text-[11px] text-gray-400">
                            <span className="flex items-center gap-1"><MapPin size={9} />{ev.location}</span>
                            {ev.price !== null && ev.price > 0 && <span>{sym}{ev.price}</span>}
                            {ev.price === 0 && <span className="text-[#8A0000] font-bold">Free</span>}
                          </div>
                          {ev.capacity && (
                            <div className="mt-1.5">
                              <div className="h-1 bg-gray-200 w-24"><div className="h-full bg-[#8A0000]/60" style={{ width: `${(ev.registered / ev.capacity) * 100}%` }} /></div>
                              <span className="text-[9px] text-gray-400 mt-0.5 block">{ev.registered}/{ev.capacity}</span>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
                <button onClick={() => goToPage('contact-us')} className="flex items-center space-x-3 py-2 mt-4 border-b-2 border-[#8A0000] text-[#8A0000] text-[11px] font-bold uppercase tracking-[0.2em] hover:text-[#141414] hover:border-[#141414] transition-all group">
                  <span>Contact for Events</span><ArrowRight size={12} className="group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          9. BEYOND THE FOUNDING + CONTACT
          ══════════════════════════════════════════ */}
      <section id="beyond" className="scroll-mt-[110px] bg-gray-50 py-16 sm:py-24 lg:py-36">
        <div ref={beyondAnim.ref} className="max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20">
          {/* Four phase cards with images */}
          <motion.h2 {...clipReveal(beyondAnim.visible)} className="text-[32px] sm:text-[44px] md:text-[56px] font-black leading-[0.92] tracking-tighter text-[#141414] mb-4">
            Beyond the founding
          </motion.h2>
          <motion.p {...fadeUp(beyondAnim.visible, 0.1)} className="text-[15px] sm:text-[16px] text-gray-600 max-w-2xl leading-relaxed mb-10 sm:mb-16">When the founding goal is reached, the campaign evolves. The constellation endures. The community deepens. The mission continues &mdash; not as an ending, but as a beginning. Four phases to build a university that spans the world.</motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-12 sm:mb-24">
            {[
              { phase: 'Phase I', title: 'The Founding', period: '2025 \u2014 2028', goal: sym + '25M', desc: 'Raise the capital. Build the first residential hub. Enrol the inaugural cohort. Establish the endowment. Create the digital estate. Everything from nothing. Your donation builds the physical and intellectual foundations of a university that will endure for centuries \u2014 and your name is inscribed in its first chapter.', icon: Rocket, img: 'https://images.unsplash.com/photo-1594750852563-5ed8e0421d40?auto=format&fit=crop&q=80&w=600' },
              { phase: 'Phase II', title: 'The Expansion', period: '2028 \u2014 2033', goal: sym + '50M', desc: 'Scale to 15 nodes on 5 continents. Triple the student body. Launch the next generation of research institutes and residential colleges. The giving community becomes permanent philanthropic infrastructure \u2014 an engine that accelerates rather than a campaign that ends.', icon: Globe, img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600' },
              { phase: 'Phase III', title: 'The Network', period: '2033 \u2014 2040', goal: sym + '150M', desc: 'Expand to 50 nodes across every inhabited continent. 10,000 students. 100 permanently endowed institutes. A fully realised planetary university where knowledge flows without borders and every scholar has a home. The endowment becomes self-sustaining.', icon: Landmark, img: 'https://images.unsplash.com/photo-1739298061766-e2751d92e9db?auto=format&fit=crop&q=80&w=600' },
              { phase: 'Phase IV', title: 'The Perpetuity', period: '2040 \u2014 Beyond', goal: 'Perpetual', desc: 'Artemis operates in perpetuity, independent of tuition dependency, government funding, or commercial pressure. 100+ nodes. A global scholarly commons that renews itself with each generation. The Founding Campaign becomes the Artemis Foundation \u2014 a permanent charitable trust stewarding the mission for centuries.', icon: Building2, img: 'https://images.unsplash.com/photo-1624555130296-e551faf8969b?auto=format&fit=crop&q=80&w=600' },
            ].map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div key={i} {...scaleIn(beyondAnim.visible, i * 0.12)} className="bg-white border border-gray-200 overflow-hidden hover:border-[#8A0000]/30 transition-colors group">
                  <div className="relative h-[160px] sm:h-[200px] overflow-hidden">
                    <img src={p.img} alt={p.title} className="absolute inset-0 w-full h-full object-cover grayscale group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4 sm:bottom-4 sm:left-6 sm:right-6 flex items-end justify-between">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#8A0000] block mb-1">{p.phase}</span>
                        <h4 className="text-[18px] sm:text-[22px] font-bold text-white">{p.title}</h4>
                      </div>
                      <div className="text-right">
                        <div className="text-[16px] sm:text-[20px] font-black text-white leading-none">{p.goal}</div>
                        <div className="text-[9px] font-bold uppercase tracking-widest text-white/50">{p.period}</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 sm:p-6 lg:p-8">
                    <Icon size={22} className="text-[#8A0000] mb-3" />
                    <p className="text-[14px] text-gray-600 leading-relaxed">{p.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Parallax image card with future stats */}
          <motion.div {...scaleIn(beyondAnim.visible, 0.3)} className="relative w-full min-h-[320px] sm:min-h-[380px] md:min-h-[460px] overflow-hidden mb-12 sm:mb-24">
            <img src="https://images.unsplash.com/photo-1594750852563-5ed8e0421d40?auto=format&fit=crop&q=80&w=1400" alt="The Future of Artemis" className="absolute inset-0 w-full h-full object-cover grayscale" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
            <div className="relative z-10 flex items-end h-full min-h-[320px] sm:min-h-[380px] md:min-h-[460px] p-4 sm:p-8 md:p-14">
              <div className="bg-white w-full sm:max-w-sm md:max-w-lg p-4 sm:p-6 md:p-8 shadow-xl">
                <div className="text-[10px] font-bold text-[#8A0000] tracking-widest mb-3 uppercase">By the Numbers</div>
                <h3 className="text-[20px] sm:text-[24px] font-bold text-[#141414] mb-4 sm:mb-6 leading-tight">A university built to span the world</h3>
                <div className="grid grid-cols-2 gap-4 sm:gap-6">
                  {[{ value: '50+', label: 'Global Nodes', detail: 'Residential hubs across every continent' },{ value: '10,000', label: 'Students', detail: 'Full capacity across the network' },{ value: '100', label: 'Institutes', detail: 'Permanently endowed, independent' },{ value: sym+'150M', label: 'Endowment', detail: 'Self-sustaining by Phase III' }].map((s, i) => (
                    <div key={i} className="relative pl-4">
                      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#8A0000]"></div>
                      <div className="text-[18px] sm:text-[24px] font-black text-[#141414] leading-none mb-1">{s.value}</div>
                      <div className="text-[8px] sm:text-[9px] font-bold uppercase tracking-widest text-[#8A0000] leading-tight mb-0.5">{s.label}</div>
                      <div className="text-[9px] sm:text-[10px] text-gray-500 leading-snug">{s.detail}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Voices from the Future */}
          <div className="mb-12 sm:mb-24">
            <div className="relative flex items-center mb-8 sm:mb-14">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="mx-4 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">Voices from the Future</span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20">
              {[
                { quote: "I was the first in my village to attend university \u2014 and the first to attend one that didn't care about my village's wealth. Artemis saw my mind, not my postcode. The scholarship that brought me here was funded by someone I will never meet, but whose name I carry in my thesis dedication.", name: 'Amara Osei', role: 'Inaugural Cohort, Weavers Commons', loc: 'Accra \u2192 Geneva' },
                { quote: "I donated because I remember being seventeen and brilliant and broke. I remember the university that let me in anyway \u2014 and how that changed everything. Artemis is that chance, scaled to the planet. I couldn't not give.", name: 'Dr. Elena Vasquez', role: "Chancellor's Circle, Founding Donor", loc: 'Mexico City' },
              ].map((v, i) => (
                <motion.div key={i} {...fadeUp(beyondAnim.visible, i * 0.15)}>
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-[#8A0000] opacity-20 mb-4 sm:mb-6" viewBox="0 0 24 24" fill="currentColor"><path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"/></svg>
                  <p className="text-[15px] sm:text-[17px] md:text-[19px] text-gray-700 leading-relaxed mb-5 sm:mb-8 font-light italic">{v.quote}</p>
                  <div className="text-[13px] sm:text-[14px] font-bold text-[#141414]">{v.name}</div>
                  <div className="text-[11px] sm:text-[12px] text-gray-500">{v.role} &mdash; {v.loc}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Contact — 3-column layout + inline form */}
          <motion.div {...fadeUp(beyondAnim.visible, 0.3)}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              <div className="lg:col-span-5">
                <h3 className="text-[22px] sm:text-[28px] font-bold text-[#141414] mb-3 sm:mb-4">Talk to our advancement team</h3>
                <p className="text-[14px] sm:text-[15px] text-gray-600 leading-relaxed mb-6 sm:mb-8">Whether you are considering a major gift, exploring naming opportunities, or want to discuss how your contribution can have the greatest impact &mdash; our advancement team is here to help.</p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                  <div>
                    <div className="text-[9px] font-bold uppercase tracking-widest text-[#8A0000] mb-2">Email</div>
                    <a href="mailto:donate@artemis.edu" className="text-[14px] font-bold text-[#141414] hover:text-[#8A0000] transition-colors">donate@artemis.edu</a>
                  </div>
                  <div>
                    <div className="text-[9px] font-bold uppercase tracking-widest text-[#8A0000] mb-2">Phone</div>
                    <p className="text-[14px] font-bold text-[#141414]">+44 (0) 20 7946 0958</p>
                  </div>
                  <div>
                    <div className="text-[9px] font-bold uppercase tracking-widest text-[#8A0000] mb-2">Post</div>
                    <p className="text-[13px] text-gray-600 leading-snug">Advancement Office<br />Rue de Lausanne 47<br />1201 Geneva, CH</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="bg-white border border-gray-200 p-5 sm:p-8">
                  <h4 className="text-[14px] font-bold text-[#141414] mb-5">Send us a message</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-900 uppercase tracking-[0.15em] mb-2">Your Name *</label>
                      <input type="text" placeholder="Full name" className="w-full border border-gray-300 bg-white px-4 py-3 text-[15px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#8A0000]/30 focus:border-[#8A0000] transition-all" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-900 uppercase tracking-[0.15em] mb-2">Email *</label>
                      <input type="email" placeholder="you@email.com" className="w-full border border-gray-300 bg-white px-4 py-3 text-[15px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#8A0000]/30 focus:border-[#8A0000] transition-all" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-[10px] font-bold text-gray-900 uppercase tracking-[0.15em] mb-2">Area of Interest</label>
                    <select className="w-full border border-gray-300 bg-white px-4 py-3 text-[15px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#8A0000]/30 focus:border-[#8A0000] transition-all">
                      <option>General enquiry</option>
                      <option>Naming opportunities</option>
                      <option>Planned giving / Estate plans</option>
                      <option>Securities / Stock transfer</option>
                      <option>Employer matching</option>
                      <option>Donor-advised fund</option>
                      <option>Cryptocurrency</option>
                      <option>In-kind contributions</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="mt-4">
                    <label className="block text-[10px] font-bold text-gray-900 uppercase tracking-[0.15em] mb-2">Message</label>
                    <textarea rows={3} placeholder="Tell us about your philanthropic goals..." className="w-full border border-gray-300 bg-white px-4 py-3 text-[15px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#8A0000]/30 focus:border-[#8A0000] transition-all resize-none" />
                  </div>
                  <button className="mt-4 w-full py-3 bg-[#8A0000] text-white text-[11px] font-bold uppercase tracking-widest hover:bg-[#6B0000] transition-colors flex items-center justify-center gap-2">
                    Send Enquiry <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          Final CTA — Crimson Bar
          ══════════════════════════════════════════ */}
      <section className="bg-[#8A0000] py-10 sm:py-16">
        <div className="max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
          <div className="text-center md:text-left">
            <h2 className="text-[20px] sm:text-[32px] md:text-[40px] font-extrabold leading-tight tracking-tighter text-white mb-2">
              Every great university began<br />with someone who believed.
            </h2>
            <p className="text-[14px] sm:text-[16px] text-white/70 leading-relaxed max-w-lg mx-auto md:mx-0">This is your moment to place a star in a constellation that will guide scholars for centuries. The next chapter starts with you.</p>
          </div>
          <button onClick={() => document.getElementById('give')?.scrollIntoView({ behavior: 'smooth' })} className="flex items-center space-x-3 bg-white text-[#8A0000] px-8 sm:px-10 py-3 sm:py-4 text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.2em] hover:bg-gray-100 transition-colors shrink-0 group">
            <span>Give Now</span>
            <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </section>

      <SubPageFooter goToPage={goToPage} />
    </div>
  );
}
