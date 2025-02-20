import { create } from 'zustand';
import { DomeProject, Builder, StructureType } from '../types';

interface ProjectStore {
  projects: DomeProject[];
  builders: Builder[];
  structureTypes: StructureType[];
  selectedProject: DomeProject | null;
  setSelectedProject: (project: DomeProject | null) => void;
  addProject: (project: DomeProject) => void;
  updateProject: (project: DomeProject) => void;
}

// Sample data for testing
const sampleData = {
  projects: [
    {
      id: '1',
      name: 'Mountain View Dome',
      location: {
        lat: 40.7128,
        lng: -74.0060,
        address: '123 Mountain View Rd, Boulder, CO'
      },
      status: 'in-progress' as const,
      size: {
        diameter: 40,
        height: 20,
        squareFootage: 1256
      },
      price: 250000,
      timeline: {
        startDate: '2024-01-15',
        estimatedCompletion: '2024-06-15'
      },
      builder: {
        id: '1',
        name: 'EcoDome Builders',
        specialization: ['Residential', 'Eco-friendly'],
        rating: 4.8,
        completedProjects: 25,
        image: 'https://images.unsplash.com/photo-1508763718304-b2ddedfa2785'
      },
      structureType: {
        id: '1',
        name: 'Residential Dome',
        category: 'Residential',
        sizeRange: {
          min: 800,
          max: 2000
        },
        priceRange: {
          min: 200000,
          max: 500000
        },
        estimatedBuildTime: 120,
        features: ['Solar Ready', 'Natural Ventilation'],
        image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233'
      },
      team: {
        interiorDesigners: [
          {
            id: '1',
            name: 'Sarah Johnson',
            role: 'Lead Designer',
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
            contact: {
              email: 'sarah@example.com',
              phone: '555-0123'
            }
          }
        ],
        constructionCrew: [
          {
            id: '2',
            name: 'Mike Chen',
            role: 'Construction Lead',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
            contact: {
              email: 'mike@example.com',
              phone: '555-0124'
            }
          }
        ],
        projectManagers: [
          {
            id: '3',
            name: 'Alex Rodriguez',
            role: 'Project Manager',
            image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
            contact: {
              email: 'alex@example.com',
              phone: '555-0125'
            }
          }
        ]
      },
      tasks: [
        {
          id: '1',
          title: 'Foundation Work',
          description: 'Prepare and pour the foundation',
          status: 'completed' as const,
          assignee: {
            id: '2',
            name: 'Mike Chen',
            role: 'Construction Lead',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
            contact: {
              email: 'mike@example.com',
              phone: '555-0124'
            }
          },
          dueDate: '2024-02-15',
          priority: 'high' as const,
          dependencies: []
        },
        {
          id: '2',
          title: 'Frame Assembly',
          description: 'Assemble the main dome frame',
          status: 'in-progress' as const,
          assignee: {
            id: '2',
            name: 'Mike Chen',
            role: 'Construction Lead',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
            contact: {
              email: 'mike@example.com',
              phone: '555-0124'
            }
          },
          dueDate: '2024-03-15',
          priority: 'high' as const,
          dependencies: ['1']
        }
      ],
      media: {
        images: [
          'https://images.unsplash.com/photo-1518780664697-55e3ad937233',
          'https://images.unsplash.com/photo-1518780664697-55e3ad937234',
          'https://images.unsplash.com/photo-1518780664697-55e3ad937235'
        ],
        videos: []
      }
    }
  ],
  builders: [
    {
      id: '1',
      name: 'EcoDome Builders',
      specialization: ['Residential', 'Eco-friendly'],
      rating: 4.8,
      completedProjects: 25,
      image: 'https://images.unsplash.com/photo-1508763718304-b2ddedfa2785'
    },
    {
      id: '2',
      name: 'Commercial Dome Solutions',
      specialization: ['Commercial', 'Industrial'],
      rating: 4.6,
      completedProjects: 42,
      image: 'https://images.unsplash.com/photo-1516937941344-00b4e0337589'
    }
  ],
  structureTypes: [
    {
      id: '1',
      name: 'Residential Dome',
      category: 'Residential',
      sizeRange: {
        min: 800,
        max: 2000
      },
      priceRange: {
        min: 200000,
        max: 500000
      },
      estimatedBuildTime: 120,
      features: ['Solar Ready', 'Natural Ventilation'],
      image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233'
    },
    {
      id: '2',
      name: 'Commercial Dome',
      category: 'Commercial',
      sizeRange: {
        min: 2000,
        max: 10000
      },
      priceRange: {
        min: 500000,
        max: 2000000
      },
      estimatedBuildTime: 180,
      features: ['HVAC Integration', 'Commercial Grade'],
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab'
    }
  ]
};

export const useProjectStore = create<ProjectStore>((set) => ({
  projects: sampleData.projects,
  builders: sampleData.builders,
  structureTypes: sampleData.structureTypes,
  selectedProject: null,
  setSelectedProject: (project) => set({ selectedProject: project }),
  addProject: (project) => set((state) => ({ 
    projects: [...state.projects, project] 
  })),
  updateProject: (project) => set((state) => ({
    projects: state.projects.map((p) => 
      p.id === project.id ? project : p
    )
  }))
}));