
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

const LOADING_STEPS = [
  "Analyzing facial features...",
  "Optimizing lighting environment...",
  "Applying professional color grading...",
  "Refining background details...",
  "Finalizing high-resolution output...",
  "Almost there, polishing pixels..."
];

const AIImageStudio: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Cycle through loading steps while processing
  useEffect(() => {
    let interval: number | undefined;
    if (isProcessing) {
      setCurrentStep(0);
      interval = window.setInterval(() => {
        setCurrentStep((prev) => (prev + 1) % LOADING_STEPS.length);
      }, 1500);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isProcessing]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
        setEditedImage(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const processImage = async () => {
    if (!selectedImage || !prompt) return;

    setIsProcessing(true);
    setError(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const base64Data = selectedImage.split(',')[1];
      const mimeType = selectedImage.split(';')[0].split(':')[1];

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            {
              inlineData: {
                data: base64Data,
                mimeType: mimeType,
              },
            },
            {
              text: `Apply this edit to the image: ${prompt}. Focus on maintaining a professional LinkedIn/CV style. If I ask for a retro filter, make it subtle and classic. If I ask to remove background, replace it with a professional solid color or blurred office environment.`,
            },
          ],
        },
      });

      let foundImage = false;
      if (response.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            const resultBase64 = part.inlineData.data;
            setEditedImage(`data:image/png;base64,${resultBase64}`);
            foundImage = true;
            break;
          }
        }
      }

      if (!foundImage) {
        const textPart = response.candidates?.[0]?.content?.parts.find(p => p.text);
        if (textPart?.text) {
          setError(`The AI responded but didn't generate a new image: ${textPart.text}`);
        } else {
          setError("Could not process the image editing. Please try a different prompt.");
        }
      }
    } catch (err) {
      console.error(err);
      setError("Failed to connect to the AI service. Please try again later.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-700">
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">AI Image Studio</h2>
        <p className="text-slate-600">Enhance your professional headshot using Gemini 2.5 Flash Image technology. Try prompts like "Add a professional bokeh background" or "Optimize lighting for a business portrait".</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Controls */}
        <div className="space-y-6">
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-slate-300 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-indigo-400 hover:bg-indigo-50 transition-all aspect-square relative overflow-hidden group"
          >
            {selectedImage ? (
              <img src={selectedImage} alt="Selected" className="absolute inset-0 w-full h-full object-cover" />
            ) : (
              <div className="text-center">
                <div className="text-4xl mb-4 text-slate-400">📸</div>
                <p className="font-medium text-slate-700">Click to upload your photo</p>
                <p className="text-sm text-slate-500">PNG or JPG supported</p>
              </div>
            )}
            {selectedImage && (
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <p className="text-white font-medium">Change Photo</p>
              </div>
            )}
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImageUpload} 
              className="hidden" 
              accept="image/*" 
            />
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-semibold text-slate-700">What would you like to change?</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., Change background to a clean office, add a warmer lighting filter, or sharpen the details..."
              className="w-full h-32 p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none transition-all"
            />
            
            <div className="flex flex-wrap gap-2">
              {['Remove background', 'Add bokeh', 'BW filter', 'Retro look'].map((suggestion) => (
                <button 
                  key={suggestion}
                  onClick={() => setPrompt(suggestion)}
                  className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full text-xs transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>

            <button
              onClick={processImage}
              disabled={isProcessing || !selectedImage || !prompt}
              className={`w-full py-4 rounded-xl font-bold text-white transition-all overflow-hidden relative ${
                isProcessing || !selectedImage || !prompt
                  ? 'bg-slate-400 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700 shadow-lg hover:shadow-indigo-200'
              }`}
            >
              {isProcessing ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : 'Apply Magic Edit'}
            </button>
            
            {error && (
              <p className="text-red-500 text-sm p-3 bg-red-50 rounded-lg border border-red-100">{error}</p>
            )}
          </div>
        </div>

        {/* Output Preview */}
        <div className="flex flex-col">
          <label className="block text-sm font-semibold text-slate-700 mb-2">AI Result</label>
          <div className="flex-1 border border-slate-200 bg-white rounded-2xl flex items-center justify-center overflow-hidden min-h-[400px] shadow-sm relative">
            {isProcessing ? (
              <div className="w-full h-full relative flex flex-col items-center justify-center bg-slate-50">
                {selectedImage && (
                  <img src={selectedImage} alt="Processing source" className="absolute inset-0 w-full h-full object-cover opacity-20 blur-sm" />
                )}
                
                {/* Scanning Bar */}
                <div className="absolute inset-x-0 h-1 bg-indigo-500/50 shadow-[0_0_15px_rgba(99,102,241,0.5)] z-10 animate-scan"></div>
                
                <div className="relative z-20 flex flex-col items-center">
                  <div className="mb-6 relative">
                    <div className="w-16 h-16 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                       <span className="text-indigo-600 text-xl font-bold">AI</span>
                    </div>
                  </div>
                  
                  <div className="text-center px-6">
                    <p className="text-indigo-900 font-bold text-lg mb-2 animate-pulse">
                      {LOADING_STEPS[currentStep]}
                    </p>
                    <div className="w-48 h-1 bg-slate-200 rounded-full overflow-hidden mx-auto">
                      <div 
                        className="h-full bg-indigo-600 transition-all duration-1000 ease-linear"
                        style={{ width: `${((currentStep + 1) / LOADING_STEPS.length) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-slate-400 text-sm mt-4 italic">Using Gemini 2.5 Flash Image</p>
                  </div>
                </div>
              </div>
            ) : editedImage ? (
              <div className="w-full h-full relative group">
                <img src={editedImage} alt="Edited Result" className="w-full h-full object-cover animate-in fade-in duration-1000" />
                <a 
                  href={editedImage} 
                  download="professional-headshot.png"
                  className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-4 py-2 rounded-lg text-indigo-600 font-bold text-sm shadow-xl hover:bg-white transition-all opacity-0 group-hover:opacity-100"
                >
                  Download Result
                </a>
              </div>
            ) : (
              <div className="text-center p-8 text-slate-400 flex flex-col items-center">
                <div className="w-20 h-20 mb-4 bg-slate-50 rounded-full flex items-center justify-center text-3xl">✨</div>
                <p>Your enhanced photo will appear here.</p>
                <p className="text-xs mt-2">Upload a photo and describe your edit to begin.</p>
              </div>
            )}
          </div>
          
          <div className="mt-4 p-4 bg-indigo-50 border border-indigo-100 rounded-xl text-xs text-indigo-700 flex gap-3">
             <span className="text-lg">💡</span>
             <p>Our AI works best with clear, high-resolution front-facing portraits. Professional edits take about 5-10 seconds to generate.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIImageStudio;
