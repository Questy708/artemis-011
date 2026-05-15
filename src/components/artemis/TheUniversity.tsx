'use client';

import React, { useState, useEffect, useRef } from 'react';
import SubPageFooter from '@/components/artemis/SubPageFooter';
import OnThisPageNav, { useActiveSection } from '@/components/artemis/OnThisPageNav';
import { ChevronRight, ArrowRight } from 'lucide-react';

interface Props {
  goToPage: (page: string) => void;
}

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

/* ─── Data ─── */
const sectionLinks = [
  { title: 'Our history', link: 'history' },
  { title: 'Facts and figures', link: 'facts' },
  { title: 'Artemis Glossary', link: 'glossary' },
  { title: 'Our estate', link: 'estate' },
  { title: 'Brand', link: 'brand' },
];

const schools = [
  {
    name: 'School of Natural Sciences',
    desc: 'Encompassing physics, chemistry, biology, mathematics, and environmental science. The School of Natural Sciences drives fundamental research into the laws governing the universe, from quantum mechanics to ecosystem dynamics, equipping students with rigorous analytical frameworks and hands-on laboratory experience.',
  },
  {
    name: 'School of Engineering & Technology',
    desc: 'Spanning computer science, electrical engineering, mechanical engineering, and materials science. This school pushes the frontier of what can be built — from sustainable infrastructure to artificial intelligence systems — blending theoretical foundations with the practical imperative to solve real-world problems.',
  },
  {
    name: 'School of Arts & Humanities',
    desc: 'Covering literature, philosophy, history, linguistics, and the fine arts. The School of Arts & Humanities preserves and advances the traditions of critical inquiry, creative expression, and cultural understanding that form the intellectual bedrock of any great university.',
  },
  {
    name: 'School of Social Sciences',
    desc: 'Bringing together economics, political science, sociology, anthropology, and psychology. The School of Social Sciences examines the structures, behaviors, and institutions that shape human societies — producing research that informs public policy, governance, and social innovation.',
  },
  {
    name: 'School of Health & Medicine',
    desc: 'Integrating biomedical science, clinical practice, public health, and bioethics. This school trains the next generation of physicians, researchers, and health-system leaders, advancing discoveries from the molecular level to population-wide health interventions.',
  },
  {
    name: 'School of Education & Human Development',
    desc: 'Focusing on pedagogy, cognitive science, educational leadership, and human development across the lifespan. The school studies how people learn and grow, preparing educators and policymakers to build more effective, equitable learning systems worldwide.',
  },
  {
    name: 'School of Business',
    desc: 'Encompassing finance, strategy, entrepreneurship, and organizational leadership. The School of Business cultivates principled, innovative leaders who can navigate complexity and drive value creation in an era of rapid technological and social change.',
  },
];

/* ─── Component ─── */
export default function TheUniversity({ goToPage }: Props) {
  const microCollegesAnim = useInView();
  const roleAnim = useInView();
  const schoolsAnim = useInView();
  const pressAnim = useInView();
  const lifelongAnim = useInView();
  const activeSection = useActiveSection(['micro-colleges', 'schools', 'press', 'lifelong-learning']);

  return (
    <div className="flex flex-col bg-white">

      {/* ── Hero Section ── */}
      <section className="relative w-full overflow-hidden">
        <div className="max-w-[1600px] mx-auto">
          <div className="relative w-full h-[45vh] min-h-[360px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1523240715630-34360e206004?auto=format&fit=crop&q=80&w=1800"
          className="absolute inset-0 w-full h-full object-cover grayscale"
          alt="The University of Artemis"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="relative z-10 flex flex-col justify-end h-full max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 pb-16">
          <div className="mb-8 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">
              About Artemis
            </span>
          </div>
          <h1 className="text-[32px] sm:text-[44px] md:text-[56px] font-extrabold leading-[1.05] tracking-tighter text-white mb-6 uppercase">
            The University
          </h1>
          <p className="text-[18px] text-white/70 max-w-xl leading-relaxed font-light">
            The University of Artemis is a federated network of autonomous micro-colleges — a
            decentralized, global institution founded in 2024 by Abraham Kyeyune, reimagining the
            ancient guild model of the universitas for the digital age.
          </p>
        </div>
          </div>
        </div>
      </section>

      <OnThisPageNav
        sections={[
          { id: 'micro-colleges', label: 'Micro-Colleges' },
          { id: 'schools', label: 'Schools' },
          { id: 'press', label: 'Press' },
          { id: 'lifelong-learning', label: 'Lifelong Learning' },
        ]}
        activeSection={activeSection}
      />

      {/* ── Pages in This Section ── */}
      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 lg:gap-20 items-start">
            <div>
              <div className="mb-6 flex items-center space-x-3">
                <span className="w-8 h-[1px] bg-[#8A0000]"></span>
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">
                  Explore
                </span>
              </div>
              <h2 className="text-[28px] sm:text-[32px] font-extrabold leading-[1.05] tracking-tighter text-[#141414]">
                Pages in this section
              </h2>
            </div>
            <div className="flex flex-col">
              {sectionLinks.map((item, i) => (
                <button
                  key={item.title}
                  onClick={() => goToPage(item.link)}
                  className="group flex items-center justify-between py-5 border-b border-gray-200 hover:border-[#8A0000] transition-colors w-full text-left"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#8A0000]">{String(i + 1).padStart(2, '0')}</span>
                    <span className="text-[16px] font-bold text-[#141414] group-hover:text-[#8A0000] transition-colors">{item.title}</span>
                  </div>
                  <svg className="w-4 h-4 text-gray-300 group-hover:text-[#8A0000] group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── The Micro-Colleges ── */}
      <section id="micro-colleges" className="scroll-mt-[110px] max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 pb-24">
        <div
          ref={microCollegesAnim.ref}
          className={`transition-all duration-700 ${microCollegesAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="mb-8 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">
              Academic Structure
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-5">
              <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-6">
                The Micro-Colleges
              </h2>
            </div>
            <div className="md:col-span-7">
              <p className="text-[16px] text-gray-600 leading-relaxed mb-4">
                At the heart of Artemis lie its <strong className="text-[#141414]">twenty micro-colleges</strong> —
                autonomous academic units bound together within a single institution. Each micro-college
                is self-governing, with its own identity, faculty, and traditions, yet all share a
                unified curriculum and digital infrastructure that binds the network into one coherent
                academic body.
              </p>
              <p className="text-[16px] text-gray-600 leading-relaxed mb-4">
                Unlike the monolithic departments of traditional universities, Artemis micro-colleges
                are intimate scholarly communities — small enough that every student is known by name,
                yet large enough in collective ambition to rival any institution on Earth. They are the
                living embodiment of the ancient collegial ideal: a guild of scholars living and
                learning together.
              </p>
              <p className="text-[16px] text-gray-600 leading-relaxed mb-8">
                Each micro-college selects and admits its own students, provides housing and communal
                life, and delivers the close personal tutorial mentorship that defines the Artemis
                educational experience. Together, they form the human backbone of the University.
              </p>

              <div className="aspect-[16/9] rounded-lg overflow-hidden bg-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1523240715630-34360e206004?auto=format&fit=crop&q=80&w=1200"
                  className="w-full h-full object-cover grayscale brightness-90 hover:brightness-100 hover:grayscale-0 transition-all duration-500"
                  alt="Artemis Micro-Colleges"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Role of Micro-Colleges and the Network ── */}
      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20">
          <div
            ref={roleAnim.ref}
            className={`transition-all duration-700 ${roleAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <div className="relative flex items-center mb-16">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="mx-4 text-[12px] font-bold uppercase tracking-[0.2em] text-gray-500">
                Governance & Roles
              </span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-4">
              Role of Micro-Colleges<br />and the Network
            </h2>
            <p className="text-[16px] text-gray-600 leading-relaxed max-w-2xl mb-16">
              The Artemis model separates the personal from the institutional. Micro-colleges are
              responsible for the human dimensions of education — community, mentorship, and
              belonging — while the Artemis Network handles the structural and academic
              infrastructure that ensures rigor and coherence across the federation.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
              {/* Left — What the Micro-Colleges do */}
              <div className="bg-white p-8 md:p-10 shadow-sm">
                <div className="mb-8 flex items-center space-x-3">
                  <span className="w-8 h-[1px] bg-[#8A0000]"></span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">
                    Micro-Colleges
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#141414] mb-8">
                  What the Micro-Colleges do
                </h3>
                <ul className="space-y-6">
                  {[
                    'Select and admit students, building a diverse and intentional community of scholars within each college',
                    'Provide housing, dining, common rooms, and communal spaces that foster belonging and intellectual fellowship',
                    'Deliver tutorials, personal mentorship, and pastoral care — ensuring no student is anonymous',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <div className="flex-shrink-0 w-1 h-full min-h-[48px] bg-[#8A0000] mr-4 rounded-full" />
                      <span className="text-[15px] text-gray-600 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right — What the Artemis Network does */}
              <div className="bg-white p-8 md:p-10 shadow-sm">
                <div className="mb-8 flex items-center space-x-3">
                  <span className="w-8 h-[1px] bg-[#8A0000]"></span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">
                    The Network
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#141414] mb-8">
                  What the Artemis Network does
                </h3>
                <ul className="space-y-6">
                  {[
                    'Determine curriculum and academic standards, ensuring coherence and rigor across all micro-colleges',
                    'Organize lectures, seminars, and symposia — drawing on faculty and visiting scholars from across the global network',
                    'Provide research facilities, laboratories, libraries, and digital infrastructure accessible to every member',
                    'Set and administer examinations, maintaining the integrity of Artemis degrees worldwide',
                    'Award degrees and academic distinctions on behalf of the entire University',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <div className="flex-shrink-0 w-1 h-full min-h-[48px] bg-[#8A0000] mr-4 rounded-full" />
                      <span className="text-[15px] text-gray-600 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Schools and Research Divisions ── */}
      <section id="schools" className="scroll-mt-[110px] max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 py-24">
        <div
          ref={schoolsAnim.ref}
          className={`transition-all duration-700 ${schoolsAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="mb-8 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">
              Academic Divisions
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
            <div className="md:col-span-7">
              <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-6">
                Schools and<br />Research Divisions
              </h2>
            </div>
            <div className="md:col-span-5">
              <p className="text-[16px] text-gray-600 leading-relaxed">
                Across its seven schools, Artemis organizes the full scope of human knowledge into
                collaborative research divisions. Each school sets research priorities, manages
                laboratory and digital infrastructure, and coordinates cross-college academic
                programming — ensuring that the intellectual output of the network exceeds the sum
                of its parts.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {schools.map((school, i) => (
              <div
                key={i}
                className="group p-6 md:p-8 bg-white border border-gray-100 hover:border-[#8A0000] transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="text-[10px] font-bold text-[#8A0000] tracking-widest mb-4 uppercase">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <h4 className="font-bold text-[#141414] mb-4 text-[17px] leading-tight">
                    {school.name}
                  </h4>
                  <p className="text-[13px] text-gray-500 leading-relaxed mb-6">
                    {school.desc}
                  </p>
                </div>
                <ArrowRight
                  size={16}
                  className="text-gray-300 group-hover:text-[#8A0000] group-hover:translate-x-1 transition-all"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Artemis University Press ── */}
      <section id="press" className="scroll-mt-[110px] max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 pb-24">
        <div
          ref={pressAnim.ref}
          className={`transition-all duration-700 ${pressAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="relative flex items-center mb-16">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="mx-4 text-[12px] font-bold uppercase tracking-[0.2em] text-gray-500">
              Publishing
            </span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-7">
              <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-6">
                Artemis<br />University Press
              </h2>
              <p className="text-[16px] text-gray-600 leading-relaxed mb-4">
                The Artemis University Press is the publishing arm of the University, dedicated to
                disseminating scholarship and knowledge that advances the frontiers of human
                understanding. Operating across both print and digital formats, the Press publishes
                peer-reviewed monographs, academic journals, textbooks, and open-access resources
                that serve the global scholarly community.
              </p>
              <p className="text-[16px] text-gray-600 leading-relaxed mb-8">
                True to Artemis&apos;s founding ethos of accessibility, the Press prioritizes
                open-access distribution wherever possible, ensuring that the knowledge produced
                within the network reaches researchers, educators, and learners regardless of
                geography or economic circumstance. It currently publishes hundreds of new titles
                annually across every discipline represented in the seven schools.
              </p>
              <button
                onClick={() => goToPage('about')}
                className="flex items-center space-x-4 py-3 border-b-2 border-[#8A0000] text-[#8A0000] text-[13px] font-bold uppercase tracking-[0.2em] hover:text-black hover:border-black transition-colors group"
              >
                <span>Explore the Press</span>
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
            <div className="md:col-span-5">
              <div className="aspect-[4/3] rounded-lg overflow-hidden bg-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1578402027070-0f5ebd84ec9b?auto=format&fit=crop&q=80&w=800"
                  className="w-full h-full object-cover grayscale brightness-90 hover:brightness-100 hover:grayscale-0 transition-all duration-500"
                  alt="Artemis University Press"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Artemis Lifelong Learning ── */}
      <section id="lifelong-learning" className="scroll-mt-[110px] bg-gray-50 py-24">
        <div className="max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20">
          <div
            ref={lifelongAnim.ref}
            className={`transition-all duration-700 ${lifelongAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <div className="mb-8 flex items-center space-x-3">
              <span className="w-8 h-[1px] bg-[#8A0000]"></span>
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">
                Continuing Education
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="md:col-span-7">
                <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-6">
                  Artemis<br />Lifelong Learning
                </h2>
                <p className="text-[16px] text-gray-600 leading-relaxed mb-4">
                  Artemis Lifelong Learning extends the University&apos;s reach beyond the full-time
                  student body, offering continuing education to professionals, returning learners,
                  and curious minds at every stage of life. Through a blend of in-person intensives
                  at micro-college campuses and flexible online programs, it delivers the rigor of
                  an Artemis education in formats that meet learners where they are.
                </p>
                <p className="text-[16px] text-gray-600 leading-relaxed mb-8">
                  Each year, Artemis Lifelong Learning enrolls thousands of students from across the
                  globe in short courses, certificate programs, executive education, and graduate-level
                  qualifications — from diplomas to doctoral degrees. Whether refining a professional
                  skill or pursuing a long-deferred intellectual passion, lifelong learners find a
                  home within the Artemis network.
                </p>
                <button
                  onClick={() => goToPage('education')}
                  className="flex items-center space-x-4 py-3 border-b-2 border-[#8A0000] text-[#8A0000] text-[13px] font-bold uppercase tracking-[0.2em] hover:text-black hover:border-black transition-colors group"
                >
                  <span>Explore Programs</span>
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
              <div className="md:col-span-5 space-y-6">
                {/* Stats with left border accent */}
                {[
                  { value: '10,000+', label: 'Lifelong learners enrolled annually' },
                  { value: '200+', label: 'Short courses and certificate programs' },
                  { value: '25+', label: 'Countries represented in each cohort' },
                  { value: '7', label: 'Schools contributing curricula' },
                ].map((stat, i) => (
                  <div key={i} className="border-l-2 border-[#8A0000] pl-6">
                    <div className="text-[28px] font-black text-[#141414] leading-none mb-1 tabular-nums">
                      {stat.value}
                    </div>
                    <div className="text-[13px] text-gray-500 leading-snug">{stat.label}</div>
                  </div>
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
