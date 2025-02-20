import React, { useState } from 'react';
import { useProjectStore } from '../store/projectStore';
import { Ruler, DollarSign, Clock } from 'lucide-react';

const StructureCatalog = () => {
  const { structureTypes } = useProjectStore();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);
  const [sizeRange, setSizeRange] = useState<[number, number]>([0, 10000]);

  const filteredStructures = structureTypes.filter(structure => {
    const matchesCategory = selectedCategory === 'all' || structure.category === selectedCategory;
    const matchesPrice = structure.priceRange.min >= priceRange[0] && 
                        structure.priceRange.max <= priceRange[1];
    const matchesSize = structure.sizeRange.min >= sizeRange[0] && 
                       structure.sizeRange.max <= sizeRange[1];
    return matchesCategory && matchesPrice && matchesSize;
  });

  const categories = Array.from(new Set(structureTypes.map(s => s.category)));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Structure Catalog</h1>
        <select
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStructures.map(structure => (
          <div key={structure.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="aspect-w-16 aspect-h-9">
              <img
                src={structure.image}
                alt={structure.name}
                className="object-cover w-full h-48"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{structure.name}</h3>
              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <Ruler className="h-5 w-5 mr-2" />
                  <span>{structure.sizeRange.min} - {structure.sizeRange.max} sq ft</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <DollarSign className="h-5 w-5 mr-2" />
                  <span>${structure.priceRange.min.toLocaleString()} - ${structure.priceRange.max.toLocaleString()}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="h-5 w-5 mr-2" />
                  <span>{structure.estimatedBuildTime} days estimated build time</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  {structure.features.map(feature => (
                    <span
                      key={feature}
                      className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
                    >
                      {feature}
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

export default StructureCatalog;