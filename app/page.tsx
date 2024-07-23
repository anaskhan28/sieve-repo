
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
    <main className=' bg-[#ffffff] overflow-hidden min-h-scre'>
 
      
      <nav className=''>
        <Navbar/>
     
        
      </nav>

      <section className='-mt-20 md:-mt-0'>
      <Hero />
      </section>
      <section className='bg-white h-full flex  flex-col justify-center items-center'>
      
        <BentoGrids/>
      </section>

      <section className='bg-white mt-[42rem] md:mt-[-12rem] min-h-fit flex justify-center items-center'>
        <Categories/>
      </section>
    
   <section className='bg-white min-h-fit '>
    <Cards/>
   </section>
   <section className='bg-white '>
    <Contrbute/>
   </section>
   <section className='bg-white'>
    <Footer/>
   </section>
   

    </main>
  );
};

export default Home;