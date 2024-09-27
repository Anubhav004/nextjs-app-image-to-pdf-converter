import Image from 'next/image';
import styles from './footer.module.css';
import { FaFacebookSquare } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footercontainer}>
      <div className={styles.footersection}>
      <h3 className={styles.footerheading}>LOGO</h3>
        <div className={styles.logosection}>
          <Image src="/path/to/your/logo.png" alt="Logo" />
          <p>Logo Description</p>
        </div>
        <div className={styles.socialicons}>
          {/* Add your social icons here */}
          <a href="https://example.com/facebook" target="_blank" rel="noopener noreferrer">
          <FaFacebookSquare />
          </a>
          {/* Add more social icons as needed */}
        </div>
        
      </div>

      <div className={styles.footersection}>
        <h3 className={styles.footerheading}>COMPANY</h3>
        <ul className={styles.footerlist}>
          <li>About</li>
          <li>Help</li>
          <li>Blog</li>
        </ul>
      </div>

      <div className={styles.footersection}>
        <h3 className={styles.footerheading}>PRODUCT</h3>
        <ul className={styles.footerlist}>
          <li>Pricing</li>
          <li>Teams</li>
          <li>Embed PDF</li>
          <li>Developers</li>
        </ul>
      </div>

      <div className={styles.footersection}>
      <h3 className={styles.footerheading}>SOLUTIONS</h3>
        <ul className={styles.footerlist}>
          <li>Business</li>
          <li>Education</li>
        </ul>
      </div>
      </div>

      <div className={styles.bottomsection}>
        <div className={styles.left}>
          <p>&copy; 2024 PDFO</p>
        </div>
        <div className={styles.right}>
          <p><a href="/terms&conditions">Terms & Conditions</a> | <a href="/policy">Policy</a></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
