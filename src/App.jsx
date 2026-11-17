import { LazyMotion, MotionConfig, domAnimation } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import Countdown from './components/Countdown';
import WeddingDetails from './components/WeddingDetails';
import AttireAndSouvenir from './components/AttireAndSouvenir';
import Gallery from './components/Gallery';
import RSVP from './components/RSVP';
import Footer from './components/Footer';
import { ScrollProgressLine } from './components/MotionPrimitives';
import ChapterRail from './components/ChapterRail';

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation}>
        <div className="min-h-screen bg-brand-cream text-brand-ink font-sans">
          <Header />
          <ScrollProgressLine />
          <ChapterRail />
          <main>
            <Hero />
            <Countdown />
            <WeddingDetails />
            <AttireAndSouvenir />
            <Gallery />
            <RSVP />
          </main>
          <Footer />
        </div>
      </LazyMotion>
    </MotionConfig>
  );
}
