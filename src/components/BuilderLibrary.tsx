import React, { useState } from 'react';
import { useProjectStore } from '../store/projectStore';
import { Star, Search, Building2 } from 'lucide-react';

const BuilderLibrary = () => {
  const { builders } = useProjectStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('all');

  const filteredBuilders = builders.filter(builder => {
    const matchesSearch = builder.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialization = selectedSpecialization === 'all' || 
      builder.specialization.includes(selectedSpecialization);
    return matchesSearch && matchesSpecialization;
  });

  const allSpecializations = Array.from(
    new Set(builders.flatMap(builder => builder.specialization))
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Dome Builders</h1>
        <div className="flex space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search builders..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={selectedSpecialization}
            onChange={(e) => setSelectedSpecialization(e.target.value)}
          >
            <option value="all">All Specializations</option>
            {allSpecializations.map(spec => (
              <option key={spec} value={spec}>{spec}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBuilders.map(builder => (
          <div key={builder.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="aspect-w-16 aspect-h-9">
              <img
                src={builder.image}
                alt={builder.name}
                className="object-cover w-full h-48"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">{builder.name}</h3>
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="ml-1 text-gray-600">{builder.rating.toFixed(1)}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center text-gray-600">
                  <Building2 className="h-5 w-5 mr-2" />
                  <span>{builder.completedProjects} completed projects</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {builder.specialization.map(spec => (
                    <span
                      key={spec}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuilderLibrary;