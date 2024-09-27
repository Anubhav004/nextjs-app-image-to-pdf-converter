'use client';

import React, { useState } from 'react';
import jsPDF from 'jspdf';
import styles from './jpgtopdfconverter.module.css';
import { MdRotateRight } from "react-icons/md";
import { RxPlusCircled } from "react-icons/rx";
import { RiCloseFill } from "react-icons/ri";
import { FaArrowLeftLong } from "react-icons/fa6";
import Image from 'next/image';

const JpgToPdfConverter = () => {
  const [pdfBlob, setPdfBlob] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  const [originalFileName, setOriginalFileName] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [pageOrientation, setPageOrientation] = useState('portrait');
  const [pageSize, setPageSize] = useState('a4');
  const [margin, setMargin] = useState('noMargin');
  const [imageAlignment, setImageAlignment] = useState('center');

  const convertImgToPdf = () => {
    if (imgUrl) {
        const img = new window.Image();
        img.src = imgUrl;

        img.onload = () => {
            const marginSize = margin === 'noMargin' ? 0 : margin === 'smallMargin' ? 10 : 20;

            if (pageOrientation === 'portrait' || pageOrientation === 'landscape') {
                let pdfWidth, pdfHeight;

                if (pageOrientation === 'portrait') {
                    pdfWidth = pageSize === 'fit' ? img.width : pageSize === 'a4' ? 595.28 : 612;
                    pdfHeight = pageSize === 'fit' ? img.height : pageSize === 'a4' ? 841.89 : 792;
                } else if (pageOrientation === 'landscape') {
                    // Check for A4 or US letter size in landscape orientation
                    if (pageSize === 'a4') {
                        pdfWidth = 841.89; // A4 width in landscape (height in portrait)
                        pdfHeight = 595.28; // A4 height in landscape (width in portrait)
                    } else {
                        pdfWidth = 792; // US letter width in landscape (height in portrait)
                        pdfHeight = 612; // US letter height in landscape (width in portrait)
                    }
                }

                const { image: rotatedImage, width: rotatedWidth, height: rotatedHeight } = rotateImage(img, rotationAngle);

                const availableWidth = pdfWidth - 2 * marginSize;
                const availableHeight = pdfHeight - 2 * marginSize;

                const scaleFactor = Math.min(availableWidth / rotatedWidth, availableHeight / rotatedHeight);

                const scaledWidth = rotatedWidth * scaleFactor;
                const scaledHeight = rotatedHeight * scaleFactor;

                let xPosition, yPosition;

                // Check for image alignment
                if (imageAlignment === 'center') {
                    xPosition = (pdfWidth - scaledWidth) / 2; // Centered horizontally
                    yPosition = (pdfHeight - scaledHeight) / 2; // Centered vertically
                } else if (imageAlignment === 'top') {
                    xPosition = (pdfWidth - scaledWidth) / 2; // Centered horizontally
                    yPosition = marginSize; // Aligned to the top with margin
                }

                const pdf = new jsPDF({
                    orientation: pageOrientation,
                    unit: 'pt',
                    format: [pdfWidth, pdfHeight],
                    rotation: rotationAngle,
                });

                pdf.addImage(rotatedImage, 'JPEG', xPosition, yPosition, scaledWidth, scaledHeight);

                const blob = pdf.output('blob');
                setPdfBlob(blob);
                setCurrentStep(3);
            }
        };
    } else {
        alert('Please select an image first.');
    }
  };

  
  const rotateImage = (image, angle) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
  
    // Set canvas dimensions based on the rotated image size
    const rotatedWidth = angle === 90 || angle === 270 ? image.height : image.width;
    const rotatedHeight = angle === 90 || angle === 270 ? image.width : image.height;
  
    canvas.width = rotatedWidth;
    canvas.height = rotatedHeight;
  
    // Rotate the image around its center
    ctx.translate(rotatedWidth / 2, rotatedHeight / 2);
    ctx.rotate((angle * Math.PI) / 180);
    ctx.drawImage(image, -image.width / 2, -image.height / 2, image.width, image.height);
  
    // Create a new Image object with the rotated image data
    const rotatedImage = new window.Image();
    rotatedImage.src = canvas.toDataURL('image/jpeg');
  
    return { image: rotatedImage, width: rotatedWidth, height: rotatedHeight };
  };
  
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setImgUrl(url);
      setOriginalFileName(file.name);
      setPdfBlob(null);
      setCurrentStep(2); // Move to the second step after uploading an image
    } else {
      alert('Please upload a valid image file (JPG, PNG, or JPEG).');
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setImgUrl(url);
      setOriginalFileName(file.name);
      setPdfBlob(null);
      setCurrentStep(2); // Move to the second step after dropping an image
    } else {
      alert('Please drop a valid image file (JPG, PNG, or JPEG ).');
    }
  };

  const handleRotateRight = () => {
    const newRotationAngle = (rotationAngle + 90) % 360;
    setRotationAngle(newRotationAngle);
  };

  const handleOrientationChange = (event) => {
    setPageOrientation(event.target.value);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
  };

  const handleMarginChange = (event) => {
    setMargin(event.target.value);
  };

  const handleConvertButtonClick = () => {
    convertImgToPdf();
  };

  const handleImageAlignmentChange = (e) => {
    setImageAlignment(e.target.value);
  };

  const handleRemoveImage = () => {
    setImgUrl('');
  };

  const handleBackButtonClick = () => {
    setCurrentStep(1);
  };

  const handleAddImage = () => {
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
  
      // Update the original file name state when a new image is added
      setOriginalFileName(file.name);
  
      setImgUrl(imageUrl);
    }
  };
  

  const handleDownloadButtonClick = () => {
    if (pdfBlob) {
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(pdfBlob);

      // Remove the file extension from the original file name and add ".pdf"
      const fileNameWithoutExtension = originalFileName.replace(/\.[^/.]+$/, '');
      downloadLink.download = `${fileNameWithoutExtension}.pdf`;

      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  return (
    <div className={styles.parentContainer}>
      {/* Conditionally render step 1 content only if step 2 is not active */}
      {currentStep === 1 && (
        <div className={styles.JpgToPdfConverter} onDragOver={handleDragOver} onDrop={handleDrop}>
          {/* Step 1 content */}
          <div className={styles.contentTop}>
            Reformat an image (JPG, PNG, or JPEG) to a PDF file in a few seconds.
          </div>
          <label className={styles.FileInputLabel}>
            <span>+ CHOOSE FILES</span>
            <input
              type="file"
              accept=".jpg, .jpeg, .png"
              onChange={handleFileUpload}
              className={styles.FileInput}
            />
          </label>
          <div className={styles.drag}>Drag or Drop here</div>
        </div>
      )}

      {/* Conditionally render enhanced step 2 content only if step 2 is active */}
      {currentStep === 2 && (
        <div className={`${styles.JpgToPdfConverter} ${styles.step2Background}`}>
          {/* Step 2 content */}
          <div className={styles.ConvertOptions}>

            <span>Page:</span>
            <select value={pageOrientation} onChange={handleOrientationChange}>
              <option value="portrait">Portrait</option>
              <option value="landscape">Landscape</option>
            </select>

            <span>Size:</span>
            <select value={pageSize} onChange={handlePageSizeChange}>
              <option value="fit">Fit to Image</option>
              <option value="a4">A4 Size</option>
              <option value="letter">US Letter Size</option>
            </select>

            <span>Margin:</span>
            <select value={margin} onChange={handleMarginChange}>
              <option value="noMargin">No Margin</option>
              <option value="smallMargin">Small Margin</option>
              <option value="bigMargin">Big Margin</option>
            </select>

            <span>Alignment:</span>
            <select value={imageAlignment} onChange={handleImageAlignmentChange}>
              <option value="center">Center</option>
              <option value="top">Top</option>
            </select>
          </div>

            {/* Add icon to add another image */}
            <div className={styles.ImageContainer}>
            <input
              type="file"
              id="fileInput"
              accept=".jpg, .jpeg, .png"
              style={{ display: 'none' }}
              onChange={handleFileInputChange}
            />

          {/* Display uploaded image at a fixed size (e.g., 200px) with margin */}
          {imgUrl && (
              <div className={styles.ImageBox}>
                <MdRotateRight onClick={handleRotateRight} className={`${styles.rotateIcon} rotateIcon`} />
                <RiCloseFill onClick={handleRemoveImage} className={`${styles.removeIcon} removeIcon`} />
                <div
                  className={`${styles.imgbox} ${
                    margin === 'noMargin' ? '' : margin === 'smallMargin' ? styles.smallMargin : styles.bigMargin
                  }`}
                >
                  <Image
                    src={imgUrl}
                    alt="Uploaded"
                    style={{ width: '100%', height: '100%', transform: `rotate(${rotationAngle}deg)` }}
                    width={200} height={200}
                  />
                </div>
              </div>
          )}
          <div className={styles.ImageBox}>
            <RxPlusCircled onClick={handleAddImage} className={styles.icon}/>
          </div>
          <div className={styles.ImageBox}>
            {/* Third column (empty) */}
          </div>
          </div>
          <div className={styles.BottomButtonContainer}>
            <button onClick={handleConvertButtonClick} className={styles.ConvertButton}>
              Convert to PDF
            </button>
          </div>
        </div>
      )}

      {/* Conditionally render step 3 content only if step 3 is active */}
      {currentStep === 3 && (
        <div className={styles.JpgToPdfConverter}>
          {/* Step 3 content */}
          <p className={styles.SuccessMessage}>PDF Converted Successfully!</p>
          <FaArrowLeftLong onClick={handleBackButtonClick} className={styles.backbutton} />
          <button onClick={handleDownloadButtonClick} className={styles.DownloadLink}>
            Download PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default JpgToPdfConverter;