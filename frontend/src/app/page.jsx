import Hero from '../components/home/Hero.jsx';
import AboutSection from '../components/home/AboutSection.jsx';
import MissionSection from '../components/home/MissionSection.jsx';
import ProgramsGrid from '../components/home/ProgramsGrid.jsx';
import FieldsOfWork from '../components/home/FieldsOfWork.jsx';
import ImpactStats from '../components/home/ImpactStats.jsx';
import StoriesSection from '../components/home/StoriesSection.jsx';
import CTASection from '../components/home/CTASection.jsx';

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <MissionSection />
      <ProgramsGrid />
      <FieldsOfWork />
      <ImpactStats />
      <StoriesSection />
      <CTASection />
    </>
  );
}
