
import React from 'react';
import { CVData } from '../types';

interface SidebarProps {
  data: CVData;
  activeTab: 'cv' | 'studio';
  setActiveTab: (tab: 'cv' | 'studio') => void;
}

const Sidebar: React.FC<SidebarProps> = ({ data, activeTab, setActiveTab }) => {
  return (
    <aside className="w-full md:w-80 bg-[#2C3E50] text-slate-100 flex flex-col shrink-0 md:sticky md:top-0 md:h-screen overflow-y-auto">
      <div className="p-8">
        {/* Profile Image Placeholder */}
        <div className="mb-8 flex justify-center">
          <div className="w-32 h-32 rounded-full border-4 border-slate-400/30 overflow-hidden bg-slate-700">
            <img 
              src={`https://picsum.photos/seed/${data.name}/200/200`} 
              alt={data.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <nav className="mb-10 flex flex-col gap-2">
           <button 
            onClick={() => setActiveTab('cv')}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'cv' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-700 text-slate-300'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>My CV</span>
          </button>
          <button 
            onClick={() => setActiveTab('studio')}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'studio' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-700 text-slate-300'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <span>AI Image Studio</span>
          </button>
        </nav>

        <div className="space-y-8">
          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <span className="text-indigo-400">@</span>
                <a href={`mailto:${data.contact.email}`} className="hover:text-indigo-400 transition-colors">{data.contact.email}</a>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-indigo-400">🔗</span>
                <a href={`https://${data.contact.linkedin}`} target="_blank" className="hover:text-indigo-400 transition-colors">LinkedIn</a>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-indigo-400">🛠</span>
                <a href={`https://${data.contact.github}`} target="_blank" className="hover:text-indigo-400 transition-colors">GitHub</a>
              </li>
            </ul>
          </div>

          {/* Top Skills */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">Top Skills</h3>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, idx) => (
                <span key={idx} className="bg-slate-700 text-slate-200 px-2 py-1 rounded text-xs">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">Languages</h3>
            <ul className="space-y-2 text-sm">
              {data.languages.map((lang, idx) => (
                <li key={idx} className="text-slate-300">{lang}</li>
              ))}
            </ul>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">Certifications</h3>
            <ul className="space-y-2 text-sm">
              {data.certifications.map((cert, idx) => (
                <li key={idx} className="text-slate-300 leading-tight">{cert}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      <div className="mt-auto p-8 border-t border-slate-700/50 text-xs text-slate-500 text-center">
        &copy; {new Date().getFullYear()} Michał Sobieraj
      </div>
    </aside>
  );
};

export default Sidebar;
