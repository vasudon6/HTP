const fs = require('fs');
let code = fs.readFileSync('src/components/AIChatbot.tsx', 'utf8');

const contextGeneration = `
    const websiteContext = \`
Doctors: \${publicData.doctors?.map(d => d.name + ' - ' + d.title + ' (' + d.experience + ' yrs)').join(', ')}
Services: \${publicData.services?.map(s => s.title + ': ' + s.description).join('\\n')}
\`;
`;

code = code.replace(
    "const userMessage = input.trim();",
    "const userMessage = input.trim();\n" + contextGeneration
);

code = code.replace(
    "apiKey: publicData.aiApiKey",
    "apiKey: publicData.aiApiKey,\n          websiteContext: websiteContext"
);

fs.writeFileSync('src/components/AIChatbot.tsx', code);
