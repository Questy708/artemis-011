'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import SubPageFooter from '@/components/artemis/SubPageFooter';
import OnThisPageNav, { useActiveSection } from '@/components/artemis/OnThisPageNav';
import { programsData, generateProgramData } from '@/lib/programs-data';

interface ProgramDetailProps {
  goToPage: (page: string, program?: string) => void;
  programName?: string;
}

export default function ProgramDetail({ goToPage, programName = "African Studies (B.A.)" }: ProgramDetailProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [manualScroll, setManualScroll] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  const actualProgramName = programName || "African Studies (B.A.)";
  const data = useMemo(() => programsData[actualProgramName] || generateProgramData(actualProgramName), [actualProgramName]);

  const tabs = useMemo(() => [
    { id: 'overview', label: 'Overview' },
    { id: 'requirements', label: 'Summary of Requirements' },
    { id: 'firstyear', label: 'First Year' },
    { id: 'certificates', label: 'Certificates' },
    { id: 'faculty', label: 'Faculty' },
    { id: 'bios', label: 'Faculty Bios' },
    { id: 'roadmap', label: 'Roadmap' },
    { id: 'courses', label: 'Courses' }
  ].filter(tab => {
    if (tab.id === 'certificates' && !data.certificateText) return false;
    return true;
  }), [data]);

  const activeSection = useActiveSection(tabs.map(t => t.id));

  const [facultyBios, setFacultyBios] = useState<{name: string, title: string, bio: string, image: string}[]>([]);
  const [isLoadingBios, setIsLoadingBios] = useState(true);

  // Load bios on mount or when data changes
  useEffect(() => {
    const timer = setTimeout(() => {
      const getFacultyList = (str?: string) => {
        if (!str) return [];
        return str.split(',').map(s => s.trim()).filter(Boolean);
      };

      const extracted = [
        ...getFacultyList(data.facultyProfessors).map(n => ({ name: n, title: 'Professor' })),
        ...getFacultyList(data.facultyAssociate).map(n => ({ name: n, title: 'Associate Professor' })),
        ...getFacultyList(data.facultyAssistant).map(n => ({ name: n, title: 'Assistant Professor' })),
        ...getFacultyList(data.facultyLecturers).map(n => ({ name: n, title: 'Lecturer' }))
      ];

      const bios = extracted.map(f => {
        const cleanName = f.name.replace(/\(.*?\)/g, '').trim();
        const disciplineMatch = f.name.match(/\((.*?)\)/);
        const discipline = disciplineMatch ? disciplineMatch[1] : data.title;
        
        return {
          name: cleanName,
          title: f.title,
          image: `https://ui-avatars.com/api/?name=${encodeURIComponent(cleanName)}&background=random&size=150`,
          bio: `${cleanName} is a ${f.title.toLowerCase()} specializing in ${discipline}. Their current research explores the intersections of ${discipline.toLowerCase()} and global theoretical models.`
        };
      });

      setFacultyBios(bios);
      setIsLoadingBios(false);
    }, 600);
    
    return () => clearTimeout(timer);
  }, [data]);

  // Setup intersection observer for scroll-spy
  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(
      (entries) => {
        if (manualScroll) return;

        // Find the visible section with the largest intersection ratio
        const visibleEntry = entries.find((entry) => entry.isIntersecting);
        if (visibleEntry) {
          setActiveTab(visibleEntry.target.id);
        }
      },
      {
        rootMargin: '-10% 0px -80% 0px', // Trigger when section is near top
        threshold: 0
      }
    );

    const { current: currentObserver } = observer;
    Object.values(sectionRefs.current).forEach((section) => {
      if (section) currentObserver.observe(section);
    });

    return () => currentObserver.disconnect();
  }, [tabs, manualScroll]);

  const scrollToSection = (id: string) => {
    const section = sectionRefs.current[id];
    if (section) {
      setManualScroll(true);
      setActiveTab(id);
      
      const yOffset = -120; // Offset for sticky header
      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({ top: y, behavior: 'smooth' });

      // Re-enable observer after scroll ends
      setTimeout(() => setManualScroll(false), 1000);
    }
  };

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

  return (
    <div className="flex flex-col bg-white">
      {/* Catalog Header */}
      <div className="bg-[#8A0000] text-white pt-8 pb-4 px-8 lg:px-20 flex justify-between items-end">
         <h1 className="text-3xl lg:text-4xl font-serif font-bold">Artemis College Programs of Study 2026–2027</h1>
      </div>
      


      <OnThisPageNav
        sections={tabs.map(t => ({ id: t.id, label: t.label }))}
        activeSection={activeSection}
      />

      <div className="flex flex-col md:flex-row max-w-[1400px] w-full mx-auto pb-24 border-l border-r border-gray-200 relative">
        {/* Catalog Navigation Sidebar */}
        <aside className="w-full md:w-[320px] shrink-0 border-r border-gray-200 bg-white">
          <ul className="flex flex-col py-8 px-6 sticky top-24">
            {catalogNav.map((item, i) => (
              <li key={i}>
                <button 
                  className={`w-full text-left py-3 text-[15px] hover:text-[#8A0000] border-t border-gray-100 ${item === 'Subjects of Instruction' ? 'text-[#8A0000] font-bold border-l-2 border-l-[#8A0000] pl-3 -ml-[14px]' : 'text-[#141414]'}`}
                  onClick={(e) => {
                    if(item === 'Majors in Artemis College') goToPage('programs');
                    else if (item === 'The Undergraduate Curriculum') goToPage('undergraduate_curriculum');
                    else goToPage('catalog_page', item);
                  }}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-1 px-8 lg:px-20 py-16 lg:py-24 bg-white">
          <h1 className="text-[36px] font-serif font-bold text-[#141414] mb-8">
            {data.title}
          </h1>

          {/* Sticky Navigation Tabs */}
          <div className="sticky top-0 z-20 bg-white pt-4 pb-0 border-b border-gray-200 mb-12">
            <div className="flex overflow-x-auto hide-scrollbar">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => scrollToSection(tab.id)}
                  className={`px-5 py-4 text-[13px] font-bold whitespace-nowrap transition-all border-b-[3px] -mb-[1px] uppercase tracking-wider ${
                    activeTab === tab.id 
                      ? 'border-[#8A0000] text-[#8A0000]' 
                      : 'border-transparent text-gray-500 hover:text-[#141414]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="max-w-4xl space-y-32">
            {/* Overview Section */}
            <section id="overview" ref={(el) => { sectionRefs.current['overview'] = el; }} className="scroll-mt-32">
              <div className="space-y-6">
                <p className="text-[15px] leading-relaxed text-[#141414]">
                  <strong>Director of undergraduate studies</strong>: <button onClick={() => goToPage('our-people')} className="text-[#8A0000] hover:underline font-bold">{data.directorName}</button>, {data.directorLocation};{' '}
                  {data.coDirectorTitle && data.coDirectorName && (
                    <span>{data.coDirectorTitle}: <button onClick={() => goToPage('our-people')} className="text-[#8A0000] hover:underline font-bold">{data.coDirectorName}</button>, {data.coDirectorLocation};{' '}</span>
                  )}
                  <button onClick={() => goToPage('about')} className="text-[#8A0000] hover:underline font-bold">{data.website}</button>
                </p>
                {data.overviewParagraphs.map((p, i) => (
                  <p key={i} className="text-[15px] leading-relaxed text-[#141414]">{p}</p>
                ))}
                
                <h4 className="text-[20px] font-bold text-[#141414] mt-12 mb-6 border-b border-gray-100 pb-2">Requirements of the Major</h4>
                {data.requirementsParagraphs.map((p, i) => (
                  <p key={`req-${i}`} className="text-[15px] leading-relaxed text-[#141414]" dangerouslySetInnerHTML={{ __html: p.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                ))}

                <h4 className="text-[20px] font-bold text-[#141414] mt-12 mb-6 border-b border-gray-100 pb-2">Senior Requirement</h4>
                <p className="text-[15px] leading-relaxed text-[#141414]">{data.seniorRequirement}</p>

                <h4 className="text-[20px] font-bold text-[#141414] mt-12 mb-6 border-b border-gray-100 pb-2">Advising</h4>
                <p className="text-[15px] leading-relaxed text-[#141414]">{data.advising}</p>
              </div>
            </section>

            {/* Requirements Summary Section */}
            <section id="requirements" ref={(el) => { sectionRefs.current['requirements'] = el; }} className="scroll-mt-32">
              <h3 className="text-[22px] font-bold text-[#141414] mb-8 uppercase tracking-widest text-center py-4 bg-gray-50 border-y border-gray-200">Summary of Major Requirements</h3>
              <div className="space-y-4">
                <p className="font-bold text-[18px] mb-4">12 courses (12 credits)</p>
                <div className="grid grid-cols-1 gap-6">
                  {data.requirementsArray.map((req, i) => (
                    <div key={i} className="flex items-start space-x-4 p-4 border border-gray-100 rounded-lg hover:border-[#8A0000]/20 transition-colors">
                      <div className="w-6 h-6 rounded-full bg-[#8A0000]/10 flex items-center justify-center shrink-0 mt-1">
                        <div className="w-2 h-2 rounded-full bg-[#8A0000]"></div>
                      </div>
                      <p className="text-[15px] text-gray-800">{req}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-12 bg-[#141414] text-white p-8 rounded-xl shadow-xl">
                  <h4 className="text-[14px] font-bold uppercase tracking-widest text-[#8A0000] mb-6">Quick Overview</h4>
                  <ul className="space-y-4 text-[14px]">
                    <li className="flex justify-between border-b border-white/10 pb-2">
                      <span className="text-gray-400">Prerequisites</span>
                      <span className="font-bold">None</span>
                    </li>
                    <li className="flex justify-between border-b border-white/10 pb-2">
                      <span className="text-gray-400">Total Courses</span>
                      <span className="font-bold">12 Term Courses</span>
                    </li>
                    <li className="flex justify-between border-b border-white/10 pb-2">
                      <span className="text-gray-400">Distribution</span>
                      <span className="font-bold text-right max-w-[200px]">{data.summaryDistribution}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* First Year Section */}
            <section id="firstyear" ref={(el) => { sectionRefs.current['firstyear'] = el; }} className="scroll-mt-32">
              <h3 className="text-[22px] font-bold text-[#141414] mb-8">First-Year Guidelines</h3>
              <div className="space-y-4 text-[15px] leading-relaxed text-gray-700">
                {data.firstYearParagraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </section>

            {/* Certificates Section */}
            {data.certificateText && (
              <section id="certificates" ref={(el) => { sectionRefs.current['certificates'] = el; }} className="scroll-mt-32">
                <h3 className="text-[22px] font-bold text-[#141414] mb-8">Certificates of Advanced Study</h3>
                <div className="space-y-6 text-[15px] text-[#141414] bg-white border border-gray-100 p-8 shadow-sm">
                  <p className="leading-relaxed">{data.certificateText}</p>
                  {data.certificateRequirements && (
                    <div className="pt-6 border-t border-gray-100">
                      <h4 className="font-bold text-[16px] mb-4 uppercase tracking-tighter">Required Credentials</h4>
                      <p className="text-gray-600">{data.certificateRequirements}</p>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* Faculty Section */}
            <section id="faculty" ref={(el) => { sectionRefs.current['faculty'] = el; }} className="scroll-mt-32">
              <h3 className="text-[22px] font-bold text-[#141414] mb-8">Departmental Faculty</h3>
              <div className="space-y-6 text-[15px] text-[#141414]">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                  <div className="p-6 bg-gray-50 rounded-lg">
                    <h5 className="font-bold text-[#8A0000] uppercase tracking-widest text-[11px] mb-3">Full Professors</h5>
                    <p className="leading-relaxed break-words">{data.facultyProfessors}</p>
                  </div>
                  <div className="p-6 bg-gray-50 rounded-lg">
                    <h5 className="font-bold text-[#8A0000] uppercase tracking-widest text-[11px] mb-3">Associate Professors</h5>
                    <p className="leading-relaxed break-words">{data.facultyAssociate}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Bios Section */}
            <section id="bios" ref={(el) => { sectionRefs.current['bios'] = el; }} className="scroll-mt-32">
              <div className="flex items-center justify-between mb-8 border-b border-gray-200 pb-4">
                <h3 className="text-[22px] font-bold text-[#141414]">Faculty Profiles</h3>
              </div>
              {isLoadingBios ? (
                <div className="flex justify-center items-center py-24">
                  <div className="w-12 h-12 rounded-full border-4 border-gray-100 border-t-[#8A0000] animate-spin"></div>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                  {facultyBios.map((bio, idx) => (
                    <div key={idx} className="group flex flex-col bg-white p-6 items-start shadow-sm border border-gray-100 hover:border-[#8A0000]/30 transition-all rounded-xl">
                      <div className="flex items-center space-x-4 mb-6">
                        <img src={bio.image} alt={bio.name} className="w-20 h-20 rounded-full object-cover shadow-md grayscale group-hover:grayscale-0 transition-all" />
                        <div>
                          <h5 className="font-bold text-[18px] text-[#141414] group-hover:text-[#8A0000] transition-colors">{bio.name}</h5>
                          <p className="text-[11px] font-bold text-[#8A0000] uppercase tracking-widest">{bio.title}</p>
                        </div>
                      </div>
                      <p className="text-[14px] text-gray-600 leading-relaxed italic border-l-2 border-gray-100 pl-4">
                        &quot;{bio.bio}&quot;
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Roadmap Section */}
            <section id="roadmap" ref={(el) => { sectionRefs.current['roadmap'] = el; }} className="scroll-mt-32">
              <div className="bg-[#141414] text-white p-10 rounded-2xl">
                <h3 className="text-[22px] font-bold mb-4">Navigational Roadmap</h3>
                <p className="text-gray-400 text-[16px] leading-relaxed mb-8">
                  Navigate your academic journey from orientation to graduation with our integrated visual mapping system.
                </p>
                <button onClick={() => goToPage('education')} className="inline-flex items-center space-x-4 px-8 py-3 bg-white text-[#141414] font-bold uppercase tracking-widest text-[12px] hover:bg-[#8A0000] hover:text-white transition-all transform hover:-translate-y-1">
                  <span>Open Roadmap Library</span>
                  <span className="text-lg">↗</span>
                </button>
              </div>
            </section>

            {/* Courses Section */}
            <section id="courses" ref={(el) => { sectionRefs.current['courses'] = el; }} className="scroll-mt-32 pb-24">
              <h3 className="text-[22px] font-bold text-[#141414] mb-8">Course Directory</h3>
              <div className="flex flex-wrap gap-4">
                {data.coursesLinks.map((link, i) => (
                  <button key={i} onClick={() => goToPage('education')} className={`flex items-center gap-3 px-8 py-4 font-bold text-[12px] tracking-[0.2em] uppercase shadow-sm transition-all transform hover:-translate-y-1 ${i === 0 ? 'text-white bg-[#8A0000] hover:bg-[#6A0000]' : 'text-[#141414] bg-white border border-gray-200 hover:border-[#8A0000]'}`}>
                    {link.label} <span>↗</span>
                  </button>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>

      <SubPageFooter goToPage={goToPage} />
    </div>
  );
}
