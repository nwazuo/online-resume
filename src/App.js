import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LatestCode from './components/LatestCode';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import About from './components/About';
import Footer from './components/Footer';

const divStyle = {
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '20px',
};
const App = () => (
  <>
    <Navbar />
    <Hero />
    <Projects />
    <About />
    <Experience />
    <Contact />
    <Footer />
  </>
);
export default App;
