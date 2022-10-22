import React from "react";
import Chart from "./Chart";

const TokenomicsDescription = () => {
  return (
    <>
      <div name="about" className="w-full bg-slate-900">
        <div className="max-w-[1240px] mx-auto">
          <div className="text-center">
            <h2 className="text-5xl font-bold text-orange-600">
              AJIRA PAY Tokenomics
            </h2>
            <br></br>
            <p className="text-1xl py-2 text-white">
              The AJP token acts both as the governance and utility token for
              the Ajira Pay Protocol. AJP holders get platform discounts on both
              the mobile and web apps upon release.
            </p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 gap-4">
            <div class="bg-white p-4 rounded-xl shadow-xl">
              <h2 className="text-3xl font-bold text-white">AJP Token allocation</h2>
              <br></br>
              <p className="text-1xl py-2 text-white">
              AJP Token Allocation(%)
              </p>
              <div className="py-4">
              <Chart />
              </div>
            </div>
            <div class="bg-slate-900 p-4 rounded-xl shadow-xl">
              <h2 className="text-3xl font-bold text-white">AJP Token Info</h2>
              <br></br>
              <p className="text-1xl py-2 text-white">
                Total Supply
              </p>
              <p className="text-1xl py-2 text-white">
                200,000,000
              </p>
              <p className="text-1xl py-2 text-white">
               Max Supply
              </p>
              <p className="text-1xl py-2 text-white">
                200,000,000
              </p>
              <p className="text-1xl py-2 text-white">
               Symbol
              </p>
              <p className="text-1xl py-2 text-white">
               AJP
              </p>
              <p className="text-1xl py-2 text-white">
                Decimals
              </p>
              <p className="text-1xl py-2 text-white">
                18
              </p>
              <p className="text-1xl py-2 text-white">
                Contract Address
              </p>
              <p className="text-1xl py-2 text-white">
                Comming Soon
              </p>
              <p className="text-1xl py-2 text-white">
               Security Audit Certficate
              </p>
              <p className="text-1xl py-2 text-white">
                Comming Soon
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TokenomicsDescription;
