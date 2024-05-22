
import Head from 'next/head';
import Hero from '../components/Hero';
import { BentoGrids } from '@/components/Grid';


const Home = () => {
  return (
    <div>
      <Head>
        <title>Sieve</title>
        <meta name="description" content="Curate, Rate, and Master Your Tech Playlist" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main>
        <Hero />
      </main>
      <section className='min-h-screen flex flex-col justify-center items-center'>
      
        <BentoGrids/>
      </section>
    </div>
  );
};

export default Home;