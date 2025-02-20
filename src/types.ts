export interface DomeProject {
  id: string;
  name: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  status: 'planning' | 'in-progress' | 'completed';
  size: {
    diameter: number;
    height: number;
    squareFootage: number;
  };
  price: number;
  timeline: {
    startDate: string;
    estimatedCompletion: string;
    actualCompletion?: string;
  };
  builder: Builder;
  structureType: StructureType;
  team: {
    interiorDesigners: TeamMember[];
    constructionCrew: TeamMember[];
    projectManagers: TeamMember[];
  };
  tasks: Task[];
  media: {
    images: string[];
    videos: string[];
  };
}

export interface Builder {
  id: string;
  name: string;
  specialization: string[];
  rating: number;
  completedProjects: number;
  image: string;
}

export interface StructureType {
  id: string;
  name: string;
  category: string;
  sizeRange: {
    min: number;
    max: number;
  };
  priceRange: {
    min: number;
    max: number;
  };
  estimatedBuildTime: number;
  features: string[];
  image: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  contact: {
    email: string;
    phone: string;
  };
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'completed';
  assignee: TeamMember;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  dependencies: string[];
}