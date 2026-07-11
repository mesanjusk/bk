import Section from '../ui/Section.jsx';
import Button from '../ui/Button.jsx';

export default function CTASection() {
  return (
    <Section className="bg-sand">
      <div className="rounded-xl2 bg-white p-12 text-center shadow-soft">
        <h2 className="text-3xl font-semibold text-sage-900">Join Us in Making a Difference</h2>
        <p className="mx-auto mt-4 max-w-xl text-sage-600">
          Whether through volunteering, mentorship, or a donation, your support helps a scholar
          continue their journey.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button to="/contact">Support the Initiative</Button>
          <Button to="/contact" variant="secondary">Join Us</Button>
        </div>
      </div>
    </Section>
  );
}
