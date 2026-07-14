import Section from '../../components/ui/Section.jsx';
import CensusFeedbackModal from '../../components/census/CensusFeedbackModal.jsx';

export default function Census() {
  return (
    <>
      <CensusFeedbackModal />
      <Section maxWidth="max-w-3xl">
        <p className="text-center text-xs font-medium uppercase tracking-[0.35em] text-gold-600">
          Community Census
        </p>
        <h1 className="mt-3 text-center text-4xl font-semibold text-sage-900">Census</h1>
        <p className="mx-auto mt-4 max-w-xl text-center text-sage-600">
          We're building a fuller picture of the communities we serve. This section will hold that
          record as it takes shape.
        </p>
      </Section>
    </>
  );
}
