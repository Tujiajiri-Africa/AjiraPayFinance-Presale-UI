import React from "react";
import CountDown from "./CountDown";
import {BsCurrencyBitcoin} from "react-icons/bs";


const CoinDescription = () => {
  return (
    <>
      <div name="about" className="w-full my-32">
        <div className="max-w-[1240px] mx-auto">
          <div className="text-center">
            <h2 className="text-5xl font-bold">Some Description Here</h2>
            <p className="text-3xl py-6 text-gray-500">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque
              asperiores earum placeat veritatis dignissimos itaque.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-1 px-2 text-center">
            <div className="border py-8 m-5 rounded-xl shadow-xl h-96">
              {/* card with countdown timer */}
              <div className="countdown-timer-card">
                <div className="countdown-timer-card__timer">
                  {/* <CountDown /> */}
                </div>
              </div>
            </div>
            <div className="border py-8 m-5 rounded-xl shadow-xl h-96">
              <div className="">
                <div className="flex justify-center">
                  <input
                    type="text"
                    className="w-1/2 border rounded-xl px-4 py-2"
                    placeholder="Enter your email"
                  />
                  <button className="bg-indigo-600 text-white px-4 py-2 rounded-xl">
                    Subscribe
                  </button>
                </div>
              </div>
              {/* h3 text  here with some description  */}
              <div className="text-left px-4 py-6">
                <h3 className="font-bold">Some Description Here</h3>
                <p className="text-2xl py-8 text-gray-500">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                </p>
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
