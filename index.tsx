
import { CV_DATA } from './constants';
import { CVData } from './types';

// --- Application State ---
let state = {
  isDarkMode: localStorage.getItem('theme') === 'dark',
  showAllCourses: false
};

// --- Theme Management ---
function applyTheme() {
  if (state.isDarkMode) {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
}

// --- Rendering Functions ---

function renderSidebar(data: CVData) {
  return `
    <aside class="w-full md:w-80 bg-[#2C3E50] dark:bg-slate-950 text-slate-100 flex flex-col shrink-0 md:sticky md:top-0 md:h-screen overflow-y-auto transition-colors duration-300">
      <div class="p-8">
        <!-- Theme Toggle -->
        <div class="flex justify-end mb-4">
          <button id="theme-toggle" class="p-2 rounded-full hover:bg-white/10 transition-colors" title="Toggle Dark Mode">
            ${state.isDarkMode ? `
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 9h-1m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707.707M6.343 6.343l-.707.707M14.5 12a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            ` : `
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9 9 0 0012 21a9 9 0 008.354-5.646z" />
              </svg>
            `}
          </button>
        </div>

        <div class="mb-8 flex justify-center">
          <div class="w-32 h-32 rounded-full border-4 border-slate-400/30 overflow-hidden bg-slate-700 shadow-xl">
            <img src="https://i.ibb.co/p6Vst7V/image.png" alt="${data.name}" class="w-full h-full object-cover" 
                 onerror="this.src='https://picsum.photos/seed/michal/200/200'"/>
          </div>
        </div>
        
        <nav class="mb-10 flex flex-col gap-2">
           <div class="flex items-center gap-3 px-4 py-3 rounded-lg bg-indigo-600 text-white shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            <span class="font-medium whitespace-nowrap">Sopim - Michał Sobieraj</span>
          </div>
        </nav>
        
        <div class="space-y-8">
          <div>
            <h3 class="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 border-b border-slate-700/50 pb-1">Contact</h3>
            <ul class="space-y-3 text-sm">
              <li><a href="mailto:${data.contact.email}" class="flex items-center gap-2 hover:text-indigo-400 transition-colors"><span>📧</span> ${data.contact.email}</a></li>
              <li><a href="https://${data.contact.linkedin}" target="_blank" class="flex items-center gap-2 hover:text-indigo-400 transition-colors"><span>🔗</span> LinkedIn</a></li>
              <li><a href="https://${data.contact.github}" target="_blank" class="flex items-center gap-2 hover:text-indigo-400 transition-colors"><span>🛠</span> GitHub</a></li>
            </ul>
          </div>
          <div>
            <h3 class="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 border-b border-slate-700/50 pb-1">Top Skills</h3>
            <div class="flex flex-wrap gap-2">
              ${data.skills.map(skill => `<span class="bg-slate-700 dark:bg-slate-800 text-slate-200 px-2 py-1 rounded text-xs border border-slate-600/30">${skill}</span>`).join('')}
            </div>
          </div>
          <div>
            <h3 class="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 border-b border-slate-700/50 pb-1">Languages</h3>
            <ul class="space-y-2 text-sm">
              ${data.languages.map(lang => `<li class="text-slate-300 flex items-center gap-2"><span>💬</span> ${lang}</li>`).join('')}
            </ul>
          </div>
        </div>
      </div>
      <div class="mt-auto p-8 border-t border-slate-700/50 text-xs text-slate-500 text-center transition-colors duration-300">&copy; ${new Date().getFullYear()} Michał Sobieraj</div>
    </aside>
  `;
}

function renderCV(data: CVData) {
  const displayedCourses = state.showAllCourses ? data.courses : data.courses.slice(0, 9);
  const hiddenCount = data.courses.length - 9;

  return `
    <div class="fade-in max-w-3xl mx-auto">
      <header class="mb-12">
        <h1 class="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">${data.name}</h1>
        <p class="text-xl text-indigo-600 dark:text-indigo-400 font-semibold mb-1">${data.title}</p>
        <p class="text-slate-500 dark:text-slate-400 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          ${data.location}
        </p>
      </header>
      
      <section class="mb-12">
        <h2 class="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6 border-b-2 border-indigo-100 dark:border-slate-800 pb-2 flex items-center gap-3">
          <span class="bg-indigo-600 text-white p-1 rounded">👤</span> Summary
        </h2>
        <ul class="space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed">
          ${data.summary.map(item => `<li class="flex items-start gap-3"><span class="text-indigo-500 mt-1.5 h-1.5 w-1.5 rounded-full bg-indigo-500 shrink-0"></span><span>${item}</span></li>`).join('')}
        </ul>
      </section>
      
      <section class="mb-12">
        <h2 class="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6 border-b-2 border-indigo-100 dark:border-slate-800 pb-2 flex items-center gap-3">
          <span class="bg-indigo-600 text-white p-1 rounded">💼</span> Experience
        </h2>
        <div class="space-y-10">
          ${data.experience.map(exp => `
            <div class="relative pl-8 before:absolute before:left-0 before:top-2 before:bottom-0 before:w-0.5 before:bg-indigo-100 dark:before:bg-slate-800 last:before:hidden">
              <div class="absolute left-[-4px] top-2 w-2.5 h-2.5 rounded-full bg-indigo-500 border-2 border-white dark:border-slate-900"></div>
              <div class="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                <div>
                  <h3 class="text-xl font-bold text-slate-800 dark:text-slate-100">${exp.company}</h3>
                  <p class="text-indigo-600 dark:text-indigo-400 font-medium">${exp.role}</p>
                </div>
                <div class="text-sm text-slate-500 dark:text-slate-400 font-medium bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full mt-1 md:mt-0 transition-colors shadow-sm">${exp.period}</div>
              </div>
              <p class="text-sm text-slate-400 italic mb-3">${exp.location}</p>
              ${exp.description ? `<ul class="space-y-2 text-slate-600 dark:text-slate-400 border-l-2 border-slate-100 dark:border-slate-800 ml-1 pl-4">${exp.description.map(p => `<li class="text-sm"><span class="text-slate-300 dark:text-slate-600 mr-2">•</span>${p}</li>`).join('')}</ul>` : ''}
            </div>
          `).join('')}
        </div>
      </section>

      <section class="mb-12">
        <h2 class="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6 border-b-2 border-indigo-100 dark:border-slate-800 pb-2 flex items-center gap-3">
          <span class="bg-indigo-600 text-white p-1 rounded">🛠️</span> Skills & Certifications
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          ${displayedCourses.map(course => `
            <div class="bg-white dark:bg-slate-800/40 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-900 flex flex-col justify-between">
              <div>
                <h3 class="text-sm font-bold text-slate-800 dark:text-slate-100 leading-tight">${course.name}</h3>
                <p class="text-indigo-600 dark:text-indigo-400 text-xs font-medium mt-1">${course.provider}</p>
              </div>
              <p class="text-[10px] text-slate-500 dark:text-slate-400 mt-3 flex items-center gap-1 opacity-70">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 00-2 2z" /></svg>
                ${course.date}
              </p>
            </div>
          `).join('')}
        </div>
        
        ${data.courses.length > 9 ? `
          <div class="mt-10 flex justify-center">
            <button id="toggle-courses" class="group flex items-center gap-2 px-8 py-3 border-2 border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400 rounded-full font-bold hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-400 dark:hover:text-slate-900 transition-all shadow-lg active:scale-95">
              <span>${state.showAllCourses ? 'Show Less' : `Show More (${hiddenCount} more)`}</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transition-transform duration-300 ${state.showAllCourses ? 'rotate-180' : ''}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        ` : ''}
      </section>

      <section class="mb-12">
        <h2 class="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6 border-b-2 border-indigo-100 dark:border-slate-800 pb-2 flex items-center gap-3">
          <span class="bg-indigo-600 text-white p-1 rounded">🎓</span> Education
        </h2>
        <div class="grid grid-cols-1 gap-6">
          ${data.education.map(edu => `
            <div class="bg-white dark:bg-slate-800/40 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-900">
              <h3 class="text-lg font-bold text-slate-800 dark:text-slate-100">${edu.school}</h3>
              <p class="text-indigo-600 dark:text-indigo-400 font-medium">${edu.degree}</p>
              <p class="text-sm text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 00-2 2z" /></svg>
                ${edu.period}
              </p>
            </div>
          `).join('')}
        </div>
      </section>
    </div>
  `;
}

// --- Controller & Event Management ---

function render() {
  const root = document.getElementById('root');
  if (!root) return;

  applyTheme();

  root.innerHTML = `
    <div class="flex flex-col md:flex-row min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
      ${renderSidebar(CV_DATA)}
      <main class="flex-1 overflow-y-auto bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
        <div class="p-6 md:p-12 lg:p-16">
          ${renderCV(CV_DATA)}
        </div>
      </main>
    </div>
  `;

  attachEventListeners();
}

function attachEventListeners() {
  // Theme toggle
  document.getElementById('theme-toggle')?.addEventListener('click', () => {
    state.isDarkMode = !state.isDarkMode;
    render();
  });

  // Course toggle
  document.getElementById('toggle-courses')?.addEventListener('click', () => {
    state.showAllCourses = !state.showAllCourses;
    render();
    // Smooth scroll back to section top if closing
    if (!state.showAllCourses) {
      document.getElementById('toggle-courses')?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  });
}

// Initial Boot
render();
