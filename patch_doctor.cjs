const fs = require('fs');

const filesToUpdate = [
  'src/components/Hero.tsx',
  'src/components/About.tsx',
  'src/components/Process.tsx',
  'src/store/AdminContext.tsx'
];

filesToUpdate.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/Dr\. Siddharth Sharma/g, 'Dr. Vasu Koshle');
  content = content.replace(/Dr\. Sharma/g, 'Dr. Koshle');
  fs.writeFileSync(file, content);
});
