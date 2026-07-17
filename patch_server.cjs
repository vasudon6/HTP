const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

code = code.replace(
    "const { message, history = [] } = req.body;",
    "const { message, history = [], apiKey, websiteContext } = req.body;"
);

code = code.replace(
    "const response = await ai.models.generateContent({",
    `
      let currentAi = ai;
      if (apiKey) {
        currentAi = new GoogleGenAI({
          apiKey: apiKey,
          httpOptions: {
            headers: {
              'User-Agent': 'aistudio-build',
            }
          }
        });
      }
      
      let finalContext = clinicContext;
      if (websiteContext) {
        finalContext += "\\n\\nHere is the current dynamic website content:\\n" + websiteContext;
      }

      const response = await currentAi.models.generateContent({`
);

code = code.replace(
    "systemInstruction: clinicContext,",
    "systemInstruction: finalContext,"
);

fs.writeFileSync('server.ts', code);
