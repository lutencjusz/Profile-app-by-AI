
import { CV_DATA } from './constants.ts';

// --- STAN ---
let state = {
  isDarkMode: localStorage.getItem('theme') === 'dark' || 
               (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches),
  showAllCourses: false,
  lang: localStorage.getItem('lang') || 'pl'
};

// --- LOGIKA MOTYWU ---
function updateTheme() {
  const html = document.documentElement;
  if (state.isDarkMode) {
    html.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    html.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
}

// --- TŁUMACZENIA INTERFEJSU ---
const UI: any = {
  pl: {
    title: "SDET (Software Development Engineer in Test) dla T-Mobile Polska",
    location: "Warszawa, Mazowieckie, Polska",
    labels: {
      summary: "Podsumowanie",
      experience: "Doświadczenie",
      courses: "Kursy i Certyfikaty",
      education: "Edukacja",
      showMore: "Pokaż wszystkie",
      showLess: "Pokaż mniej",
      contact: "Kontakt",
      skills: "UMIEJĘTNOŚCI"
    },
    summary: [
      "3+ lata doświadczenia w tworzeniu i utrzymywaniu testów automatycznych (GUI, REST, SOAP, Bazy danych);",
      "9+ lat w estymowaniu kosztów złożonych rozwiązań IT i analizie biznesowej, szczególnie dla sektora Telco;",
      "8+ lat doświadczenia w zarządzaniu projektami w złożonym środowisku międzynarodowym;",
      "Ekspercka wiedza w zakresie strategii procesów ITIL dla złożonych rozwiązań IT;",
      "Bardzo silne zaplecze techniczne związane z rozwojem i utrzymaniem systemów IT."
    ]
  },
  en: {
    title: "SDET (Software Development Engineer in Test) for T-Mobile Poland",
    location: "Warsaw, Mazowieckie, Poland",
    labels: {
      summary: "Professional Summary",
      experience: "Experience",
      courses: "Courses & Certifications",
      education: "Education",
      showMore: "Show all",
      showLess: "Show less",
      contact: "Contact",
      skills: "Top Skills"
    },
    summary: [
      "3+ years creating and maintaining automated tests (GUI, REST, SOAP, Databases)",
      "9+ years estimating costs of complex IT solutions and business analysis (Telco/IT)",
      "8+ years of project management in complex international environments",
      "Expertise in complex IT solutions based on ITIL processes strategy",
      "Very strong technical background in IT development and maintenance"
    ]
  }
};

// --- RENDEROWANIE ---
function render() {
  const root = document.getElementById('root');
  if (!root) return;

  updateTheme();
  const currentLang = state.lang as 'pl' | 'en';
  const t = UI[currentLang];

  root.innerHTML = `
    <div class="flex flex-col md:flex-row min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
      
      <!-- SIDEBAR -->
      <aside class="w-full md:w-80 bg-[#2C3E50] dark:bg-slate-950 text-slate-100 flex flex-col shrink-0 md:sticky md:top-0 md:h-screen overflow-y-auto border-r dark:border-slate-800 transition-colors duration-300">
        <div class="p-8">
          <div class="flex justify-between items-center mb-6">
            <!-- Przełącznik Języków -->
            <div class="flex bg-slate-800/50 p-1 rounded-lg border border-white/10">
              <button id="lang-pl" class="px-3 py-1 rounded-md text-[10px] font-bold transition-all ${state.lang === 'pl' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-300'}">PL</button>
              <button id="lang-en" class="px-3 py-1 rounded-md text-[10px] font-bold transition-all ${state.lang === 'en' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-300'}">EN</button>
            </div>
            <!-- Przełącznik Motywu -->
            <button id="theme-toggle" class="p-2.5 rounded-full bg-slate-800/50 border border-white/10 hover:bg-white/10 transition-all active:scale-90 text-lg shadow-inner">
              ${state.isDarkMode ? '☀️' : '🌙'}
            </button>
          </div>

          <div class="mb-8 flex justify-center">
            <div class="w-32 h-32 rounded-full border-4 border-white/20 overflow-hidden shadow-2xl bg-slate-800 ring-4 ring-indigo-500/20">
              <img src="IMG_5595.JPG" alt="${CV_DATA.name}" class="w-full h-full object-cover" onerror="this.src='https://picsum.photos/seed/michal/200/200'"/>
            </div>
          </div>
          
          <!-- BRANDING -->
          <div class="mb-10">
            <div class="flex items-center gap-3 px-4 py-4 rounded-2xl bg-indigo-600 shadow-xl text-white border border-indigo-400/30">
              <span class="text-xl">🚀</span>
              <span class="font-bold tracking-tight">Sopim - ${CV_DATA.name}</span>
            </div>
          </div>

          <div class="space-y-6 pt-6 border-t border-white/10">
            <div>
              <h3 class="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-3">${t.labels.contact}</h3>
              <a href="mailto:${CV_DATA.contact.email}" class="text-xs text-slate-300 hover:text-indigo-400 break-all mb-1 block transition-colors">📧 ${CV_DATA.contact.email}</a>
              <a href="https://${CV_DATA.contact.linkedin}" target="_blank" class="text-xs text-slate-400 hover:text-indigo-400 block mb-1 transition-colors">🔗 LinkedIn</a>
              <a href="https://${CV_DATA.contact.github}" target="_blank" class="text-xs text-slate-400 hover:text-indigo-400 block transition-colors">🛠 GitHub</a>
            </div>
            <div>
              <h3 class="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-3">${t.labels.skills}</h3>
              <div class="flex flex-wrap gap-1">
                ${CV_DATA.skills.map(s => `<span class="bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md text-[9px] border border-white/5 hover:border-indigo-500/50 transition-colors">${s}</span>`).join('')}
              </div>
            </div>
          </div>
        </div>
        <div class="mt-auto p-8 text-[10px] text-slate-500 text-center uppercase tracking-widest opacity-50">
          &copy; ${new Date().getFullYear()} ${CV_DATA.name}
        </div>
      </aside>

      <!-- MAIN CONTENT -->
      <main class="flex-1 bg-white dark:bg-slate-900 transition-colors duration-300 overflow-y-auto">
        <div class="max-w-4xl mx-auto p-6 md:p-16 lg:p-20">
          <div class="fade-in">
            <header class="mb-16">
              <h1 class="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">${CV_DATA.name}</h1>
              <p class="text-xl md:text-2xl text-indigo-600 dark:text-indigo-400 font-bold mb-3">${t.title}</p>
              <div class="flex items-center gap-2 text-slate-500 font-medium">
                <span class="bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full text-xs">📍 ${t.location}</span>
              </div>
            </header>

            <section class="mb-16">
              <h2 class="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-8 flex items-center gap-3">
                <span class="w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center text-sm font-bold shadow-lg shadow-indigo-500/20">01</span> ${t.labels.summary}
              </h2>
              <ul class="space-y-4">
                ${t.summary.map((s: string) => `
                  <li class="flex gap-4 text-slate-600 dark:text-slate-300 leading-relaxed">
                    <span class="text-indigo-500 font-bold">/</span> ${s}
                  </li>
                `).join('')}
              </ul>
            </section>

            <section class="mb-16">
              <h2 class="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-8 flex items-center gap-3">
                <span class="w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center text-sm font-bold shadow-lg shadow-indigo-500/20">02</span> ${t.labels.experience}
              </h2>
              <div class="space-y-12">
                ${CV_DATA.experience.map(e => `
                  <div class="relative pl-8 experience-card">
                    <div class="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-indigo-600 ring-4 ring-white dark:ring-slate-900"></div>
                    <div class="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                      <h3 class="text-xl font-bold text-slate-900 dark:text-white">${e.company}</h3>
                      <span class="text-xs font-bold bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 px-3 py-1 rounded-full mt-2 md:mt-0">
                        ${state.lang === 'pl' ? e.period : e.period.replace('Lipiec', 'July').replace('Obecnie', 'Present')}
                      </span>
                    </div>
                    <p class="text-indigo-600 dark:text-indigo-400 font-bold text-sm mb-3">${e.role}</p>
                    <ul class="space-y-1">
                      ${(e.description || []).map(d => `<li class="text-sm text-slate-500 dark:text-slate-400">• ${d}</li>`).join('')}
                    </ul>
                  </div>
                `).join('')}
              </div>
            </section>

            <section class="mb-16">
              <h2 class="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-8 flex items-center gap-3">
                <span class="w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center text-sm font-bold shadow-lg shadow-indigo-500/20">03</span> ${t.labels.courses}
              </h2>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                ${(state.showAllCourses ? CV_DATA.courses : CV_DATA.courses.slice(0, 9)).map(c => `
                  <div class="bg-white dark:bg-slate-800/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-indigo-500 transition-all group shadow-sm">
                    <h4 class="text-xs font-bold text-slate-900 dark:text-white mb-2 leading-tight group-hover:text-indigo-500">${c.name}</h4>
                    <p class="text-[10px] text-slate-400 mb-1">${c.provider}</p>
                    <p class="text-[9px] text-indigo-500 font-bold uppercase tracking-tighter">${c.date}</p>
                  </div>
                `).join('')}
              </div>
              <div class="mt-10 flex justify-center">
                <button id="toggle-courses" class="group relative px-10 py-3 border-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400 rounded-full font-bold text-sm overflow-hidden transition-all hover:text-white dark:hover:text-slate-900 active:scale-95 shadow-lg">
                  <span class="relative z-10">${state.showAllCourses ? t.labels.showLess : `${t.labels.showMore} (${CV_DATA.courses.length})`}</span>
                  <div class="absolute inset-0 bg-indigo-600 dark:bg-indigo-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </button>
              </div>
            </section>

            <section>
              <h2 class="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-8 flex items-center gap-3">
                <span class="w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center text-sm font-bold shadow-lg shadow-indigo-500/20">04</span> ${t.labels.education}
              </h2>
              ${CV_DATA.education.map(edu => `
                <div class="bg-indigo-50 dark:bg-indigo-900/10 p-8 rounded-3xl border border-indigo-100 dark:border-indigo-900/50 shadow-sm">
                  <h3 class="text-lg font-bold text-slate-900 dark:text-white">${edu.school}</h3>
                  <p class="text-indigo-600 dark:text-indigo-400 font-bold">${state.lang === 'pl' ? edu.degree : 'Engineer, Computer Science'}</p>
                  <p class="text-sm text-slate-400 mt-2">${edu.period}</p>
                </div>
              `).join('')}
            </section>
          </div>
        </div>
      </main>
    </div>
  `;

  attachEvents();
}

function attachEvents() {
  // Motyw
  document.getElementById('theme-toggle')?.addEventListener('click', () => {
    state.isDarkMode = !state.isDarkMode;
    render();
  });

  // Języki
  document.getElementById('lang-pl')?.addEventListener('click', () => {
    state.lang = 'pl';
    localStorage.setItem('lang', 'pl');
    render();
  });

  document.getElementById('lang-en')?.addEventListener('click', () => {
    state.lang = 'en';
    localStorage.setItem('lang', 'en');
    render();
  });

  // Kursy
  document.getElementById('toggle-courses')?.addEventListener('click', () => {
    state.showAllCourses = !state.showAllCourses;
    render();
  });
}

// Start aplikacji
render();
