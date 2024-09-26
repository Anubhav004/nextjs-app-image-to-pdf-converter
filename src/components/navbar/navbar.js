"use client";

import { useState } from "react";
import styles from "./navbar.module.css";
import favicon from "../../app/favicon.ico";
import Link from 'next/link';
import Image from "next/image";
import { TbAdjustmentsHorizontal } from "react-icons/tb";
import { FiMenu } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import { FaChevronDown } from "react-icons/fa";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isToolListOpen, setIsToolListOpen] = useState(false);


  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={styles.navbar}>
      <div className={styles.navbarleft}>
        <Link href="/">
          <Image src={favicon} alt="Logo" className={styles.logo} />
          <span className={styles.logoname}>PDF CONVERTER</span>
        </Link>
      </div>
      <div className={styles.navbarcenter}>
        <div className={styles.dropdown}>
          <button className={styles.dropdowntoggle} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            <TbAdjustmentsHorizontal className={styles.icontoolist} />Toollist
          </button>
          {isDropdownOpen && (
            <div className={styles.dropdowncontent}>
              <Link href="/list1">List 1</Link>
              <Link href="/list2">List 2</Link>
              <Link href="/list3">List 3</Link>
            </div>
          )}
        </div>
      </div>
      <div className={styles.navbarright}>
        <Link href="/auth">Login</Link>
      </div>
      <div className={styles.mobilebar}>
        {isMobileMenuOpen ? (
          <AiOutlineClose onClick={toggleMobileMenu} />
        ) : (
          <FiMenu onClick={toggleMobileMenu} />
        )}
      </div>
      {isMobileMenuOpen && (
        <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
        {/* Your existing mobile menu content */}
              <Link href="/tool1">Tool 1</Link>
              <Link href="/tool2">Tool 2</Link>
              <Link href="/tool3">Tool 3</Link>
        {/* Tool List dropdown */}
        <div className={styles.toolListDropdown}>
            <button className={styles.toolListButton} onClick={() => setIsToolListOpen(!isToolListOpen)}>
              Tool List{' '} <FaChevronDown className={`${styles.dropDown} ${isToolListOpen ? styles.rotated : ''}`}/>
            </button>
            {isToolListOpen && (
              <div className={styles.toolListContent}>
                <Link href="/tool5">list1</Link>
                <Link href="/tool6">list2</Link>
              </div>
            )}
          </div>

          {/* Include Sign Up and Login links in the mobile menu */}
        <div className={styles.navbarrightMobile}>
          <Link href="/auth">Login</Link>
        </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
