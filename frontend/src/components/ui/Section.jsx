import Container from './Container.jsx';

export default function Section({ id, className = '', containerClassName = '', children }) {
  return (
    <section id={id} className={`py-20 ${className}`}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
