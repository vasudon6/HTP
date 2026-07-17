const fs = require('fs');
let code = fs.readFileSync('src/store/AdminContext.tsx', 'utf8');

const defaultContext = `Vasu Hair Transplant Clinic is Raipur's No. 1 clinic for hair restoration, trusted by over 5000 patients. We offer advanced services including Hair Transplant (FUE and DHI), PRP Therapy, Beard Transplant, Eyebrow Transplant, Hair Loss Treatments, and Mesotherapy. Our seamless 4-step process includes a detailed Consultation for scalp analysis and hairline design, Preparation with a painless anesthesia protocol, precise Extraction & Implantation using sapphire blades and DHI technique for a 100% natural look, and comprehensive Aftercare with follow-ups and PRP sessions for fast 3-5 day recovery. Our expert medical team is led by Chief Surgeon Dr. Siddharth Sharma (15+ years experience, ABHRS Certified), alongside Dr. Anjali Desai (Senior Consultant), Dr. Rajesh Kumar (Transplant Specialist), Dr. Priya Singh (Trichologist), and Dr. Vikram Aditya (Restoration Surgeon). The cost for our procedures is highly transparent, with FUE transplants priced at 35 per graft and advanced DHI transplants at 55 per graft. We guarantee pristine graft handling, dedicated one-on-one care, and exceptional, guaranteed results.`;

code = code.replace(
  "services: DEFAULT_SERVICES,",
  "services: DEFAULT_SERVICES,\n  clinicContext: `" + defaultContext + "`,"
);

fs.writeFileSync('src/store/AdminContext.tsx', code);
