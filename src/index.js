import React, {Component } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { PresaleContextProvider } from './context/PresaleContext';
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from "@ethersproject/providers";
import { ethers } from 'ethers';
import {BrowserRouter} from 'react-router-dom';

function getLibrary(provider) {
  //return new Web3Provider(provider);
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = 8000; // frequency provider is polling
  return library;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Web3ReactProvider getLibrary={getLibrary}>
      <PresaleContextProvider >
        <React.StrictMode>
          <BrowserRouter>
          <App />
          </BrowserRouter>
        </React.StrictMode>
      </PresaleContextProvider>
    </Web3ReactProvider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
