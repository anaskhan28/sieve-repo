
import Head from 'next/head';
import Hero from '../components/Hero';
import { BentoGrids } from '@/components/Grid';
import Categories from '@/components/Categories';
import { Cards } from '@/components/Card';
import {Contrbute} from '@/components/Contribute'
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

const Home = () => {
  return (
    <div>
      <Head>
        <title>Sieve</title>
        <meta name="description" content="Curate, Rate, and Master Your Tech Playlist" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main>
        <Navbar/>

        <Hero />
      </main>
      <section className=' max-h-[100%] flex  flex-col justify-center items-center'>
      
        <BentoGrids/>
      </section>

      <section className=' mt-[11rem] sm:mt-[-12rem] min-h-fit flex justify-center items-center'>
        <Categories/>
      </section>
    
   <section className='min-h-fit '>
    <Cards/>
   </section>
   <section className='sm:mt-12'>
    <Contrbute/>
   </section>
   <section className=''>
    <Footer/>
   </section>
   

    </div>
  );
};

export default Home;