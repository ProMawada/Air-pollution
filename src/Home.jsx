import React from 'react';
import Header from './Header';
import Hero_section from './Hero_section';
import About_section from './About_section';
import CardComponent from './CardComponent';
import QuizComponent from './QuizComponent';
import Footer_section from './Footer_section';
// import Whatcanido from './Whatcanido';

const Home = () => {
  return (
    <>
      <Header />
      <Hero_section />
      <About_section />
      <CardComponent />
      <QuizComponent />
      {/* <Whatcanido /> */}
      <Footer_section />

    </>
  );
};

export default Home;