import Container from './Container.jsx';

export default function Section({ id, className = '', containerClassName = '', maxWidth, children }) {
  return (
    <section id={id} className={`py-20 ${className}`}>
      <Container className={containerClassName} maxWidth={maxWidth}>
        {children}
      </Container>
    </section>
  );
}
