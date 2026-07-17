const fs = require('fs');
let code = fs.readFileSync('src/store/AdminContext.tsx', 'utf8');

const target = `      return {
        ...DEFAULT_DATA,
        ...parsed,
        generalImages: mergedGeneralImages,
        doctors: parsed.doctors || DEFAULT_DATA.doctors,
        services: parsed.services || DEFAULT_DATA.services
      };`;

const replacement = `      let mergedDoctors = parsed.doctors || DEFAULT_DATA.doctors;
      mergedDoctors = mergedDoctors.map((doc: any) => {
        if (doc.id === '1' && doc.name === 'Dr. Siddharth Sharma') {
          return { ...doc, name: 'Dr. Vasu Koshle', description: doc.description.replace(/Dr\\. Sharma/g, 'Dr. Koshle') };
        }
        return doc;
      });

      return {
        ...DEFAULT_DATA,
        ...parsed,
        generalImages: mergedGeneralImages,
        doctors: mergedDoctors,
        services: parsed.services || DEFAULT_DATA.services
      };`;

code = code.replace(target, replacement);
fs.writeFileSync('src/store/AdminContext.tsx', code);
