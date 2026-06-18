import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar.jsx';
import Hero from '../components/Hero.jsx';
import About from '../components/About.jsx';
import Services from '../components/Services.jsx';
import Specialties from '../components/Specialties.jsx';
import Booking from '../components/Booking.jsx';
import Reviews from '../components/Reviews.jsx';
import FAQ from '../components/FAQ.jsx';
import Contact from '../components/Contact.jsx';
import Footer from '../components/Footer.jsx';
import WhatsAppFAB from '../components/WhatsAppFAB.jsx';
import BackToTop from '../components/BackToTop.jsx';

export default function Home() {
  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 80);
    }
  }, [location]);

  return (
    <>
      <Helmet>
        <title>Prof. Dr. İbrahim Etem Pişkin | Çocuk Sağlığı ve Hastalıkları Uzmanı</title>
        <meta name="description" content="Zonguldak'ta çocuk sağlığı ve hastalıkları uzmanı. Randevu için hemen arayın." />
      </Helmet>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Specialties />
        <Booking />
        <Reviews />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFAB />
      <BackToTop />
    </>
  );
}
