import styles from './Home.module.css';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <>
            <section className={styles['hero-section']}></section>

                <section className={styles['hero-title']}>
                    <h1 className={styles.heroh1}>
                        The place where
                        <span className={styles['yellow-accent']}>
                            travelers
                        </span>
                        meet.
                    </h1>
                </section>
                <article className={styles['description-section']}>
                    <p>
                        Travelers is blog where like-minded people share
                        experience about places, countries and cultures. <Link to={'/login'}>Join</Link> now our community or <Link to={'/post'}> share</Link> with us your last
                        adventure if you are already part of it.
                    </p>
                </article>

        </>
    );
};

export default Home;
