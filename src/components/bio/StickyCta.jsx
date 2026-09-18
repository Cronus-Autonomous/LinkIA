import { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import WhatsAppIcon from '@/components/bio/WhatsAppIcon';

export default function StickyCta({ onAskAi }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll(); // garante estado correto ao montar
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Base + regras exclusivas de desktop/tablet
  const aiBase =
    'gold-button rounded-full font-semibold font-body inline-flex items-center justify-center gap-2 transition-all duration-300 ease-out sm:hidden';

  // Layout Mobile (expandido ao rolar vs. ícone circular)
  const aiLayout = scrolled
    ? 'flex-1 py-4 px-4 text-sm'
    : 'w-14 h-14 p-0 text-sm';

  return (
    <div
      className={`fixed md:static bottom-0 inset-x-0 z-30 px-4 pb-4 pt-2 md:p-0 pointer-events-none md:pointer-events-auto ${
        scrolled ? 'bg-gradient-to-t from-nude-50 via-nude-50/90 to-transparent md:bg-none' : ''
      }`}
    >
      <div className="max-w-3xl mx-auto flex items-center justify-end gap-3 pointer-events-auto">
        <button
          onClick={onAskAi}
          aria-label="Falar com a Assistente IA"
          className={`${aiBase} ${aiLayout}`}
        >
          <Sparkles className="w-5 h-5 text-graphite shrink-0" />
          <span className={`${scrolled ? 'inline' : 'hidden sm:inline'} whitespace-nowrap`}>
            Falar com a IAra
          </span>
        </button>

        <a
          href="https://wa.me/5543996084644?text=Testei%20o%20LinkIA%20e%20quero%20queimar%20meu%20CUPOM%2020%25"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Agendar via WhatsApp"
          className="pill-quick w-14 h-14 sm:hidden shrink-0 rounded-full flex items-center justify-center gap-2 text-graphite font-semibold"
        >
          <WhatsAppIcon className="w-5 h-5 text-[#25D366]" />
          <span className="hidden sm:inline text-sm">WhatsApp</span>
        </a>
      </div>
    </div>
  );
}