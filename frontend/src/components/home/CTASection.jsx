import Chapter from '../ui/Chapter.jsx';
import Reveal from '../ui/Reveal.jsx';
import Button from '../ui/Button.jsx';
import { contactInfo } from '../../data/siteContent.js';

export default function CTASection() {
  return (
    <Chapter
      id="contact"
      number="08"
      label="Contact"
      title="Join us in making a difference."
      description="Whether through volunteering, mentorship, or a donation — your support carries a scholar further."
      align="center"
    >
      <Reveal className="mx-auto flex max-w-md flex-col items-center gap-8">
        <div className="flex flex-wrap justify-center gap-4">
          <Button to="/contact">Support the Initiative</Button>
          <Button to="/contact" variant="secondary">
            Join Us
          </Button>
        </div>

        <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-muted">
          <span>{contactInfo.email}</span>
          <span>{contactInfo.phone}</span>
          <span>{contactInfo.address}</span>
        </div>
      </Reveal>
    </Chapter>
  );
}
