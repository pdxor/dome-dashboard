import React from 'react';
import { useParams } from 'react-router-dom';
import { useProjectStore } from '../store/projectStore';
import { 
  Calendar, 
  Users, 
  CheckSquare, 
  Image as ImageIcon,
  Clock,
  DollarSign,
  Ruler
} from 'lucide-react';

const ProjectDetails = () => {
  const { id } = useParams();
  const { projects } = useProjectStore();
  const project = projects.find(p => p.id === id);

  if (!project) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <p className="text-xl text-gray-600">Project not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{project.name}</h1>
            <p className="text-gray-600 mt-2">{project.location.address}</p>
          </div>
          <span className={`px-4 py-2 rounded-full text-sm font-medium ${
            project.status === 'completed' ? 'bg-green-100 text-green-800' :
            project.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
            'bg-purple-100 text-purple-800'
          }`}>
            {project.status}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <InfoCard
          title="Timeline"
          icon={<Calendar className="h-6 w-6 text-blue-500" />}
          items={[
            ['Start Date', new Date(project.timeline.startDate).toLocaleDateString()],
            ['Est. Completion', new Date(project.timeline.estimatedCompletion).toLocaleDateString()],
            project.timeline.actualCompletion && 
              ['Actual Completion', new Date(project.timeline.actualCompletion).toLocaleDateString()]
          ].filter(Boolean)}
        />
        <InfoCard
          title="Specifications"
          icon={<Ruler className="h-6 w-6 text-green-500" />}
          items={[
            ['Diameter', `${project.size.diameter} ft`],
            ['Height', `${project.size.height} ft`],
            ['Square Footage', `${project.size.squareFootage} sq ft`]
          ]}
        />
        <InfoCard
          title="Financial"
          icon={<DollarSign className="h-6 w-6 text-yellow-500" />}
          items={[
            ['Total Price', `$${project.price.toLocaleString()}`]
          ]}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TeamSection team={project.team} />
        <TaskSection tasks={project.tasks} />
      </div>

      <MediaGallery media={project.media} />
    </div>
  );
};

const InfoCard = ({ title, icon, items }: any) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <div className="flex items-center space-x-2 mb-4">
      {icon}
      <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
    </div>
    <div className="space-y-2">
      {items.map(([label, value]: [string, string]) => (
        <div key={label} className="flex justify-between">
          <span className="text-gray-600">{label}</span>
          <span className="font-medium text-gray-900">{value}</span>
        </div>
      ))}
    </div>
  </div>
);

const TeamSection = ({ team }: any) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <div className="flex items-center space-x-2 mb-4">
      <Users className="h-6 w-6 text-purple-500" />
      <h2 className="text-xl font-semibold text-gray-900">Team</h2>
    </div>
    <div className="space-y-4">
      {Object.entries(team).map(([role, members]: [string, any]) => (
        <div key={role}>
          <h3 className="text-lg font-medium text-gray-900 mb-2 capitalize">
            {role.replace(/([A-Z])/g, ' $1').trim()}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {members.map((member: any) => (
              <div key={member.id} className="flex items-center space-x-3">
                <img
                  src={member.image}
                  alt={member.name}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-gray-900">{member.name}</p>
                  <p className="text-sm text-gray-600">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const TaskSection = ({ tasks }: any) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <div className="flex items-center space-x-2 mb-4">
      <CheckSquare className="h-6 w-6 text-indigo-500" />
      <h2 className="text-xl font-semibold text-gray-900">Tasks</h2>
    </div>
    <div className="space-y-4">
      {tasks.map((task: any) => (
        <div key={task.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h3 className="font-medium text-gray-900">{task.title}</h3>
            <p className="text-sm text-gray-600">{task.description}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">
              Due: {new Date(task.dueDate).toLocaleDateString()}
            </p>
            <span className={`inline-block px-2 py-1 text-xs rounded-full ${
              task.priority === 'high' ? 'bg-red-100 text-red-800' :
              task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
              'bg-green-100 text-green-800'
            }`}>
              {task.priority}
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const MediaGallery = ({ media }: any) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <div className="flex items-center space-x-2 mb-4">
      <ImageIcon className="h-6 w-6 text-rose-500" />
      <h2 className="text-xl font-semibold text-gray-900">Media Gallery</h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {media.images.map((image: string, index: number) => (
        <div key={index} className="aspect-w-16 aspect-h-9">
          <img
            src={image}
            alt={`Project image ${index + 1}`}
            className="object-cover rounded-lg"
          />
        </div>
      ))}
    </div>
    {media.videos.length > 0 && (
      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Videos</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {media.videos.map((video: string, index: number) => (
            <div key={index} className="aspect-w-16 aspect-h-9">
              <video
                src={video}
                controls
                className="w-full rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);

export default ProjectDetails;