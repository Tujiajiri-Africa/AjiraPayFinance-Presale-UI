import React, { useState, useContext } from "react";
import { PresaleContext }  from '../../context/PresaleContext';
import { Link } from "react-router-dom";

import { MenuIcon, XIcon } from "@heroicons/react/outline";

const Navbar = () => {
  const { isConnected, connectWallet, disconnectWallet } = useContext(PresaleContext);

  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);

  const handleClose = () => setNav(!nav);

  return (
    <div className="w-screen h-[80px] z-10 bg-slate-900 text-gray-300 fixed top-0 shadow-lg">
      <div className="px-2 flex justify-between items-center w-full h-full">
        <div className="flex items-center">
          <h1 className="text-3xl font-bold mr-4 sm:text-4xl"><span className="text-orange-600">AJIRA</span> <span className="text-yellow-600">PAY</span></h1>
          <ul className="hidden md:flex cursor-pointer">
            <li>
              <Link to="/" smooth={true} duration={500}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/" smooth={true} offset={-200} duration={500}>
                Buy AJP Token
              </Link>
            </li>
            <li>
              <Link to="/tokenomics" smooth={true} offset={-200} duration={500}>
                Tokenomics
              </Link>
            </li>
            <li>
              <Link to="/" smooth={true} offset={-200} duration={500}>
                Airdrop
              </Link>
            </li>
            <li>
              <Link to="/" smooth={true} offset={-200} duration={500}>
                Staking
              </Link>
            </li>
          </ul>
        </div>
        <div className="hidden md:flex pr-4">
          { !isConnected ?
          <button className="border bg-transparent px-2 py-2 text-white mr-4" onClick={connectWallet}>
            Connect Wallet
          </button>
          :
          <button className="border bg-transparent px-2 py-2 text-white mr-4" onClick={disconnectWallet}>
            Disonnect Wallet
          </button>
        }
        </div>
        <div className="md:hidden mr-4" onClick={handleClick}>
          {!nav ? <MenuIcon className="w-5" /> : <XIcon className="w-5" />}
        </div>
      </div>

      <ul className={!nav ? "hidden" : "absolute bg-slate-900 w-full px-8"}>
        <li className="w-full text-black cursor-pointer">
          <Link onClick={handleClose} to="/" smooth={true} duration={500}>
            Home
          </Link>
        </li>
        <li className="w-full text-white">
          <Link
            onClick={handleClose}
            to="/"
            smooth={true}
            offset={-200}
            duration={500}
          >
            Buy AJP Token
          </Link>
        </li>
        <li className="w-full ttext-white">
          <Link
            onClick={handleClose}
            to="/tokenomics"
            smooth={true}
            offset={-200}
            duration={500}
          >
            Tokenomics
          </Link>
        </li>
        <li className="w-full text-white">
          <Link
            onClick={handleClose}
            to="/"
            smooth={true}
            offset={-200}
            duration={500}
          >
            Airdrop
          </Link>
        </li>
        <li className="w-full text-white">
          <Link
            onClick={handleClose}
            to="/"
            smooth={true}
            offset={-200}
            duration={500}
          >
            Staking
          </Link>
        </li>
        <div className="flex flex-col my-4">
        { !isConnected ?
          <button className="border bg-transparent px-2 py-2 text-white mr-4" onClick={connectWallet}>
            Connect Wallet
          </button>
          :
          <button className="border bg-transparent px-2 py-2 text-white mr-4" onClick={disconnectWallet}>
            Disonnect Wallet
          </button>
        }
        </div>
      </ul>
    </div>
  );
};

export default Navbar;
