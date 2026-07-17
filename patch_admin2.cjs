const fs = require('fs');
let code = fs.readFileSync('src/pages/AdminDashboard.tsx', 'utf8');

const clinicContextField = `
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 mt-6">
                <label className="block text-sm font-bold text-slate-700 mb-2">Clinic Knowledge Base (Context for AI)</label>
                <textarea
                  value={draftData.clinicContext || ''}
                  onChange={(e) => setDraftData(prev => ({ ...prev, clinicContext: e.target.value }))}
                  placeholder="Enter detailed information about your clinic, services, pricing, FAQs, etc. The AI Chatbot will read this to answer customer questions."
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-colors h-48 resize-y"
                />
                <p className="text-xs text-slate-500 mt-2">
                  Write in detail about your clinic so the AI can learn from it and answer customer questions accurately.
                </p>
              </div>
`;

code = code.replace(
  "                </p>\n              </div>\n            </div>\n          )}",
  "                </p>\n              </div>" + clinicContextField + "\n            </div>\n          )}"
);

fs.writeFileSync('src/pages/AdminDashboard.tsx', code);
