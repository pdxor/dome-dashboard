import React from 'react';
import { useProjectStore } from '../store/projectStore';
import { Clock, AlertCircle, CheckCircle2, Building } from 'lucide-react';

const Dashboard = () => {
  const { projects } = useProjectStore();

  const stats = {
    total: projects.length,
    inProgress: projects.filter(p => p.status === 'in-progress').length,
    completed: projects.filter(p => p.status === 'completed').length,
    planned: projects.filter(p => p.status === 'planning').length
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Project Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Total Projects"
          value={stats.total}
          icon={<Building className="h-6 w-6 text-blue-500" />}
          color="blue"
        />
        <StatCard
          title="In Progress"
          value={stats.inProgress}
          icon={<Clock className="h-6 w-6 text-yellow-500" />}
          color="yellow"
        />
        <StatCard
          title="Completed"
          value={stats.completed}
          icon={<CheckCircle2 className="h-6 w-6 text-green-500" />}
          color="green"
        />
        <StatCard
          title="Planned"
          value={stats.planned}
          icon={<AlertCircle className="h-6 w-6 text-purple-500" />}
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentProjects projects={projects} />
        <UpcomingTasks projects={projects} />
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, color }: any) => (
  <div className={`bg-white p-6 rounded-lg shadow-md border-l-4 border-${color}-500`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="mt-1 text-3xl font-semibold text-gray-900">{value}</p>
      </div>
      {icon}
    </div>
  </div>
);

const RecentProjects = ({ projects }: any) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Projects</h2>
    <div className="space-y-4">
      {projects.slice(0, 5).map((project: any) => (
        <div key={project.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h3 className="font-medium text-gray-900">{project.name}</h3>
            <p className="text-sm text-gray-500">{project.location.address}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            project.status === 'completed' ? 'bg-green-100 text-green-800' :
            project.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
            'bg-purple-100 text-purple-800'
          }`}>
            {project.status}
          </span>
        </div>
      ))}
    </div>
  </div>
);

const UpcomingTasks = ({ projects }: any) => {
  const allTasks = projects.flatMap((p: any) => 
    p.tasks.map(t => ({ ...t, projectName: p.name }))
  ).filter(t => t.status !== 'completed')
    .sort((a: any, b: any) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 5);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Tasks</h2>
      <div className="space-y-4">
        {allTasks.map((task: any) => (
          <div key={task.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 className="font-medium text-gray-900">{task.title}</h3>
              <p className="text-sm text-gray-500">{task.projectName}</p>
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
};

export default Dashboard;