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
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Physician',
          name: 'Prof. Dr. İbrahim Etem Pişkin',
          description: "Zonguldak'ta çocuk sağlığı ve hastalıkları uzmanı olarak hizmet veren Prof. Dr. İbrahim Etem Pişkin.",
          medicalSpecialty: 'Pediatrics',
          telephone: '+908508118176',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Acılık Caddesi, Kont İşhanı No:11/6',
            addressLocality: 'Zonguldak',
            postalCode: '67030',
            addressCountry: 'TR'
          },
          openingHoursSpecification: [
            {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
              opens: '09:00',
              closes: '17:00'
            },
            {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: 'Saturday',
              opens: '09:00',
              closes: '13:00'
            }
          ],
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '5.0',
            reviewCount: '519',
            bestRating: '5'
          },
          priceRange: '$$'
        })}</script>
      </Helmet>
      <Navbar />
      <main>
        <Hero />
        <Reviews isMarqueeOnly />
        <Booking />
        <Services />
        <Specialties />
        <About />
        <FAQ />
        <Contact />
        <Reviews />
      </main>
      <Footer />
      <WhatsAppFAB />
      <BackToTop />
    </>
  );
}
