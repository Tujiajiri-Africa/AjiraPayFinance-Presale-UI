import React from "react";
// import CountDown from "./CountDown";
import { BsCurrencyBitcoin } from "react-icons/bs";
import TimeComponent from "../Timer/TimeComponent";

const CoinDescription = () => {
  return (
    <>
      <div name="about" className="w-full bg-slate-900">
        <div className="max-w-[1240px] mx-auto">
          <div className="text-center">
            <h2 className="text-5xl font-bold text-white">Some Description Here</h2>
            <p className="text-3xl py-2 text-gray-500">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque
              asperiores earum placeat veritatis dignissimos itaque.
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
                    Token Calculation
                  </h2>
                  {/* <p>
                    <span className="text-2xl font-bold">BNB</span> ={" "}
                    <span className="text-2xl font-bold">Token</span>
                  </p> */}
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
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Calculate
                  </button>
                </div>
              </div>
            </div>

            <div className="border py-8 m-5 rounded-xl shadow-xl h-96">
              {/* account profile and balcnce here  */}
              <div className="justify-center">
                <BsCurrencyBitcoin className="text-6xl text-indigo-600" />
                <p className="text-2xl font-bold">Account Profile</p>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-xl">
                  Connect Wallet
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CoinDescription;
