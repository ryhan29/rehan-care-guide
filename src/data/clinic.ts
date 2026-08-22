/**
 * Structured clinic content. All values marked PLACEHOLDER are demo data
 * and must be replaced with verified clinic information before launch.
 */

export const clinic = {
  name: "Rehan Clinic",
  tagline: "Advanced healthcare. Human care.",
  // PLACEHOLDER — replace with the clinic's verified details
  address: "[PLACEHOLDER] 12 Example Avenue, Suite 200, Your City",
  phone: "[PLACEHOLDER] +00 000 000 0000",
  emergencyPhone: "[PLACEHOLDER] +00 000 000 0001",
  whatsapp: "[PLACEHOLDER] +00 000 000 0002",
  email: "[PLACEHOLDER] hello@rehanclinic.example",
  hours: [
    { day: "Monday – Friday", time: "[PLACEHOLDER] 08:00 – 20:00" },
    { day: "Saturday", time: "[PLACEHOLDER] 09:00 – 17:00" },
    { day: "Sunday", time: "[PLACEHOLDER] Closed (emergency line open)" },
  ],
  /** No verified live opening-hours feed is connected. */
  liveStatusAvailable: false,
  /** No verified emergency wait-time feed is connected. */
  liveWaitTimeAvailable: false,
} as const;

export type Department =
  | "General Medicine"
  | "Pediatrics"
  | "Dermatology"
  | "Orthopedics"
  | "Gynecology"
  | "ENT"
  | "Cardiology";

export const departments: Department[] = [
  "General Medicine",
  "Pediatrics",
  "Dermatology",
  "Orthopedics",
  "Gynecology",
  "ENT",
  "Cardiology",
];

export type ServiceCategory = "Primary Care" | "Diagnostics" | "Imaging" | "Specialist Care";

export interface Service {
  slug: string;
  name: string;
  category: ServiceCategory;
  what: string;
  who: string;
  know: string;
  access: string;
}

export const services: Service[] = [
  {
    slug: "general-consultation",
    name: "General consultation",
    category: "Primary Care",
    what: "A one-to-one appointment with a general physician for a new or ongoing health concern.",
    who: "Anyone with symptoms, a health question, or a need for a referral.",
    know: "Typical appointment length is 15–20 minutes. Bring any current medication.",
    access: "Book online or by phone. Same-week slots are usually available.",
  },
  {
    slug: "routine-checkup",
    name: "Routine checkup",
    category: "Primary Care",
    what: "A scheduled review of your general health, vitals and history.",
    who: "Adults who want a periodic health review.",
    know: "No preparation needed unless bloodwork is added.",
    access: "Book online under Primary Care.",
  },
  {
    slug: "preventive-care",
    name: "Preventive care",
    category: "Primary Care",
    what: "Guidance and screening aimed at identifying risks early.",
    who: "Patients with family history or lifestyle risk factors.",
    know: "Your physician will advise which screenings are relevant to you.",
    access: "Discuss during any consultation or book directly.",
  },
  {
    slug: "health-screening",
    name: "Health screening package",
    category: "Primary Care",
    what: "A bundled set of tests and a physician review in one visit.",
    who: "Patients wanting a broad picture of their current health.",
    know: "Fasting may be required — confirmed at booking.",
    access: "Book online under Diagnostics.",
  },
  {
    slug: "blood-tests",
    name: "Blood testing",
    category: "Diagnostics",
    what: "Sample collection and laboratory analysis of blood.",
    who: "Patients with a physician request or a screening package.",
    know: "Some panels require 8–12 hours of fasting.",
    access: "Walk-in during lab hours or book a slot.",
  },
  {
    slug: "urine-tests",
    name: "Urine testing",
    category: "Diagnostics",
    what: "Analysis of a urine sample for infection, kidney and metabolic markers.",
    who: "Patients with urinary symptoms or routine screening needs.",
    know: "A mid-stream sample is usually requested.",
    access: "Walk-in during lab hours.",
  },
  {
    slug: "pathology",
    name: "Pathology",
    category: "Diagnostics",
    what: "Laboratory examination of tissue and body-fluid samples.",
    who: "Patients referred by a clinician.",
    know: "Turnaround varies by test — confirmed at collection.",
    access: "By referral.",
  },
  {
    slug: "hematology",
    name: "Hematology",
    category: "Diagnostics",
    what: "Blood-cell counts and clotting studies.",
    who: "Patients being investigated for anaemia, infection or bleeding issues.",
    know: "Usually no preparation required.",
    access: "By referral or as part of a package.",
  },
  {
    slug: "biochemistry",
    name: "Biochemistry",
    category: "Diagnostics",
    what: "Measurement of chemical markers such as glucose, lipids and organ function.",
    who: "Patients monitoring metabolic or organ health.",
    know: "Fasting is often required for lipid and glucose panels.",
    access: "Book a lab slot online.",
  },
  {
    slug: "microbiology",
    name: "Microbiology",
    category: "Diagnostics",
    what: "Culture and identification of bacteria and other organisms.",
    who: "Patients with suspected infection.",
    know: "Results typically take longer than routine bloodwork.",
    access: "By referral.",
  },
  {
    slug: "x-ray",
    name: "X-Ray",
    category: "Imaging",
    what: "Fast radiographic imaging of bones and chest.",
    who: "Patients with injury, pain or respiratory symptoms.",
    know: "Tell the team if you are or may be pregnant.",
    access: "Book online or by referral.",
  },
  {
    slug: "ultrasound",
    name: "Ultrasound",
    category: "Imaging",
    what: "Sound-wave imaging of soft tissue and abdominal organs.",
    who: "Patients needing abdominal, pelvic or soft-tissue assessment.",
    know: "Some scans require a full bladder or fasting.",
    access: "Book online — preparation instructions are sent on confirmation.",
  },
  ...departments.map<Service>((d) => ({
    slug: d.toLowerCase().replace(/\s+/g, "-"),
    name: d,
    category: "Specialist Care",
    what: `Consultation and follow-up care within our ${d} department.`,
    who: "Patients with a referral or a specific concern in this area.",
    know: "Bring previous reports, scans or prescriptions if you have them.",
    access: "Book directly with a specialist from the doctor directory.",
  })),
];

export interface Doctor {
  id: string;
  name: string;
  specialty: Department;
  qualifications: string;
  experience: string;
  languages: string[];
  days: string;
  hours: string;
  location: string;
  availability: "This week" | "Next week";
}

/** PLACEHOLDER staff records — replace with verified profiles and real photography. */
export const doctors: Doctor[] = [
  {
    id: "doctor-01",
    name: "[Placeholder] Doctor One",
    specialty: "General Medicine",
    qualifications: "[Placeholder qualification]",
    experience: "[Placeholder] years",
    languages: ["English", "Urdu"],
    days: "Mon, Tue, Thu",
    hours: "09:00 – 15:00",
    location: "Main Clinic — Level 1",
    availability: "This week",
  },
  {
    id: "doctor-02",
    name: "[Placeholder] Doctor Two",
    specialty: "Pediatrics",
    qualifications: "[Placeholder qualification]",
    experience: "[Placeholder] years",
    languages: ["English", "Hindi"],
    days: "Mon – Fri",
    hours: "10:00 – 18:00",
    location: "Main Clinic — Level 2",
    availability: "This week",
  },
  {
    id: "doctor-03",
    name: "[Placeholder] Doctor Three",
    specialty: "Dermatology",
    qualifications: "[Placeholder qualification]",
    experience: "[Placeholder] years",
    languages: ["English"],
    days: "Wed, Fri",
    hours: "11:00 – 17:00",
    location: "Main Clinic — Level 2",
    availability: "Next week",
  },
  {
    id: "doctor-04",
    name: "[Placeholder] Doctor Four",
    specialty: "Orthopedics",
    qualifications: "[Placeholder qualification]",
    experience: "[Placeholder] years",
    languages: ["English", "Arabic"],
    days: "Tue, Thu, Sat",
    hours: "08:00 – 14:00",
    location: "Main Clinic — Level 1",
    availability: "This week",
  },
  {
    id: "doctor-05",
    name: "[Placeholder] Doctor Five",
    specialty: "Gynecology",
    qualifications: "[Placeholder qualification]",
    experience: "[Placeholder] years",
    languages: ["English", "Urdu"],
    days: "Mon, Wed, Fri",
    hours: "09:00 – 16:00",
    location: "Main Clinic — Level 3",
    availability: "This week",
  },
  {
    id: "doctor-06",
    name: "[Placeholder] Doctor Six",
    specialty: "ENT",
    qualifications: "[Placeholder qualification]",
    experience: "[Placeholder] years",
    languages: ["English"],
    days: "Tue, Thu",
    hours: "12:00 – 18:00",
    location: "Main Clinic — Level 2",
    availability: "Next week",
  },
  {
    id: "doctor-07",
    name: "[Placeholder] Doctor Seven",
    specialty: "Cardiology",
    qualifications: "[Placeholder qualification]",
    experience: "[Placeholder] years",
    languages: ["English", "Hindi"],
    days: "Mon, Thu",
    hours: "10:00 – 15:00",
    location: "Main Clinic — Level 3",
    availability: "This week",
  },
];

export interface DiagnosticTest {
  slug: string;
  name: string;
  group: "Laboratory" | "Imaging" | "Packages";
  what: string;
  who: string;
  prep: string;
}

export const diagnosticTests: DiagnosticTest[] = [
  {
    slug: "complete-blood-count",
    name: "Complete blood count",
    group: "Laboratory",
    what: "Measures red cells, white cells and platelets in a blood sample.",
    who: "Commonly requested for fatigue, infection or routine review.",
    prep: "No fasting required.",
  },
  {
    slug: "lipid-panel",
    name: "Lipid panel",
    group: "Laboratory",
    what: "Measures cholesterol and triglycerides.",
    who: "Patients monitoring cardiovascular risk.",
    prep: "Fasting is usually requested — confirm at booking.",
  },
  {
    slug: "urinalysis",
    name: "Urinalysis",
    group: "Laboratory",
    what: "Screens urine for infection, blood and metabolic markers.",
    who: "Patients with urinary symptoms or routine screening.",
    prep: "Mid-stream sample; no fasting.",
  },
  {
    slug: "culture",
    name: "Microbiology culture",
    group: "Laboratory",
    what: "Grows and identifies organisms from a sample.",
    who: "Patients with a suspected infection.",
    prep: "Follow the collection instructions given by the lab.",
  },
  {
    slug: "chest-x-ray",
    name: "Chest X-Ray",
    group: "Imaging",
    what: "A radiographic image of the chest and lungs.",
    who: "Patients with cough, chest pain or breathing difficulty.",
    prep: "Remove metal items. Tell staff if you may be pregnant.",
  },
  {
    slug: "bone-x-ray",
    name: "Skeletal X-Ray",
    group: "Imaging",
    what: "Radiographic imaging of a specific bone or joint.",
    who: "Patients after injury or with joint pain.",
    prep: "No preparation required.",
  },
  {
    slug: "abdominal-ultrasound",
    name: "Abdominal ultrasound",
    group: "Imaging",
    what: "Sound-wave imaging of abdominal organs.",
    who: "Patients with abdominal pain or organ-function questions.",
    prep: "Fasting of 6–8 hours is often requested.",
  },
  {
    slug: "basic-checkup",
    name: "Basic health checkup",
    group: "Packages",
    what: "Core bloodwork, urinalysis, vitals and a physician review.",
    who: "Adults wanting a general health picture.",
    prep: "Fasting recommended. Allow around 90 minutes.",
  },
  {
    slug: "comprehensive-checkup",
    name: "Comprehensive health checkup",
    group: "Packages",
    what: "Extended laboratory panel, imaging and physician review.",
    who: "Patients wanting a deeper assessment.",
    prep: "Fasting required. Allow around half a day.",
  },
];

export interface FaqItem {
  category: "Insurance" | "Parking" | "First visit" | "Appointments" | "Diagnostics" | "Billing" | "Patient portal";
  q: string;
  a: string;
}

export const faqs: FaqItem[] = [
  {
    category: "Insurance",
    q: "Which insurance plans are accepted?",
    a: "[PLACEHOLDER] The accepted-insurer list has not been provided yet. We do not list an insurer until the clinic confirms it. Please call reception to check your plan.",
  },
  {
    category: "Insurance",
    q: "How does insurance billing work?",
    a: "[PLACEHOLDER] Describe here whether the clinic bills the insurer directly or issues an invoice for reimbursement.",
  },
  {
    category: "Insurance",
    q: "What should I bring for an insured visit?",
    a: "Bring your insurance card or policy number and a photo ID. Some plans also require a referral letter.",
  },
  {
    category: "Parking",
    q: "Is parking available?",
    a: "[PLACEHOLDER] Parking details have not been confirmed. This section will list on-site capacity, cost and entrance.",
  },
  {
    category: "Parking",
    q: "Where should patients enter?",
    a: "[PLACEHOLDER] Entrance information to be provided by the clinic.",
  },
  {
    category: "Parking",
    q: "Is accessible parking available?",
    a: "[PLACEHOLDER] Accessible-parking details to be provided by the clinic.",
  },
  {
    category: "First visit",
    q: "What should I bring to my first visit?",
    a: "Photo ID, insurance details if applicable, a list of current medication, and any previous reports, scans or prescriptions.",
  },
  {
    category: "First visit",
    q: "Do I need an appointment?",
    a: "Consultations are by appointment. Laboratory sample collection accepts walk-ins during lab hours.",
  },
  {
    category: "First visit",
    q: "How early should I arrive?",
    a: "Arrive 10–15 minutes early so reception can complete registration.",
  },
  {
    category: "Appointments",
    q: "How do I reschedule or cancel?",
    a: "Use the patient portal or call reception. Please give as much notice as possible so the slot can be reused.",
  },
  {
    category: "Diagnostics",
    q: "How do I prepare for a blood test?",
    a: "Some panels require 8–12 hours of fasting. Your confirmation message states whether fasting applies to your test.",
  },
  {
    category: "Diagnostics",
    q: "When will I get my results?",
    a: "Turnaround depends on the test. Routine bloodwork is usually fastest; cultures take longer. Results appear in the patient portal.",
  },
  {
    category: "Billing",
    q: "Which payment methods are accepted?",
    a: "[PLACEHOLDER] Accepted payment methods to be confirmed by the clinic.",
  },
  {
    category: "Patient portal",
    q: "Is the patient portal live?",
    a: "No. The portal shown on this site is a design demonstration only. No accounts, records or medical data exist behind it.",
  },
];

export interface Post {
  slug: string;
  title: string;
  category: string;
  author: string;
  date: string;
  readingTime: string;
  excerpt: string;
}

export const posts: Post[] = [
  {
    slug: "understanding-your-blood-test",
    title: "Understanding your blood test report",
    category: "Diagnostics",
    author: "[Placeholder author — replace with a verified clinician]",
    date: "2026-05-04",
    readingTime: "5 min",
    excerpt: "What the common sections of a laboratory report describe, and which questions to bring to your follow-up.",
  },
  {
    slug: "preparing-for-a-checkup",
    title: "How to prepare for a routine checkup",
    category: "Preventive Care",
    author: "[Placeholder author — replace with a verified clinician]",
    date: "2026-04-18",
    readingTime: "4 min",
    excerpt: "A short checklist of what to bring, what to note down, and when fasting applies.",
  },
  {
    slug: "childrens-health-visits",
    title: "Making clinic visits easier for children",
    category: "Children's Health",
    author: "[Placeholder author — replace with a verified clinician]",
    date: "2026-03-29",
    readingTime: "6 min",
    excerpt: "Practical ways parents can prepare a child for a consultation or a blood draw.",
  },
  {
    slug: "everyday-heart-health",
    title: "Everyday habits and heart health",
    category: "Heart Health",
    author: "[Placeholder author — replace with a verified clinician]",
    date: "2026-03-02",
    readingTime: "7 min",
    excerpt: "General lifestyle guidance, and the signs that should prompt a conversation with a clinician.",
  },
];

export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  requirements: string[];
}

export const jobs: Job[] = [
  {
    id: "job-01",
    title: "[Placeholder] General Physician",
    department: "Doctors",
    location: "Main Clinic",
    type: "Full time",
    requirements: ["Valid licence to practise", "Clinic-based consultation experience"],
  },
  {
    id: "job-02",
    title: "[Placeholder] Registered Nurse",
    department: "Nurses",
    location: "Main Clinic",
    type: "Full time",
    requirements: ["Nursing registration", "Outpatient experience preferred"],
  },
  {
    id: "job-03",
    title: "[Placeholder] Laboratory Technologist",
    department: "Laboratory",
    location: "Main Clinic",
    type: "Full time",
    requirements: ["Relevant laboratory qualification", "Sample handling experience"],
  },
  {
    id: "job-04",
    title: "[Placeholder] Radiographer",
    department: "Radiology",
    location: "Main Clinic",
    type: "Part time",
    requirements: ["Radiography qualification", "X-Ray equipment experience"],
  },
  {
    id: "job-05",
    title: "[Placeholder] Reception Coordinator",
    department: "Reception",
    location: "Main Clinic",
    type: "Full time",
    requirements: ["Front-desk experience", "Comfortable with scheduling software"],
  },
];

export interface Testimonial {
  initial: string;
  service: string;
  quote: string;
  date: string;
}

/** Demonstration content only — replace with verified patient reviews. */
export const testimonials: Testimonial[] = [
  {
    initial: "A.",
    service: "General consultation",
    quote: "Sample testimonial — placeholder text shown to demonstrate layout. Replace with a verified patient review.",
    date: "Sample date",
  },
  {
    initial: "M.",
    service: "Blood testing",
    quote: "Sample testimonial — placeholder text shown to demonstrate layout. Replace with a verified patient review.",
    date: "Sample date",
  },
  {
    initial: "S.",
    service: "Pediatrics",
    quote: "Sample testimonial — placeholder text shown to demonstrate layout. Replace with a verified patient review.",
    date: "Sample date",
  },
];

export const galleryCategories = [
  "Clinic",
  "Doctors",
  "Staff",
  "Facilities",
  "Diagnostics",
  "Laboratory",
  "Waiting Areas",
  "Technology",
] as const;
