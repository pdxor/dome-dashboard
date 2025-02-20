import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import ProjectMap from './components/ProjectMap';
import BuilderLibrary from './components/BuilderLibrary';
import StructureCatalog from './components/StructureCatalog';
import ProjectDetails from './components/ProjectDetails';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/map" element={<ProjectMap />} />
            <Route path="/builders" element={<BuilderLibrary />} />
            <Route path="/structures" element={<StructureCatalog />} />
            <Route path="/project/:id" element={<ProjectDetails />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;