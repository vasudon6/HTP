const fs = require('fs');
let code = fs.readFileSync('src/components/AIChatbot.tsx', 'utf8');

if (code.includes('const { publicData } = useAdmin();')) {
    console.log('Already has useAdmin');
} else {
    code = code.replace(
        "import { MessageCircle, X, Send } from 'lucide-react';",
        "import { MessageCircle, X, Send } from 'lucide-react';\nimport { useAdmin } from '../store/AdminContext';"
    );
    code = code.replace(
        "export default function AIChatbot() {",
        "export default function AIChatbot() {\n  const { publicData } = useAdmin();"
    );
}

code = code.replace(
    "history: messages.slice(-10) // Send last 10 messages for context",
    "history: messages.slice(-10), // Send last 10 messages for context\n          apiKey: publicData.aiApiKey"
);

fs.writeFileSync('src/components/AIChatbot.tsx', code);
