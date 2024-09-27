'use client';
import React, { useState } from 'react';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import styles from '../../components/jpgtopdfconverter.module.css';
import { FaArrowLeftLong } from "react-icons/fa6";

GlobalWorkerOptions.workerSrc = `//mozilla.github.io/pdf.js/build/pdf.worker.min.js`;

const PdfToJpgConverter = () => {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [jpgBlob, setJpgBlob] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      const url = URL.createObjectURL(file);
      setPdfUrl(url);
      setCurrentStep(2);
    } else {
      alert('Please upload a valid PDF file.');
    }
  };

  const handleBackButtonClick = () => {
    setPdfUrl(null);
    setCurrentStep(1);
  };

  const convertPdfToJpg = async () => {
    const pdfDoc = await getDocument(pdfUrl).promise;
    const page = await pdfDoc.getPage(1); // Render first page only for simplicity
    const viewport = page.getViewport({ scale: 1.0 });
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    const renderContext = {
      canvasContext: context,
      viewport: viewport
    };
    await page.render(renderContext).promise;

    // Convert canvas content to a blob representing the JPG image
    canvas.toBlob((blob) => {
      setJpgBlob(blob);
      setCurrentStep(3);
    }, 'image/jpeg');
  };

  const handleDownloadButtonClick = () => {
    if (jpgBlob) {
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(jpgBlob);
      downloadLink.download = 'converted_image.jpg';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  return (
    <div className={styles.parentContainer}>
      {currentStep === 1 && (
        <div className={styles.PdfToJpgConverter}>
          <div className={styles.contentTop}>
            Convert a PDF file to JPG format.
          </div>
          <label className={styles.FileInputLabel}>
            <span>+ CHOOSE FILE</span>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileUpload}
              className={styles.FileInput}
            />
          </label>
        </div>
      )}
      {currentStep === 2 && (
        <div className={styles.PdfToJpgConverter}>
          <div className={styles.ConvertOptions}>
            {/* Render PDF content here */}
          </div>
          <div className={styles.BottomButtonContainer}>
            <button onClick={convertPdfToJpg} className={styles.ConvertButton}>
              Convert to JPG
            </button>
          </div>
        </div>
      )}
      {currentStep === 3 && (
        <div className={styles.PdfToJpgConverter}>
          <p className={styles.SuccessMessage}>PDF Converted to JPG Successfully!</p>
          <FaArrowLeftLong onClick={handleBackButtonClick} className={styles.backbutton} />
          <button onClick={handleDownloadButtonClick} className={styles.DownloadLink}>
            Download JPG
          </button>
        </div>
      )}
    </div>
  );
};

export default PdfToJpgConverter;