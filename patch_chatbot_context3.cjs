const fs = require('fs');
let code = fs.readFileSync('src/components/AIChatbot.tsx', 'utf8');

const newWebsiteContext = `    const websiteContext = \`
Doctors: \${publicData.doctors?.map(d => d.name + ' - ' + d.title + ' (' + d.experience + ' yrs)').join(', ')}
Services: \${publicData.services?.map(s => s.title + ': ' + s.description).join('\\n')}

Custom Clinic Knowledge Base:
\${publicData.clinicContext || 'No additional context provided by admin.'}
\`;`;

// find existing websiteContext block
code = code.replace(/const websiteContext = `[\s\S]*?`;/, newWebsiteContext);

fs.writeFileSync('src/components/AIChatbot.tsx', code);
