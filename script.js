
import { GoogleGenAI } from "@google/genai";

// --- DATA ---
const CV_DATA = {
  name: "Michał Sobieraj",
  title: "SDET (Software Development Engineer in Test) for T-Mobile Poland",
  location: "Warsaw, Mazowieckie, Poland",
  contact: {
    email: "lutencjusz@gmail.com",
    linkedin: "linkedin.com/in/michal-sobieraj-2953962",
    github: "github.com/lutencjusz"
  },
  skills: ["JUnit", "Selenium", "Postman", "SQL", "Agile", "Business Analysis", "Defect Management", "RPA", "Jenkins", "Kafka"],
  languages: ["English (Full Professional)", "Polish (Native)"],
  certifications: ["ISTQB® Certified Tester Foundation Level"],
  summary: [
    "3+ creating and maintaining automated tests (GUI, REST, SOAP, Databases)",
    "9+ estimate of costs complex IT solutions and business analysis especially for Telco and IT;",
    "8+ years of experience in project management of complex international environment;",
    "Expertise in complex IT solutions based on ITIL processes strategy;",
    "Very strong technical background related with IT development and maintenance."
  ],
  experience: [
    {
      company: "T-Mobile",
      role: "Software Development Engineer in Test",
      period: "July 2022 - Present",
      location: "Warszawa, Polska"
    },
    {
      company: "Sii Poland",
      role: "Senior Information Technology Business Analyst",
      period: "November 2019 - July 2022",
      location: "Warszawa, Polska"
    },
    {
      company: "Polkomtel",
      role: "Senior Business Analyst",
      period: "June 2009 - November 2019",
      location: "Warszawa, Polska",
      description: [
        "Preparing of estimates, opportunity study, feasibility study",
        "Estimating IT costs of new business products",
        "Coordinating and verifying subcontractors"
      ]
    }
  ],
  education: [
    {
      school: "Polsko-Japońska Akademia Technik Komputerowych w Warszawie",
      degree: "Engineer, Computer Science",
      period: "1998 - 2002"
    }
  ],
  courses: [
    { name: "Hackathon during Tech Day 2025 – AI & Data Edition", provider: "T-Mobile", date: "15/10/2025" },
    { name: "Apache Kafka – od podstaw do zaawansowanej wiedzy – 5h (Oskar Polak, Udemy)", provider: "T-Mobile", date: "12/05/2024" },
    { name: "CI/CD Jenkins dla testera/programisty w praktyce! – 5,5h", provider: "T-Mobile", date: "18/06/2023" },
    { name: "Become 100% Confident RPA UiPath Developer – Build 8 Projects (Udemy)", provider: "T-Mobile", date: "10/04/2023" },
    { name: "Postman od podstaw – testowanie REST API", provider: "Sii Poland", date: "18/04/2022" },
    { name: "Akademia testera automatyzującego wave 1", provider: "T-Mobile", date: "18/10/2021" },
    { name: "Tworzenie aplikacji w systemie Android", provider: "Sii Poland", date: "17/10/2021" },
    { name: "Selenium – Serenity BDD Java", provider: "Sii Poland", date: "08/11/2020" },
    { name: "Front-end zaawansowany (Udemy) – 38,5h", provider: "Sii Poland", date: "31/10/2020" },
    { name: "React dla średnio zaawansowanych – 17,5h", provider: "Sii Poland", date: "22/05/2020" },
    { name: "Node.js, Express, MongoDB & More – The Complete Bootcamp 2019 – 42h", provider: "Polkomtel", date: "31/08/2019" },
    { name: "Systems Architecture for Analyst – 24h", provider: "Polkomtel", date: "15/11/2018" },
    { name: "UML for Analyst", provider: "Polkomtel", date: "10/2018" },
    { name: "Angular/CLI – kompletny kurs od podstaw – 13h, 168 wykładów", provider: "Polkomtel", date: "23/02/2018" },
    { name: "The George Washington University – PMI", provider: "Siemens", date: "1999–2003" },
    { name: "ASAP24 – Mind Mapping", provider: "Polkomtel", date: "–" },
    { name: "CIB Training EMEA – Istanbul – Improving the Control Environment", provider: "Citi Handlowy", date: "–" },
    { name: "Europejski Instytut Rozwoju Kadr – Risk Analytics", provider: "Citi Handlowy", date: "–" },
    { name: "House of Skills – Leadership 1", provider: "Citi Handlowy", date: "–" },
    { name: "ISTQB Foundation – Sii Training Practice", provider: "Sii Poland", date: "–" },
    { name: "Modelowanie procesów biznesowych w UML i BPMN przy użyciu Enterprise Architect", provider: "Polkomtel", date: "–" },
    { name: "Open Source Education Center – Scope Management by Enterprise Architect", provider: "Polkomtel", date: "–" },
    { name: "Salesforce – Profil Trailblazer", provider: "Sii Poland", date: "–" },
    { name: "Service Oriented Architecture (SOA) – introduction", provider: "Polkomtel", date: "–" },
    { name: "Zarządzanie zakresem przy użyciu narzędzia Enterprise Architect", provider: "Polkomtel", date: "–" }
  ]
};

const LOADING_STEPS = [
  "Analyzing facial features...",
  "Optimizing lighting environment...",
  "Applying professional color grading...",
  "Refining background details...",
  "Finalizing high-resolution output..."
];

// --- STATE ---
let state = {
  activeTab: 'cv',
  isDarkMode: localStorage.getItem('theme') === 'dark',
  showAllCourses: false,
  studio: {
    selectedImage: null,
    prompt: '',
    isProcessing: false,
    currentStep: 0,
    editedImage: null,
    error: null
  }
};

// --- CORE FUNCTIONS ---
function applyTheme() {
  if (state.isDarkMode) {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
}

function render() {
  const root = document.getElementById('root');
  applyTheme();

  root.innerHTML = `
    <div class="flex flex-col md:flex-row min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
      ${renderSidebar()}
      <main class="flex-1 overflow-y-auto bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
        <div class="max-w-4xl mx-auto p-6 md:p-12">
          ${state.activeTab === 'cv' ? renderCV() : renderStudio()}
        </div>
      </main>
      ${renderMobileNav()}
    </div>
  `;

  attachEventListeners();
}

// --- VIEW COMPONENTS ---
function renderSidebar() {
  return `
    <aside class="w-full md:w-80 bg-[#2C3E50] dark:bg-slate-950 text-slate-100 flex flex-col shrink-0 md:sticky md:top-0 md:h-screen overflow-y-auto">
      <div class="p-8">
        <div class="flex justify-end mb-4">
          <button id="theme-toggle" class="p-2 rounded-full hover:bg-white/10 transition-colors">
            ${state.isDarkMode ? '☀️' : '🌙'}
          </button>
        </div>

        <div class="mb-8 flex justify-center">
          <div class="w-32 h-32 rounded-full border-4 border-slate-400/30 overflow-hidden bg-slate-700 shadow-xl">
            <img src="IMG_5595.JPG" alt="${CV_DATA.name}" class="w-full h-full object-cover" onerror="this.src='https://picsum.photos/seed/michal/200/200'"/>
          </div>
        </div>

        <nav class="mb-10 flex flex-col gap-2">
          <button id="nav-cv" class="flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${state.activeTab === 'cv' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-700 text-slate-300'}">
            <span>👤</span> My CV
          </button>
          <button id="nav-studio" class="flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${state.activeTab === 'studio' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-700 text-slate-300'}">
            <span>🎨</span> AI Image Studio
          </button>
        </nav>

        <div class="space-y-6 text-sm">
          <div>
            <h3 class="font-bold text-slate-400 uppercase tracking-widest text-xs mb-3">Contact</h3>
            <p class="text-slate-300">📧 ${CV_DATA.contact.email}</p>
          </div>
          <div>
            <h3 class="font-bold text-slate-400 uppercase tracking-widest text-xs mb-3">Skills</h3>
            <div class="flex flex-wrap gap-2">
              ${CV_DATA.skills.map(s => `<span class="bg-slate-700 px-2 py-1 rounded text-[10px]">${s}</span>`).join('')}
            </div>
          </div>
        </div>
      </div>
      <div class="mt-auto p-8 border-t border-slate-700/50 text-[10px] text-slate-500 text-center">
        &copy; ${new Date().getFullYear()} Sopim
      </div>
    </aside>
  `;
}

function renderCV() {
  const displayedCourses = state.showAllCourses ? CV_DATA.courses : CV_DATA.courses.slice(0, 9);
  return `
    <div class="fade-in">
      <header class="mb-12">
        <h1 class="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-2">${CV_DATA.name}</h1>
        <p class="text-xl text-indigo-600 font-medium">${CV_DATA.title}</p>
        <p class="text-slate-500 mt-2">📍 ${CV_DATA.location}</p>
      </header>

      <section class="mb-12">
        <h2 class="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6 border-b-2 border-indigo-100 pb-2">Summary</h2>
        <ul class="space-y-3 text-slate-600 dark:text-slate-300">
          ${CV_DATA.summary.map(s => `<li class="flex gap-2"><span>•</span> ${s}</li>`).join('')}
        </ul>
      </section>

      <section class="mb-12">
        <h2 class="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6 border-b-2 border-indigo-100 pb-2">Courses</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          ${displayedCourses.map(c => `
            <div class="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
              <h3 class="text-sm font-bold text-slate-800 dark:text-slate-100">${c.name}</h3>
              <p class="text-xs text-indigo-600 mt-1">${c.provider}</p>
              <p class="text-[10px] text-slate-400 mt-2">${c.date}</p>
            </div>
          `).join('')}
        </div>
        <div class="mt-8 flex justify-center">
          <button id="toggle-courses" class="px-6 py-2 border-2 border-indigo-600 text-indigo-600 rounded-full font-bold hover:bg-indigo-600 hover:text-white transition-all">
            ${state.showAllCourses ? 'Show Less' : 'Show All Courses'}
          </button>
        </div>
      </section>
    </div>
  `;
}

function renderStudio() {
  const s = state.studio;
  return `
    <div class="fade-in">
      <header class="mb-8">
        <h2 class="text-3xl font-bold text-slate-900 dark:text-white mb-2">AI Image Studio</h2>
        <p class="text-slate-600 dark:text-slate-400">Enhance your photo using Gemini technology.</p>
      </header>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div class="space-y-6">
          <div id="image-dropzone" class="border-2 border-dashed border-slate-300 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-indigo-400 aspect-square relative overflow-hidden bg-white dark:bg-slate-800">
            ${s.selectedImage ? `<img src="${s.selectedImage}" class="absolute inset-0 w-full h-full object-cover"/>` : `
              <div class="text-center text-slate-400">
                <p class="text-4xl mb-2">📸</p>
                <p>Click to upload photo</p>
              </div>
            `}
            <input type="file" id="file-input" class="hidden" accept="image/*" />
          </div>

          <textarea id="studio-prompt" class="w-full h-32 p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none resize-none dark:bg-slate-800 dark:text-white" placeholder="Describe changes (e.g. Add professional background)...">${s.prompt}</textarea>
          
          <button id="process-btn" ${s.isProcessing || !s.selectedImage ? 'disabled' : ''} class="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold shadow-lg disabled:bg-slate-400">
            ${s.isProcessing ? 'Processing...' : 'Apply Magic Edit'}
          </button>
        </div>

        <div class="min-h-[400px] border border-slate-200 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center relative overflow-hidden">
          ${s.isProcessing ? `
            <div class="text-center p-8 z-20">
              <div class="w-16 h-16 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
              <p class="text-indigo-900 dark:text-indigo-200 font-bold animate-pulse">${LOADING_STEPS[s.currentStep]}</p>
              <div class="absolute inset-x-0 h-1 bg-indigo-500 animate-scan z-10"></div>
            </div>
          ` : s.editedImage ? `
            <img src="${s.editedImage}" class="w-full h-full object-cover fade-in"/>
            <a href="${s.editedImage}" download="ai-edit.png" class="absolute bottom-4 right-4 bg-white/90 p-2 rounded shadow text-xs font-bold">Download</a>
          ` : `<p class="text-slate-400">Your result will appear here.</p>`}
        </div>
      </div>
    </div>
  `;
}

function renderMobileNav() {
  return `
    <div class="md:hidden fixed bottom-6 right-6">
      <button id="mobile-toggle" class="p-4 bg-indigo-600 text-white rounded-full shadow-2xl">
        ${state.activeTab === 'cv' ? '🎨' : '👤'}
      </button>
    </div>
  `;
}

// --- EVENT HANDLERS ---
function attachEventListeners() {
  // Navigation
  document.getElementById('nav-cv')?.addEventListener('click', () => { state.activeTab = 'cv'; render(); });
  document.getElementById('nav-studio')?.addEventListener('click', () => { state.activeTab = 'studio'; render(); });
  document.getElementById('mobile-toggle')?.addEventListener('click', () => { state.activeTab = state.activeTab === 'cv' ? 'studio' : 'cv'; render(); });
  
  // Theme
  document.getElementById('theme-toggle')?.addEventListener('click', () => { state.isDarkMode = !state.isDarkMode; render(); });
  
  // CV logic
  document.getElementById('toggle-courses')?.addEventListener('click', () => { state.showAllCourses = !state.showAllCourses; render(); });

  // Studio logic
  const dropzone = document.getElementById('image-dropzone');
  const fileInput = document.getElementById('file-input');
  
  dropzone?.addEventListener('click', () => fileInput.click());
  fileInput?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => { state.studio.selectedImage = ev.target.result; render(); };
      reader.readAsDataURL(file);
    }
  });

  const promptInput = document.getElementById('studio-prompt');
  promptInput?.addEventListener('input', (e) => { state.studio.prompt = e.target.value; });

  document.getElementById('process-btn')?.addEventListener('click', processImage);
}

// --- AI PROCESSING ---
async function processImage() {
  if (!state.studio.selectedImage || !state.studio.prompt) return;

  state.studio.isProcessing = true;
  state.studio.currentStep = 0;
  render();

  const stepInterval = setInterval(() => {
    state.studio.currentStep = (state.studio.currentStep + 1) % LOADING_STEPS.length;
    render();
  }, 1500);

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const [header, base64Data] = state.studio.selectedImage.split(',');
    const mimeType = header.split(';')[0].split(':')[1];

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { inlineData: { data: base64Data, mimeType } },
          { text: `Apply this professional CV edit: ${state.studio.prompt}` }
        ]
      }
    });

    const imgPart = response.candidates?.[0]?.content?.parts.find(p => p.inlineData);
    if (imgPart) {
      state.studio.editedImage = `data:image/png;base64,${imgPart.inlineData.data}`;
    } else {
      alert("AI didn't generate an image. Try a different prompt.");
    }
  } catch (err) {
    console.error(err);
    alert("API Error: Make sure your key is valid.");
  } finally {
    clearInterval(stepInterval);
    state.studio.isProcessing = false;
    render();
  }
}

// Boot
render();
