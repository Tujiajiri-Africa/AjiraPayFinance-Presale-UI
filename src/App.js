import React, { Component } from 'react';
import CoinDescription from "./components/CoinDescription/CoinDescription";
// import CountDown from "./components/CoinDescription/CountDown";
import Footer from "./components/Footer/Footer";
import Hero from "./components/Hero/Hero";
import Navbar from "./components/Navbar/Navbar";
import Spacing from "./components/Spacing/Spacing";
import TimeComponent from "./components/Timer/TimeComponent";

function App() {
  return (
    <>
  
    <Navbar />
    <Hero />
    {/* <Spacing /> */}
    {/* <CountDown /> */}
    <CoinDescription />
    <Footer />
    </>
  );
}

export default App;
