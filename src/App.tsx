import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Works } from './components/Works';
import { Services } from './components/Services';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { PROJECTS, ProjectItem } from './data/portfolioData';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [inquiryPreload, setInquiryPreload] = useState<string>('');

  const handleOpenProject = (project: ProjectItem) => {
    setSelectedProject(project);
  };

  const handleCloseProject = () => {
    setSelectedProject(null);
  };

  const handleInquireFromProject = (projectName: string) => {
    setInquiryPreload(`Hi Agnes! I am interested in collaborating on a project similar to "${projectName}".`);
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div data-template-id="__page-root" className="min-h-screen bg-[#fff9f3] text-[#383047] font-sans antialiased selection:bg-[#f7c9d8] selection:text-[#383047]">
      <div className="page-shell bg-grain min-h-screen flex flex-col">
        {/* Navigation Bar */}
        <Header />

        {/* Main Sections */}
        <main className="flex-1">
          {/* Hero Section */}
          <Hero />

          {/* About Section */}
          <About />

          {/* Works Portfolio Showcase */}
          <Works onOpenProject={handleOpenProject} />

          {/* Services & Process */}
          <Services />

          {/* Contact & Inquiry Section */}
          <Contact initialMessage={inquiryPreload} />
        </main>

        {/* Footer */}
        <Footer />

        {/* Project Case Study Lightbox Modal */}
        <ProjectModal
          project={selectedProject}
          onClose={handleCloseProject}
          onSelectProject={setSelectedProject}
          allProjects={PROJECTS}
          onInquire={handleInquireFromProject}
        />
      </div>
    </div>
  );
}
