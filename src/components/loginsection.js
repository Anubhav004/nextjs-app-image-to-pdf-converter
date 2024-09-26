// components/LoginSection.js
import style from '@/components/login.module.css'
import { FiMail, FiLock } from 'react-icons/fi'; 

const LoginSection = () => {
    const handleLoginSubmit = (e) => {
      e.preventDefault();
      // Add logic for handling login submission
      console.log('Login submitted!');
    };
  
    return (
      <div className={style.loginsection}>
        <h2 className={style.loginheading}>Login</h2>
        <form className={style.loginform} onSubmit={handleLoginSubmit}>
          <div className={style.formField}>
            <label className={style.formlabel}>
              <input className={style.forminput} type="email" placeholder='Enter your email' required />
              <FiMail className={style.icon} />
            </label>
          </div>
          <div className={style.formField}>
            <label className={style.formlabel}>
              <input className={style.forminput} type="password" placeholder='Password' required />
              <FiLock className={style.icon} />
            </label>
          </div>
          <button className={style.formbutton} type="submit">
            Login
          </button>
        </form>
        {/* Forgot Password link */}
        <div className={style.forgotPassword}>
                <a href="/f-p">Forgot Your Password?</a>
        </div>
      </div>
    );
  };
  
  export default LoginSection;
  
