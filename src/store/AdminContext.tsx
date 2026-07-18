import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export type Booking = {
  id: string;
  name: string;
  phone: string;
  email?: string;
  service: string;
  type: string;
  date: string;
  time: string;
  message?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
};

export type Transformation = {
  id: string;
  before: string;
  after: string;
};

export type Review = {
  id: string;
  name: string;
  outcome: string;
  image: string;
  videoUrl?: string;
};

export type GeneralImage = {
  id: string;
  key: string;
  url: string;
};

export type DoctorBullet = {
  icon: 'Award' | 'ShieldCheck' | 'Star';
  text: string;
};

export type Doctor = {
  id: string;
  name: string;
  title: string;
  qualification: string;
  experience: string;
  image: string; // Used direct URL instead of imageId mapping for simplicity since they can add dynamically
  description: string;
  bullets: DoctorBullet[];
};

export type Service = {
  id: string;
  title: string;
  description: string;
  image: string;
};

export type AppData = {
  transformations: Transformation[];
  reviews: Review[];
  generalImages: GeneralImage[];
  doctors: Doctor[];
  services: Service[];
  aiApiKey?: string;
  clinicContext?: string;
};

export type Query = {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
};

interface AdminContextType {
  bookings: Booking[];
  queries: Query[];
  addBooking: (b: Omit<Booking, 'id' | 'createdAt' | 'status'>) => void;
  updateBookingStatus: (id: string, status: Booking['status']) => void;
  deleteBooking: (id: string) => void;
  addQuery: (q: Omit<Query, 'id' | 'createdAt'>) => void;
  deleteQuery: (id: string) => void;

  publicData: AppData;
  draftData: AppData;
  setDraftData: React.Dispatch<React.SetStateAction<AppData>>;
  publishChanges: () => void;
  discardChanges: () => void;
}

const DEFAULT_TRANSFORMATIONS = [
  { id: '1', before: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=60&w=800", after: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=60&w=800" },
  { id: '2', before: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=60&w=800", after: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=60&w=800" },
  { id: '3', before: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=60&w=800", after: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=60&w=800" },
  { id: '4', before: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=60&w=800", after: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=60&w=800" },
  { id: '5', before: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=60&w=800", after: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=60&w=800" },
  { id: '6', before: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=60&w=800", after: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=60&w=800" },
];

const DEFAULT_REVIEWS = [
  { id: '1', name: "Rahul S.", outcome: "3000 Grafts", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600" },
  { id: '2', name: "Amit P.", outcome: "4500 Grafts", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600" },
  { id: '3', name: "Vikram K.", outcome: "Crown Restoration", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600" },
  { id: '4', name: "Suresh M.", outcome: "2500 Grafts", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600" },
  { id: '5', name: "Rajat D.", outcome: "Hairline Fix", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600" },
  { id: '6', name: "Nitin Y.", outcome: "5000 Grafts", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600" },
];

const DEFAULT_GENERAL_IMAGES = [
  { id: 'hero-bg', key: 'Hero Background', url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=60&w=2000' },
  { id: 'clinic-1', key: 'Clinic Interior 1', url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=60&w=600' },
  { id: 'clinic-2', key: 'Clinic OT Room', url: 'https://images.unsplash.com/photo-1538108149393-cebb47ac1945?auto=format&fit=crop&q=60&w=600' },
  { id: 'clinic-3', key: 'Clinic Consultation', url: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=60&w=600' },
  { id: 'clinic-4', key: 'Clinic Lounge', url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=60&w=600' },
];

const DEFAULT_DOCTORS: Doctor[] = [
  {
    id: "1",
    name: "Dr. Vasu Koshle",
    title: "Chief Surgeon",
    qualification: "M.B.B.S, M.D., ABHRS Certified",
    experience: "15+",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=60&w=800",
    description: "Renowned as Central India's leading hair transplant surgeon, Dr. Koshle combines medical precision with an artistic approach to hairline design. With over 10,000 successful procedures, he ensures maximum graft survival and 100% natural-looking results.",
    bullets: [
      { icon: "Award", text: "Diplomate, American Board of Hair Restoration Surgery" },
      { icon: "ShieldCheck", text: "Specialist in DHI & Advanced FUE Techniques" },
      { icon: "Star", text: "Pioneer of Painless Anesthesia Protocol" }
    ]
  },
  {
    id: "2",
    name: "Dr. Anjali Desai",
    title: "Senior Consultant",
    qualification: "M.B.B.S, M.S. (Plastic Surgery)",
    experience: "12+",
    image: "https://images.unsplash.com/photo-1594824436951-7f12bc58a7f4?auto=format&fit=crop&q=60&w=800",
    description: "Specializing in advanced FUE and female hair restoration, Dr. Desai brings a meticulous eye for detail. Her gentle approach and exceptional hairline designs have earned her widespread acclaim.",
    bullets: [
      { icon: "Award", text: "Gold Medalist in Plastic Surgery" },
      { icon: "ShieldCheck", text: "Expert in Female Hair Restoration" },
      { icon: "Star", text: "Advanced PRP Therapy Specialist" }
    ]
  },
  {
    id: "3",
    name: "Dr. Rajesh Kumar",
    title: "Transplant Specialist",
    qualification: "M.B.B.S, DDVL",
    experience: "10+",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=60&w=800",
    description: "Dr. Kumar is an expert in high-density grafting and crown restoration. His precise extraction techniques ensure minimal transection and faster recovery times for patients.",
    bullets: [
      { icon: "Award", text: "Member, ISHRS" },
      { icon: "ShieldCheck", text: "High-Density Grafting Expert" },
      { icon: "Star", text: "Crown Restoration Specialist" }
    ]
  },
  {
    id: "4",
    name: "Dr. Priya Singh",
    title: "Trichologist",
    qualification: "M.B.B.S, Fellowship in Trichology",
    experience: "8+",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=60&w=800",
    description: "Focusing on preventive care and post-operative growth, Dr. Singh oversees our PRP and mesotherapy protocols to maximize the yield of every transplanted graft.",
    bullets: [
      { icon: "Award", text: "Certified Trichologist" },
      { icon: "ShieldCheck", text: "Advanced Mesotherapy Protocol" },
      { icon: "Star", text: "Post-op Care Specialist" }
    ]
  },
  {
    id: "5",
    name: "Dr. Vikram Aditya",
    title: "Restoration Surgeon",
    qualification: "M.B.B.S, M.D.",
    experience: "14+",
    image: "https://images.unsplash.com/photo-1537368910025-7028dd906d3f?auto=format&fit=crop&q=60&w=800",
    description: "A pioneer in beard and eyebrow transplants, Dr. Aditya uses ultra-refined techniques for facial hair restoration, delivering flawlessly natural results.",
    bullets: [
      { icon: "Award", text: "Facial Hair Transplant Pioneer" },
      { icon: "ShieldCheck", text: "Ultra-Refined FUE Expert" },
      { icon: "Star", text: "International Guest Lecturer" }
    ]
  }
];

const DEFAULT_SERVICES: Service[] = [
  { id: '1', title: "Hair Transplant", description: "Advanced FUE hair transplant for natural looking results with maximum density.", image: "https://images.unsplash.com/photo-1585728748176-455ac5eedfa0?auto=format&fit=crop&w=600" },
  { id: '2', title: "PRP Therapy", description: "Platelet Rich Plasma therapy to stimulate hair follicles and promote new growth.", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600" },
  { id: '3', title: "Beard Transplant", description: "Restore or enhance your facial hair with precision beard transplantation.", image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600" },
  { id: '4', title: "Eyebrow Transplant", description: "Perfectly shaped and dense eyebrows using ultra-refined extraction techniques.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600" },
  { id: '5', title: "Hair Loss Treatment", description: "Comprehensive medical treatments to stop hair fall and improve scalp health.", image: "https://images.unsplash.com/photo-1537368910025-7028dd906d3f?auto=format&fit=crop&w=600" },
  { id: '6', title: "Mesotherapy", description: "Nutrient-rich microinjections to rejuvenate the scalp and stimulate new hair growth.", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600" },
];

const DEFAULT_DATA: AppData = {
  transformations: DEFAULT_TRANSFORMATIONS,
  reviews: DEFAULT_REVIEWS,
  generalImages: DEFAULT_GENERAL_IMAGES,
  doctors: DEFAULT_DOCTORS,
  services: DEFAULT_SERVICES,
  clinicContext: `Vasu Hair Transplant Clinic is Raipur's No. 1 clinic for hair restoration, trusted by over 5000 patients. We offer advanced services including Hair Transplant (FUE and DHI), PRP Therapy, Beard Transplant, Eyebrow Transplant, Hair Loss Treatments, and Mesotherapy. Our seamless 4-step process includes a detailed Consultation for scalp analysis and hairline design, Preparation with a painless anesthesia protocol, precise Extraction & Implantation using sapphire blades and DHI technique for a 100% natural look, and comprehensive Aftercare with follow-ups and PRP sessions for fast 3-5 day recovery. Our expert medical team is led by Chief Surgeon Dr. Vasu Koshle (15+ years experience, ABHRS Certified), alongside Dr. Anjali Desai (Senior Consultant), Dr. Rajesh Kumar (Transplant Specialist), Dr. Priya Singh (Trichologist), and Dr. Vikram Aditya (Restoration Surgeon). The cost for our procedures is highly transparent, with FUE transplants priced at 35 per graft and advanced DHI transplants at 55 per graft. We guarantee pristine graft handling, dedicated one-on-one care, and exceptional, guaranteed results.`,
};

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('vasu_bookings');
    return saved ? JSON.parse(saved) : [];
  });

  const [queries, setQueries] = useState<Query[]>(() => {
    const saved = localStorage.getItem('vasu_queries');
    return saved ? JSON.parse(saved) : [];
  });

  const [publicData, setPublicData] = useState<AppData>(() => {
    const saved = localStorage.getItem('vasu_public_data');
    if (saved) {
      const parsed = JSON.parse(saved);
      
      // Ensure backward compatibility with newer fields
      const mergedGeneralImages = [...(parsed.generalImages || [])];
      
      // Add missing default images
      DEFAULT_GENERAL_IMAGES.forEach(defaultImg => {
        if (!mergedGeneralImages.find(img => img.id === defaultImg.id)) {
          mergedGeneralImages.push(defaultImg);
        }
      });
      
      let mergedDoctors = parsed.doctors || DEFAULT_DATA.doctors;
      mergedDoctors = mergedDoctors.map((doc: any) => {
        if (doc.id === '1' && doc.name === 'Dr. Siddharth Sharma') {
          return { ...doc, name: 'Dr. Vasu Koshle', description: doc.description.replace(/Dr\. Sharma/g, 'Dr. Koshle') };
        }
        return doc;
      });

      return {
        ...DEFAULT_DATA,
        ...parsed,
        generalImages: mergedGeneralImages,
        doctors: mergedDoctors,
        services: parsed.services || DEFAULT_DATA.services
      };
    }
    return DEFAULT_DATA;
  });

  const [draftData, setDraftData] = useState<AppData>(publicData);

  useEffect(() => {
    localStorage.setItem('vasu_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('vasu_queries', JSON.stringify(queries));
  }, [queries]);

  useEffect(() => {
    localStorage.setItem('vasu_public_data', JSON.stringify(publicData));
  }, [publicData]);

  const addBooking = (b: Omit<Booking, 'id' | 'createdAt' | 'status'>) => {
    const newBooking: Booking = {
      ...b,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      status: 'pending'
    };
    setBookings(prev => [newBooking, ...prev]);
  };

  const updateBookingStatus = (id: string, status: Booking['status']) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
  };

  const deleteBooking = (id: string) => {
    setBookings(prev => prev.filter(b => b.id !== id));
  };

  const addQuery = (q: Omit<Query, 'id' | 'createdAt'>) => {
    const newQuery: Query = {
      ...q,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setQueries(prev => [newQuery, ...prev]);
  };

  const deleteQuery = (id: string) => {
    setQueries(prev => prev.filter(q => q.id !== id));
  };

  const publishChanges = () => {
    setPublicData(draftData);
    toast.success('Changes published successfully to the public site!');
  };

  const discardChanges = () => {
    setDraftData(publicData);
    toast.error('Draft changes discarded.');
  };

  return (
    <AdminContext.Provider value={{
      bookings,
      queries,
      addBooking,
      updateBookingStatus,
      deleteBooking,
      addQuery,
      deleteQuery,
      publicData,
      draftData,
      setDraftData,
      publishChanges,
      discardChanges
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}
