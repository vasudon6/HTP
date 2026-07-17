const fs = require('fs');
let code = fs.readFileSync('src/pages/AdminDashboard.tsx', 'utf8');

const aiSettingsCode = `
          {activeTab === 'AI Settings' && (
            <div className="space-y-6 max-w-2xl">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-slate-900">AI Chatbot Settings</h2>
              </div>
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <label className="block text-sm font-bold text-slate-700 mb-2">Gemini API Key</label>
                <div className="flex gap-4">
                  <input 
                    type="password" 
                    value={draftData.aiApiKey || ''}
                    onChange={(e) => setDraftData(prev => ({ ...prev, aiApiKey: e.target.value }))}
                    placeholder="Enter your Gemini API Key..."
                    className="flex-1 px-4 py-2 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-colors"
                  />
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  The API key is securely stored and used to power the website's AI chatbot. Get your key from <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline">Google AI Studio</a>.
                </p>
              </div>
            </div>
          )}
`;

code = code.replace(
  "{activeTab === 'Bookings' && (",
  aiSettingsCode.trim() + "\n\n          {activeTab === 'Bookings' && ("
);

fs.writeFileSync('src/pages/AdminDashboard.tsx', code);
