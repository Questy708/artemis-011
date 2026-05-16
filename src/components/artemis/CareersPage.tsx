'use client';

import React, { useState, useEffect, useRef } from 'react';
import SubPageFooter from '@/components/artemis/SubPageFooter';
import OnThisPageNav, { useActiveSection } from '@/components/artemis/OnThisPageNav';
import { motion } from 'framer-motion';
import {
  ArrowRight, ChevronDown, MapPin, Building2, Users, BookOpen,
  FlaskConical, Globe, Shield, Zap, Star, Crown, Mail,
  Scale, Brain, Cpu, Heart, Landmark, Microscope,
  GraduationCap, Briefcase, PenTool, Languages,
  BarChart3, Gavel, Stethoscope, Atom, Beaker,
  Monitor, Cog, Wrench
} from 'lucide-react';

interface Props {
  goToPage: (page: string) => void;
}

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
const fadeUp = (visible: boolean, delay = 0) => ({
  initial: { y: 30, opacity: 0 },
  animate: visible ? { y: 0, opacity: 1 } : {},
  transition: { duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] },
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

/* ─── Data ─── */
const COMPENSATION_TABLE = [
  { title: 'Distinguished Professor', base: '$36,000/yr', london: '$48,600', nairobi: '$37,800', kampala: '$36,000' },
  { title: 'Professor', base: '$30,000/yr', london: '$40,500', nairobi: '$31,500', kampala: '$30,000' },
  { title: 'Associate Professor', base: '$24,000/yr', london: '$32,400', nairobi: '$25,200', kampala: '$24,000' },
  { title: 'Assistant Professor', base: '$18,000/yr', london: '$24,300', nairobi: '$18,900', kampala: '$18,000' },
  { title: 'Assistant Teaching Professor', base: '$12,000/yr', london: '$16,200', nairobi: '$12,600', kampala: '$12,000' },
];

const WHAT_YOU_GET = [
  {
    icon: Globe,
    title: 'A mission that matters',
    desc: '200 million people are qualified for university and will never attend. You will change that number.',
  },
  {
    icon: Shield,
    title: 'Academic freedom',
    desc: 'No department politics. No tenure committee. No grant cycle. Your Center has a 20-year runway. Your research is yours for 7 years, then it belongs to everyone. That is the deal. You know it going in.',
  },
  {
    icon: GraduationCap,
    title: 'The Oxford model, global',
    desc: 'Tutorials, not lectures. Small groups, not auditoriums. Each student has a named Director of Studies. Each College is a community, not a campus. You will teach the way universities were designed to teach — before the industrial model broke them.',
  },
  {
    icon: MapPin,
    title: '50 locations',
    desc: 'Venice. Tokyo. Nairobi. Kigali. São Paulo. Bangkok. Istanbul. London. Singapore. Cape Town. A repurposed convent. A converted warehouse. A former caravansarai. Every College is a real place in a real city — not a Zoom room with a logo.',
  },
  {
    icon: Cog,
    title: 'No administration',
    desc: "We applied the same method Elon Musk used to cut space exploration costs by 90%: question every assumption, strip to commodity inputs, rebuild from the atoms up. Our IT department is one DevOps engineer. Our library is one digital librarian plus the world's greatest consortium access. Our admissions system is Airtable and $99 deposits. No bureaucracy. No committees. No deans who don't teach. Just scholars, students, and a mission.",
  },
];

const POSITIONS = [
  { role: 'Division Heads', count: 5, rank: 'Distinguished Professors', desc: 'Set the intellectual direction of an entire wing of human knowledge across 50 Colleges and 6 continents', icon: Crown },
  { role: 'Professors', count: 15, rank: 'Center Directors', desc: 'Build world-class research operations from scratch with 20-year runways', icon: FlaskConical },
  { role: 'Associate Professors', count: 50, rank: 'Senior Scholars', desc: 'Anchor the research output and mentor the next generation', icon: Star },
  { role: 'Assistant Professors', count: 370, rank: 'Research Faculty', desc: 'On the front lines of inquiry, with protected research time (no more than 40% teaching load)', icon: Brain },
  { role: 'Assistant Teaching Professors', count: 1560, rank: 'The Backbone', desc: 'Tutorial leaders. Student advisors. Pedagogical innovators. First-class citizens at Artemis — with their own promotion ladder, research allowances, and governance rights.', icon: BookOpen },
];

const DIVISIONS = [
  {
    numeral: 'I',
    title: 'Humanities & Social Sciences',
    faculty: '~400',
    centers: 6,
    programs: 16,
    students: '~24,000',
    fields: ['Philosophy & Ethics', 'History & Cultural Studies', 'Economics & Political Economy', 'Sociology & Anthropology', 'Languages, Literature & Translation', 'Media & Communications'],
    tagline: 'Human understanding is not a luxury — it is the operating system of civilization.',
    icon: Scale,
    color: '#8A0000',
  },
  {
    numeral: 'II',
    title: 'Natural Sciences & Mathematics',
    faculty: '~400',
    centers: 4,
    programs: 10,
    students: '~16,000',
    fields: ['Mathematics & Statistics', 'Physics & Astronomy', 'Chemistry & Materials', 'Earth & Environmental Sciences'],
    tagline: 'The natural sciences are how civilization understands what IS.',
    icon: Atom,
    color: '#6B0000',
  },
  {
    numeral: 'III',
    title: 'Engineering & Technology',
    faculty: '~400',
    centers: 3,
    programs: 10,
    students: '~25,000',
    fields: ['Computer Science & AI', 'Engineering Sciences', 'Biomedical Engineering'],
    tagline: 'Engineering is how civilization builds what SHOULD exist. The largest division because the demand is the largest.',
    icon: Cpu,
    color: '#4a0e0e',
  },
  {
    numeral: 'IV',
    title: 'Business, Policy & Global Affairs',
    faculty: '~400',
    centers: 3,
    programs: 10,
    students: '~20,000',
    fields: ['Business & Entrepreneurship', 'Policy, Governance & International Affairs', 'Law & Justice'],
    tagline: 'Civilization is not self-organizing. These are not soft skills — they are the hardest skills civilization demands.',
    icon: Gavel,
    color: '#3d0808',
  },
  {
    numeral: 'V',
    title: 'Health & Life Sciences',
    faculty: '~400',
    centers: 3,
    programs: 9,
    students: '~15,000',
    fields: ['Biological Sciences', 'Public Health & Epidemiology', 'Psychology & Cognitive Sciences'],
    tagline: 'The oldest question in civilization: how do we stay alive?',
    icon: Stethoscope,
    color: '#2d0505',
  },
];

const COLLEGES = {
  central: {
    label: 'Central Nodes (3)',
    cities: ['Venice', 'Valletta', 'San Juan'],
    students: '~5,000 students each',
  },
  tierA: {
    label: 'Tier A (12)',
    cities: ['London', 'Tokyo', 'Singapore', 'São Paulo', 'Seoul', 'Sydney', 'Tel Aviv', 'Dubai', 'Berlin', 'Toronto', 'Hong Kong', 'Cape Town'],
    students: '~2,500 students each',
  },
  tierB: {
    label: 'Tier B (18)',
    cities: ['Medellín', 'Nairobi', 'Bangkok', 'Istanbul', 'Mexico City', 'Buenos Aires', 'Casablanca', 'Amman', 'Kuala Lumpur', 'Bogotá', 'Hanoi', 'Accra', 'Tbilisi', 'Belgrade', 'Montevideo', 'Lima', 'Phnom Penh', 'Dakar'],
    students: '~2,000 students each',
  },
  tierC: {
    label: 'Tier C (17)',
    cities: ['Kigali', 'Dhaka', 'Kampala', 'Karachi', 'Addis Ababa', 'Colombo', 'Lusaka', 'Kathmandu', 'Managua', 'Bishkek', 'Yerevan', 'Maputo', 'Tashkent', 'Baku', 'Siem Reap', 'Mombasa', 'Cusco'],
    students: '~1,100 students each',
  },
};

const CENTERS = [
  { num: 1, name: 'Philosophy & Ethics', div: 'I', projects: ['The Ethics Threshold', 'Global Moral Frameworks'] },
  { num: 2, name: 'History & Cultural Studies', div: 'I', projects: ['Decolonizing the Archive', 'Oral Histories Project'] },
  { num: 3, name: 'Economics & Political Economy', div: 'I', projects: ['The $3K Economy', 'Informal Sector Atlas'] },
  { num: 4, name: 'Sociology & Anthropology', div: 'I', projects: ['Distributed Community Study', 'Migration & Belonging'] },
  { num: 5, name: 'Languages, Literature & Translation', div: 'I', projects: ['The Translation Engine', 'World Literature Canon Revisited'] },
  { num: 6, name: 'Media & Communications', div: 'I', projects: ['The Distributed Press', 'Misinformation Observatory'] },
  { num: 7, name: 'Mathematics & Statistics', div: 'II', projects: ['Open Algorithms', 'Statistical Literacy Initiative'] },
  { num: 8, name: 'Physics & Astronomy', div: 'II', projects: ['Distributed Telescope Network', 'Open Physics'] },
];

const SURVIVORS = [
  { role: 'Node Coordinators', count: 50, remains: 'One per College. Roof, lock, wifi, security. Period.' },
  { role: 'DevOps Engineer', count: 1, remains: 'Runs the entire digital infrastructure across 50 hubs' },
  { role: 'Digital Librarian', count: 1, remains: 'Consortium access + open access + 1 database' },
  { role: 'Admissions Lead', count: 1, remains: 'Airtable. Stripe. Zero ads.' },
  { role: 'Central Leadership', count: 11, remains: 'President, 5 Division Heads, COO, CFO, CTO, CPO, CCO, CAO, Dean of Students, Registrar, General Counsel' },
];

/* ─── Animated Counter ─── */
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

/* ─── Division Accordion ─── */
function DivisionCard({ division, index, isOpen, onToggle }: { division: typeof DIVISIONS[0]; index: number; isOpen: boolean; onToggle: () => void }) {
  const Icon = division.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      viewport={{ once: true }}
      className="border border-gray-200 bg-white"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-start sm:items-center gap-4 sm:gap-6 p-5 sm:p-7 text-left hover:bg-gray-50/50 transition-colors"
      >
        <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center shrink-0" style={{ backgroundColor: division.color }}>
          <Icon size={22} className="text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1">
            <span className="text-[11px] font-black tracking-[0.2em] text-gray-400">DIV {division.numeral}</span>
            <span className="text-[10px] text-gray-300">|</span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A0000]">{division.faculty} faculty · {division.centers} Centers · {division.programs} programs · {division.students} students</span>
          </div>
          <h4 className="text-[18px] sm:text-[22px] font-black text-[#141414] leading-tight">{division.title}</h4>
        </div>
        <svg
          className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="overflow-hidden"
        >
          <div className="px-5 sm:px-7 pb-6 sm:pb-8 pt-2 border-t border-gray-100">
            {/* Fields */}
            <div className="flex flex-wrap gap-2 mb-5">
              {division.fields.map((field, i) => (
                <span key={i} className="text-[12px] font-semibold px-3 py-1.5 bg-gray-50 border border-gray-100 text-gray-700">
                  {field}
                </span>
              ))}
            </div>
            {/* Tagline */}
            <p className="text-[15px] sm:text-[16px] text-gray-500 leading-[1.7] italic">{division.tagline}</p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

/* ─── Main Component ─── */
export default function CareersPage({ goToPage }: Props) {
  const activeSection = useActiveSection(['call', 'deal', 'what-you-get', 'what-we-need', 'divisions', 'colleges', 'centers', 'knife', 'seven-year', 'apply', 'closing']);
  const [openDivision, setOpenDivision] = useState<number | null>(0);

  const heroAnim = useInView(0);
  const callAnim = useInView(0);
  const dealAnim = useInView(0);
  const getAnim = useInView(0);
  const needAnim = useInView(0);
  const divAnim = useInView(0);
  const collAnim = useInView(0);
  const centAnim = useInView(0);
  const knifeAnim = useInView(0);
  const sevenAnim = useInView(0);
  const applyAnim = useInView(0);
  const closingAnim = useInView(0);

  return (
    <div className="flex flex-col bg-white">

      {/* ══════════════════════════════════════════
          1. HERO
          ══════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden">
        <div className="max-w-[1600px] mx-auto">
          <div className="relative w-full h-[40vh] sm:h-[50vh] min-h-[320px] sm:min-h-[420px] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1800"
              alt="Work at Artemis"
              className="absolute inset-0 w-full h-full object-cover grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="relative z-10 flex flex-col justify-end h-full max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 pb-10 sm:pb-16">
              <div ref={heroAnim.ref} className={`transition-all duration-700 ${heroAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div className="mb-6 flex items-center space-x-3">
                  <span className="w-8 h-[1px] bg-[#8A0000]"></span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">2,000 Positions · 50 Colleges · 35 Countries</span>
                </div>
                <h1 className="text-[30px] sm:text-[48px] md:text-[60px] lg:text-[72px] font-extrabold leading-[1.02] tracking-tighter text-white mb-4 uppercase">
                  Work at Artemis
                </h1>
                <p className="text-[16px] sm:text-[20px] md:text-[24px] text-white/70 max-w-2xl leading-relaxed font-light">
                  You are not applying for a job. You are answering a call.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <OnThisPageNav
        sections={[
          { id: 'call', label: 'The Call' },
          { id: 'deal', label: 'The Deal' },
          { id: 'what-you-get', label: 'What You Get' },
          { id: 'what-we-need', label: 'What We Need' },
          { id: 'divisions', label: 'Five Divisions' },
          { id: 'colleges', label: '50 Colleges' },
          { id: 'centers', label: 'Centers' },
          { id: 'knife', label: 'After the Knife' },
          { id: 'seven-year', label: '7-Year Rule' },
          { id: 'apply', label: 'How to Apply' },
          { id: 'closing', label: 'Closing' },
        ]}
        activeSection={activeSection}
      />

      {/* ══════════════════════════════════════════
          2. THE CALL
          ══════════════════════════════════════════ */}
      <section id="call" className="scroll-mt-[110px] py-16 sm:py-24 lg:py-36">
        <div ref={callAnim.ref} className="max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20">
          <motion.p {...fadeUp(callAnim.visible)} className="text-[17px] sm:text-[20px] md:text-[22px] leading-[1.8] text-gray-600 mb-8 max-w-4xl">
            The University of Artemis is the first university designed from first principles since the Renaissance. 100,000 students. 50 Colleges. 35 countries. $3,000 tuition. 12.4% operating costs. Self-sustaining from Day 1.
          </motion.p>

          <motion.p {...fadeUp(callAnim.visible, 0.15)} className="text-[17px] sm:text-[20px] md:text-[22px] leading-[1.8] text-gray-600 mb-8 max-w-4xl">
            We are hiring 2,000 faculty to build it.
          </motion.p>

          <motion.p {...fadeUp(callAnim.visible, 0.25)} className="text-[17px] sm:text-[20px] md:text-[22px] leading-[1.8] text-[#141414] font-semibold max-w-4xl mb-8">
            Not to maintain it. To build it. Every lecture written from scratch. Every tutorial pairings system invented. Every Center of Inquiry launched with nothing but a mission and a 20-year runway. Every College — from Venice to Kigali — opened by people who chose to be there when there was nothing there yet.
          </motion.p>

          <motion.div {...fadeUp(callAnim.visible, 0.35)} className="max-w-4xl">
            <div className="border-l-4 border-[#8A0000] pl-6 sm:pl-8 py-2">
              <p className="text-[18px] sm:text-[22px] md:text-[24px] font-bold text-[#8A0000] leading-[1.5]">
                If that scares you, this is not for you. If that excites you, read on.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          3. THE DEAL
          ══════════════════════════════════════════ */}
      <section id="deal" className="scroll-mt-[110px] py-16 sm:py-24 lg:py-36 bg-gray-50 border-y border-gray-100">
        <div ref={dealAnim.ref} className="max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20">
          <motion.h2 {...slideLeft(dealAnim.visible)} className="text-[28px] sm:text-[40px] md:text-[52px] font-black leading-[1] tracking-tighter text-[#141414] mb-10 sm:mb-16">
            The Deal
          </motion.h2>

          <motion.p {...fadeUp(dealAnim.visible, 0.1)} className="text-[16px] sm:text-[18px] leading-[1.8] text-gray-600 max-w-4xl mb-10">
            We will be honest with you, because we cannot afford to be anything else.
          </motion.p>

          {/* Years 1-5 & Year 6+ */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 mb-12 sm:mb-16">
            <motion.div {...slideLeft(dealAnim.visible, 0.15)} className="bg-white border border-gray-200 p-6 sm:p-8 lg:p-10">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#8A0000] block mb-4">Years 1–5</span>
              <h3 className="text-[22px] sm:text-[28px] font-black text-[#141414] mb-4">Survival Stipends</h3>
              <p className="text-[15px] sm:text-[16px] leading-[1.8] text-gray-600">
                UN Model 3 compensation — a base stipend with a location multiplier. No benefits package. No meals subsidy. No dwelling subsidy. Housing, meals, health insurance, transport — you pay yourself from the stipend. The post adjustment accounts for where you live.
              </p>
            </motion.div>

            <motion.div {...slideRight(dealAnim.visible, 0.15)} className="bg-white border border-gray-200 p-6 sm:p-8 lg:p-10">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#8A0000] block mb-4">Year 6+</span>
              <h3 className="text-[22px] sm:text-[28px] font-black text-[#141414] mb-4">Career Compensation</h3>
              <p className="text-[15px] sm:text-[16px] leading-[1.8] text-gray-600">
                The Y6+ Quality Upgrade Fund transitions all faculty from survival to career-level pay. This is not a promise. It is built into the financial architecture — $30M per year allocated from the annual surplus.
              </p>
            </motion.div>
          </div>

          {/* Compensation Table */}
          <motion.div {...fadeUp(dealAnim.visible, 0.25)} className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b-2 border-[#8A0000]">
                  <th className="text-left text-[10px] font-black uppercase tracking-[0.2em] text-[#8A0000] py-4 pr-4">Title</th>
                  <th className="text-right text-[10px] font-black uppercase tracking-[0.2em] text-[#8A0000] py-4 px-4">Base Stipend</th>
                  <th className="text-right text-[10px] font-black uppercase tracking-[0.2em] text-[#8A0000] py-4 px-4">In London (×1.35)</th>
                  <th className="text-right text-[10px] font-black uppercase tracking-[0.2em] text-[#8A0000] py-4 px-4">In Nairobi (×1.05)</th>
                  <th className="text-right text-[10px] font-black uppercase tracking-[0.2em] text-[#8A0000] py-4 pl-4">In Kampala (×1.00)</th>
                </tr>
              </thead>
              <tbody>
                {COMPENSATION_TABLE.map((row, i) => (
                  <tr key={i} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 pr-4 text-[13px] sm:text-[14px] font-semibold text-[#141414]">{row.title}</td>
                    <td className="py-4 px-4 text-[13px] sm:text-[14px] text-right font-bold text-[#141414]">{row.base}</td>
                    <td className="py-4 px-4 text-[13px] sm:text-[14px] text-right text-gray-600">${row.london.replace('$', '')}</td>
                    <td className="py-4 px-4 text-[13px] sm:text-[14px] text-right text-gray-600">${row.nairobi.replace('$', '')}</td>
                    <td className="py-4 pl-4 text-[13px] sm:text-[14px] text-right text-gray-600">${row.kampala.replace('$', '')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          <motion.div {...fadeUp(dealAnim.visible, 0.35)} className="mt-8 sm:mt-10 border-l-4 border-gray-300 pl-6 py-2 max-w-4xl">
            <p className="text-[15px] sm:text-[16px] leading-[1.8] text-gray-500 italic">
              This is a fellowship stipend, not an employment contract. It is designed so you can survive and do your best work. It is not designed to be comfortable. Comfort is what Year 6 is for.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          4. WHAT YOU GET
          ══════════════════════════════════════════ */}
      <section id="what-you-get" className="scroll-mt-[110px] py-16 sm:py-24 lg:py-36">
        <div ref={getAnim.ref} className="max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20">
          <motion.h2 {...slideLeft(getAnim.visible)} className="text-[28px] sm:text-[40px] md:text-[52px] font-black leading-[1] tracking-tighter text-[#141414] mb-12 sm:mb-20">
            What You Get
          </motion.h2>

          <div className="space-y-10 sm:space-y-14">
            {WHAT_YOU_GET.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  {...fadeUp(getAnim.visible, i * 0.1)}
                  className="flex gap-5 sm:gap-8 items-start"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center bg-[#8A0000]/5 border border-[#8A0000]/10 shrink-0">
                    <Icon size={22} className="text-[#8A0000]" />
                  </div>
                  <div>
                    <h4 className="text-[18px] sm:text-[22px] font-black text-[#141414] mb-2">{item.title}</h4>
                    <p className="text-[15px] sm:text-[16px] leading-[1.8] text-gray-600">{item.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          5. WHAT WE NEED
          ══════════════════════════════════════════ */}
      <section id="what-we-need" className="scroll-mt-[110px] py-16 sm:py-24 lg:py-36 bg-[#141414] text-white">
        <div ref={needAnim.ref} className="max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20">
          <motion.h2 {...slideLeft(needAnim.visible)} className="text-[28px] sm:text-[40px] md:text-[52px] font-black leading-[1] tracking-tighter text-white mb-6 sm:mb-10">
            What We Need
          </motion.h2>

          <motion.p {...fadeUp(needAnim.visible, 0.1)} className="text-[16px] sm:text-[18px] leading-[1.8] text-white/70 max-w-4xl mb-12 sm:mb-16">
            We need 2,000 people who can build something from nothing. Who can write a curriculum that has never been written. Who can teach a tutorial in a room that was a warehouse yesterday. Who can live in Kampala on $12,000 a year and be grateful — not because the money is enough, but because the work is worth it.
          </motion.p>

          <div className="space-y-0">
            {POSITIONS.map((pos, i) => {
              const Icon = pos.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  viewport={{ once: true }}
                  className="flex items-start sm:items-center gap-5 sm:gap-8 py-6 sm:py-8 border-b border-white/10 group"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center bg-[#8A0000] shrink-0">
                    <Icon size={20} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 mb-1">
                      <span className="text-[18px] sm:text-[22px] font-black text-white">{pos.count}</span>
                      <span className="text-[16px] sm:text-[18px] font-bold text-white/90">{pos.role}</span>
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8A0000]">{pos.rank}</span>
                    <p className="text-[14px] sm:text-[15px] text-white/60 mt-2 leading-[1.6]">{pos.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Total */}
          <motion.div {...fadeUp(needAnim.visible, 0.5)} className="mt-8 sm:mt-10 flex items-baseline gap-3">
            <AnimatedCounter value={2000} className="text-[40px] sm:text-[56px] font-black text-[#8A0000]" />
            <span className="text-[16px] sm:text-[20px] font-bold text-white/60 uppercase tracking-wider">faculty total</span>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          6. THE FIVE DIVISIONS
          ══════════════════════════════════════════ */}
      <section id="divisions" className="scroll-mt-[110px] py-16 sm:py-24 lg:py-36">
        <div ref={divAnim.ref} className="max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20">
          <motion.h2 {...slideLeft(divAnim.visible)} className="text-[28px] sm:text-[40px] md:text-[52px] font-black leading-[1] tracking-tighter text-[#141414] mb-6 sm:mb-10">
            The Five Divisions
          </motion.h2>

          <div className="space-y-3 sm:space-y-4">
            {DIVISIONS.map((div, i) => (
              <DivisionCard
                key={i}
                division={div}
                index={i}
                isOpen={openDivision === i}
                onToggle={() => setOpenDivision(openDivision === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          7. THE 50 COLLEGES
          ══════════════════════════════════════════ */}
      <section id="colleges" className="scroll-mt-[110px] py-16 sm:py-24 lg:py-36 bg-gray-50 border-y border-gray-100">
        <div ref={collAnim.ref} className="max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20">
          <motion.h2 {...slideLeft(collAnim.visible)} className="text-[28px] sm:text-[40px] md:text-[52px] font-black leading-[1] tracking-tighter text-[#141414] mb-4 sm:mb-6">
            The 50 Colleges
          </motion.h2>

          <motion.p {...fadeUp(collAnim.visible, 0.05)} className="text-[15px] sm:text-[16px] leading-[1.8] text-gray-600 max-w-4xl mb-10 sm:mb-14">
            Every College is a physical place. Every College is interdisciplinary. Every College draws students from all 55 programs.
          </motion.p>

          <div className="space-y-8 sm:space-y-10">
            {Object.entries(COLLEGES).map(([key, tier], i) => {
              const tierColor = key === 'central' ? '#8A0000' : key === 'tierA' ? '#6B0000' : key === 'tierB' ? '#4a0e0e' : '#3d0808';
              return (
                <motion.div
                  key={key}
                  {...fadeUp(collAnim.visible, i * 0.1)}
                  className="bg-white border border-gray-200 p-6 sm:p-8"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 flex items-center justify-center shrink-0" style={{ backgroundColor: tierColor }}>
                      <Building2 size={18} className="text-white" />
                    </div>
                    <div>
                      <h4 className="text-[16px] sm:text-[20px] font-black text-[#141414]">{tier.label}</h4>
                      <span className="text-[12px] text-gray-500">{tier.students}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {tier.cities.map((city, j) => (
                      <span
                        key={j}
                        className="text-[12px] sm:text-[13px] font-semibold px-3 py-1.5 border border-gray-100 text-gray-700 hover:border-[#8A0000]/30 hover:text-[#8A0000] transition-colors cursor-default"
                      >
                        {city}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          8. CENTERS OF INQUIRY
          ══════════════════════════════════════════ */}
      <section id="centers" className="scroll-mt-[110px] py-16 sm:py-24 lg:py-36">
        <div ref={centAnim.ref} className="max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20">
          <motion.h2 {...slideLeft(centAnim.visible)} className="text-[28px] sm:text-[40px] md:text-[52px] font-black leading-[1] tracking-tighter text-[#141414] mb-4 sm:mb-6">
            The 19 Centers of Inquiry
          </motion.h2>

          <motion.p {...fadeUp(centAnim.visible, 0.05)} className="text-[15px] sm:text-[16px] leading-[1.8] text-gray-600 max-w-4xl mb-10 sm:mb-14">
            Each Center is a permanently endowed research operation with a 20-year runway and the freedom to pursue truth without institutional pressure.
          </motion.p>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px]">
              <thead>
                <tr className="border-b-2 border-[#8A0000]">
                  <th className="text-left text-[10px] font-black uppercase tracking-[0.2em] text-[#8A0000] py-4 pr-4 w-12">#</th>
                  <th className="text-left text-[10px] font-black uppercase tracking-[0.2em] text-[#8A0000] py-4 pr-4">Center</th>
                  <th className="text-center text-[10px] font-black uppercase tracking-[0.2em] text-[#8A0000] py-4 px-4 w-16">Div</th>
                  <th className="text-left text-[10px] font-black uppercase tracking-[0.2em] text-[#8A0000] py-4 pl-4">Active Projects</th>
                </tr>
              </thead>
              <tbody>
                {CENTERS.map((center, i) => (
                  <tr key={i} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 pr-4 text-[14px] font-black text-[#8A0000]">{center.num}</td>
                    <td className="py-4 pr-4 text-[13px] sm:text-[14px] font-semibold text-[#141414]">{center.name}</td>
                    <td className="py-4 px-4 text-center">
                      <span className="text-[11px] font-black px-2 py-1 bg-[#8A0000]/5 text-[#8A0000]">{center.div}</span>
                    </td>
                    <td className="py-4 pl-4">
                      <div className="flex flex-wrap gap-1.5">
                        {center.projects.map((proj, j) => (
                          <span key={j} className="text-[11px] sm:text-[12px] font-medium px-2.5 py-1 bg-gray-50 border border-gray-100 text-gray-600">
                            {proj}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <motion.p {...fadeUp(centAnim.visible, 0.3)} className="mt-6 text-[13px] text-gray-400 italic">
            Centers 9–19 will be announced with the launch of Divisions III–V.
          </motion.p>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          9. AFTER THE KNIFE
          ══════════════════════════════════════════ */}
      <section id="knife" className="scroll-mt-[110px] py-16 sm:py-24 lg:py-36 bg-[#141414] text-white">
        <div ref={knifeAnim.ref} className="max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20">
          <motion.h2 {...slideLeft(knifeAnim.visible)} className="text-[28px] sm:text-[40px] md:text-[52px] font-black leading-[1] tracking-tighter text-white mb-6 sm:mb-10">
            What Happens After the Knife
          </motion.h2>

          <motion.p {...fadeUp(knifeAnim.visible, 0.1)} className="text-[16px] sm:text-[18px] leading-[1.8] text-white/70 max-w-4xl mb-8">
            Traditional universities employ thousands of administrators. We employ scholars.
          </motion.p>

          <motion.p {...fadeUp(knifeAnim.visible, 0.15)} className="text-[15px] sm:text-[16px] leading-[1.8] text-white/50 max-w-4xl mb-12">
            We applied Elon&apos;s knife to every line item. $25M academic infrastructure became $155K (one DevOps engineer running Moodle, Jitsi, and cloud). $10M library became $150K (one digital librarian plus consortium access to the world&apos;s greatest collections). $8M admissions became $20K (Airtable, Stripe, and $99 deposits — the product is the marketing).
          </motion.p>

          <motion.div {...fadeUp(knifeAnim.visible, 0.25)} className="mb-8">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#8A0000] block mb-6">The survivors of the knife</span>
          </motion.div>

          <div className="space-y-0">
            {SURVIVORS.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                viewport={{ once: true }}
                className="flex items-start sm:items-center gap-4 sm:gap-6 py-5 sm:py-6 border-b border-white/10"
              >
                <span className="text-[24px] sm:text-[32px] font-black text-[#8A0000] min-w-[48px] text-right">{s.count}</span>
                <div className="flex-1 min-w-0">
                  <h4 className="text-[15px] sm:text-[17px] font-bold text-white">{s.role}</h4>
                  <p className="text-[13px] sm:text-[14px] text-white/50 mt-0.5">{s.remains}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp(knifeAnim.visible, 0.5)} className="mt-10 border-l-4 border-[#8A0000] pl-6 py-2 max-w-4xl">
            <p className="text-[16px] sm:text-[18px] leading-[1.7] text-white/80 font-semibold">
              That is the entire administration. Eleven people in the centre. Fifty people on the ground. Two thousand in the classrooms and the labs. Everyone else is faculty or students.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          10. THE 7-YEAR RULE
          ══════════════════════════════════════════ */}
      <section id="seven-year" className="scroll-mt-[110px] py-16 sm:py-24 lg:py-36">
        <div ref={sevenAnim.ref} className="max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20">
          <motion.h2 {...slideLeft(sevenAnim.visible)} className="text-[28px] sm:text-[40px] md:text-[52px] font-black leading-[1] tracking-tighter text-[#141414] mb-6 sm:mb-10">
            The 7-Year Rule
          </motion.h2>

          <motion.p {...fadeUp(sevenAnim.visible, 0.1)} className="text-[16px] sm:text-[18px] leading-[1.8] text-gray-600 max-w-4xl mb-8">
            Every piece of knowledge produced at Artemis enters the public domain 7 years after creation. Research papers. Course materials. Software. Data. Engineering designs. Legal templates. Everything.
          </motion.p>

          <motion.p {...fadeUp(sevenAnim.visible, 0.2)} className="text-[16px] sm:text-[18px] leading-[1.8] text-gray-600 max-w-4xl mb-10">
            You get 7 years to publish first, establish priority, and build reputation — the currency of academia. After that, it belongs to everyone. No paywalls. No subscriptions. No exclusive licenses.
          </motion.p>

          <motion.div {...fadeUp(sevenAnim.visible, 0.3)} className="max-w-4xl border-t border-b border-gray-200 py-8 sm:py-10">
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-12">
              <div className="flex-1">
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-gray-400 block mb-3">If you want perpetual paywalls</span>
                <p className="text-[15px] sm:text-[16px] text-gray-500">There are 25,000 other universities.</p>
              </div>
              <div className="hidden sm:block w-[1px] bg-gray-200"></div>
              <div className="flex-1">
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#8A0000] block mb-3">If you want your work to belong to civilization</span>
                <p className="text-[15px] sm:text-[16px] text-[#141414] font-semibold">There is one.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          11. HOW TO APPLY
          ══════════════════════════════════════════ */}
      <section id="apply" className="scroll-mt-[110px] py-16 sm:py-24 lg:py-36 bg-[#8A0000] text-white">
        <div ref={applyAnim.ref} className="max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20">
          <motion.h2 {...slideLeft(applyAnim.visible)} className="text-[28px] sm:text-[40px] md:text-[52px] font-black leading-[1] tracking-tighter text-white mb-6 sm:mb-10">
            How to Apply
          </motion.h2>

          <motion.p {...fadeUp(applyAnim.visible, 0.1)} className="text-[18px] sm:text-[22px] leading-[1.6] text-white/80 mb-10 sm:mb-14 max-w-3xl font-semibold">
            We are not reading CVs. We are reading manifestos.
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 mb-12 sm:mb-16">
            {[
              'Which Division and Center you want to build',
              'Which College you want to live in',
              'What you would teach in your first term',
              'What you would research in your first year',
              'Why you can survive on a stipend for five years without resentment',
            ].map((item, i) => (
              <motion.div
                key={i}
                {...scaleIn(applyAnim.visible, i * 0.08)}
                className="bg-white/10 border border-white/20 p-5 sm:p-6 flex flex-col"
              >
                <span className="text-[36px] sm:text-[44px] font-black text-white/20 leading-none mb-3">{i + 1}</span>
                <p className="text-[14px] sm:text-[15px] leading-[1.6] text-white/90 font-medium">{item}</p>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp(applyAnim.visible, 0.5)} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8">
            <div className="flex items-center gap-3">
              <Mail size={20} className="text-white/60" />
              <a
                href="mailto:faculty@artemis.edu"
                className="text-[18px] sm:text-[22px] font-black text-white underline underline-offset-4 decoration-white/40 hover:decoration-white transition-colors"
              >
                faculty@artemis.edu
              </a>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-[13px] text-white/50 font-medium">
              <span>No form.</span>
              <span>No portal.</span>
              <span>No algorithm.</span>
            </div>
          </motion.div>

          <motion.div {...fadeUp(applyAnim.visible, 0.6)} className="mt-8 border-l-4 border-white/30 pl-6 py-2 max-w-3xl">
            <p className="text-[15px] sm:text-[16px] text-white/70 italic">
              A human will read it. A Division Head will respond.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          12. THE CLOSING ARGUMENT
          ══════════════════════════════════════════ */}
      <section id="closing" className="scroll-mt-[110px] py-16 sm:py-24 lg:py-36">
        <div ref={closingAnim.ref} className="max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20">
          <motion.h2 {...slideLeft(closingAnim.visible)} className="text-[28px] sm:text-[40px] md:text-[52px] font-black leading-[1] tracking-tighter text-[#141414] mb-10 sm:mb-16">
            The Closing Argument
          </motion.h2>

          {/* Yale vs Artemis comparison */}
          <motion.div {...fadeUp(closingAnim.visible, 0.1)} className="max-w-4xl mb-10 sm:mb-14">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              <div className="border border-gray-200 p-6 sm:p-8">
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-gray-400 block mb-4">Yale</span>
                <div className="space-y-4">
                  <div>
                    <span className="text-[13px] text-gray-400">Average faculty pay</span>
                    <p className="text-[24px] sm:text-[28px] font-black text-[#141414]">$250,000<span className="text-[14px] text-gray-400">/yr</span></p>
                  </div>
                  <div>
                    <span className="text-[13px] text-gray-400">Students served</span>
                    <p className="text-[24px] sm:text-[28px] font-black text-[#141414]">14,000</p>
                  </div>
                  <div>
                    <span className="text-[13px] text-gray-400">Countries</span>
                    <p className="text-[24px] sm:text-[28px] font-black text-[#141414]">1</p>
                  </div>
                  <div>
                    <span className="text-[13px] text-gray-400">Cost per student</span>
                    <p className="text-[24px] sm:text-[28px] font-black text-[#141414]">$500,000</p>
                  </div>
                </div>
              </div>

              <div className="border-2 border-[#8A0000] p-6 sm:p-8 relative">
                <div className="absolute top-0 right-0 bg-[#8A0000] text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1">Artemis</div>
                <div className="space-y-4">
                  <div>
                    <span className="text-[13px] text-gray-400">Faculty pay range</span>
                    <p className="text-[24px] sm:text-[28px] font-black text-[#8A0000]">$12K–$48K<span className="text-[14px] text-gray-400">/yr</span></p>
                  </div>
                  <div>
                    <span className="text-[13px] text-gray-400">Students served</span>
                    <p className="text-[24px] sm:text-[28px] font-black text-[#8A0000]">100,000</p>
                  </div>
                  <div>
                    <span className="text-[13px] text-gray-400">Countries</span>
                    <p className="text-[24px] sm:text-[28px] font-black text-[#8A0000]">35</p>
                  </div>
                  <div>
                    <span className="text-[13px] text-gray-400">Cost per student</span>
                    <p className="text-[24px] sm:text-[28px] font-black text-[#8A0000]">$1,000</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div {...fadeUp(closingAnim.visible, 0.3)} className="max-w-4xl">
            <p className="text-[17px] sm:text-[20px] leading-[1.8] text-gray-600 mb-8">
              We are not competing with Yale for faculty. We are competing for the people who would have gone to Yale if Yale served the world — and who chose not to because it doesn&apos;t.
            </p>

            <div className="border-l-4 border-[#8A0000] pl-6 sm:pl-8 py-3 mb-12 sm:mb-16">
              <p className="text-[20px] sm:text-[26px] md:text-[30px] font-black text-[#8A0000] leading-[1.3]">
                If you are one of those people, we have been waiting for you.
              </p>
            </div>
          </motion.div>

          {/* Closing stats line */}
          <motion.div {...fadeUp(closingAnim.visible, 0.4)} className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] sm:text-[15px] font-bold uppercase tracking-[0.15em] text-gray-400">
            <span>University of Artemis</span>
            <span className="text-[#8A0000]">·</span>
            <span>2,000 Positions</span>
            <span className="text-[#8A0000]">·</span>
            <span>50 Colleges</span>
            <span className="text-[#8A0000]">·</span>
            <span>35 Countries</span>
            <span className="text-[#8A0000]">·</span>
            <span className="text-[#8A0000]">One Mission</span>
          </motion.div>

          {/* For Civilization */}
          <motion.div {...fadeUp(closingAnim.visible, 0.5)} className="mt-12 sm:mt-16 pt-12 sm:pt-16 border-t border-gray-200">
            <p className="text-[24px] sm:text-[32px] md:text-[40px] font-black tracking-tighter text-[#141414]">
              For Civilization.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <SubPageFooter goToPage={goToPage} />
    </div>
  );
}
