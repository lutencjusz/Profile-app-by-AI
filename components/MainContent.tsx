
import React, { useState } from 'react';
import { CVData } from '../types';

interface MainContentProps {
  data: CVData;
}

const MainContent: React.FC<MainContentProps> = ({ data }) => {
  const [showAll, setShowAll] = useState(false);
  const displayedCourses = showAll ? data.courses : data.courses.slice(0, 9);
  const hiddenCount = data.courses.length - 9;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">{data.name}</h1>
        <p className="text-xl text-indigo-600 font-medium mb-1">{data.title}</p>
        <p className="text-slate-500 flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {data.location}
        </p>
      </header>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 border-b-2 border-indigo-100 pb-2 flex items-center gap-2">
          <span>👤</span> Summary
        </h2>
        <ul className="space-y-4 text-slate-600 leading-relaxed">
          {data.summary.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span className="text-indigo-500 mt-1.5 h-1.5 w-1.5 rounded-full bg-indigo-500 shrink-0"></span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 border-b-2 border-indigo-100 pb-2 flex items-center gap-2">
          <span>💼</span> Experience
        </h2>
        <div className="space-y-10">
          {data.experience.map((exp, idx) => (
            <div key={idx} className="relative pl-8 before:absolute before:left-0 before:top-2 before:bottom-0 before:w-0.5 before:bg-indigo-100 last:before:hidden">
              <div className="absolute left-[-4px] top-2 w-2.5 h-2.5 rounded-full bg-indigo-500 border-2 border-white"></div>
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                <div>
                  <h3 className="text-xl font-bold text-slate-800">{exp.company}</h3>
                  <p className="text-indigo-600 font-medium">{exp.role}</p>
                </div>
                <div className="text-sm text-slate-500 font-medium bg-slate-100 px-3 py-1 rounded-full mt-1 md:mt-0 inline-block w-fit">
                  {exp.period}
                </div>
              </div>
              <p className="text-sm text-slate-400 italic mb-3">{exp.location}</p>
              {exp.description && (
                <ul className="space-y-2 text-slate-600 border-l-2 border-slate-100 ml-1 pl-4">
                  {exp.description.map((point, pIdx) => (
                    <li key={pIdx} className="text-sm">
                      <span className="text-slate-300 mr-2">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 border-b-2 border-indigo-100 pb-2 flex items-center gap-2">
          <span>🛠️</span> Skills & Certifications
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayedCourses.map((course, idx) => (
            <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm transition-all hover:shadow-md hover:border-indigo-200 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-800 leading-tight">{course.name}</h3>
                <p className="text-indigo-600 text-xs font-medium mt-1">{course.provider}</p>
              </div>
              <p className="text-[10px] text-slate-500 mt-3 flex items-center gap-1 opacity-70">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 00-2 2z" /></svg>
                {course.date}
              </p>
            </div>
          ))}
        </div>
        
        {data.courses.length > 9 && (
          <div className="mt-8 flex justify-center">
            <button 
              onClick={() => setShowAll(!showAll)}
              className="group flex items-center gap-2 px-8 py-3 border-2 border-indigo-600 text-indigo-600 rounded-full font-bold hover:bg-indigo-600 hover:text-white transition-all shadow-lg active:scale-95"
            >
              <span>{showAll ? 'Show Less' : `Show More (${hiddenCount} more)`}</span>
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        )}
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 border-b-2 border-indigo-100 pb-2 flex items-center gap-2">
          <span>🎓</span> Education
        </h2>
        {data.education.map((edu, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm transition-all hover:shadow-md hover:border-indigo-100">
            <h3 className="text-lg font-bold text-slate-800">{edu.school}</h3>
            <p className="text-indigo-600 font-medium">{edu.degree}</p>
            <p className="text-sm text-slate-500 mt-1 flex items-center gap-2">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 00-2 2z" /></svg>
               {edu.period}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default MainContent;
