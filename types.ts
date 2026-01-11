
export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  description?: string[];
}

export interface Education {
  school: string;
  degree: string;
  period: string;
}

export interface Course {
  name: string;
  provider: string;
  date: string;
}

export interface CVData {
  name: string;
  title: string;
  location: string;
  contact: {
    email: string;
    linkedin: string;
    github: string;
  };
  skills: string[];
  languages: string[];
  certifications: string[];
  summary: string[];
  experience: Experience[];
  education: Education[];
  courses: Course[];
}
