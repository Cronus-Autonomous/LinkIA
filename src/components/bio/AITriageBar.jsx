import React, { useState, useRef } from 'react';
import { Sparkles, ArrowRight, MessageSquare, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';

// Queixas de Estética Frequentes para atração de demanda inicial
const SUGGESTED_COMPLAINTS = [
  "Tenho manchas no rosto e melasma",
  "Quero diminuir a papada sem cirurgia",
  "Sinto que meu rosto perdeu volume e firmeza",
  "Gostaria de amenizar rugas e linhas na testa",
  "Tenho olheiras profundas ou olhar cansado",
  "Sobrancelhas ralas ou com falhas"
];

export default function AITriageBar({ onSelectComplaint }) {
  const [customInput, setCustomInput] = useState('');
  const scrollRef = useRef(null);

  // Garante que o texto enviado seja sempre uma string pura
  const handleSend = (text) => {
    const cleanText = typeof text === 'string' ? text.trim() : '';
    if (cleanText && onSelectComplaint) {
      onSelectComplaint(cleanText);
    }
  };

  // Envio manual de dúvida digitada
  const handleSubmit = (e) => {
    e.preventDefault();
    if (customInput.trim()) {
      handleSend(customInput);
      setCustomInput('');
    }
  };

  // Clique em uma das sugestões rápidas
  const handleOptionClick = (complaint) => {
    if (onSelectComplaint) {
      onSelectComplaint(complaint);
    }
  };

  // Navegação por setas no desktop
  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 260;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="lg:hidden w-full max-w-2xl mx-auto">
      {/* Container Principal com Estilo Glassmorphism e Gradiente Ambiente */}
      <div className="relative overflow-hidden rounded-[32px] p-4 sm:p-8 bg-gradient-to-br from-rose-100/60 via-amber-50/50 to-purple-100/60 backdrop-blur-xl border border-white/60 shadow-xl shadow-rose-950/5">
        
        {/* Elemento de iluminação ambiente no fundo */}
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-amber-300/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-rose-300/30 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center">
          
          {/* Badge / Header do Assistente de IA */}
          {/* <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 backdrop-blur-md border border-white/80 shadow-xs text-xs font-semibold text-zinc-700 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
            <span>Assistente de IA • LinkIA</span>
          </div> */}

          {/* Balão de Mensagem de Boas-Vindas (Inspirado no Pheno AI) */}
          <div className="bg-white/60 backdrop-blur-md border border-white/90 text-zinc-400 text-xs sm:text-base font-medium px-2 py-1 rounded-2xl shadow-sm mb-5 animate-fade-in">
            Olá! O que você gostaria de transformar hoje?
          </div>

          {/* Barra de Busca e Entrada Principal (Input Glass Bar) */}
          <form onSubmit={handleSubmit} className="w-full max-w-lg mb-5">
            <div className="relative flex items-center bg-white/90 backdrop-blur-lg border border-white rounded-full p-1.5 shadow-md hover:shadow-lg transition-all focus-within:ring-2 focus-within:ring-amber-400/50">
              
              {/* Ícone de Brilho em Destaque */}
              <div className=" gold-button w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-black shrink-0 ml-1 shadow-sm">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 fill-white/20" />
              </div>

              {/* Input Textual */}
              <input
                type="text"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                placeholder="Ex: Tenho manchas, rugas, flacidez..."
                className="w-full bg-transparent px-3 py-2 text-xs sm:text-sm text-zinc-800 placeholder-zinc-400 font-medium focus:outline-none"
              />

              {/* Botão de Envio */}
              <button
                type="submit"
                disabled={!customInput.trim()}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-zinc-900 hover:bg-emerald-600 disabled:opacity-40 disabled:hover:bg-zinc-900 text-white flex items-center justify-center transition-all duration-300 shrink-0 cursor-pointer shadow-sm"
                aria-label="Analisar com IA"
              >
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </form>

          {/* Carrossel Horizontal de Sugestões */}
          <div className="w-full max-w-lg mt-1">
            <div className="flex items-center justify-between mb-1.5 px-1">
              <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">
                Sugestões Rápidas:
              </span>
              
              {/* Botões de controle no Desktop */}
              <div className="hidden sm:flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => scroll('left')}
                  className="p-1 rounded-full bg-white/60 hover:bg-white text-zinc-600 transition-colors cursor-pointer"
                  aria-label="Anterior"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => scroll('right')}
                  className="p-1 rounded-full bg-white/60 hover:bg-white text-zinc-600 transition-colors cursor-pointer"
                  aria-label="Próximo"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Container Deslizável (Touch / Scroll) */}
            <div
              ref={scrollRef}
              className="flex gap-2 overflow-x-auto snap-x snap-mandatory scrollbar-none py-1.5 px-0.5 scroll-smooth"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {SUGGESTED_COMPLAINTS.map((complaint, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSend(complaint)}
                  className="snap-start shrink-0 px-3.5 py-2 rounded-xl bg-white/60 hover:bg-white/95 backdrop-blur-sm border border-white/80 text-xs text-zinc-700 hover:text-zinc-950 font-medium whitespace-nowrap transition-all duration-200 flex items-center gap-2 shadow-2xs hover:shadow-xs cursor-pointer active:scale-95"
                >
                  <span>"{complaint}"</span>
                  <MessageSquare className="w-3 h-3 text-amber-500 shrink-0" />
                </button>
              ))}
            </div>
          </div>

          {/* Garantia de Privacidade */}
          <div className="mt-5 flex items-center gap-1.5 text-[10px] text-zinc-500">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Análise individual sigilosa e sem compromisso</span>
          </div>

        </div>
      </div>
    </section>
  );
}