import React from 'react';
import whiteLogo from '../../resources/logo1.png';
import { BsFacebook } from 'react-icons/bs';
import { IoLogoInstagram } from 'react-icons/io';
import { FaTwitter } from 'react-icons/fa';

const Footer = () => {
    return (
        <div className='lg:px-12 bg-accent lg:py-12 text-secondary '>

            <div className=' flex justify-between items-start '>
                <div>
                    <img className='w-36' src={whiteLogo} alt="" srcset="" />
                    <p className='mt-3 ml-1 text-gray-500'>Copyright @ Red Onion Foods</p>
                </div>
                <div className='flex flex-col'>
                    <span class="footer-title normal-case">Quick Links</span>
                    <a class="link link-hover">About us</a>
                    <a class="link link-hover">Contact</a>
                    <a class="link link-hover">Jobs</a>
                    <a class="link link-hover">Press kit</a>
                </div>
                <div className=''>
                    <span class="footer-title normal-case">Social Links</span>
                    <div className='flex mt-3'>
                        <p className='pr-4 text-xl hover:text-primary transition-all delay-75 cursor-pointer tooltip-bottom tooltip tooltip-primary' data-tip="Facebook"><BsFacebook /></p>
                        <p className='pr-4 text-xl hover:text-primary transition-all delay-75 cursor-pointer tooltip-bottom tooltip tooltip-primary' data-tip="Instagram"><IoLogoInstagram /></p>
                        <p className='pr-4 text-xl hover:text-primary transition-all delay-75 cursor-pointer tooltip-bottom tooltip tooltip-primary' data-tip="Twiter"><FaTwitter /></p>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default Footer;