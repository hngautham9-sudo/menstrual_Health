// Shared definitions and contracts for Rakshobhya

export interface UserProfile {
  id: string;
  name: string;
  age: number;
  schoolName: string;
  village: string;
  district: string;
  state: string;
  primaryLanguage: 'en' | 'kn' | 'hi';
  role: 'girl' | 'asha' | 'teacher';
  avatarUrl?: string;
  joinedAt: string;
}

export interface CycleLog {
  id: string;
  userId: string;
  startDate: string; // YYYY-MM-DD
  endDate?: string;  // YYYY-MM-DD
  flow: 'light' | 'medium' | 'heavy' | 'none';
  pain: 'none' | 'mild' | 'moderate' | 'severe';
  mood: 'cozy' | 'tired' | 'sensitive' | 'happy' | 'cranky';
  symptoms: string[]; // e.g., ['cramps', 'headache', 'acne', 'bloating']
  notes?: string;
  loggedAt: string;
}

export interface SanitationReport {
  id: string;
  userId: string;
  reporterName: string;
  schoolName: string;
  village: string;
  toiletCleanliness: number;  // 1 to 5 stars
  waterAvailability: boolean;
  padDisposalBins: boolean;
  soapAvailable: boolean;
  doorLocksWork: boolean;
  description?: string;
  photoUrl?: string;
  status: 'reported' | 'reviewed' | 'resolved';
  resolvedBy?: string;
  resolvedAt?: string;
  reportedAt: string;
}

export interface Scheme {
  id: string;
  name: string;
  nameLocal?: string;
  description: string;
  descriptionLocal?: string;
  eligibility: {
    minAge?: number;
    maxAge?: number;
    gender: 'female' | 'all';
    region?: 'rural' | 'tribal' | 'all';
    caste?: string[];
    schoolStatus?: 'studying' | 'any';
  };
  benefits: string;
  benefitsLocal?: string;
  category: 'health' | 'education' | 'finance' | 'hygiene';
  state: string; // e.g. "Karnataka" or "National"
  applicationSteps: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'saheli';
  text: string;
  translatedText?: string;
  timestamp: string;
  audioUrl?: string;
}
