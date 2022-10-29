import React from 'react';
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Home from './pages/Home';
import {  Switch, Route } from "react-router-dom";
import Tokenomics from './pages/Tokenomics';
import Staking from './pages/Staking';
import Airdrop from './pages/Airdrop';

function App() {
  return (
    <>
    <Navbar />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/tokenomics" component={Tokenomics} />
      <Route exact path='/staking' component={Staking} />
      <Route exact path='/airdrop' component={Airdrop} />
    </Switch>
    <Footer />
    </>
  );
}

export default App;
