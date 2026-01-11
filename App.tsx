
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import AIImageStudio from './components/AIImageStudio';
import { CV_DATA } from './constants';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'cv' | 'studio'>('cv');

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white">
      {/* Sidebar - fixed on desktop, scrollable or top on mobile */}
      <Sidebar data={CV_DATA} activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-gray-50">
        <div className="max-w-4xl mx-auto p-6 md:p-12">
          {activeTab === 'cv' ? (
            <MainContent data={CV_DATA} />
          ) : (
            <AIImageStudio />
          )}
        </div>
      </main>

      {/* Floating Action Button for Mobile Toggle */}
      <div className="md:hidden fixed bottom-6 right-6 flex flex-col space-y-2">
        <button 
          onClick={() => setActiveTab(activeTab === 'cv' ? 'studio' : 'cv')}
          className="p-4 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
        >
          {activeTab === 'cv' ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 00-2 2z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default App;
