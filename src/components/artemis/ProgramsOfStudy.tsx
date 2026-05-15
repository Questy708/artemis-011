'use client';

import { useState, useEffect, useRef } from 'react';
import SubPageFooter from '@/components/artemis/SubPageFooter';
import OnThisPageNav, { useActiveSection } from '@/components/artemis/OnThisPageNav';

interface ProgramsOfStudyProps {
  goToPage: (page: string, program?: string) => void;
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

export default function ProgramsOfStudy({ goToPage }: ProgramsOfStudyProps) {
  const heroAnim = useInView();
  const introAnim = useInView();

  const catalogNav = [
    "The Undergraduate Curriculum",
    "Academic Regulations",
    "Majors by Disciplines",
    "Majors in Artemis College",
    "Major Roadmaps",
    "Certificates in Artemis College",
    "Artemis College and Departmental Attributes",
    "Subjects of Instruction",
    "General Information"
  ];

  const schoolSections = [
    {
      id: 'school-natural-sciences',
      label: 'Natural Sciences',
      heading: 'School of Natural Sciences',
      desc: 'From the quantum to the cosmological — rigorous training in the fundamental laws governing matter, energy, and life. Students work alongside research faculty from their first year, with access to laboratories and observatories across the global network.',
      majors: [
        "Biology (B.S.)",
        "Chemistry (B.S.)",
        "Physics (B.S.)",
        "Astronomy (B.S.)",
        "Applied Physics (B.S.)",
        "Environmental Science (B.S.)",
        "Geology (B.S.)",
        "Mathematics (B.S.)",
        "Agricultural Sciences (B.S.)",
        "Planetary Science (B.S.)",
      ]
    },
    {
      id: 'school-engineering-technology',
      label: 'Engineering & Technology',
      heading: 'School of Engineering & Technology',
      desc: 'Designing and building the systems that shape the future. Artemis engineering graduates combine deep technical expertise with ethical reasoning and cross-disciplinary fluency — prepared not just to write code or build structures, but to ask why and for whom.',
      majors: [
        "Mechanical Engineering (B.S.)",
        "Civil Engineering (B.S.)",
        "Chemical Engineering (B.S.)",
        "Software Engineering (B.S.)",
        "Computer Science (B.S.)",
        "Data Science (B.S.)",
        "Robotics (B.S.)",
        "Mechatronics (B.S.)",
        "Nanotechnology (B.S.)",
        "Architecture (B.S.)",
        "Design (B.A.)",
      ]
    },
    {
      id: 'school-arts-humanities',
      label: 'Arts & Humanities',
      heading: 'School of Arts & Humanities',
      desc: 'The interpretive disciplines that give meaning to knowledge and beauty to expression. Artemis humanities students engage with canonical texts, contemporary media, and creative practice across cultures — developing the critical imagination that leadership demands.',
      majors: [
        "Philosophy (B.A.)",
        "Comparative Literature (B.A.)",
        "Media & Communication Design (B.A.)",
        "History (B.A.)",
        "Art History (B.A.)",
        "Linguistics (B.A.)",
        "Theater & Performance (B.A.)",
        "Film & Media Studies (B.A.)",
        "Archaeology (B.A.)",
        "Art Practice (B.F.A.)",
        "Dance (B.F.A.)",
        "Classics (B.A.)",
        "Music (B.A.)",
        "Theater and Performance Studies (B.F.A.)",
      ]
    },
    {
      id: 'school-social-sciences',
      label: 'Social Sciences',
      heading: 'School of Social Sciences',
      desc: 'Understanding the structures that govern human societies — from local communities to global institutions. Artemis social scientists combine quantitative rigour with qualitative depth, preparing to shape policy, drive innovation, and challenge orthodoxies.',
      majors: [
        "Anthropology (B.A.)",
        "Political Science (B.A.)",
        "Urban Studies (B.A.)",
        "Economics (B.A.)",
        "Global Governance & Systems (B.A.)",
        "Social Innovation & Design (B.A.)",
      ]
    },
    {
      id: 'school-health-medicine',
      label: 'Health & Medicine',
      heading: 'School of Health & Medicine',
      desc: 'Advancing human health through biological insight, computational power, and clinical precision. Artemis health science students train in cross-continental research environments that span genomics labs, public health field stations, and biomedical computation clusters.',
      majors: [
        "Neuroscience (B.S.)",
        "Public Health (B.S.)",
        "Biomedical Engineering (B.S.)",
        "Nutrition Science (B.S.)",
        "Genetics (B.S.)",
        "Immunobiology (B.S.)",
        "Biomedical Computation (B.S.)",
        "Food Systems (B.S.)",
      ]
    },
    {
      id: 'school-education-human-development',
      label: 'Education & Human Development',
      heading: 'School of Education & Human Development',
      desc: 'Studying how people learn, grow, and flourish — and designing the systems that help them do so. From cognitive science to learning technology, Artemis education students work at the intersection of research, practice, and innovation.',
      majors: [
        "Education (B.A.)",
        "Learning Design & Technology (B.A.)",
        "Cognitive Science (B.A.)",
        "Developmental Psychology (B.A.)",
        "Educational Leadership (B.A.)",
        "Childhood & Human Development (B.A.)",
      ]
    },
    {
      id: 'school-business',
      label: 'Business',
      heading: 'School of Business',
      desc: 'Training leaders who understand that commerce is a tool, not an end. Artemis business students combine analytical sharpness with ethical grounding and global perspective — prepared to build enterprises that create lasting value beyond profit.',
      majors: [
        "International Business (B.S.)",
        "Finance (B.S.)",
        "Business Analytics (B.S.)",
        "Supply Chain & Logistics (B.S.)",
        "Consulting & Strategy (B.S.)",
        "Entrepreneurship (B.S.)",
      ]
    },
  ];

  const sectionIds = schoolSections.map(s => s.id);
  const activeSection = useActiveSection(sectionIds);

  return (
    <div className="flex flex-col bg-white">
      {/* ── Hero Section ── */}
      <section className="relative w-full overflow-hidden">
        <div className="max-w-[1600px] mx-auto">
          <div className="relative w-full h-[45vh] min-h-[360px] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1594750852563-5ed8e0421d40?auto=format&fit=crop&q=80&w=1800"
              alt="Programs of Study"
              className="absolute inset-0 w-full h-full object-cover grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="relative z-10 flex flex-col justify-end h-full max-w-[1400px] mx-auto w-full px-8 lg:px-20 pb-16">
              <div
                ref={heroAnim.ref}
                className={`transition-all duration-700 ${heroAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              >
                <div className="mb-8 flex items-center space-x-3">
                  <span className="w-8 h-[1px] bg-[#8A0000]"></span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">Academic Catalogue</span>
                </div>
                <h1 className="text-[30px] sm:text-[44px] md:text-[56px] font-extrabold leading-[1.05] tracking-tighter text-white mb-6">
                  Programs of Study<br />
                  <span className="text-white/60">2026–2027</span>
                </h1>
                <p className="text-[18px] text-white/70 max-w-xl leading-relaxed font-light">
                  A complete catalogue of undergraduate majors offered by Artemis College — seven schools, sixty-plus degree programmes, one unified standard of excellence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── On This Page Navigation ── */}
      <OnThisPageNav
        sections={schoolSections.map(s => ({ id: s.id, label: s.label }))}
        activeSection={activeSection}
      />

      {/* ── Catalogue Quick Nav + Introduction ── */}
      <section className="max-w-[1400px] mx-auto w-full px-8 lg:px-20 py-16 lg:py-24">
        <div
          ref={introAnim.ref}
          className={`transition-all duration-700 ${introAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="mb-6 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">
              The Catalogue
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left — Introduction */}
            <div>
              <h2 className="text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-8">
                Majors in Artemis College
              </h2>
              <p className="text-[16px] text-gray-600 leading-relaxed mb-4">
                Artemis College offers undergraduate majors across seven interdisciplinary schools — each designed to prepare students for a world that demands both deep expertise and broad adaptability. Every major is built on a common foundation of critical thinking, ethical reasoning, and global perspective.
              </p>
              <p className="text-[16px] text-gray-600 leading-relaxed">
                Students declare a major by the end of their second year, with the flexibility to combine fields through double majors, minors, and certificates. All programmes lead to the same globally recognised Artemis degree, regardless of which college node you attend.
              </p>
            </div>

            {/* Right — Catalogue Quick Navigation */}
            <div className="pt-4">
              <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-6">Quick Navigation</div>
              <ul className="space-y-0">
                {catalogNav.map((item, i) => (
                  <li key={i}>
                    <button
                      className={`w-full text-left py-3 text-[15px] border-t border-gray-100 hover:text-[#8A0000] transition-colors ${item === 'Majors in Artemis College' ? 'text-[#8A0000] font-bold' : 'text-[#141414]'}`}
                      onClick={() => {
                        if (item === 'Majors in Artemis College') {
                          // Already on this page
                        } else if (item === 'The Undergraduate Curriculum') {
                          goToPage('undergraduate_curriculum');
                        } else {
                          goToPage('catalog_page', item);
                        }
                      }}
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── School Sections (alternating white/gray-50) ── */}
      {schoolSections.map((section, idx) => (
        <section
          key={section.id}
          id={section.id}
          className={`scroll-mt-[110px] py-16 lg:py-24 ${idx % 2 === 1 ? 'bg-gray-50' : 'bg-white'}`}
        >
          <div className="max-w-[1400px] mx-auto w-full px-8 lg:px-20">
            {/* Section divider */}
            <div className="relative flex items-center mb-12">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="mx-4 text-[12px] font-bold uppercase tracking-[0.2em] text-gray-500">
                {String(idx + 1).padStart(2, '0')} — {section.label}
              </span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            <h2 className="text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-6">
              {section.heading}
            </h2>

            <p className="text-[16px] text-gray-600 leading-relaxed mb-10 max-w-3xl">
              {section.desc}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-2">
              {section.majors.map((major, i) => (
                <div key={i} className="mb-3">
                  <button
                    onClick={() => goToPage('program_detail', major)}
                    className="text-left text-[15px] text-[#141414] hover:text-[#8A0000] hover:underline leading-snug transition-colors"
                  >
                    {major}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* ── SubPageFooter ── */}
      <SubPageFooter goToPage={goToPage} />
    </div>
  );
}
