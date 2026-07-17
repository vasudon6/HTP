const fs = require('fs');
let code = fs.readFileSync('src/pages/AdminDashboard.tsx', 'utf8');

// Add a new tab
code = code.replace(
  /const tabs = \['AI Settings', 'Bookings', 'Queries', 'Transformations', 'Video Reviews', 'General Images', 'Doctors', 'Services'\];/,
  "const tabs = ['AI Settings', 'Bookings', 'Queries', 'Transformations', 'Video Reviews', 'General Images', 'Doctors', 'Services', 'Backup & Vercel'];"
);

const backupTabCode = `
          {activeTab === 'Backup & Vercel' && (
            <div className="space-y-6 max-w-2xl">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-slate-900">Vercel Deployment & Backup</h2>
              </div>
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <h3 className="text-sm font-bold text-slate-700 mb-2">Export Data for Vercel</h3>
                <p className="text-sm text-slate-500 mb-4">
                  Since Vercel does not save Admin Panel changes globally without a database, you can export your current data and paste it in the AI Chat. The AI will hardcode it into the website so it works perfectly on Vercel for everyone.
                </p>
                <button
                  onClick={() => {
                    const data = JSON.stringify(draftData, null, 2);
                    navigator.clipboard.writeText(data);
                    toast.success('Data copied to clipboard! Paste it to the AI.');
                  }}
                  className="px-6 py-2 bg-teal-600 text-white font-bold rounded-xl hover:bg-teal-700 transition-colors shadow-sm"
                >
                  Copy Website Data to Clipboard
                </button>
              </div>
              
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <h3 className="text-sm font-bold text-slate-700 mb-2">Import Data</h3>
                <textarea
                  id="import-data"
                  placeholder="Paste your JSON data here..."
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-colors h-32 resize-y mb-4"
                />
                <button
                  onClick={() => {
                    try {
                      const text = (document.getElementById('import-data') as HTMLTextAreaElement).value;
                      const parsed = JSON.parse(text);
                      setDraftData(parsed);
                      toast.success('Data imported to draft! Click Publish Changes to save.');
                    } catch(e) {
                      toast.error('Invalid JSON format.');
                    }
                  }}
                  className="px-6 py-2 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors shadow-sm"
                >
                  Import Data
                </button>
              </div>
            </div>
          )}
`;

code = code.replace(
  /(?=        <\/div>\n      <\/div>\n    <\/div>\n  \);\n})/,
  backupTabCode
);

fs.writeFileSync('src/pages/AdminDashboard.tsx', code);
