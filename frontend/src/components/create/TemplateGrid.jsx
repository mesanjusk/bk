import TemplateCard from './TemplateCard.jsx';

export default function TemplateGrid({ templates, onSelect }) {
  return (
    <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {templates.map((template) => (
        <TemplateCard key={template.id} template={template} onClick={() => onSelect(template.id)} />
      ))}
    </div>
  );
}
