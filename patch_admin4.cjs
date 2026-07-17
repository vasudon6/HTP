const fs = require('fs');
let code = fs.readFileSync('src/pages/AdminDashboard.tsx', 'utf8');

const apiKeyBlock = `                <div className="flex gap-4">
                  <input 
                    type="password" 
                    value={draftData.aiApiKey || ''}
                    onChange={(e) => setDraftData(prev => ({ ...prev, aiApiKey: e.target.value }))}
                    placeholder="Enter your Gemini API Key..."
                    className="flex-1 px-4 py-2 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-colors"
                  />
                  <button
                    onClick={publishChanges}
                    className="px-6 py-2 bg-teal-600 text-white font-bold rounded-xl hover:bg-teal-700 transition-colors shadow-sm whitespace-nowrap"
                  >
                    Save
                  </button>
                </div>`;

const textareaBlock = `                <textarea
                  value={draftData.clinicContext || ''}
                  onChange={(e) => setDraftData(prev => ({ ...prev, clinicContext: e.target.value }))}
                  placeholder="Enter detailed information about your clinic, services, pricing, FAQs, etc. The AI Chatbot will read this to answer customer questions."
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-colors h-48 resize-y"
                />
                <div className="flex justify-between items-start mt-4 gap-4">
                  <p className="text-xs text-slate-500 mt-2">
                    Write in detail about your clinic so the AI can learn from it and answer customer questions accurately.
                  </p>
                  <button
                    onClick={publishChanges}
                    className="px-6 py-2 bg-teal-600 text-white font-bold rounded-xl hover:bg-teal-700 transition-colors shadow-sm whitespace-nowrap"
                  >
                    Save
                  </button>
                </div>`;

code = code.replace(
  /<div className="flex gap-4">[\s\S]*?<\/div>/,
  apiKeyBlock
);

code = code.replace(
  /<textarea[\s\S]*?<\/p>/,
  textareaBlock
);

fs.writeFileSync('src/pages/AdminDashboard.tsx', code);
