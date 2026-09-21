import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  RotateCw, 
  Award, 
  Calendar, 
  CheckCircle2, 
  ShieldCheck, 
  Users, 
  Sparkles 
} from 'lucide-react';

// Dados dos Médicos e Injetores da Clínica
const DOCTORS = [
  {
    id: 'doc-1',
    name: 'Dra. Sophie Bennett',
    crmRqe: 'CRM/SP 184.920 • RQE 9201',
    specialty: 'Cirurgiã Plástica & Estética Avançada',
    bio: 'Especialista em rejuvenescimento facial natural, harmonização cirúrgica e protocolos de alta tecnologia.',
    proceduresCount: '1.420+',
    satisfactionRate: '99%',
    verified: true,
    photo: 'https://images.unsplash.com/photo-1594824813566-78a9c3365851?q=80&w=800&auto=format&fit=crop',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-dermatologist-examining-a-patients-face-41551-large.mp4',
    whatsappMessage: 'Olá! Gostaria de agendar uma consulta de avaliação presencial com a Dra. Sophie Bennett.'
  },
  {
    id: 'doc-2',
    name: 'Dr. Lucas Silveira',
    crmRqe: 'CRM/SP 192.401 • RQE 8412',
    specialty: 'Dermatologista & Especialista em Injetáveis',
    bio: 'Foco total em bioestimuladores de colágeno, prevenção de envelhecimento e tratamentos a laser.',
    proceduresCount: '2.100+',
    satisfactionRate: '98%',
    verified: true,
    photo: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=800&auto=format&fit=crop',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-doctor-explaining-a-treatment-to-a-patient-41554-large.mp4',
    whatsappMessage: 'Olá! Gostaria de agendar uma consulta de avaliação com o Dr. Lucas Silveira.'
  }
];

// Sub-componente: Card Individual do Médico com Efeito Flip Bidirecional
function DoctorFlipCard({ doctor, onSchedule }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const videoRef = useRef(null);
  const touchStartX = useRef(0);

  // Efeito para controlar Play / Pause do vídeo conforme o estado do Flip
  useEffect(() => {
    if (isFlipped) {
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {
          if (videoRef.current) {
            videoRef.current.muted = true;
            videoRef.current.play();
          }
        });
      }
    } else {
      if (videoRef.current) {
        videoRef.current.pause();
      }
    }
  }, [isFlipped]);

  const handleToggleFlip = (e) => {
    if (e) e.stopPropagation();
    setIsFlipped((prev) => !prev);
  };

  // Suporte a Gesto Touch Swipe para desvirar
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = Math.abs(touchEndX - touchStartX.current);
    if (diff > 40 && isFlipped) {
      setIsFlipped(false);
    }
  };

  return (
    <div className="snap-align-start flex-shrink-0 w-[290px] sm:w-[320px] h-[460px] sm:h-[480px] [perspective:1000px] select-none group">
      {/* Contêiner 3D com transição suave */}
      <div
        className={`relative w-full h-full duration-700 [transform-style:preserve-3d] transition-transform ${
          isFlipped ? '[transform:rotateY(180deg)]' : ''
        }`}
      >
        {/* ================= FACE FRONTAL ================= */}
        <div className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden shadow-sm border border-champagne/30 bg-graphite flex flex-col justify-between [backface-visibility:hidden]">
          {/* Imagem do Profissional de Fundo */}
          <img
            src={doctor.photo}
            alt={doctor.name}
            className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105 pointer-events-none"
          />

          {/* Sombra suave e degradê */}
          <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/40 to-transparent pointer-events-none" />

          {/* Badge CRM no topo */}
          <div className="relative z-10 p-4 flex items-center justify-between">
            <span className="px-3 py-1 rounded-full bg-white/80 backdrop-blur-md border border-champagne/30 text-[10px] font-semibold text-graphite uppercase tracking-wider">
              {doctor.crmRqe}
            </span>
          </div>

          {/* Conteúdo Inferior */}
          <div className="relative z-10 p-5 flex flex-col justify-end">
            <div className="flex items-center gap-1.5 mb-1">
              <h3 className="font-display text-xl sm:text-2xl text-white font-bold leading-tight drop-shadow-sm">
                {doctor.name}
              </h3>
              {doctor.verified && (
                <CheckCircle2 className="w-4 h-4 text-champagne-deep shrink-0 stroke-[2.5]" />
              )}
            </div>

            <p className="text-xs font-semibold text-champagne-deep mb-1">
              {doctor.specialty}
            </p>
            <p className="text-xs text-white/80 font-body leading-relaxed line-clamp-2 mb-4">
              {doctor.bio}
            </p>

            {/* Estatísticas + Botão de Vídeo */}
            <div className="flex items-center justify-between pt-3 border-t border-white/20 mb-3">
              <div className="flex items-center gap-3 text-white">
                <div className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-champagne-deep" />
                  <span className="text-xs font-bold">{doctor.proceduresCount}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-champagne-deep" />
                  <span className="text-xs font-bold">{doctor.satisfactionRate}</span>
                </div>
              </div>

              <button
                onClick={handleToggleFlip}
                className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-champagne-light to-champagne-deep border border-champagne/40 hover:bg-amber-400 text-graphite font-semibold text-xs transition-all duration-300 flex items-center gap-1.5 shadow-md active:scale-95 cursor-pointer"
                title="Assistir apresentação"
              >
                <Play className="w-3.5 h-3.5 fill-graphite text-graphite" />
                <span>Vídeo</span>
              </button>
            </div>

            {/* CTA de Agendamento */}
            <button
              onClick={() => onSchedule(doctor)}
              className="w-full py-2.5 rounded-full bg-white/90 hover:bg-white text-graphite font-bold text-xs transition-all duration-300 flex items-center justify-center gap-2 shadow-sm active:scale-98 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-champagne-deep" />
              <span>Agendar com {doctor.name.split(' ')[0]}</span>
            </button>
          </div>
        </div>

        {/* ================= FACE TRASEIRA (VERSO DA CARTA) ================= */}
        <div
          onClick={handleToggleFlip}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden shadow-md border border-champagne/40 bg-graphite flex flex-col justify-between [backface-visibility:hidden] [transform:rotateY(180deg)] cursor-pointer"
        >
          {/* Player de Vídeo em Tela Cheia */}
          <video
            ref={videoRef}
            src={doctor.videoUrl}
            playsInline
            loop
            className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-graphite/80 via-transparent to-graphite/95 z-10 pointer-events-none" />

          {/* Topo do Verso: Ícone RotateCw para Desvirar */}
          <div className="relative z-20 p-4 flex justify-between items-center">
            <span className="text-[10px] bg-champagne-deep text-graphite font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-xs">
              Apresentação
            </span>
            <button
              onClick={handleToggleFlip}
              className="p-2 rounded-full bg-graphite/70 backdrop-blur-md text-champagne-deep border border-champagne/40 hover:bg-champagne-deep hover:text-graphite transition-all cursor-pointer shadow-sm"
              title="Voltar para a frente"
            >
              <RotateCw className="w-4 h-4" />
            </button>
          </div>

          {/* Rodapé do Verso: Botão de Agendamento Full Width */}
          <div className="relative z-20 p-5">
            <div className="mb-3">
              <h4 className="font-display text-lg font-bold text-white leading-tight">{doctor.name}</h4>
              <p className="text-xs text-champagne-deep">{doctor.specialty}</p>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onSchedule(doctor);
              }}
              className="w-full py-2.5 rounded-full bg-champagne-deep hover:bg-amber-400 text-graphite font-extrabold text-xs transition-all flex items-center justify-center gap-2 shadow-lg active:scale-98 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Agendar Consulta</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// COMPONENTE PRINCIPAL
export default function ClinicalStaffShowcase({ phoneNumber = '5511999999999' }) {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSchedule = (doctor) => {
    const message = encodeURIComponent(doctor.whatsappMessage);
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      if (clientWidth > 0) {
        const index = Math.round(scrollLeft / clientWidth);
        setActiveIndex(index);
      }
    }
  };

  return (
    <section className="py-6 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Cabeçalho do Módulo */}
      <div className="text-center mb-6">
        <p className="text-xs uppercase tracking-[0.25em] text-champagne-deep font-semibold mb-1 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 inline" /> Corpo Clínico & Autoridade
        </p>
        <h2 className="font-display text-2xl sm:text-3xl text-graphite font-bold">
          Especialistas de Confiança
        </h2>
        <p className="text-xs sm:text-sm text-brown-muted font-body mt-1">
          Toque em "Vídeo" para ver a apresentação da profissional.
        </p>
      </div>

      {/* Carrossel de Cards com Suporte a Gestos */}
      <div className="relative max-w-5xl mx-auto">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none py-2 px-2 -mx-2 scroll-smooth cursor-grab active:cursor-grabbing"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {DOCTORS.map((doctor) => (
            <DoctorFlipCard
              key={doctor.id}
              doctor={doctor}
              onSchedule={handleSchedule}
            />
          ))}
        </div>

        {/* Indicadores sutis de navegação (Dots inferiores) */}
        <div className="flex justify-center gap-2 mt-4">
          {DOCTORS.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeIndex ? 'w-6 bg-champagne-deep' : 'w-1.5 bg-champagne/40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}