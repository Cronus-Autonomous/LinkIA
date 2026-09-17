import { Stethoscope, CalendarHeart, CreditCard, MessageCircle } from 'lucide-react';

export default function QuickPills({ onAskAi }) {
  const pills = [
    { label: 'Ver Tratamentos', icon: Stethoscope, action: () => onAskAi('Quero ver os tratamentos disponíveis') },
    { label: 'Valores e Condições', icon: CreditCard, action: () => onAskAi('Quero saber valores e condições de pagamento') },
    { label: 'Agendar Consulta', icon: CalendarHeart, action: () => onAskAi('Quero agendar uma consulta') },
  ];

  return (
    <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
      {pills.map((p) => {
        const Icon = p.icon;
        return (
          <button
            key={p.label}
            onClick={p.action}
            className="pill-quick inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium text-graphite"
          >
            <Icon className="w-4 h-4 text-champagne-deep" />
            {p.label}
          </button>
        );
      })}
    </div>
  );
}