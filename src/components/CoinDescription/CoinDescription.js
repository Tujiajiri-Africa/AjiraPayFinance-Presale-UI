import React, {  useContext, useState } from "react";
// import CountDown from "./CountDown";
import { AiFillDollarCircle } from "react-icons/ai";
import TimeComponent from "../Timer/TimeComponent";
import { PresaleContext }  from '../../context/PresaleContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { BigNumber, ethers } from 'ethers';
import { Audio, Oval, ColorRing } from  'react-loader-spinner'
import TokenomicsDescription from "../Token/TokenomicsDescription";
import Roadmap  from "../Timeline/Roadmap";
//import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import kycAuditImage from "../../assets/securi_kyc_audit.jpg"
import kycCertImage from "../../assets/kyc_cert.jpg"
import ajiraPayLogo from "../../assets/ajira_pay_logo.jpg"
import binanceLogo from "../../assets/partners/binance.png"
import poocoinLogo from "../../assets/partners/poocoin.png"
import pancakeswapLogo from "../../assets/partners/pancakeswap_1.png"
import dickensTeam from "../../assets/team/dickens.jpg"
import dickensTeam2 from "../../assets/team/dickens_2.jpg"
import davidLeon from "../../assets/team/david_leon.jpg"
import zakari from "../../assets/team/centrine_zakari.jpg"
import basil from '../../assets/team/download_1.jpg'
import xander from '../../assets/team/xander.jpg'
import cryptoqueen1 from '../../assets/team/team_female_1.jpg'
import cryptoqueen2 from '../../assets/team/team_female_2.jpg'
import ntfmale1 from '../../assets/team/nft_1.jpg'
import agesa from '../../assets/team/agesa_collins.jpg'
import ladyTori from '../../assets/team/lady_tori.jpg'
import securiAudit1 from '../../assets/partners/securi_audit_1.png'
import securiAudit2 from '../../assets/partners/securi_kyc_1.png'
import securiAudit3 from '../../assets/partners/securi_kyc_black.png'
import binanceSmartChain from '../../assets/partners/binance-smart-chain.png'
import coinSniper from '../../assets/partners/coinsniper.png'
import coinCarp from '../../assets/partners/coincarp.png'
import coinsultAuditImg from '../../assets/ajp_coinsult_audit.png'

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
    totalTokensBoughtByInvestorInPhase3Aggregated,
    totalUsdRaised,
    presalePhase1Price,
    presalePhase2Price,
    presalePhase3Price,
    buyTokenWithVesting,
    tokenSaleDuration
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
  //buyTokenWithVesting
  const handleSubmit = async(event) => {
    event.preventDefault()
    const amount = event.target.amount.value;
    const t = ethers.utils.parseEther(amount)
    //console.log(t)
    buyToken(t);
    event.target.amount.value = ""
  }

  const handleVestingSubmit = async(event) => {
    event.preventDefault()
    const amount = event.target.amount.value;
    const period = event.target.lock_period.value;
    const t = ethers.utils.parseEther(amount)
    //console.log(t)
    buyTokenWithVesting(period,t);
    event.target.amount.value = ""
    event.target.lock_period.value = ""
  }

  const performApproveStableCoin = async(event) =>{
    event.preventDefault()
    const ajiraPayFinanceFinalStableCoinContractAddress = '0x1dd6f0610B42f09048913B525B112d6984452E5C'
    const amount = event.target.stableCoinAmount.value;
    const coin = event.target.stableCoinName.value;
    const t = ethers.utils.parseEther(amount)
    if(coin === USDT_ADDRESS){
      approveUSDTStableCoin(ajiraPayFinanceFinalStableCoinContractAddress,t) 
      event.target.stableCoinAmount.value = "" 
    }else if(coin === BUSD_ADDRESS){
      approveBUSDStableCoin(ajiraPayFinanceFinalStableCoinContractAddress, t)
      event.target.stableCoinAmount.value = ""
    }else if(coin === USDC_ADDRESS){
      approveUSDCStableCoin(ajiraPayFinanceFinalStableCoinContractAddress, t)
      event.target.stableCoinAmount.value = ""
    }else if(coin === DAI_ADDRESS){
      approveDAIStableCoin(ajiraPayFinanceFinalStableCoinContractAddress, t)
      event.target.stableCoinAmount.value = ""
    }else{ 
      return false
    }  
  }

  const FAQ = () => {
    const [box1, setBox1] = useState(false);
    const [box2, setBox2] = useState(false);
    const [box3, setBox3] = useState(false);
    const [box4, setBox4] = useState(false);

    return (
        <div>
            {/* <Head>
                <title>FAQ</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head> */}
            <div>
                <img src="https://i.ibb.co/DQ4FZhL/pattern-bg.png" alt="blue pattern background" class="absolute w-full h-64 md:h-96 object-center object-fit z-0"></img>
                <div class="relative flex flex-col items-center justify-center sm:px-0 px-6 z-20 pb-32">
                    <div class="md:py-36 py-20">
                        <h1 role="heading" class="xl:text-6xl md:text-5xl text-xl font-bold leading-10 text-white">
                            Frequently asked questions
                        </h1>
                    </div>
                    <div class="lg:w-1/2 md:w-8/12 sm:w-9/12 w-full">
                        <div class="bg-white shadow rounded p-8">
                            <div class="flex items-center justify-between">
                                <div>
                                    <h2 class="text-base font-semibold leading-none text-gray-800">What is Ajira Pay Finance all about?</h2>
                                </div>
                                <button onClick={() => setBox1(!box1)} class="focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 ring-offset-white cursor-pointer">
                                    {box1 ? (
                                        <svg role="button" aria-label="close dropdown" width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1 5L5 1L9 5" stroke="#4B5563" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    ) : (
                                        <svg width="10" role="button" aria-label="open dropdown" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1 1L5 5L9 1" stroke="#4B5563" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    )}
                                </button>
                            </div>

                            {box1 && (
                                <ul class="">
                                    <li>
                                        <p class="text-base leading-normal text-gray-600 mt-4 lg:w-96">We are a Decentralized Web3 protocol for secure and seamless crypto payments.</p>
                                        <p class="text-base leading-normal text-gray-600 mt-4 lg:w-96">We are the bridge between crypto holders and small scale businesses or enterprises that would like to accept crypto payments from their clients or even pay their employees in crypto currency.</p>
                                    </li>
                                </ul>
                            )}
                        </div>
                        <div class="bg-white shadow rounded p-8 mt-8">
                            <div class="flex items-center justify-between">
                                <div>
                                    <h2 class="text-base font-semibold leading-none text-gray-800">What utilities do you provide for the token?</h2>
                                </div>
                                <button
                                    onClick={() => {
                                        setBox2(!box2);
                                    }}
                                    data-menu
                                    class="focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 ring-offset-white cursor-pointer"
                                >
                                    {box2 ? (
                                        <svg role="button" aria-label="close dropdown" width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1 5L5 1L9 5" stroke="#4B5563" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    ) : (
                                        <svg width="10" role="button" aria-label="open dropdown" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1 1L5 5L9 1" stroke="#4B5563" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            {box2 && (
                                <ul>
                                    <li>
                                    <p class="text-base leading-normal text-gray-600 mt-4 lg:w-96">
                                          Ajira Pay Finance Swap Feature where traders earn trading fees on liquidity pools.
                                        </p>
                                        <p class="text-base leading-normal text-gray-600 mt-4 lg:w-96">
                                          Ajira Pay Finance Staking where holders earn more $AJP by staking $AJP
                                        </p>
                                        <p class="text-base leading-normal text-gray-600 mt-4 lg:w-96">
                                          Ajira Pay Finance DAO for community governance(2024 roadmap)
                                        </p>
                                        <p class="text-base leading-normal text-gray-600 mt-4 lg:w-96">
                                          Ajira Pay Mobile Wallet
                                        </p>
                                        <p class="text-base leading-normal text-gray-600 mt-4 lg:w-96">
                                          Ajira Pay Crypto Payments SDK for developers
                                        </p>
                                        <p class="text-base leading-normal text-gray-600 mt-4 lg:w-96">
                                          Ajira Pay Crypto Payments E-commerce plugins e.g wordpress, woocommerce
                                        </p>
                                        <p class="text-base leading-normal text-gray-600 mt-4 lg:w-96">
                                          Ajira Pay Crypto Payments APIs for developers
                                        </p>
                                        <p class="text-base leading-normal text-gray-600 mt-4 lg:w-96">
                                          Ajira Pay Crypto Payments Web Dashboard(DApp) that enables businesses to onboard their clients and set up either subscription based or one-time crypto payments.
                                        </p>
                                        
                                    </li>
                                </ul>
                            )}
                        </div>
                        <div class="bg-white shadow rounded p-8 mt-8">
                            <div class="flex items-center justify-between">
                                <div>
                                    <h2 class="text-base font-semibold leading-none text-gray-800">What payment method can I use at the presale?</h2>
                                </div>
                                <button
                                    onClick={() => {
                                        setBox2(!box2);
                                    }}
                                    data-menu
                                    class="focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 ring-offset-white cursor-pointer"
                                >
                                    {box2 ? (
                                        <svg role="button" aria-label="close dropdown" width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1 5L5 1L9 5" stroke="#4B5563" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    ) : (
                                        <svg width="10" role="button" aria-label="open dropdown" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1 1L5 5L9 1" stroke="#4B5563" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            {box2 && (
                                <ul>
                                    <li>
                                        <p class="text-base leading-normal text-gray-600 mt-4 lg:w-96">You can contribute to the presale with BNB or BEP20 USDT, BUSD or DAI.</p>
                                    </li>
                                </ul>
                            )}
                        </div>
                        <div class="bg-white shadow rounded p-8 mt-8">
                            <div class="flex items-center justify-between">
                                <div>
                                    <h2 class="text-base font-semibold leading-none text-gray-800">Is your service safe to use?</h2>
                                </div>
                                <button
                                    onClick={() => {
                                        setBox3(!box3);
                                    }}
                                    data-menu
                                    class="focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 ring-offset-white cursor-pointer"
                                >
                                    {box3 ? (
                                        <svg role="button" aria-label="close dropdown" width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1 5L5 1L9 5" stroke="#4B5563" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    ) : (
                                        <svg width="10" role="button" aria-label="open dropdown" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1 1L5 5L9 1" stroke="#4B5563" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            {box3 && (
                                <ul>
                                    <li>
                                        <p class="text-base leading-normal text-gray-600 mt-4 lg:w-96">Yes.</p>
                                        <p class="text-base leading-normal text-gray-600 mt-4 lg:w-96">The Ajira Pay Finance smart contract has been publicly auditted by the Securi Lab Cyber Security Firm. The team is also KYC verified and a certficate issued to that effect.</p>
                                    </li>
                                </ul>
                            )}
                        </div>
                        <div class="bg-white shadow rounded p-8 mt-8">
                            <div class="flex items-center justify-between">
                                <div>
                                    <h2 class="text-base font-semibold leading-none text-gray-800">What is the Launch Price?</h2>
                                </div>
                                <button onClick={() => setBox4(!box4)} data-menu class="focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 ring-offset-white cursor-pointer">
                                    {box4 ? (
                                        <svg role="button" aria-label="close dropdown" width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1 5L5 1L9 5" stroke="#4B5563" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    ) : (
                                        <svg width="10" role="button" aria-label="open dropdown" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1 1L5 5L9 1" stroke="#4B5563" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            {box4 && (
                                <ul>
                                    <li>
                                        <p class="text-base leading-normal text-gray-600 mt-4 lg:w-96">Public Launch Price on the Pancakeswap DEX is $0.1 USD per $AJP</p>
                                    </li>
                                </ul>
                            )}
                        </div>
                        <div class="bg-white shadow rounded p-8 mt-8">
                            <div class="flex items-center justify-between">
                                <div>
                                    <h2 class="text-base font-semibold leading-none text-gray-800">When is the Launch Date?</h2>
                                </div>
                                <button onClick={() => setBox4(!box4)} data-menu class="focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 ring-offset-white cursor-pointer">
                                    {box4 ? (
                                        <svg role="button" aria-label="close dropdown" width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1 5L5 1L9 5" stroke="#4B5563" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    ) : (
                                        <svg width="10" role="button" aria-label="open dropdown" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1 1L5 5L9 1" stroke="#4B5563" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            {box4 && (
                                <ul>
                                    <li>
                                        <p class="text-base leading-normal text-gray-600 mt-4 lg:w-96">Public Launch Date is 16th of April 2023 on the Pancakeswap DEX.</p>
                                    </li>
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

  
  return (
    <>
      <div name="about" className="w-full bg-slate-900">
        <div className="max-w-[1240px] mx-auto">
          <div className="text-center">
            {/* <h2 className="text-5xl font-bold text-orange-600">Ajira Pay Finance(AJP) Presale</h2> */}
            {/* <div className="border py-0 m-5 rounded-xl shadow-xl h-96">
              <div className="countdown-timer-card"> */}
              
                {/* <h4 className="text-2xl font-bold text-orange-600">
                  Hello there!, this presale has been closed and instead moved to Pinksale Finance
                </h4> */}
                {/* <p className="text-white">
                  <button className="py-3 px-6 my-4 bg-transparent">
                    <a href="https://www.pinksale.finance/launchpad/0x940C7295d1b96FA1098fc60e5A7820B6428aB045?chain=BSC">
                      Please Click Here To Buy $AJP From The Official Ajira Pay Finance Pinksale Presale
                    </a>
                  </button>
                </p> */}
              
              { 
              isPresaleStarted && isPhase1Active && <h2 className="text-white">PHASE 1 ENDS IN...</h2>
            }
            {
              isPresaleStarted && isPhase2Active && <h2 className="text-white">PHASE 2 ENDS IN...</h2>
            }
            {
              isPresaleStarted && isPhase3Active && <h2 className="text-white">FINAL PHASE OF PRESALE ENDS IN...</h2>
            }
              {
                isPresaleStarted && tokenSaleDuration &&

                <TimeComponent />
              }  
              {/* { isPresaleStarted && isPhase1Active && 
                      <div class="w-full bg-gray-200 rounded-full">
                      <div class="bg-green-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-l-full" style={{width: percentageSoldPhase1 + '%'}}>{percentageSoldPhase1 + '% '}</div>
                    </div>
                    }
                    { isPresaleStarted && isPhase2Active && 
                      <div class="w-full bg-gray-200 rounded-full">
                      <div class="bg-green-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-l-full" style={{width: percentageSoldPhase2 + '%'}}>{percentageSoldPhase2 + '%'}</div>
                    </div>
                    }
                    { isPresaleStarted && isPhase3Active && 
                      <div class="w-full bg-gray-200 rounded-full">
                      <div class="bg-green-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-l-full" style={{width: percentageSoldPhase3 + '%'}}>{percentageSoldPhase3 + '%'}</div>
                    </div>
                    } */}
                    {/* gap-1 px-2  */}
                       <div className="grid md:grid-cols-1 text-center rounded-full"> 
              {/* <div className="border py-7 m-5 rounded-xl1 shadow-xl h-96"> */}
                <div className="justify-center">
                <p className="text-white py-0"> 
                      { isPresaleStarted && isPhase1Active && 'Current Phase: Phase 1' } 
                      <br></br>
                      {isPresaleStarted && isPhase1Active && 'Current Price: 1 $AJP =  '}{ isPresaleStarted && isPhase1Active && presalePhase1Price ? presalePhase1Price /100 : '' }{'    '}{ isPresaleStarted && isPhase1Active && 'USD'}
                      <br></br>
                      {isPresaleStarted && isPhase1Active && 'Next Price: 1 $AJP =  '}{ isPresaleStarted && isPhase1Active && presalePhase2Price ? presalePhase2Price /100 : '' }{'    '}{ isPresaleStarted && isPhase1Active && 'USD'}
                      <br></br>
                      {isPresaleStarted && isPhase2Active && 'Current Phase: Phase 2'}
                      <br></br>
                      {isPresaleStarted && isPhase2Active && 'Current Price: 1 $AJP = '}{isPresaleStarted && isPhase2Active && presalePhase2Price ? presalePhase2Price /100 : '' }{'    '}{ isPresaleStarted && isPhase2Active && 'USD'}
                      <br></br>
                      {isPresaleStarted && isPhase2Active && 'Next Price: 1 $AJP =  '}{ isPresaleStarted && isPhase2Active && presalePhase3Price ? presalePhase3Price /100 : '' }{'    '}{isPresaleStarted &&  isPhase2Active && 'USD'}
                      <br></br>

                      {isPresaleStarted && isPhase3Active && 'Current Phase: Phase 3'}
                      <br></br>
                      {isPresaleStarted && isPhase3Active && 'Current Price: 1 $AJP = '}{ isPresaleStarted && isPhase3Active && presalePhase3Price ? presalePhase3Price /100 : '' }{'     '}{isPresaleStarted &&  isPhase3Active && 'USD'}

                </p>
               
                  {/* <p className="text-white">
                  <button className="py-2 px-1 my-1 bg-transparent">
                    <a href="https://twitter.com/ajiraPayDefi/status/1642092207820914688?s=20">
                    Please click here to check the official announcement on twitter
                    </a>
                  </button>
                </p> */}
                {/* <p className="text-orange-600 py-0">Thank you so much for your continued support, please buy $AJP from Pinksale</p> */}

                  
                  {/* <p className="text-white py-0">Unvested tokens will be claimed from 1st May 2023.</p>
                  <p className="text-white">Vested(locked) tokens to be claimed with respective bonuses after lock period elapses.</p> */}
                  

                    
                </div>
              {/* </div> */}
          {/* </div>
              </div> */}
            </div>
              
            <br></br>
            {/* <p className="text-1xl py-2 text-white">
              To help fund the project, we humbly invite you to take part in our first ICO by purchasing some $AJP tokens
            </p> */}
          </div>
       
          
          
                  {
                    /**
                     * 
                     * START OF KYC AND AUDIT SECTION
                     */
                  }
                  
                  {/**
                   * 
                   * END OF KYC AND AUDIT SECTION
                   */}
                    <div name="about" className="w-full bg-slate-900">
        <div className="max-w-[1240px] mx-auto">
          <div className="text-center">
           
            <h2 className="text-5xl font-bold text-orange-600">Join Ajira Pay Finance(AJP) Presale</h2>
                   {/* <p className='text-white'>Dear investor, this presale has been moved to pinksale...</p> */}
            {/* <p className="text-white">
            
                  <button className="py-3 px-6 my-4 bg-transparent">
                    <a href="https://www.pinksale.finance/launchpad/0xda45eD1958a6cEBAc3a07d715aCeC13CbE6fC762?chain=BSC">
                      Please Click Here To Buy $AJP From The Official Ajira Pay Finance Presale on Pinksale
                    </a>
                  </button>
                </p> */}
           
            <br></br>
            
          </div>
          </div>
          </div>
                         {/* <div name="about" className="w-full bg-slate-900">
        <div className="max-w-[1240px] mx-auto">
          <div className="text-center">
            <h2 className="text-5xl font-bold text-orange-600">A NOTE TO OUR BELOVED INVESTORS</h2>
                  <p className="text-white py-1">1. Round 1 of this presale on Pinksale is underway, please click the above button to buy $AJP from Pinksale.</p>
                  <p className="text-white py-1">2. Public Launch Date: 12th May 2023.</p>
                  <p className="text-white py-2">3. Token Withdrawals date to be activated from 13th May 2023</p>
                  <p className="text-white py-1">4. Pancakeswap DEX Listing Price: 1 $AJP = $0.1 USD.</p>
                  <p className="text-white py-1">5. Pancakeswap DEX Listing Date: 12th May 2023 at 14:00 PM UTC</p>
                  <p className="text-white py-1">6. First CEX Listing TBA</p>

            <br></br>
          </div>
          </div>
          </div> */}
          <div className="grid md:grid-cols-3 gap-1 px-2 text-center">

          </div>
          <div className="grid md:grid-cols-3 gap-1 px-2 text-center">
          <div className="border py-7 m-5 rounded-xl shadow-xl h-96">
              <div className="countdown-timer-card">
                <div>
                  <h2 className="text-3xl font-bold uppercase py-1 text-white">
                    Buy With BNB
                  </h2>
                 
                  <br></br>
                 
                </div>
              </div>
              <div className="countdown-timer-card">
                <div className="countdown-timer-card__timer">
                  <form onSubmit={handleVestingSubmit}>
                    <p className="py-3">
                    <span className="text-white">Enter BNB Amount: </span>
                    <input
                      type="text"
                      name="amount"
                      required
                      placeholder="Enter BNB Amount"
                      className="border-2 border-gray-300 bg-white h-10 rounded-lg text-sm focus:outline-none p-2"
                    />
                    </p>
                    
                     <p className="py-3"> 
                      <span className="text-white">Select Lock(Vesting) Period to qualify for bonus:</span>
                      <select name="stableCoinName" className="border-2 border-gray-300 bg-white h-10 rounded-lg text-sm focus:outline-none p-2">
                            <option value="0">0 weeks(zero lock bonus)</option>
                            <option value="1">4 weeks(15% Bonus)</option>
                            <option value="2">8 weeks(20% Bonus)</option>
                            <option value="3">12 weeks(25% Bonus)</option>
                            <option value="4">16 weeks(30% Bonus)</option>
                            <option value="5">20 weeks(35% Bonus)</option>
                            <option value="6">24 weeks(40% Bonus)</option>
                      </select>
                  </p> 
                      {
                        isConnected && isPresaleStarted && !isPresalePaused &&
                        <p className="py-2">
                        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-xl">
                          Contribute
                        </button>
                        </p>
                      }
                      
                  </form>
                  {
                        !isConnected &&
                        <p className="py-2">
                        <button className="bg-indigo-600 text-white px-4 py-2 rounded-xl" onClick={connectWallet}>
                        <FontAwesomeIcon icon={solid('wallet')}/> Connect Wallet To Buy
                        </button>
                        </p>
                      }
                <p className="text-white">NOTE: Select the 0 weeks(zero lock bonus) option to continue purchase without vesting.</p>
                </div>
              </div>
            </div>
         <div className="border py-7 m-5 rounded-xl shadow-xl h-96">
              <div className="justify-center">
                <p className="text-2xl font-bold text-white uppercase py-0">Buy with BEP20 Stablecoins</p>
               
                <form onSubmit={performApproveStableCoin}>
                 <p className="py-6"> 
                <span className="text-white" >Select preferred stable coin:     </span>
                 <select name="stableCoinName" className="border-2 border-gray-300 bg-white h-10 rounded-lg text-sm focus:outline-none p-2">
                          <option value="0x55d398326f99059fF775485246999027B3197955">USDT</option>
                          <option value="0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56">BUSD</option>
                          
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
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-xl"> 
                       Claim From Stablecoin Contribution
                    </button>  
                }
               
              </div>
            </div> 

            <div className="border py-1 m-5 rounded-xl shadow-xl h-96">
             
              <div className="justify-center">
                <AiFillDollarCircle className="text-6xl text-indigo-600" />
                <p className="text-2xl font-bold text-white uppercase py-0">My Contribution</p>
                <p></p>
                <hr></hr>
                <p className="text-white py-2">
                  Account: 
                      { isConnected && connectedAccount !== null &&
                      
                      truncateAddress(connectedAccount)
                      
                      }
                </p>
                
                <p className="text-white py-2">Total $AJP Purchased: { isConnected && totalTokenContributionAggredated != null ? totalTokenContributionAggredated : '' } $AJP </p>
                <p className="text-white py-2">Total BNB Spent: { isConnected && totalWeiContributionByUser != null ? totalWeiContributionByUser: '' } BNB</p>
                <p className="text-white py-2">Total $AJP Claimed: { isConnected && totalTokensClaimedByUser != null ? totalTokensClaimedByUser : '' } $AJP </p>
                {/* {isConnected && 
                  <p className="text-white py-1">Phase #1 $AJP Bought: { totalTokensBoughtByInvestorInPhase1Aggregated }
                    <br></br>
                    Phase #1 BNB Contributed: { totalBNBSpentByInvestorInPhase1 }
                  </p>
                  
                } */}
                {/* {isConnected && 
                  <p className="text-white py-1">Phase #2 $AJP Bought: { totalTokensBoughtByInvestorInPhase2Aggregated }
                    <br></br>
                    Phase #2 BNB Contributed: { totalBNBSpentByInvestorInPhase2 }
                  </p>
                  
                } */}
                {/* {isConnected && 
                  <p className="text-white py-1">Phase #3 $AJP Bought: { totalTokensBoughtByInvestorInPhase3Aggregated }
                    <br></br>
                    Phase #3 BNB Contributed: { totalBNBSpentByInvestorInPhase3 }
                  </p>
                  
                } */}
                
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
                    
                    <button className="bg-indigo-600 text-white px-4 py-1 rounded-xl" disabled>Claims Closed</button>
                    
                    </>
                }
                {
                  !isConnected &&
                  <>
                    <button className="bg-indigo-600 text-white px-4 py-1 rounded-xl">
                      <FontAwesomeIcon icon={solid('wallet')}/> Claims Closed
                  </button>
                 
                  </>
                }
                
              </div>
            </div>
          </div>
        </div>
      </div>
        {
          /**
           * START OF KYC AND AUDIT SECTION
           */
        }
              <div className="text-center">
            <h2 className="text-5xl font-bold text-orange-600">KYC Verified and Security Audit Secured.</h2>
            
            <br></br>
            {/* <p className="text-1xl py-2 text-white">
              To help fund the project, we humbly invite you to take part in our first ICO by purchasing some $AJP tokens
            </p> */}
          </div>
          <div className="grid md:grid-cols-3">
          <div className="grid md:grid-cols-1 gap-1 px-2 text-center">
          
          <div class="flex justify-center py-3">
                <div
                  class="block max-w-sm rounded-lg bg-white shadow-lg dark:bg-neutral-700">
                  <a href="https://github.com/SECURI-Cybersecurity-Audit-KYC/KYC-Report/tree/main/Aijira-Pay-Finance" data-te-ripple-init data-te-ripple-color="light">
                    <img
                      class="rounded-t-lg"
                      src={kycCertImage}
                      alt="/" />
                  </a>
                  <div class="p-6">
                    <h5
                      class="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                      Team verified by Securi Lab cyber security experts
                    </h5>
                    <p class="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                    Team fully verified by Securi Lab cyber security experts. 
                    
                    </p>

                    <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                      A background check has been conducted on the team and the project's founder by the Securi Lab cyber security experts to accertain that there are no any criminal/fraudulent records tied to this project and or it's team/founder and an approval certificate on it's safety and team's authenticity and integrity issued to that effect.
                    </p>
                    
                    <button
                      // type="button"
                      className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-800 hover:opacity-90 w-48 h-12 text-lg text-white bg-gradient-to-l from-indigo-600 to-indigo-700 rounded"
                      // data-te-ripple-init
                      >
                      <a href="https://github.com/SECURI-Cybersecurity-Audit-KYC/KYC-Report/tree/main/Aijira-Pay-Finance"
                        target="_blanl" rel="noopener noreferrer">
                        View KYC Certificate
                        </a>
                    </button>
                  </div>
                </div>
              </div>

          </div>
          {
            /**
             * 
             * data-te-ripple-init data-te-ripple-color="light"
             */
          }
          <div className="grid md:grid-cols-1 gap-1 px-2 text-center">
          <div class="flex justify-center py-3">
                <div
                  class="block max-w-sm rounded-lg bg-white shadow-lg dark:bg-neutral-700">
                  <a href="https://github.com/Coinsult/solidity/blob/main/Coinsult_AjiraPay_0x9D...f997_Audit.pdf">
                    <img
                      class="rounded-t-lg"
                      src={coinsultAuditImg}
                      alt="/" />
                  </a>
                  <div class="p-6">
                    <h5
                      class="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                      Security Audit by Coinsult
                    </h5>
                    <p class="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                      We believe that the core of any blockchain project is it's security and the safety measures it's developers and team put in place to protect investors from potential attacks or security risks.
                    </p>
                    <p class="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                      The Ajira Pay Finance token smart contract has been auditted by the Coinsult cyber security experts and this is proof that we mean good for the community and that you can trust us to be part of your financial success. As always DYOR.
                    </p>
                    <p class="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                      As you invest in Ajira Pay Finance, rest assured that you are in the right place and in the right project and community to invest in. Be part of our journey today.
                    </p>
                    <button
                      type="button"
                      className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-800 hover:opacity-90 w-48 h-12 text-lg text-white bg-gradient-to-l from-indigo-600 to-indigo-700 rounded"
                      // data-te-ripple-init
                      // data-te-ripple-color="light"
                      >
                        <a href="https://github.com/Coinsult/solidity/blob/main/Coinsult_AjiraPay_0x9D...f997_Audit.pdf" target="_blank" rel="noreferrer">
                        View Audit Report
                        </a>
                      
                    </button>
                  </div>
                </div>
              </div>

          </div>
          <div className="grid md:grid-cols-1 gap-1 px-2 text-center">
          
          <div class="flex justify-center py-3">
                <div
                  class="block max-w-sm rounded-lg bg-white shadow-lg dark:bg-neutral-700">
                  <a href="https://github.com/SECURI-Cybersecurity-Audit-KYC/KYC-Report/tree/main/Aijira-Pay-Finance" 
                  data-te-ripple-init 
                  data-te-ripple-color="light"
                  target="_blank"
                  rel="noreferrer">
                    <img
                      class="rounded-t-lg"
                      src={ajiraPayLogo}
                      alt="/" />
                  </a>
                  <div class="p-6">
                    <h5
                      class="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                      Whitepaper
                    </h5>
                    <p class="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                      You want to know more about Ajira Pay Finance?
                    </p>
                    <button
                      type="button"
                      className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-800 hover:opacity-90 w-48 h-12 text-lg text-white bg-gradient-to-l from-indigo-600 to-indigo-700 rounded"
                      // data-te-ripple-init
                      >
                      <a href="https://pitch.com/public/f266f4df-b857-4c82-a6a9-02051f75f35a" 
                      target="_blank" 
                      rel="noreferrer">
                        Read Whitepaper
                      </a>
                    </button>
                  </div>
                </div>
              </div>

          </div>
          </div>
        {/**
         * 
         * END OF KYC AND AUDIT SECTION
         */}
        

      { /*
          SECOND SECTION ON HOW TO BUY TOKEN
              */}
             

          <div className="grid md:grid-cols-2 gap-1 px-2 text-center">
          {/* <div className="border py-7 m-5 rounded-xl shadow-xl h-96">
             
              <div className="countdown-timer-card">
                <div>
                  <p className="text-3xl font-bold uppercase py-2 text-white">
                    
                    PRESALE STATISTICS
                  </p>
                </div>
                <div className="countdown-timer-card__timer py-1">
                  
                 
                  <br></br>
                  
                  <div>
                    <hr className="py-1"></hr>
                    <p className="text-white py-1">Total Contributors: { totalContributors }</p>
                    <p className="text-white py-1">Total BNB Raised:  { totalWeiRaised } BNB</p>
                    <p className="text-white py-1">Total USDT Raised: ${ totalUsdRaised } USDT</p>
                    <p className="text-white py-1">Phase #1 Sold: {phase1TotalTokensBought } / { phase1TotalTokensToSell } $AJP </p>
                    <p className="text-white py-1">Phase #2 Sold: {phase2TotalTokensBought } / { phase2TotalTokensToSell } $AJP</p>
                    <p className="text-white py-1">Phase #3 Sold: {phase3TotalTokensBought } / { phase3TotalTokensToSell } $ AJP</p>
                    <p className="text-white py-0">Minimum Contribution: $10 USD</p>
                    <p className="text-white py-0">Maximum Contribution: $10,000 USD</p>
                    <br></br>
                   
                    
                  </div>
                 
                </div>
              </div>
            </div> */}
            {/* <div className="border py-2 m-5 rounded-xl shadow-xl h-96">
             
              <div className="countdown-timer-card">
                <div>
                  <p className="text-3xl font-bold uppercase py-0 text-white">
                   
                    Getting Started
                  </p>
                  <hr></hr>
                </div>
                <div className="countdown-timer-card__timer py-1">
                  
                 
                  <br></br>
                
                  
                  <p className="text-white py-1">To get started you’ll need your very own crypto wallet. 
                    If you don’t have a wallet already then you can download MetaMask <a href="https://metamask.io/download/" target="_blank" rel="noreferrer">here</a> from 
                    the official MetaMask site.
                    It should be noted that purchasing from a desktop browser will give you a smoother buying experience.
                  </p>

                  <p className="text-white py-1">If you’re on mobile you can use Wallet Connect to connect one of the supported 
                    wallets - we’d recommend Trust Wallet.
                  </p>
                  
                </div>
              </div>
            </div> */}
             

            {/* <div className="border py-7 m-5 rounded-xl shadow-xl h-96">
              
              <div className="justify-center">
                <p className="text-2xl font-bold text-white uppercase py-5">Buying $AJP</p>
                <hr></hr>
                <p className="text-white py-2">1. Ensure you are connected to the Binance Smart Chain mainnet network.</p>
                <p className="text-white py-2">2. Click on any of the connection buttons above to connect to this site(ensure it is https://portal.ajirapay.finance).</p>
                <p className="text-white py-2">3. Enter the amount of USDT or BUSD to purchase with in the text box above.</p>
                <p className="text-white py-2">4. Click on approve and buy to approve the transaction by paying for gas fees.</p> 
              </div>
            </div> */}
          
            
          </div>
          <div className="grid md:grid-cols-2 gap-1 px-2 text-center">
            <div className="border py-7 m-5 rounded-xl shadow-xl h-96">
              
            <div name="about" className="w-full bg-slate-900">
        <div className="max-w-[1240px] mx-auto">
          <div className="text-center">
            <p className="text-3xl font-bold uppercase py-2 text-white">A NOTE TO OUR BELOVED INVESTORS</p>
                  {/* <p className="text-white py-1">1. Round 1 of this presale on Pinksale is underway, please click the above button to buy $AJP from Pinksale.</p> */}
                  <p className="text-white py-1">1. Public Launch Date: 12th May 2023.</p>
                  <p className="text-white py-2">2. Token Withdrawals date to be activated from 13th May 2023</p>
                  <p className="text-white py-1">3. Pancakeswap DEX Listing Price: 1 $AJP = $0.1 USD.</p>
                  <p className="text-white py-1">4. Pancakeswap DEX Listing Date: 12th May 2023 at 14:00 PM UTC</p>
                  <p className="text-white py-1">5. First CEX Listing TBA</p>

            <br></br>
          </div>
          </div>
          </div>
            </div>
          <div className="border py-7 m-5 rounded-xl shadow-xl h-96">
             
             <div className="countdown-timer-card">
               <div>
                 <p className="text-3xl font-bold uppercase py-2 text-white">
                   
                   PRESALE STATISTICS
                 </p>
               </div>
               <div className="countdown-timer-card__timer py-1">
                 
                
                 <br></br>
                 
                 <div>
                   <hr className="py-1"></hr>
                   <p className="text-white py-1">Total Contributors: { totalContributors }</p>
                   <p className="text-white py-1">Total BNB Raised:  { totalWeiRaised } BNB</p>
                   <p className="text-white py-1">Total USDT Raised: ${ totalUsdRaised } USDT</p>
                   <p className="text-white py-1">Phase #1 Sold: {phase1TotalTokensBought } / { phase1TotalTokensToSell } $AJP </p>
                   <p className="text-white py-1">Phase #2 Sold: {phase2TotalTokensBought } / { phase2TotalTokensToSell } $AJP</p>
                   <p className="text-white py-1">Phase #3 Sold: {phase3TotalTokensBought } / { phase3TotalTokensToSell } $ AJP</p>
                   <p className="text-white py-0">Minimum Contribution: $10 USD</p>
                   <p className="text-white py-0">Maximum Contribution: $10,000 USD</p>
                   <br></br>
                  
                   
                 </div>
                
               </div>
             </div>
           </div>
          </div>
    {/**
             * FEATURES/ECOSYSTEM SECTION
             */}
              <div className="mx-auto container py-12 px-4">
                <div className="w-full flex justify-center">
                <div>
                 
                 <section class="mx-auto container bg-white dark:bg-gray-900 pt-16">
                       <div class="px-4 lg:px-0">
                           <div role="contentinfo" class="flex items-center flex-col px-4">
                               {/* <p tabindex="0" class="focus:outline-none uppercase text-sm text-center text-gray-500 dark:text-gray-200 leading-none">
                                 $AJP token features
                                 </p> */}
                               <h1 tabindex="0" class="focus:outline-none text-4xl lg:text-4xl pt-4 font-extrabold text-center leading-tight text-gray-800 dark:text-white lg:w-7/12 md:w-9/12 xl:w-5/12">
                                 $AJP internal profitable features for long-term holders
                               </h1>
                           </div>
                       </div>
                   </section>
                   <section class="bg-indigo-700 py-12 mt-12">
                       <div tabindex="0" aria-label="group of cards" class="focus:outline-none px-4 lg:px-0">
                           <div class="mx-auto container flex flex-wrap px-2 lg:px-24">
                               <div tabindex="0" aria-label="card 1" class="focus:outline-none flex sm:w-full md:w-1/2 lg:border-r md:border-r sm:border-r-0 border-indigo-400 pb-10 lg:pt-10">
                                   <div class=" flex flex-shrink-0 mr-5 text-white">
                                   ✅
                                       {/* <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/indigo_bg_with_divider-svg1.svg" alt="drawer"></img> */}
                                   </div>
                                   <div class="md:w-9/12 lg:w-9/12">
                                       <h2 tabindex="0" class="focus:outline-none text-lg font-semibold leading-5 text-white">
                                         Auto Buy Back and Burn🔥
                                       </h2>
                                       <p tabindex="0" class="focus:outline-none text-base text-white leading-normal xl:w-10/12 pt-2">✅💥Auto Buy Back and Burn🔥(Auto Buying tokens from liquidity pool with BNB and burning(removing from circulation forever) to control price drops and pump💥📈🥇🏆 up the price)</p>
   
                                   </div>
                               </div>
                               <div tabindex="0" aria-label="card 2" class="focus:outline-none flex sm:w-full md:w-1/2 lg:pb-10 lg:pt-10">
                                   <div class=" flex flex-shrink-0 sm:ml-0 md:ml-10 lg:ml-10 mr-5 text-white">
                                   ✅
                                      {/* <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/indigo_bg_with_divider-svg2.svg" alt="check"></img> */}
                                   </div>
                                   <div class="md:w-9/12 lg:w-9/12 ">
                                       <h2 tabindex="0" class="focus:outline-none text-lg font-semibold leading-5 text-white">
                                         Auto Liquidity
                                       </h2>
                                       <p tabindex="0" class="focus:outline-none text-base text-white leading-normal xl:w-10/12 pt-2">
                                        This will help keep the liquidity pool stronger and protect traders from impermanent loss
                                       </p>
                                   </div>
                               </div>
                               <div tabindex="0" aria-label="card 3" class="focus:outline-none flex sm:w-full md:w-1/2 lg:border-t md:border-t sm:border-t-0 lg:border-r md:border-r sm:border-r-0 border-indigo-400 pt-10 lg:pb-20">
                                   <div class=" flex flex-shrink-0 mr-5 text-white">
                                   ✅
                                     {/* <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/indigo_bg_with_divider-svg3.svg" alt="html-tag"></img> */}
                                   </div>
                                   <div class="md:w-9/12 lg:w-9/12 ">
                                       <h2 tabindex="0" class="focus:outline-none text-lg font-semibold leading-5 text-white">
                                         Zero Transfer Fee and Low Tax
                                       </h2>
                                       <p tabindex="0" class="focus:outline-none text-base text-white leading-normal xl:w-10/12 pt-2">
                                         
                                         </p>
                                         <p tabindex="0" class="focus:outline-none text-base text-white leading-normal xl:w-10/12 pt-2">Buy Tax: 1%</p>
                                         <p tabindex="0" class="focus:outline-none text-base text-white leading-normal xl:w-10/12 pt-2">Sell Tax: 2%</p>
                                         {/* <p tabindex="0" class="focus:outline-none text-base text-white leading-normal xl:w-10/12 pt-2></p> */}
                                         <p tabindex="0" class="focus:outline-none text-base text-white leading-normal xl:w-10/12 pt-2">✅🚀 50% proceeds from fees used up to support ✅Auto Buy Back and Burn 🔥 (Buying $AJP tokens from the liquidity pool with BNB and burning 🔥 (removing from circulation forever) to support auto price pumps and ✅Auto Liquidity</p>
                                         <br></br>
                                         <p tabindex="0" class="focus:outline-none text-base text-white leading-normal xl:w-10/12 pt-2">✅🚀    
   . The rest of the 50% proceeds from fees transferred to treasury to be used in marketing, strategic partnerships,  product development and to support community growth activities</p>
                                   </div>
                               </div>
                               <div tabindex="0" aria-label="card 4" class="focus:outline-none flex sm:w-full md:w-1/2 lg:border-t md:border-t sm:border-t-0 border-indigo-400 pt-10 lg:pb-20">
                                   <div class=" flex flex-shrink-0 sm:ml-0 md:ml-10 lg:ml-10 mr-5 text-white">
                                   ✅
                                      {/* <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/indigo_bg_with_divider-svg4.svg" alt="display"></img> */}
                                   </div>
                                   <div class="md:w-9/12 lg:w-9/12 ">
                                       <h2 tabindex="0" class="focus:outline-none text-lg font-semibold leading-5 text-white">
                                         Tax Holiday with zero fees
                                         </h2>
                                       <p tabindex="0" class="focus:outline-none text-base text-white leading-normal xl:w-10/12 pt-2">
                                         During the tax holiday, no fees are deducted on buy/sell transactions
                                         </p>
                                   </div>
                               </div>
                           </div>
                       </div>
                   </section>
               
                 </div>
                </div>
              </div>
             {/**
              * END FEATURES/ECOSYSTEM SECTION
              */}

              {/**
               * 
               * START OF ECOSYSTEM FEATURES SECTION
               */}

                
    <div class="dark:bg-gray-900">
      <section class="mx-auto container py-20">
        <div class="flex justify-center items-center flex-col">
          <div class="lg:text-6xl md:text-5xl text-4xl font-white leading-10 text-center text-white-800 dark:text-white">
            <h1 className="text-yellow-200">Ecosystem and Utilities</h1>
          </div>
          <div class="pt-24 grid lg:grid-cols-3 md:grid-cols-2 justify-center items-center xl:gap-y-16 gap-y-20 gap-x-16 lg:gap-x-20 xl:gap-x-0 lg:px-10 xl:px-0">
            <div class="cursor-pointer hover:shadow py-6 xl:px-4 rounded xl:w-96 w-60 flex justify-center items-center flex-col">
              <div class="mb-6">
               <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/feature_7-svg1.svg" alt="arrow-1"></img>
              </div> 
              <div class="text-white-800 dark:text-white text-2xl font-semibold text-center">
                <h2 className="text-orange-600">Crypto On-ramp and Off-ramp Exchanges Platform</h2>
              </div>
              <div class="text-white-600 dark:text-white-300 mt-2 text-lg text-center">
                <p className="text-white">With our on-ramp/off-ramp platform, crypto holders will be able to swap between crypto and fiat at minimla costs to help in platform growth.</p>
              </div>
            </div>
            <div class="cursor-pointer hover:shadow py-6 xl:px-4 rounded xl:w-96 w-60 flex justify-center items-center flex-col">
              <div class="mb-6">
               <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/feature_7-svg1.svg" alt="arrow-1"></img>
              </div> 
              <div class="text-white-800 dark:text-white text-2xl font-semibold text-center">
                <h2 className="text-orange-600">Staking</h2>
              </div>
              <div class="text-white-600 dark:text-white-300 mt-2 text-lg text-center">
                <p className="text-white">Earn more by HODLing $AJP.</p>
                <p className="text-white">Staking APY rates to be shared with the community before launch on the 16th of April, kindly join the community to stay updated.</p>
              </div>
            </div>
            <div class="cursor-pointer hover:shadow py-6 xl:px-4 rounded xl:w-96 w-60 flex justify-center items-center flex-col">
              <div class="mb-6">
               <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/feature_7-svg2.svg" alt="3 bars"></img>
              </div>
              <div class="text-white-800 dark:text-white text-2xl font-semibold text-center">
                <h2 className="text-orange-600">Crypto Payments API Gateway</h2>
              </div>
              <div class="text-white-600 dark:text-gray-300 mt-2 text-lg text-center">
                <p className="text-white">Plug and pay developer-friendly features of our crypto payment systems will enable developers to tap into crypto payments with us much easily.</p>
              </div>
            </div>
            <div class="cursor-pointer hover:shadow py-6 xl:px-4 rounded xl:w-96 w-60 flex justify-center items-center flex-col">
              <div class="mb-6">
               <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/feature_7-svg3.svg" alt="bars"></img>
              </div>
              <div class="text-white-800 dark:text-white text-2xl font-semibold text-center">
                <h2 className="text-orange-600">E-commerce crypto payments plugins.</h2>
              </div>
              <div class="text-white-600 dark:text-white-300 mt-2 text-lg text-center">
                <p className="text-white">Integrate Ajira Pay Finance into your wordpress or woocommerce website and begin receiving crypto payments in simple steps.</p>
              </div>
            </div>
            <div class="cursor-pointer hover:shadow py-6 xl:px-4 rounded xl:w-96 w-60 flex justify-center items-center flex-col">
              <div class="mb-6">
               <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/feature_7-svg4.svg" alt="bars"></img>
              </div>
              <div class="text-white-800 dark:text-white text-2xl font-semibold text-center">
                <h2 className="text-orange-600">Crypto Payment Buttons</h2>
              </div>
              <div class="text-white-600 dark:text-white-300 mt-2 text-lg text-center">
                <p className="text-white">Accept donations/receive crypto from your clients right from your website with our simple and easy to integrate crypto payment buttons.</p>
              </div>
            </div>
            <div class="cursor-pointer hover:shadow py-6 xl:px-4 rounded xl:w-96 w-60 flex justify-center items-center flex-col">
              <div class="mb-6">
                <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/feature_7-svg5.svg" alt="bars"></img>
              </div>
              <div class="text-white-800 dark:text-white text-2xl font-semibold text-center">
                <h2 className="text-orange-600">Ajira Pay DAO.</h2>
              </div>
              <div class="text-gray-600 dark:text-gray-300 mt-2 text-lg text-center">
                <p className="text-white">Ajira Pay Finance will be community governed by $AJP holders from 2025.</p>
              </div>
            </div>
            
            <div class="cursor-pointer hover:shadow py-6 xl:px-4 rounded xl:w-96 w-60 flex justify-center items-center flex-col">
              <div class="mb-6">
              <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/feature_7-svg6.svg" alt=""></img>
              </div>
              <div class="text-white-800 dark:text-white text-2xl font-semibold text-center">
                <h2 className="text-orange-600">Ajira Swap</h2>
              </div>
              <div class="text-white-600 dark:text-white-300 mt-2 text-lg text-center">
                <p className="text-white">Ajira swap will enable crypto holders to swap between multiple tokens while at the same time enjoying the swap fees accrued from the transactions.</p>
              </div>
            </div>
            <div class="cursor-pointer hover:shadow py-6 xl:px-4 rounded xl:w-96 w-60 flex justify-center items-center flex-col">
              <div class="mb-6">
                <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/feature_7-svg5.svg" alt="bars"></img>
              </div>
              <div class="text-white-800 dark:text-white text-2xl font-semibold text-center">
                <h2 className="text-orange-600">Crypto Subscription Payments.</h2>
              </div>
              <div class="text-gray-600 dark:text-gray-300 mt-2 text-lg text-center">
                <p className="text-white">Our platform will enable companies/businesses or enterperizes to set up and accept either subscription based or one-time crypto payments from their clients.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  
               {/**
                * END OF ECOSYSTEM SECTION
                */}
                {/**
                    * TOKENOMICS
                    */}

                        <TokenomicsDescription/>
                    {/**
                     * END OF TOKENOMICS
                     */}
              {/**
               * START OF COMMUNITY SECTION
               */}
               <div>
                
        <div class="mx-auto container py-12 px-4">
            <div class="w-full flex justify-center">
                <div class="w-full md:w-11/12 xl:w-10/12 bg-gradient-to-r from-orange-700 to-yellow-200 md:py-8 md:px-8 px-5 py-4 xl:px-12 xl:py-16">
                    <div>
                        <div class="flex flex-wrap items-center md:flex-row flex-col-reverse">
                            <div class="md:w-2/3 w-full pb-6 md:pb-0 md:pr-6 flex-col md:block flex items-center justify-center md:pt-0 pt-4">
                                <div >
                                    <h1 role="heading" class="py-4 text-xl md:text-2xl lg:text-4xl xl:text-4xl lg:w-10/12 text-white font-black leading-6 lg:leading-10 md:text-left text-center">
                                      Come join the Ajira Pay Finance community and be part of one of the greatest innovations in Decentralized Finance(DeFi)
                                    </h1>
                                </div>
                               <p>
                               <button role="button" aria-label="Join the community" className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-800 hover:opacity-90 w-48 h-12 text-lg text-white bg-gradient-to-l from-indigo-600 to-indigo-700 rounded">
                                  <a href="https://discord.com/invite/Ts7CEYp8ss" target="_blank" rel="noreferrer">
                                    Join Our Discord
                                  </a>
                                </button>
                                <button role="button" aria-label="Join the community" className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-800 hover:opacity-90 w-48 h-12 text-lg text-white bg-gradient-to-l from-indigo-600 to-indigo-700 rounded">
                                  <a href="https://t.me/ajiraPayOfficialChat" target="_blank" rel="noreferrer">
                                    Join Telegram Chat
                                  </a>
                                </button>
                               </p>
                                {/* <button role="button" aria-label="Join the community" className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-800 hover:opacity-90 w-48 h-12 text-lg text-white bg-gradient-to-l from-indigo-600 to-indigo-700 rounded">
                                  <a href="https://discord.com/invite/Ts7CEYp8ss" target="_blank" rel="noreferrer">
                                  Join us on discord
                                  </a>
                                </button> */}
                            </div>
                            <div class="md:w-1/3 w-2/3">
                               <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/CTA.png" alt="cartoon avatars"></img>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
               </div>
               {/**
                * END OF COMMUNITY SECTION
                */}
       
                  {/**
                   * START OF WHITEPAPER SECTION
                   */}
                   <div>
                    
    <div class="dark:bg-gray-900">
      <section class="mx-auto container w-full py-36">
        <div class="flex flex-col justify-center items-center">
          <div class="md:text-5xl text-4xl font-black text-center text-orange-500 dark:text-white leading-snug lg:w-3/4">
            <h2>Read our whitepaper and get to know more about us.</h2>
            <p className="text-white text-2xl">We'd love to hear your feedback, say hello@ajirapay.finance</p>
          </div>
          <div class="flex justify-center items-center mt-16">
            <button class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-800 hover:opacity-90 w-48 h-12 text-lg text-white bg-gradient-to-l from-indigo-600 to-indigo-700 rounded">
              <a href="https://pitch.com/public/f266f4df-b857-4c82-a6a9-02051f75f35a" target="_blank" rel="noreferrer">
              Check It Out
              </a>
            </button>
          </div>
        </div>
      </section> 
    </div>
  
                   </div>
                   {
                    /*
                      TEST ON ROADMAP
                    */
                   }
                        {/* <div class="dark:bg-gray-900">
      <section class="mx-auto container w-full py-36">
        <div class="flex flex-col justify-center items-center">
          <div class="md:text-5xl text-4xl font-black text-center text-orange-500 dark:text-white leading-snug lg:w-3/4">
            <h2>Our Roadmap</h2>
            <Roadmap />
           
          </div>
         
        </div>
      </section> 
    </div> */}
                   {/*
                    END ROADMAP TEST
                   */ }
                   {/**
                    * END OF WHITEPAPER SECTION
                    */}
                  {
                    /**
                     * START OF TEAM SECTION
                     */
                  }
                 <section class="bg-white dark:bg-gray-900">
  <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">
      <div class="mx-auto mb-8 max-w-screen-sm lg:mb-16">
          <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Our team</h2>
          <p class="font-light text-gray-500 sm:text-xl dark:text-gray-400">
            We are a dedicated team of professionals in the blockchain industry leveraging on the power of blockchain technology and decentralization to democratize digital finance.
          </p>
      </div> 
      <div class="grid gap-8 lg:gap-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <div class="text-center text-gray-500 dark:text-gray-400">
              <img class="mx-auto mb-4 w-36 h-36 rounded-full" src={dickensTeam} alt="Bonnie Avatar"></img>
              <h3 class="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  <a href="#">Dickens Odera</a>
              </h3>
              <p>CEO & Lead Blockchain Developer</p>
              <ul class="flex justify-center mt-4 space-x-4">
                  <li>
                      <a href="https://www.linkedin.com/in/dickens-odera-135782167/" class="text-[#39569c] hover:text-gray-900 dark:hover:text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/></svg>
                      </a>
                  </li>
                  <li>
                      <a href="https://twitter.com/dickensodera" class="text-[#00acee] hover:text-gray-900 dark:hover:text-white">
                          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                      </a>
                  </li>
                  <li>
                      <a href="https://github.com/dickensodera" class="text-gray-900 hover:text-gray-900 dark:hover:text-white dark:text-gray-300">
                          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" /></svg>
                      </a>
                  </li>
                 
              </ul>
          </div>
          <div class="text-center text-gray-500 dark:text-gray-400">
              <img class="mx-auto mb-4 w-36 h-36 rounded-full" src={zakari} alt="Zakari Avatar"></img>
              <h3 class="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  <a href="#">Centrine Zakari</a>
              </h3>
              <p>Co-founder</p>
              <ul class="flex justify-center mt-4 space-x-4">
              <li>
                      <a href="https://www.linkedin.com/in/centrine-zakari-4a5935213/" class="text-[#39569c] hover:text-gray-900 dark:hover:text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/></svg>
                      </a>
                  </li>
                 
              </ul>
          </div>
          <div class="text-center text-gray-500 dark:text-gray-400">
              <img class="mx-auto mb-4 w-36 h-36 rounded-full" src={davidLeon} alt="Jese Avatar"></img>
              <h3 class="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  <a href="#">David Leon</a>
              </h3>
              <p>CFO, Defi Research Lead</p>
              <ul class="flex justify-center mt-4 space-x-4">
              <li>
                      <a href="https://www.linkedin.com/in/david-leon-489405191/" class="text-[#39569c] hover:text-gray-900 dark:hover:text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/></svg>
                      </a>
                  </li>
                  <li>
                      <a href="https://twitter.com/dleonmeyo" class="text-[#00acee] hover:text-gray-900 dark:hover:text-white">
                          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                      </a>
                  </li>
                 
              </ul>
          </div>
          
          <div class="text-center text-gray-500 dark:text-gray-400">
              <img class="mx-auto mb-4 w-36 h-36 rounded-full" src={basil} alt="Basil Avatar"></img>
              <h3 class="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  <a href="#">Wakoli Basil</a>
              </h3>
              <p>UI/UX Designer</p>
              <ul class="flex justify-center mt-4 space-x-4">
              <li>
                      <a href="https://www.linkedin.com/in/basil-wakoli-580859242/" class="text-[#39569c] hover:text-gray-900 dark:hover:text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/></svg>
                      </a>
                  </li>
                  <li>
                      <a href="https://twitter.com/WakoliBasil" class="text-[#00acee] hover:text-gray-900 dark:hover:text-white">
                          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                      </a>
                  </li>
                  
              </ul>
          </div>
          <div class="text-center text-gray-500 dark:text-gray-400">
              <img class="mx-auto mb-4 w-36 h-36 rounded-full" src={ladyTori} alt="Adiaunam Avatar"></img>
              <h3 class="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  <a href="#">Victoria Adiaunam</a>
              </h3>
              <p>Community Lead</p>
             
              <ul class="flex justify-center mt-4 space-x-4">
              <li>
                      <a href=" https://www.linkedin.com/in/victoria-adiaunam" class="text-[#39569c] hover:text-gray-900 dark:hover:text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/></svg>
                      </a>
                  </li>
                  <li>
                      <a href="https://twitter.com/VAdiaunam?t=VOVdRwhNemsiuZvweeyOgQ&s=09" class="text-[#00acee] hover:text-gray-900 dark:hover:text-white">
                          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                      </a>
                  </li>
                  {/* <li>
                      <a href="" class="text-gray-900 hover:text-gray-900 dark:hover:text-white dark:text-gray-300">
                          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" /></svg>
                      </a>
                  </li>
                  <li>
                      <a href="#" class="text-[#ea4c89] hover:text-gray-900 dark:hover:text-white">
                          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clip-rule="evenodd" /></svg>
                      </a> 
                  </li>  */}
              </ul>
          </div>
          <div class="text-center text-gray-500 dark:text-gray-400">
              <img class="mx-auto mb-4 w-36 h-36 rounded-full" src={xander} alt="Anness Avatar"></img>
              <h3 class="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  <a href="#">Nouman Anees</a>
              </h3>
              
              <p>Marketing Lead</p>
              <ul class="flex justify-center mt-4 space-x-4">
              <li>
                      <a href="https://www.linkedin.com/in/nouman-anees-111534211" class="text-[#39569c] hover:text-gray-900 dark:hover:text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/></svg>
                      </a>
                  </li>
                  <li>
                      <a href="https://twitter.com/XandarXe?t=zVWZHdgv2C_Dcdu5uJb0ew&s=09" class="text-[#00acee] hover:text-gray-900 dark:hover:text-white">
                          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                      </a>
                  </li>
                  
              </ul>
          </div>
          <div class="text-center text-gray-500 dark:text-gray-400">
              <img class="mx-auto mb-4 w-36 h-36 rounded-full" src={agesa} alt="Cryptic Avatar"></img>
              <h3 class="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  <a href="#">Agesa Collins</a>
              </h3>
              <p>Android Software Engineer|Front End Developer</p>
              
              <ul class="flex justify-center mt-4 space-x-4">
                 
              <li>
                      <a href="https://www.linkedin.com/in/agesa-collins-15b15917a" class="text-[#39569c] hover:text-gray-900 dark:hover:text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/></svg>
                      </a>
                  </li>
                  
                  <li>
                      <a href="https://twitter.com/AgesaCollins3" class="text-[#00acee] hover:text-gray-900 dark:hover:text-white">
                          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                      </a>
                  </li>
                  <li>
                      <a href="https://github.com/agesa3" class="text-gray-900 hover:text-gray-900 dark:hover:text-white dark:text-gray-300">
                          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" /></svg>
                      </a>
                  </li>
              </ul>
          </div>
          {/* <div class="text-center text-gray-500 dark:text-gray-400">
              <img class="mx-auto mb-4 w-36 h-36 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/neil-sims.png" alt="Neil Avatar"></img>
              <h3 class="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  <a href="#">Neil Sims</a>
              </h3>
              <p>Vue.js Developer</p>
              <ul class="flex justify-center mt-4 space-x-4">
                  <li>
                      <a href="#" class="text-[#39569c] hover:text-gray-900 dark:hover:text-white">
                          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" /></svg>
                      </a>
                  </li>
                  <li>
                      <a href="#" class="text-[#00acee] hover:text-gray-900 dark:hover:text-white">
                          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                      </a>
                  </li>
                  <li>
                      <a href="#" class="text-gray-900 hover:text-gray-900 dark:hover:text-white dark:text-gray-300">
                          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" /></svg>
                      </a>
                  </li>
                  <li>
                      <a href="#" class="text-[#ea4c89] hover:text-gray-900 dark:hover:text-white">
                          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clip-rule="evenodd" /></svg>
                      </a> 
                  </li> 
              </ul>
          </div> */}
      </div>  
  </div>
</section>
                  {/**
                   * 
                   * END OF TEAM SECTION
                   */}
                   
                            {/**
                 * START OF PARTNERS SECTION
                 */}
                  
    <div class="md:py-12 py-8 px-4"> 
      <div class="flex flex-col items-center justify-center">
        <h1 class="lg:text-5xl md:text-4xl text-2xl font-bold leading-10  text-orange-800">Our Trusted Partners</h1>
        <p class="text-white leading-normal text-center dark:text-gray-200 mt-4 xl:w-1/2 w-10/12">
          Want to partner with us? kindly send us an email to hello@ajirapay.finance
          </p>
      </div>
      <div class="flex items-center justify-center mt-10">
        <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-6 w-full">
         
          <div class="md:w-48 w-full h-32 flex items-center justify-center">
            <img src={securiAudit1} alt="securi labs"></img>
          </div>
          <div class="md:w-48 w-full h-32 flex items-center justify-center">
            <img src={securiAudit3} alt="securi kyc"></img>
          </div>
          
          <div class="md:w-48 w-full h-32 flex items-center justify-center">
           <img src={coinSniper} alt="coinsniper"></img>
          </div>
          <div class="md:w-48 w-full h-32 flex items-center justify-center">
           <img src={coinCarp} alt="coinCarp"></img>
          </div>
          
          <div class="md:w-48 w-full h-32  flex items-center justify-center">
           <img src={binanceSmartChain} alt="binance"></img>
          </div>
          <div class="md:w-48 w-full h-32 flex items-center justify-center">
            <img src={pancakeswapLogo} alt="microsoft"></img>
          </div>
        </div>
        {/* <div class="md:w-48 w-full h-32 flex items-center justify-center">
           <img src={securiAudit2} alt="securi labs kyc"></img>                
          </div> */}
      </div>
    </div>
  
                 {/**
                  * END OF PARTNERS SECTION
                  */}
                   {/**
                     * START OF FAG SECTION
                     */}
                  <div>
                     <FAQ />
                  </div>

                  {/**
                   * 
                   * END OF FAG SECTION
                   */}
                   {
                    /**
                     * 
                     * START OF CONTACT IS SECTION
                     */
                   }

                   {/* <div>
                     
                <div class="container mx-auto pt-16">
                    <div class="lg:flex">
                        <div class="xl:w-2/5 lg:w-2/5 bg-indigo-700 py-16 xl:rounded-bl rounded-tl rounded-tr xl:rounded-tr-none">
                            <div class="xl:w-5/6 xl:px-0 px-8 mx-auto">
                                <h1 class="xl:text-4xl text-3xl pb-4 text-white font-bold">Get in touch</h1>
                                <p class="text-xl text-white pb-8 leading-relaxed font-normal lg:pr-4">Got a question about us? Are you interested in partnering with us? Have some suggestions or just want to say Hi? Just contact us. We are here to asset you.</p>
                                <div class="flex pb-4 items-center">
                                    <div aria-label="phone icon" role="img">
                                        <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/contact_indigo-svg1.svg" alt="phone"/>
                                        
                                    </div>
                                    <p class="pl-4 text-white text-base">+1 (308) 321 321</p>
                                </div>
                                <div class="flex items-center">
                                    <div aria-label="email icon" role="img">
                                        <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/contact_indigo-svg2.svg" alt="email"/>
                                       
                                    </div>
                                    <p class="pl-4 text-white text-base">Info@alphas.com</p>
                                </div>
                                <p class="text-lg text-white pt-10 tracking-wide">
                                    545, Street 11, Block F
                                    <br />
                                    Dean Boulevard, Ohio
                                </p>
                                <div class=" pt-16" >
                                    <a href="javascript:void(0)" class="text-white font-bold tracking-wide underline focus:outline-none focus:ring-2 focus:ring-white ">View Job Openings</a>
                                </div>
                            </div>
                        </div> */}
                        {/* <div class="xl:w-3/5 lg:w-3/5 bg-gray-200 dark:bg-gray-600 h-full pt-5 pb-5 xl:pr-5 xl:pl-0 rounded-tr rounded-br">
                            <form id="contact" class="bg-white dark:bg-gray-800 py-4 px-8 rounded-tr rounded-br">
                                <h1 class="text-4xl text-gray-800 dark:text-white font-extrabold mb-6">Enter Details</h1>
                                <div class="block xl:flex w-full flex-wrap justify-between mb-6">
                                    <div class="w-2/4 max-w-xs mb-6 xl:mb-0">
                                        <div class="flex flex-col">
                                            <label for="full_name" class="text-gray-800 dark:text-white text-sm font-semibold leading-tight tracking-normal mb-2">Full Name</label>
                                            <input required id="full_name" name="full_name" type="text" class="dark:bg-gray-900 dark:text-white dark:border-gray-700 focus:outline-none focus:border focus:border-indigo-700 font-normal w-64 h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="Full Name" aria-label="enter your full name input" />
                                        </div>
                                    </div>
                                    <div class="w-2/4 max-w-xs xl:flex xl:justify-end">
                                        <div class="flex flex-col">
                                            <label for="email" class="text-gray-800 dark:text-white text-sm font-semibold leading-tight tracking-normal mb-2">Email</label>
                                            <input required id="email" name="email" type="email" class="dark:bg-gray-900 dark:text-white dark:border-gray-700 focus:outline-none focus:border focus:border-indigo-700 font-normal w-64 h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="example@email.com" aria-label="enter your email input" />
                                        </div>
                                    </div>
                                </div>
                                <div class="flex w-full flex-wrap">
                                    <div class="w-2/4 max-w-xs">
                                        <div class="flex flex-col">
                                            <label for="phone" class="text-gray-800 dark:text-white text-sm font-semibold leading-tight tracking-normal mb-2">Phone</label>
                                            <input required id="phone" name="phone" type="tel" class="dark:bg-gray-900 dark:text-white dark:border-gray-700 focus:outline-none focus:border focus:border-indigo-700 font-normal w-64 h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="+92-12-3456789" aria-label="enter your phone number input" />
                                        </div>
                                    </div>
                                </div>
                                <div class="w-full mt-6">
                                    <div class="flex flex-col">
                                        <label class="text-sm font-semibold text-gray-800 dark:text-white mb-2" for="message">Message</label>
                                        <textarea placeholder="" name="message" class="dark:bg-gray-900 dark:text-white dark:border-gray-700 border-gray-300 border mb-4 rounded py-2 text-sm outline-none resize-none px-3 focus:border focus:border-indigo-700" rows="8" id="message" aria-label="enter your message input"></textarea>
                                    </div>
                                    <button type="submit" class="focus:outline-none bg-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-8 py-3 text-sm leading-6 focus:border-4 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700">Submit</button>
                                </div>
                            </form>
                        </div> */}
                    {/* </div>
                </div>
            
                   </div> */}
                   {/**
                    * END OF CONTACT US SECTION
                    */}
                    

      
        

      
    </>
  );
};

export default CoinDescription;
