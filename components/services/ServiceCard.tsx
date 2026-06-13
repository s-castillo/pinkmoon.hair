type ServiceOption = { label: string; price: string };

type ServiceCardProps = {
  name: string;
  description: string;
  price?: string;
  options?: ServiceOption[];
};

export function ServiceCard({ name, description, price, options }: ServiceCardProps) {
  return (
    <article className="flex items-start justify-between gap-4 border-b border-white/10 py-5 last:border-b-0">
      <div className="flex-1">
        <h3 className="font-display text-xl font-bold text-white">{name}</h3>
        <p className="mt-1 text-[13px] leading-relaxed text-white/40">{description}</p>
        {options && options.length > 0 && (
          <ul className="mt-3 space-y-1.5">
            {options.map((opt) => (
              <li key={opt.label} className="flex items-center justify-between gap-4 text-[13px]">
                <span className="text-white/40">{opt.label}</span>
                <span className="font-display text-lg italic text-brand">{opt.price}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      {price ? (
        <p className="shrink-0 pt-0.5 font-display text-lg italic text-brand">{price}</p>
      ) : null}
    </article>
  );
}
