import { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

function WhatsAppIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function StickyCta({ onAskAi }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll(); // garante estado correto ao montar (ex: reload no meio da página)
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Base + regras exclusivas de desktop (sempre expandido a partir de sm)
  const aiBase =
    'gold-button rounded-full font-semibold font-body inline-flex items-center justify-center gap-2 transition-all duration-300 ease-out sm:flex-1 sm:w-auto sm:h-auto sm:px-6 sm:py-4 sm:text-base';

  // Mobile expandido (após rolar) vs. colapsado (círculo flutuante)
  const aiLayout = scrolled
    ? 'flex-1 py-4 px-4 text-sm'
    : 'w-14 h-14 p-0 text-sm';

  return (
    <div className="fixed bottom-0 inset-x-0 z-30 px-4 pb-4 pt-2 bg-gradient-to-t from-nude-50 via-nude-50/90 to-transparent pointer-events-none">
      <div className="max-w-3xl mx-auto flex items-center justify-end gap-3 pointer-events-auto">
        <button
          onClick={onAskAi}
          aria-label="Falar com a Assistente IA"
          className={`${aiBase} ${aiLayout}`}
        >
          <Sparkles className="w-5 h-5 text-graphite shrink-0" />
          <span className={`${scrolled ? 'inline' : 'hidden sm:inline'} whitespace-nowrap`}>
            Falar com a Assistente IA
          </span>
        </button>

        <a
          href="https://wa.me/5543996084644?text=Ol%C3%A1!%20Vim%20pela%20bio%20e%20gostaria%20de%20agendar%20uma%20avalia%C3%A7%C3%A3o."
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Agendar via WhatsApp"
          className="pill-quick w-14 h-14 sm:w-auto sm:px-6 shrink-0 rounded-full flex items-center justify-center gap-2 text-graphite font-semibold"
        >
          <WhatsAppIcon className="w-5 h-5 text-[#25D366]" />
          <span className="hidden sm:inline text-sm">WhatsApp</span>
        </a>
      </div>
    </div>
  );
}