import styles from '@/app/page.module.css'
import JpgToPdfConverter from '@/components/jpgtopdfconverter';
import Cardslider from '@/components/cardslider'


const Home = () => {
  return (
        <section className={styles.abc}>
        {/* Your page content goes here */}
        <h1>Welcome to the Front Page</h1>
        <p>This is your front page content.</p>
        <JpgToPdfConverter className={styles.jpgstl}/>
        <Cardslider/>
        </section>
  );
};

export default Home;