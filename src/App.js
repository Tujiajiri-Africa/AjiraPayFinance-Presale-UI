import React from 'react';
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Home from './pages/Home';
import {  Switch, Route } from "react-router-dom";
import Tokenomics from './pages/Tokenomics';

function App() {
  return (
    <>
    <Navbar />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/tokenomics" component={Tokenomics} />
    </Switch>
    <Footer />
    </>
  );
}

export default App;
