// components/SignupSection.js
import { FiMail, FiLock, FiUser } from 'react-icons/fi';
import styles from '@/components/signup.module.css';

const SignupSection = () => {
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Add logic for handling signup submission
    console.log('Signup submitted!');
  };

  return (
    <div className={styles.signupsection}>
      <h2 className={styles.signupheading}>Signup</h2>
      <form className={styles.signupform} onSubmit={handleSignupSubmit}>
        <div className={styles.formField}>
          <label className={styles.formlabel}>
            <FiUser className={styles.icon} />
            <input className={styles.forminput} type="text" placeholder="Name" required />
          </label>
        </div>
        <div className={styles.formField}>
          <label className={styles.formlabel}>
            <FiMail className={styles.icon} />
            <input className={styles.forminput} type="email" placeholder="Email" required />
          </label>
        </div>
        <div className={styles.formField}>
          <label className={styles.formlabel}>
            <FiLock className={styles.icon} />
            <input className={styles.forminput} type="password" placeholder="Password" required />
          </label>
        </div>
        <div className={styles.formField}>
          <label className={styles.formlabel}>
            <FiLock className={styles.icon} />
            <input className={styles.forminput} type="password" placeholder="Confirm Password" required />
          </label>
        </div>
        <button className={styles.formbutton} type="submit">
          Signup
        </button>
      </form>

    </div>
  );
};

export default SignupSection;
