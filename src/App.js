import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/main.css';
import Navbar from './sections/Navbar';
// import FloatBall from './sections/FloatBall';
import PersonalSection from './sections/PersonalSection';
import PhotoWallSection from './sections/PhotoWallSection';
import EducationSection from './sections/EducationSection';
import WorkSection from './sections/WorkSection';
import SkillsSection from './sections/SkillsSection';
import ProjectSection from './sections/ProjectSection';
import ContactSection from './sections/ContactSection';
import Footer from './sections/Footer';
import AIPortfolioPage from './AIPortfolioPage/AIPortfolioPage';
import { LanguageProvider } from './context/LanguageContext';

// 原有的个人作品集页面组件
function Portfolio() {
  return (
    <div className="App">
      <Navbar />
      {/* <FloatBall /> */}
      <PersonalSection />
      <PhotoWallSection />
      <EducationSection />
      <WorkSection />
      <SkillsSection />
      <ProjectSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/ai-portfolio" element={<AIPortfolioPage />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App; 