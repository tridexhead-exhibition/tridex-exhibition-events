import Navbar from '../components/Navbar/Navbar';
import Hero from '../components/Hero/Hero';
import About from '../components/About/About';
import Stats from '../components/Stats/Stats';
import Reviews from '../components/Reviews/Reviews';
import Process from '../components/Process/Process';
import FeaturedProjects from '../components/FeaturedProjects/FeaturedProjects';
import Footer from '../components/Footer/Footer';
import FloatingContact from '../components/FloatingContact/FloatingContact';

function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Stats />
        <Reviews />
        <Process />
        <FeaturedProjects />
      </main>
      <Footer />
      <FloatingContact />
    </>
  );
}

export default Home;
