
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
    <main className=' overflow-hidden'>
      <Head>
        <title>Sieve</title>
        <meta name="description" content="Curate, Rate, and Master Your Tech Playlist" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <nav className=''>
        <Navbar/>
     
        
      </nav>

      <section className='-mt-20 md:-mt-0'>
      <Hero />
      </section>
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
   

    </main>
  );
};

export default Home;