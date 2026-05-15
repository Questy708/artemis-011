'use client';

import { useState, useEffect, useRef } from 'react';
import SubPageFooter from '@/components/artemis/SubPageFooter';
import OnThisPageNav, { useActiveSection } from '@/components/artemis/OnThisPageNav';

interface Props {
  goToPage: (page: string) => void;
}

/* ─── Data ─── */
const exploreLinks = [
  { label: 'University Officers', page: 'about' },
  { label: 'Academic Leadership', page: 'about' },
  { label: 'Research Leadership', page: 'research' },
  { label: 'View Open Positions', page: 'jobs' },
];

/* ─── Role-based leadership data (anonymous — new university) ─── */
const leadershipRoles = [
  { title: 'Chancellor', dept: 'Office of the Chancellor', abbr: 'CH', desc: 'Chief ceremonial and strategic head of the university; presides over Convocation and sets the long-term vision for the Artemis mission.' },
  { title: 'Vice-Chancellor', dept: 'Office of the Chancellor', abbr: 'VC', desc: 'Deputises for the Chancellor and oversees day-to-day institutional strategy, external partnerships, and global node expansion.' },
  { title: 'Provost & Chief Academic Officer', dept: 'Academic Affairs', abbr: 'PA', desc: 'The senior academic officer responsible for curriculum integrity, faculty appointments, and the academic standards of every Artemis programme worldwide.' },
  { title: 'Vice-Provost for Education', dept: 'Academic Affairs', abbr: 'VE', desc: 'Leads the design and delivery of the undergraduate and graduate curriculum, including the Infinite Learning Continuum and Adaptive Paced Learning systems.' },
  { title: 'Vice-Provost for Research', dept: 'Research Enterprise', abbr: 'VR', desc: 'Oversees all Centers of Inquiry, the Guild system, and the Knowledge Core — ensuring that Artemis research is both curiosity-driven and civically impactful.' },
  { title: 'Vice-Provost for Students', dept: 'Student Affairs', abbr: 'VS', desc: 'Champions the student experience across all nodes — from wellbeing and belonging to co-curricular life and the junior fellows programme.' },
  { title: 'Chief Operating Officer', dept: 'Operations', abbr: 'CO', desc: 'Manages the operational backbone of a distributed university — technology infrastructure, global facilities, and institutional resilience across six continents.' },
  { title: 'Chief Financial Officer', dept: 'Finance & Treasury', abbr: 'CF', desc: 'Stewards the Artemis endowment, annual budget, and financial sustainability — ensuring the university remains independent and mission-driven for generations to come.' },
  { title: 'Dean of Faculty', dept: 'Academic Affairs', abbr: 'DF', desc: 'Responsible for faculty recruitment, development, and evaluation across all colleges and Centers of Inquiry — ensuring excellence and diversity in every appointment.' },
  { title: 'Dean of Admissions & Aid', dept: 'Enrolment', abbr: 'DA', desc: 'Leads the global admissions operation, ensuring that every applicant is evaluated holistically and that financial barriers never prevent talent from accessing an Artemis education.' },
  { title: 'Dean of the Graduate School', dept: 'Graduate Studies', abbr: 'DG', desc: 'Oversees all graduate programmes, research degrees, and postdoctoral fellowships — building the next generation of scholars and practitioners.' },
  { title: 'Director of Global Operations', dept: 'Operations', abbr: 'GO', desc: 'Coordinates the 20 micro-college nodes worldwide — ensuring seamless academic synchronisation, regulatory compliance, and cultural integration across jurisdictions.' },
  { title: 'Director of Innovation & Partnerships', dept: 'Innovation', abbr: 'IP', desc: 'Bridges Artemis research and the wider world — managing corporate partnerships, technology transfer, spin-off incubation, and the Forge entrepreneurship ecosystem.' },
  { title: 'Director of Digital Learning', dept: 'Academic Technology', abbr: 'DL', desc: 'Architects the digital learning infrastructure — from AI-augmented tutoring and immersive environments to the synchronous classroom technology that connects every node in real time.' },
  { title: 'Director of Equity & Inclusion', dept: 'Institutional Culture', abbr: 'EI', desc: 'Ensures that equity, diversity, and inclusion are not aspirational add-ons but structural features embedded in every policy, programme, and appointment at Artemis.' },
  { title: 'Director of Sustainability', dept: 'Campus & Planet', abbr: 'SU', desc: 'Leads Artemis\'s commitment to carbon-negative operations, sustainable construction across all nodes, and the integration of planetary stewardship into the curriculum.' },
  { title: 'University Registrar', dept: 'Academic Administration', abbr: 'UR', desc: 'Maintains academic records, degree conferral, credit transfer, and the ECTS-equivalent framework that enables seamless mobility across the Artemis network.' },
  { title: 'University Librarian & Knowledge Core Director', dept: 'Knowledge Core', abbr: 'KL', desc: 'Stewards the Knowledge Core — Artemis\'s living, open-access repository of all research outputs, curricular materials, and institutional memory across the global network.' },
  { title: 'Director of Communications', dept: 'Public Affairs', abbr: 'CM', desc: 'Shapes the public narrative of Artemis — managing media relations, brand identity, digital presence, and the stories that convey the university\'s mission to the world.' },
  { title: 'General Counsel & Secretary', dept: 'Legal & Governance', abbr: 'GC', desc: 'Advises on legal and regulatory matters across all jurisdictions, serves as Secretary to the Board of Trustees, and ensures institutional compliance with international law.' },
];

const peopleStats = [
  { value: '120+', label: 'Staff', detail: 'Across all global nodes' },
  { value: '72', label: 'Faculty', detail: 'Distinguished scholars & researchers' },
  { value: '28+', label: 'Countries', detail: 'Represented in our community' },
  { value: '85%', label: 'Satisfaction', detail: 'Annual employee survey' },
];

/* ─── Hook: animate on scroll ─── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ─── Component ─── */
export default function OurPeople({ goToPage }: Props) {
  const heroAnim = useInView();
  const exploreAnim = useInView();
  const leadershipAnim = useInView();
  const spotlightAnim = useInView();
  const statsAnim = useInView();
  const workingAnim = useInView();
  const activeSection = useActiveSection(['faculty', 'staff', 'leadership']);

  return (
    <div className="flex flex-col bg-white">


      {/* ── 1. HERO ── */}
      <section className="relative w-full overflow-hidden">
        <div className="max-w-[1600px] mx-auto">
          <div className="relative w-full h-[45vh] min-h-[360px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1613592237001-84fb727ce569?auto=format&fit=crop&q=80&w=1800"
          className="absolute inset-0 w-full h-full object-cover grayscale"
          alt="The people of Artemis"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="relative z-10 flex flex-col justify-end h-full max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 pb-16">
          <div className="mb-8 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">
              The Artemis Community
            </span>
          </div>
          <h1 className="text-[32px] sm:text-[44px] md:text-[56px] font-extrabold leading-[1.05] tracking-tighter text-white mb-6 uppercase">
            Our People
          </h1>
          <p className="text-[18px] text-white/70 max-w-xl leading-relaxed font-light">
            The scholars, researchers, and staff who form the beating heart of the Artemis experiment — a global guild united by the pursuit of knowledge without borders.
          </p>
        </div>
          </div>
        </div>
      </section>

      <OnThisPageNav
        sections={[
          { id: 'faculty', label: 'Faculty' },
          { id: 'staff', label: 'Staff' },
          { id: 'leadership', label: 'Leadership' },
        ]}
        activeSection={activeSection}
      />

      {/* ── 2. EXPLORE ── */}
      <section className="max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 py-16 lg:py-24">
        <div
          ref={exploreAnim.ref}
          className={`transition-all duration-700 ${exploreAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {/* Section divider */}
          <div className="mb-6 flex items-center space-x-3">
              <span className="w-8 h-[1px] bg-[#8A0000]"></span>
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">
                Explore
              </span>
            </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {exploreLinks.map((link, i) => (
              <button
                key={i}
                onClick={() => goToPage(link.page)}
                className="group flex justify-between items-center py-5 border-b border-gray-100 hover:border-[#8A0000] transition-colors w-full text-left"
              >
                <span className="text-[17px] font-bold text-gray-700 group-hover:text-[#8A0000] transition-colors">
                  {link.label}
                </span>
                <svg
                  className="w-4 h-4 text-gray-300 group-hover:text-[#8A0000] group-hover:translate-x-1 transition-all"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. LEADERSHIP ── */}
      <section id="leadership" className="bg-gray-50 py-16 lg:py-24 scroll-mt-[110px]">
        <div
          ref={leadershipAnim.ref}
          className={`max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 transition-all duration-700 ${leadershipAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {/* Red line accent */}
          <div className="mb-8 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">
              Leadership & Governance
            </span>
          </div>

          <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-4">
            Roles, not resumes
          </h2>
          <p className="text-[16px] text-gray-600 leading-relaxed max-w-2xl mb-4">
            As a new university, Artemis is building its leadership team from first principles. The positions below represent the governance architecture we are assembling — each one essential to the mission of re-engineering higher education for a connected age. We do not yet have faces for these roles; we have the conviction that the right people will find them.
          </p>
          <p className="text-[14px] text-gray-500 leading-relaxed max-w-2xl mb-12">
            Positions marked with an open indicator are currently accepting expressions of interest.
          </p>

          {/* Role cards — 4 per row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
            {leadershipRoles.map((role, i) => (
              <div
                key={i}
                className="group border border-gray-200 hover:border-[#8A0000] bg-white p-5 transition-all cursor-default hover:shadow-sm flex flex-col"
              >
                {/* Abbreviation badge */}
                <div className="w-10 h-10 bg-[#8A0000]/[0.07] border border-[#8A0000]/20 flex items-center justify-center mb-4 group-hover:bg-[#8A0000]/[0.14] transition-colors">
                  <span className="text-[11px] font-black text-[#8A0000] tracking-wider">{role.abbr}</span>
                </div>
                <h3 className="text-[13px] font-bold text-[#141414] group-hover:text-[#8A0000] transition-colors leading-snug mb-2 min-h-[36px]">
                  {role.title}
                </h3>
                <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-3">
                  {role.dept}
                </div>
                <p className="text-[12px] text-gray-500 leading-relaxed flex-1">
                  {role.desc}
                </p>
                <div className="mt-3 pt-3 border-t border-gray-100 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8A0000] animate-pulse"></span>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-[#8A0000]">Open</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. FACULTY SPOTLIGHT ── */}
      <section id="faculty" className="py-16 lg:py-24 scroll-mt-[110px]">
        <div
          ref={spotlightAnim.ref}
          className={`max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 transition-all duration-700 ${spotlightAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="relative flex items-center mb-16">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="mx-4 text-[12px] font-bold uppercase tracking-[0.2em] text-gray-500">
              Faculty Spotlight
            </span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          {/* Card-and-image parallax section */}
          <div className="max-w-[1600px] mx-auto">
          <div className="relative w-full min-h-[380px] md:min-h-[460px] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1655720357872-ce227e4164ba?auto=format&fit=crop&q=80&w=1400"
              alt="Faculty collaboration at Artemis"
              className="absolute inset-0 w-full h-full object-cover grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
            <div className="relative z-10 flex items-end h-full min-h-[380px] md:min-h-[460px] p-5 sm:p-8 md:p-14">
              <div className="bg-white max-w-sm p-5 sm:p-8 shadow-xl">
                <div className="text-[10px] font-bold text-[#8A0000] tracking-widest mb-3 uppercase">
                  Academic Excellence
                </div>
                <h3 className="text-[24px] font-bold text-[#141414] mb-3 leading-tight">
                  Minds that shape the future
                </h3>
                <p className="text-[14px] text-gray-600 leading-relaxed mb-5">
                  Artemis faculty are not confined to a single discipline or a single campus. They are distributed scholars — thinkers who collaborate across nodes, time zones, and traditions to deliver a truly global education.
                </p>
                <button
                  onClick={() => goToPage('research')}
                  className="text-[11px] font-bold uppercase tracking-widest border-b-2 border-[#8A0000] text-[#8A0000] pb-1 hover:text-black hover:border-black transition-colors"
                >
                  Explore Faculty Research →
                </button>
              </div>
            </div>
          </div>
        </div>
          </div>
      </section>

      {/* ── 5. BY THE NUMBERS ── */}
      <section className="bg-gray-50 py-16 lg:py-24">
        <div
          ref={statsAnim.ref}
          className={`max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 transition-all duration-700 ${statsAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="mb-8 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">
              By the Numbers
            </span>
          </div>

          <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-4">
            A global workforce
          </h2>
          <p className="text-[16px] text-gray-600 leading-relaxed max-w-2xl mb-16">
            Behind every breakthrough at Artemis is a person — a scholar, a strategist, a steward of knowledge. Our people are the infrastructure of possibility.
          </p>

          {/* Stats row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
            {peopleStats.map((stat, i) => (
              <div key={i} className="relative pl-6">
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#8A0000]"></div>
                <div className="text-[36px] font-black text-[#141414] leading-none mb-2 tabular-nums">
                  {stat.value}
                </div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#8A0000] leading-tight mb-1">
                  {stat.label}
                </div>
                <div className="text-[12px] text-gray-500 leading-snug">
                  {stat.detail}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. WORKING AT ARTEMIS ── */}
      <section id="staff" className="py-16 lg:py-24 scroll-mt-[110px]">
        <div
          ref={workingAnim.ref}
          className={`max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 transition-all duration-700 ${workingAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="relative flex items-center mb-16">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="mx-4 text-[12px] font-bold uppercase tracking-[0.2em] text-gray-500">
              Careers
            </span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left — Text */}
            <div>
              <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-8">
                Working at Artemis
              </h2>
              <p className="text-[16px] text-gray-600 leading-relaxed mb-4">
                Artemis is not a conventional employer. We are a decentralized guild of scholars, engineers, administrators, and dreamers — united by the belief that knowledge should have no borders and talent should have no ceiling.
              </p>
              <p className="text-[16px] text-gray-600 leading-relaxed mb-6">
                From competitive benefits and flexible working arrangements to the rare opportunity of shaping a university from first principles, a career at Artemis is an invitation to build something that has never existed before.
              </p>
              <button
                onClick={() => goToPage('jobs')}
                className="flex items-center space-x-4 py-3 border-b-2 border-[#8A0000] text-[#8A0000] text-[13px] font-bold uppercase tracking-[0.2em] hover:text-black hover:border-black transition-all group"
              >
                <span>View Open Positions</span>
                <svg
                  className="group-hover:translate-x-2 transition-transform"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>

            {/* Right — Additional info */}
            <div>
              <div className="border-l-2 border-[#8A0000] pl-6 mb-10">
                <h3 className="text-[18px] font-bold text-[#141414] mb-3">
                  Why Artemis?
                </h3>
                <p className="text-[14px] text-gray-600 leading-relaxed">
                  We offer more than a job. We offer a place in a global intellectual movement — where your work reverberates across continents and your colleagues are among the most brilliant minds on the planet.
                </p>
              </div>
              <div className="space-y-0">
                {[
                  { label: 'Benefits & compensation', page: 'jobs' },
                  { label: 'Diversity & inclusion', page: 'about' },
                  { label: 'Professional development', page: 'education' },
                  { label: 'Artemis culture & values', page: 'about' },
                ].map((link, i) => (
                  <button
                    key={i}
                    onClick={() => goToPage(link.page)}
                    className="group flex justify-between items-center py-4 border-b border-gray-200 hover:border-[#8A0000] transition-colors w-full text-left"
                  >
                    <span className="text-[14px] font-bold text-gray-700 group-hover:text-[#8A0000] transition-colors">
                      {link.label}
                    </span>
                    <svg
                      className="w-4 h-4 text-gray-400 group-hover:text-[#8A0000] group-hover:translate-x-1 transition-all"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <SubPageFooter goToPage={goToPage} />
    </div>
  );
}
