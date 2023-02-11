import React, {  useContext, useState } from "react";
// import CountDown from "./CountDown";
import { AiFillDollarCircle } from "react-icons/ai";
import TimeComponent from "../Timer/TimeComponent";
import { PresaleContext }  from '../../context/PresaleContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { BigNumber, ethers } from 'ethers';
import { Audio, Oval, ColorRing } from  'react-loader-spinner'
//import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const CoinDescription = () => {
  const { 
    isConnected, 
    connectWallet, 
    buyToken, 
    connectedAccount, 
    truncateAddress, 
    claim , 
    totalTokenContributionByUser, 
    totalWeiContributionByUser,
    totalTokensClaimedByUser,
    totalWeiRaised,
    totalContributors,
    phase2TotalTokensBought,
    phase1TotalTokensToSell, 
    phase2TotalTokensToSell, 
    phase3TotalTokensToSell,
    phase1TotalTokensBought,
    isPresaleOpenForClaims,
    isPresaleStarted,
    isPresalePaused,
    isActiveInvestor,
    isPhase1Active, 
    isPhase2Active, 
    isPhase3Active,
    percentageSoldPhase1, 
    percentageSoldPhase2, 
    percentageSoldPhase3,
    totalTokensBoughtByUserInPhase1, 
    totalTokensBoughtByUserInPhase2, 
    totalTokensBoughtByUserInPhase3,
    totalBNBSpentByInvestorInPhase1, 
    totalBNBSpentByInvestorInPhase2, 
    totalBNBSpentByInvestorInPhase3,
    phase3TotalTokensBought, 
    approveUSDTStableCoin,
    approveBUSDStableCoin,
    approveUSDCStableCoin,
    approveDAIStableCoin,
    usdtContractInstance,
    userDAIBalance,
    userUSDTBalance,
    userUSDCBalance,
    userBUSDBalance,
    buyTokenWithStableCoin,
    canShowProgressBar,
    totalTokensBoughtInPhase1InBothContracts,
    totalTokensBoughtInPhase2InBothContracts,
    totalTokensBoughtInPhase3InBothContracts,
    totalTokenContributionsClaimedByUserFromStableCoin,
    totalTokenContributionByUserFromStableCoin,
    totalTokenContributionsBoughtByUserInPhase1FromStableCoin,
    totalTokenContributionAggredated,
    totalTokensBoughtByInvestorInPhase1Aggregated,
    totalTokenContributionsBoughtByUserInPhase2FromStableCoin,
    totalTokenContributionsBoughtByUserInPhase3FromStableCoin,
    totalTokensBoughtByInvestorInPhase2Aggregated,
    totalTokensBoughtByInvestorInPhase3Aggregated
  } = useContext(PresaleContext);

    const USDT_ADDRESS = '0x55d398326f99059fF775485246999027B3197955'
    const BUSD_ADDRESS = '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56'
    const USDC_ADDRESS = '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d'
    const DAI_ADDRESS = '0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3'

  const [isApprovalComplete, setApprovalComplete] = useState(false)
  const [isPurchaseComplete, setIsPurchaseComplete] = useState(false)
  const [showApprovalProgress, setShowApprovalProgress] = useState(false)

  const showLoader = async() =>{
  
    <ColorRing
      visible={true}
      height="80"
      width="80"
      ariaLabel="blocks-loading"
      wrapperStyle={{}}
      wrapperClass="blocks-wrapper"
      colors={['#b8c480', '#B2A3B5', '#F4442E', '#51E5FF', '#429EA6']}
    />

  }

  const handleSubmit = async(event) => {
    event.preventDefault()
    const amount = event.target.amount.value;
    const t = ethers.utils.parseEther(amount)
    //console.log(t)
    buyToken(t);
    event.target.amount.value = ""
  }

  const performApproveStableCoin = async(event) =>{
    event.preventDefault()
    const ajiraPayFinanceFinalStableCoinContractAddress = '0x1dd6f0610B42f09048913B525B112d6984452E5C'
    const amount = event.target.stableCoinAmount.value;
    const coin = event.target.stableCoinName.value;
    const t = ethers.utils.parseEther(amount)
    if(coin === USDT_ADDRESS){
      approveUSDTStableCoin(ajiraPayFinanceFinalStableCoinContractAddress,t)  
    }else if(coin === BUSD_ADDRESS){
      approveBUSDStableCoin(ajiraPayFinanceFinalStableCoinContractAddress, t)
    }else if(coin === USDC_ADDRESS){
      approveUSDCStableCoin(ajiraPayFinanceFinalStableCoinContractAddress, t)
    }else if(coin === DAI_ADDRESS){
      approveDAIStableCoin(ajiraPayFinanceFinalStableCoinContractAddress, t)
    }else{ 
      return false
    }  
  }

  const performBuyTokenWithStableCoin = async(event) =>{
    event.preventDefault()
    try{
      if(isApprovalComplete){
        const amount = event.target.stableCoinAmount.value;
        const coin = event.target.stableCoinName.value;
        const t = ethers.utils.parseEther(amount)
        buyTokenWithStableCoin(coin, t.toString())
        event.target.stableCoinAmount.value = ""
        setApprovalComplete(false)
      }
    }catch(error){
      console.log(error)
    }
  }

  const checkUserBalanceByStableCoin = async(event)=>{
    event.preventDefault()
    
  }
  
  return (
    <>
      <div name="about" className="w-full bg-slate-900">
        <div className="max-w-[1240px] mx-auto">
          <div className="text-center">
            <h2 className="text-5xl font-bold text-orange-600">Ajira Pay Finance Token(AJP) Presale</h2>
            <br></br>
            {/* <p className="text-1xl py-2 text-white">
              To help fund the project, we humbly invite you to take part in our first ICO by purchasing some $AJP tokens
            </p> */}
          </div>

          <div className="grid md:grid-cols-3 gap-1 px-2 text-center">
          <div className="border py-7 m-5 rounded-xl shadow-xl h-96">
              {/* account profile and balcnce here  */}
              <div className="justify-center">
                <p className="text-2xl font-bold text-white uppercase py-5">Buy with Stablecoin</p>
                <hr></hr>
                <form onSubmit={performApproveStableCoin}>
                 <p className="py-6"> 
                <span className="text-white" >Select preferred stable coin</span>
                 <select name="stableCoinName" className="border-2 border-gray-300 bg-white h-10 rounded-lg text-sm focus:outline-none p-2">
                          <option value="0x55d398326f99059fF775485246999027B3197955">USDT</option>
                          <option value="0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56">BUSD</option>
                          <option value="0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d">USDC</option>
                          <option value="0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3">DAI</option>
                          
                    </select>
                  </p>
                  <p>
                    <input
                      type="text"
                      name="stableCoinAmount"
                      required
                      placeholder="Enter Stablecoin Amount"
                      className="border-2 border-gray-300 bg-white h-10 rounded-lg text-sm focus:outline-none p-2"
                    />
                 </p>
                 {/* isApprovalComplete */}
                      <p>
                      {
                        isConnected && isPresaleStarted && !isPresalePaused && 
                        <p className="py-3">
                        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-xl">
                          Approve and Buy
                        </button>
                        </p>
                      }

                      </p>
                      
                  </form>
                  {
                        !isConnected &&
                        <p className="py-3">
                        <button className="bg-indigo-600 text-white px-4 py-2 rounded-xl" onClick={connectWallet}>
                        <FontAwesomeIcon icon={solid('wallet')}/> Connect Wallet To Buy
                        </button>
                        </p>
                      }
                      {
                  isConnected && isPresaleStarted && isPresaleOpenForClaims && !isPresalePaused && isActiveInvestor &&
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-xl" onClick={claim}> 
                       Claim From Stablecoin Contribution
                    </button>  
                }
                
                      {/* {
                      canShowProgressBar &&
                        <div className="text-center">
                           <ColorRing
                            visible={true}
                            height="80"
                            width="80"
                            ariaLabel="blocks-loading"
                            wrapperStyle={{}}
                            wrapperClass="blocks-wrapper"
                            colors={['#b8c480', '#B2A3B5', '#F4442E', '#51E5FF', '#429EA6']}
                        />
                        </div>
                     } */}
              </div>
            </div>
            {
              /*
                PRESALE STATISTICS TAKEN OVER BY STABLECOIN PURCHASE
              */
            }
            
            <div className="border py-7 m-5 rounded-xl shadow-xl h-96">
              <div className="countdown-timer-card">
                <div>
                  <h2 className="text-3xl font-bold uppercase py-1 text-white">
                    Buy With BNB
                  </h2>
                  <hr></hr>
                  <p className="text-white">Min Contribution: $10</p>
                  <p className="text-white">Max Contribution: $10,000</p>
                  <p className="text-white">Phase #1 Price: 1 $AJP = $0.1</p>
                  <p className="text-white">Phase #2 Price: 1 $AJP = $0.2</p>
                  <p className="text-white">Phase #3 Price: 1 $AJP = $0.3</p>
                  <p className="text-white">Pancakeswap Listing Rate: 1 $AJP = $0.4</p>

                  {/* <hr></hr> */}
                  <br></br>
                 
                </div>
              </div>
              <div className="countdown-timer-card">
                <div className="countdown-timer-card__timer">
                  <form onSubmit={handleSubmit}>
                    <input
                      type="text"
                      name="amount"
                      required
                      placeholder="Enter BNB Amount"
                      className="border-2 border-gray-300 bg-white h-10 rounded-lg text-sm focus:outline-none p-2"
                    />
                      {
                        isConnected && isPresaleStarted && !isPresalePaused &&
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
                 
                </div>
              </div>
            </div>

            <div className="border py-1 m-5 rounded-xl shadow-xl h-96">
             
              <div className="justify-center">
                <AiFillDollarCircle className="text-6xl text-indigo-600" />
                <p className="text-2xl font-bold text-white uppercase py-2">My Contribution</p>
                <p></p>
                <hr></hr>
                <p className="text-white">
                  Account: 
                      { isConnected && connectedAccount !== null &&
                      
                      truncateAddress(connectedAccount)
                      
                      }
                </p>
                
                <p className="text-white py-1">Total $AJP Purchased: { isConnected && totalTokenContributionAggredated != null ? totalTokenContributionAggredated : '' } $AJP </p>
                <p className="text-white py-1">Total BNB Spent: { isConnected && totalWeiContributionByUser != null ? totalWeiContributionByUser: '' } BNB</p>
                <p className="text-white py-1">Total $AJP Claimed: { isConnected && totalTokensClaimedByUser != null ? totalTokensClaimedByUser : '' } $AJP </p>
                {isConnected && isPhase1Active && 
                  <p className="text-white py-1">Phase #1 $AJP Bought: { totalTokensBoughtByInvestorInPhase1Aggregated }
                    <br></br>
                    Phase #1 BNB Contributed: { totalBNBSpentByInvestorInPhase1 }
                  </p>
                  
                }
                {isConnected && isPhase2Active && 
                  <p className="text-white py-1">Phase #2 $AJP Bought: { totalTokensBoughtByInvestorInPhase2Aggregated }
                    <br></br>
                    Phase #2 BNB Contributed: { totalBNBSpentByInvestorInPhase2 }
                  </p>
                  
                }
                {isConnected && isPhase3Active && 
                  <p className="text-white py-1">Phase #3 $AJP Bought: { totalTokensBoughtByInvestorInPhase3Aggregated }
                    <br></br>
                    Phase #3 BNB Contributed: { totalBNBSpentByInvestorInPhase3 }
                  </p>
                  
                }
                
                <br></br>
                <br></br>
                {
                  isConnected && isPresaleStarted && isPresaleOpenForClaims && !isPresalePaused && isActiveInvestor ?
                    <button className="bg-indigo-600 text-white px-4 py-1 rounded-xl" onClick={claim}> 
                       Claim From BNB Contribution
                    </button>
                    
                    :
                    isConnected &&
                    <>
                    
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-xl" disabled>Claims Closed</button>
                    {/* <p className="text-white">Claims date TBA after DEX Listing</p> */}
                    
                    </>
                }
                {
                  !isConnected &&
                  <>
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-xl">
                      <FontAwesomeIcon icon={solid('wallet')}/> Claims Closed
                  </button>
                  <p className="text-white">Claims date TBA after DEX Listing</p>
                  </>
                }
                
              </div>
            </div>
          </div>
        </div>
      </div>
        
      { /*
          SECOND SECTION ON HOW TO BUY TOKEN
              */}
              <div name="about" className="w-full bg-slate-900">
        <div className="max-w-[1240px] mx-auto">
          <div className="text-center">
            {/* <hr></hr> */}
            <h2 className="text-5xl font-bold text-orange-600">HOW TO BUY</h2>
            {/* <hr></hr> */}
            <br></br>
            {/* <p className="text-1xl py-2 text-white">
              To help fund the project, we humbly invite you to take part in our first ICO by purchasing some $AJP tokens
            </p> */}
          </div>

          <div className="grid md:grid-cols-3 gap-1 px-2 text-center">
          <div className="border py-7 m-5 rounded-xl shadow-xl h-96">
              {/* card with countdown timer */}
              <div className="countdown-timer-card">
                <div>
                  <p className="text-3xl font-bold uppercase py-2 text-white">
                    {/* Token Sale ends in */}
                    PRESALE STATISTICS
                  </p>
                </div>
                <div className="countdown-timer-card__timer py-1">
                  
                  {/* <TimeComponent /> */}
                  <br></br>
                  {/* <hr></hr> */}
                  {/* { isConnected ? */}
                  <div>
                    <hr className="py-1"></hr>
                    <p className="text-white py-1">Total Contributors: { totalContributors }</p>
                    <p className="text-white py-1">Total Funding Raised:  { totalWeiRaised } BNB</p>
                    <p className="text-white py-1">Phase #1 Sold: {totalTokensBoughtInPhase1InBothContracts } / { phase1TotalTokensToSell } $AJP </p>
                    <p className="text-white py-1">Phase #2 Sold: {totalTokensBoughtInPhase2InBothContracts } / { phase2TotalTokensToSell } $AJP</p>
                    <p className="text-white py-1">Phase #3 Sold: {totalTokensBoughtInPhase3InBothContracts } / { phase3TotalTokensToSell } $ AJP</p>
                    <br></br>
                    <hr></hr>
                    <p className="text-white py-5"> 
                      {isPhase1Active && 'Current Phase: Phase 1'}
                      {isPhase2Active && 'Current Phase: Phase 2'}
                      {isPhase3Active && 'Current Phase: Phase 3'}
                    </p>
                      
                    { isPhase1Active && 
                      <div class="w-full bg-gray-200 rounded-full">
                      <div class="bg-green-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-l-full" style={{width: percentageSoldPhase1 + '%'}}>{percentageSoldPhase1 + '%'}</div>
                    </div>
                    }
                    { isPhase2Active && 
                      <div class="w-full bg-gray-200 rounded-full">
                      <div class="bg-green-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-l-full" style={{width: percentageSoldPhase2 + '%'}}>{percentageSoldPhase2 + '%'}</div>
                    </div>
                    }
                    { isPhase3Active && 
                      <div class="w-full bg-gray-200 rounded-full">
                      <div class="bg-green-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-l-full" style={{width: percentageSoldPhase3 + '%'}}>{percentageSoldPhase3 + '%'}</div>
                    </div>
                    }
                  </div>
                  {/* :
                  'p'
                  // <button className="bg-indigo-600 text-white px-4 py-3 rounded-xl" onClick={connectWallet}>
                  //       <FontAwesomeIcon icon={solid('wallet')}/> Connect To View Statistics
                  // </button>
                } */}
                </div>
              </div>
            </div>
            <div className="border py-2 m-5 rounded-xl shadow-xl h-96">
              {/* card with countdown timer */}
              <div className="countdown-timer-card">
                <div>
                  <p className="text-3xl font-bold uppercase py-0 text-white">
                    {/* Token Sale ends in */}
                    Getting Started
                  </p>
                  <hr></hr>
                </div>
                <div className="countdown-timer-card__timer py-1">
                  
                  {/* <TimeComponent /> */}
                  <br></br>
                  {/* <hr></hr> */}
                  
                  <p className="text-white py-1">To get started you’ll need your very own crypto wallet. 
                    If you don’t have a wallet already then you can download MetaMask <a href="https://metamask.io/download/" target="_blank" rel="noreferrer">here</a> from 
                    the official MetaMask site.
                    It should be noted that purchasing from a desktop browser will give you a smoother buying experience.
                  </p>

                  <p className="text-white py-1">If you’re on mobile you can use Wallet Connect to connect one of the supported 
                    wallets - we’d recommend Trust Wallet.
                  </p>
                  <p className="text-white py-1">Token claims will be activated after DEX listing: Exact date TBA</p>
                </div>
              </div>
            </div>
            

            <div className="border py-7 m-5 rounded-xl shadow-xl h-96">
              {/* account profile and balcnce here  */}
              <div className="justify-center">
                <p className="text-2xl font-bold text-white uppercase py-5">Buying $AJP</p>
                <hr></hr>
                <p className="text-white py-2">1. Ensure you are connected to the Binance Smart Chain mainnet network.</p>
                <p className="text-white py-2">2. Click on any of the connection buttons above to connect to this site(ensure it is https://portal.ajirapay.finance).</p>
                <p className="text-white py-2">3. Enter the amount of BNB to purchase with in the text box above.</p>
                <p className="text-white py-2">4. Click on contribute and approve the transaction by paying for gas fees.</p> 
              </div>
            </div>
          {
            /*
              STABLECOIN PURCHASE
            */
          }
          
            
          </div>
          
        </div>
      </div>
    </>
  );
};

export default CoinDescription;
