// components/ResponsiveSlider.js
'use client'

import { useState, useEffect } from 'react';
import styles from './cardslider.module.css';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';

const contentData = [
    { id: 1, text: 'Content 1', link: 'pdftoimg' },
  { id: 2, text: 'Content 2', link: '#2' },
  { id: 3, text: 'Content 3', link: '#3' },
  { id: 4, text: 'Content 4', link: '#4' },
  { id: 5, text: 'Content 5', link: '#5' },
  { id: 6, text: 'Content 6', link: '#6' },
];

// ... (other imports)

const ResponsiveSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0); // Declare maxIndex state
  const [slideWidth, setSlideWidth] = useState(27);

  useEffect(() => {
    const updateSlideWidth = () => {
      const screenWidth = window.innerWidth;
      let newSlideWidth;

      if (screenWidth <= 480) {
        newSlideWidth = 50;
      } else if (screenWidth <= 768) {
        newSlideWidth = 33.33;
      } else {
        newSlideWidth = 20;
      }

      setSlideWidth(newSlideWidth);

      // Recalculate maxIndex based on new slideWidth
      const slidesPerPage = Math.floor(100 / newSlideWidth);
      setMaxIndex(contentData.length - slidesPerPage);
    };

    updateSlideWidth();
    window.addEventListener('resize', updateSlideWidth);

    return () => {
      window.removeEventListener('resize', updateSlideWidth);
    };
  }, [contentData]); // Add contentData as a dependency

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? 0 : prevIndex - 1));
  };

  const goToNextSlide = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const getTransformValue = () => {
    const adjustedIndex = Math.min(currentIndex, maxIndex);
    return `translateX(-${adjustedIndex * slideWidth}%)`;
  };

  return (
    <div className={styles.slider}>
      <FaAngleLeft
        className={`${styles.arrow} ${currentIndex === 0 ? styles.disabled : ''}`}
        onClick={goToPrevSlide}
      />
      <div className={styles.slides} style={{ transform: getTransformValue() }}>
        {contentData.map((content, index) => (
          <div key={index} className={styles.slide} style={{ flex: `0 0 calc(${slideWidth}% - 10px)` }}>
            <a className={styles.stylcontent} href={content.link} target="" rel=""> 
            {/*target="_blank" rel="noopener noreferrer"*/}
              <div className={styles.box}>
                <p>{content.text}</p>
              </div>
            </a>
          </div>
        ))}
      </div>
      <FaAngleRight
        className={`${styles.arrow} ${currentIndex === maxIndex ? styles.disabled : ''}`}
        onClick={goToNextSlide}
      />
    </div>
  );
};

export default ResponsiveSlider;