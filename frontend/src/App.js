import React from 'react';
import Header from './components/Header';
import ProjectList from './components/ProjectsList';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import SkillsList from './components/SkillsList';

const App = () => {
  return (
    <div>
      <Header />
      <ProjectList />
      <SkillsList />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default App;
