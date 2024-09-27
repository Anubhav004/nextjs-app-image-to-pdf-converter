// pages/auth.js
'use client'

import React, { useState } from 'react';
import LoginSection from '../../components/loginsection';
import SignupSection from '../../components/signupsection';
import styles from './auth.module.css';
import Image from 'next/image';

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState('login');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className={styles.authPage}>
      <div className={styles.leftContainer}>
      <div className={styles.Content}>
        {/* Left Content */}
        <Image className={styles.logo} src="/path/to/your/logo.png" alt="Logo" />

        <p className={styles.description}>
          Your description goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>

        <div className={styles.socialIcons}>
          <a href="https://example.com/facebook" target="_blank" rel="noopener noreferrer">
            <img src="/path/to/facebook-icon.png" alt="Facebook" />
          </a>
          {/* Add more social icons as needed */}
        </div>
        </div>
      </div>

      <div className={styles.rightContainer}>
      <div className={styles.Contentx}>
        {/* Right Content */}
        <div className={styles.tabButtons}>
          <button
            className={activeTab === 'login' ? styles.activeTab : ''}
            onClick={() => handleTabChange('login')}
          >
            Login
          </button>
          <button
            className={activeTab === 'signup' ? styles.activeTab : ''}
            onClick={() => handleTabChange('signup')}
          >
            Signup
          </button>
        </div>

        {activeTab === 'login' && <LoginSection />}
        {activeTab === 'signup' && <SignupSection />}
      </div>
      </div>
    </div>
  );
};

export default AuthPage;
