import Navbar from '../components/Navbar/Navbar';
import PortfolioHero from '../components/PortfolioHero/PortfolioHero';
import PortfolioGrid from '../components/PortfolioGrid/PortfolioGrid';
import PortfolioCTA from '../components/PortfolioCTA/PortfolioCTA';
import Footer from '../components/Footer/Footer';
import FloatingContact from '../components/FloatingContact/FloatingContact';

function Portfolio() {
  return (
    <>
      <Navbar />
      <main>
        <PortfolioHero />
        <PortfolioGrid />
        <PortfolioCTA />
      </main>
      <Footer />
      <FloatingContact />
    </>
  );
}

export default Portfolio;
