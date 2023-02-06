import React from "react";

import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaTwitter,
  FaTwitch,
  FaRegPaperPlane,
  FaLinkedin
} from "react-icons/fa";

const Footer = () => {
  return (
    <div className="w-full mt-24 bg-slate-900 text-gray-300 py-y px-2 shadow-lg ">
      <div className="max-w-[1240px] mx-auto grid grid-cols-2 md:grid-cols-3 border-b-2 border-gray-600 py-8">
        <div>
          <h6 className="font-bold uppercase pt-2 text-center">Quick Links</h6>
          <ul className="text-center">
            <li className="py-1"><a href="https://pitch.com/public/f266f4df-b857-4c82-a6a9-02051f75f35a">Whitepaper</a></li>
            <li className="py-1"><a href="https://ajirapay.finance/">Website</a></li>
            <li className="py-1"><a href="https://medium.com/@ajira_pay_finance">Blog</a></li>
            <li className="py-1"><a href="https://angel.co/company/ajira-pay/jobs">Careers</a></li>
            <li className="py-1"><a href="https://linktr.ee/ajira_pay_finance">General</a></li>
            <li className="py-1">
              <a href="https://bscscan.com/token/0xC55b03dC07EC7Bb8B891100E927E982540f0d181" target="_blank" rel="noreferrer">
                View AJP Contract on Block Explorer
              </a>
            </li>
            <li className="py-1">
              <a href="https://bscscan.com/address/0x4A7c5A4EfB90D3CBD1C3c25b775b822EBA600081" target="_blank" rel="noreferrer">
                View Presale Contract on Block Explorer
              </a>
            </li>
            <li className="py-1">Platform Docs</li>
          </ul>
        </div>
        <div>
          <h6 className="font-bold uppercase pt-2 text-center">We'd love to see you in our community</h6>
          <ul className="text-center">
            <li className="py-1"><a href="https://t.me/ajiraPayOfficialChat" target="_blank" rel="noreferrer">Telegram Chat</a></li>
            <li className="py-1"><a href="https://t.me/ajiraPayOfficialAnnouncements" target="_blank" rel="noreferrer">Telegram Announcements Channel</a></li>
            <li className="py-1"><a href="https://discord.com/invite/Ts7CEYp8ss" target="_blank" rel="noreferrer">Discord</a></li>
            <li className="py-1"><a href="https://twitter.com/ajiraPayDefi" target="_blank" rel="noreferrer">Twitter</a></li>
          </ul>
        </div>
        <div>
          <h6 className="font-bold uppercase pt-2 text-center">Contact us</h6>
          <ul className="text-center">
            <li className="py-1">hello@ajirapay.finance</li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col max-w-[1240px] px-2 py-4 mx-auto justify-between sm:flex-row text-center text-gray-500">
        <p className="py-4">
          &copy; {new Date().getFullYear()} All rights reserved
        </p>
        <div className="flex justify-between sm:w-[300px] pt-4 text-2xl">
          <a href="https://www.facebook.com/ajirapay/">
            <FaFacebook />
          </a>
          <a href="https://twitter.com/ajiraPayDefi">
            <FaTwitter />
          </a>
          <a href="https://github.com/Tujiajiri-Africa">
            <FaGithub />
          </a>
          <a href="https://t.me/ajiraPayOfficialChat">
            <FaRegPaperPlane />
          </a>
          <a href="https://www.linkedin.com/company/ajirapay">
            <FaLinkedin />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
