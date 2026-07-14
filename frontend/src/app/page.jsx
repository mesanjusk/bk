import Hero from '../components/home/Hero.jsx';
import AboutSection from '../components/home/AboutSection.jsx';
import ImpactStats from '../components/home/ImpactStats.jsx';
import FieldsOfWork from '../components/home/FieldsOfWork.jsx';
import StoriesSection from '../components/home/StoriesSection.jsx';
import ScholarsSection from '../components/home/ScholarsSection.jsx';
import ProgramsGrid from '../components/home/ProgramsGrid.jsx';
import CTASection from '../components/home/CTASection.jsx';

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <ImpactStats />
      <FieldsOfWork />
      <StoriesSection />
      <ScholarsSection />
      <ProgramsGrid />
      <CTASection />
    </>
  );
}
