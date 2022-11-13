import React, {  useContext } from "react";
// import CountDown from "./CountDown";
import { AiFillDollarCircle } from "react-icons/ai";
import TimeComponent from "../Timer/TimeComponent";
import { PresaleContext }  from '../../context/PresaleContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { BigNumber, ethers } from 'ethers';

const CoinDescription = () => {
  const { isConnected, connectWallet, buyToken,getAjiraPayTokenContract, connectedAccount, 
    truncateAddress, claim } = useContext(PresaleContext);

  const handleSubmit = async(event) => {
    event.preventDefault()
    const amount = event.target.amount.value;
    const _amount = BigNumber.from(parseInt(amount)).mul(10).pow(18)
    console.log(_amount)
    buyToken(_amount.toString());
  }

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
            <div className="border py-7 m-5 rounded-xl shadow-xl h-96">
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
            <div className="border py-7 m-5 rounded-xl shadow-xl h-96">
              {/* text to say token calculation  and then on next line show that the BNB  and then on next line we have an input field to calculate the token and have a button  to calculate it*/}
              <div className="countdown-timer-card">
                <div>
                  <h2 className="text-3xl font-bold uppercase py-1 text-white">
                    Buy Token
                  </h2>
                  <p className="text-white">Minimum Contribution: $10</p>
                  <p className="text-white">Maximum Contribution: $10,000</p>
                  <p className="text-white">Phase 1 Sale Rate: 1 AJP = $0.2</p>
                  <p className="text-white">Phase 2 Sale Rate: 1 AJP = $0.3</p>
                  <p className="text-white">Pancakeswap Listing Rate: 1 AJP = $0.4</p>

                  <hr></hr>
                  <br></br>
                  {/* <p className="py-1">
                    <span className="text-2xl font-bold text-white"> BNB ={" "}</span>
                    <span className="text-2xl font-bold text-white"> AJP</span>
                  </p> */}
                </div>
              </div>
              {/*an input field and a button on the same line to calculate the token the input field and button should fit well inside the card */}
              <div className="countdown-timer-card">
                <div className="countdown-timer-card__timer">
                  <form onSubmit={handleSubmit}>
                    <input
                      type="text"
                      name="amount"
                      placeholder="Enter BNB Amount"
                      className="border-2 border-gray-300 bg-white h-10 rounded-lg text-sm focus:outline-none p-2"
                    />
                      {
                        isConnected &&
                        <p className="py-3">
                        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-xl">
                          Contribute
                        </button>
                        </p>
                      }
                      
                  </form>
                  {
                        !isConnected &&
                        <p className="py-3">
                        <button className="bg-indigo-600 text-white px-4 py-2 rounded-xl" onClick={connectWallet}>
                        <FontAwesomeIcon icon={solid('wallet')}/> Connect Wallet To Buy
                        </button>
                        </p>
                      }
                
                  
                  {/* <input
                    type="number"
                    placeholder="AJP Amount"
                    className="border-2 border-gray-300 bg-white h-10 rounded-lg text-sm focus:outline-none p-2"
                    disabled
                  /> */}
                  
                 
                </div>
              </div>
            </div>

            <div className="border py-7 m-5 rounded-xl shadow-xl h-96">
              {/* account profile and balcnce here  */}
              <div className="justify-center">
                <AiFillDollarCircle className="text-6xl text-indigo-600" />
                <p className="text-2xl font-bold text-white uppercase py-5">My Contribution</p>
                <p></p>
                <hr></hr>
                <p className="text-white">
                  { isConnected && connectedAccount !== null ? truncateAddress(connectedAccount): '' }
                </p>
                <p className="text-white py-2">Tokens Purchased: { isConnected && <span> AJP</span> }</p>
                <p className="text-white py-2">Total BNB Spent: { isConnected && <span> BNB</span>}</p>
                <p></p>
                <br></br>
                {/* <button className="bg-indigo-600 text-white px-4 py-2 rounded-xl">
                  Connect Wallet
                </button> */}
                <br></br>
                <br></br>
                {
                  isConnected ?
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-xl" onClick={claim}> 
                       Claim Contribution
                    </button>
                  :
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-xl" onClick={connectWallet}>
                      <FontAwesomeIcon icon={solid('wallet')}/> Connect Wallet To Claim
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
