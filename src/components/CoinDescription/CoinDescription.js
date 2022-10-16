import React, { useState, useContext } from "react";
// import CountDown from "./CountDown";
import { BsCurrencyBitcoin } from "react-icons/bs";
import { AiFillDollarCircle } from "react-icons/ai";
import TimeComponent from "../Timer/TimeComponent";
import { PresaleContext }  from '../../context/PresaleContext';

const CoinDescription = () => {
  const { isConnected, connectWallet, disconnectWallet } = useContext(PresaleContext);

  return (
    <>
      <div name="about" className="w-full bg-slate-900">
        <div className="max-w-[1240px] mx-auto">
          <div className="text-center">
            <h2 className="text-5xl font-bold text-orange-600">Ajira Pay Finance Token(AJP) ICO</h2>
            <br></br>
            <p className="text-1xl py-2 text-white">
              To help fund the project, we humbly invite you to take part in our first ICO by purchasing some $AJP tokens
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-1 px-2 text-center">
            <div className="border py-12 m-5 rounded-xl shadow-xl h-96">
              {/* card with countdown timer */}
              <div className="countdown-timer-card">
                <div>
                  <p className="text-3xl font-bold uppercase py-5 text-white">
                    Token Sale ends in
                  </p>
                </div>
                <div className="countdown-timer-card__timer">
                  <TimeComponent />
                </div>
              </div>
            </div>
            <div className="border py-12 m-5 rounded-xl shadow-xl h-96">
              {/* text to say token calculation  and then on next line show that the BNB  and then on next line we have an input field to calculate the token and have a button  to calculate it*/}
              <div className="countdown-timer-card">
                <div>
                  <h2 className="text-3xl font-bold uppercase py-5 text-white">
                    Buy Token
                  </h2>
                  <p className="text-white">Presale Rate: 1 AJP = 0.3 USD</p>
                  <p className="text-white">Pancakeswap Listing Rate: 1 AJP = 0.5 USD</p>
                  <hr></hr>
                  <br></br>
                  <p>
                    <span className="text-2xl font-bold text-white">BNB ={" "}</span>
                    <span className="text-2xl font-bold text-white">AJP</span>
                  </p>
                </div>
              </div>
              {/*an input field and a button on the same line to calculate the token the input field and button should fit well inside the card */}
              <div className="countdown-timer-card">
                <div className="countdown-timer-card__timer">
                  <input
                    type="number"
                    placeholder="Enter BNB Amount"
                    className="border-2 border-gray-300 bg-white h-10 rounded-lg text-sm focus:outline-none p-2"
                  />
                  
                  <input
                    type="number"
                    placeholder="AJP Amount"
                    className="border-2 border-gray-300 bg-white h-10 rounded-lg text-sm focus:outline-none p-2"
                    disabled
                  />
                  
                  {
                    isConnected ?
                    <p className="py-3">
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-xl">
                      Contribute
                    </button>
                    </p>
                    :
                    <p className="py-3">
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-xl" onClick={connectWallet}>
                      Connect Wallet To Buy
                    </button>
                    </p>
                  }
                </div>
              </div>
            </div>

            <div className="border py-8 m-5 rounded-xl shadow-xl h-96">
              {/* account profile and balcnce here  */}
              <div className="justify-center">
                <AiFillDollarCircle className="text-6xl text-indigo-600" />
                <p className="text-2xl font-bold text-white uppercase py-5">My Contribution</p>
                <p></p>
                <hr></hr>
                <p className="text-white py-2">Tokens Purchased: { isConnected && <span>50000 AJP</span> }</p>
                <p className="text-white py-2">Total BNB Spent: { isConnected && <span>X BNB</span>}</p>
                <p></p>
                <br></br>
                {/* <button className="bg-indigo-600 text-white px-4 py-2 rounded-xl">
                  Connect Wallet
                </button> */}
                <br></br>
                <br></br>
                {
                  isConnected ?
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-xl">
                      Claim Contribution
                    </button>
                  :
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-xl" onClick={connectWallet}>
                      Connect Wallet To Claim
                  </button>
                }
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CoinDescription;
