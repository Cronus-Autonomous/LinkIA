import React from 'react';
import { 
  MapPin, 
  Navigation, 
  MessageCircle, 
  Globe, 
  Car, 
  BellRing, 
  FileText, 
  Instagram, 
  ChevronRight,
  Sparkles 
} from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';

// Dados dos Links Genéricos de Conveniência
const CONVENIENCE_LINKS = [
  {
    id: 'link-site',
    title: 'Site Oficial & Blog',
    subtitle: 'Conheça todos os nossos tratamentos',
    icon: Globe,
    url: 'https://suaclinica.com.br',
    badge: null,
    iconColor: 'text-champagne-deep bg-champagne/20'
  },
  {
    id: 'link-termos',
    title: 'Orientações Pré & Pós',
    subtitle: 'Termos e recomendações pós-procedimento',
    icon: FileText,
    url: 'https://suaclinica.com.br/orientacoes.pdf',
    badge: 'PDF',
    iconColor: 'text-graphite bg-champagne/30'
  },
  {
    id: 'link-insta',
    title: 'Instagram da Clínica',
    subtitle: '@suaclinica.estetica',
    icon: Instagram,
    url: 'https://instagram.com',
    badge: 'Comunidade',
    iconColor: 'text-rose-600 bg-rose-50'
  }
];

export default function ConvenienceLinks({
  address = 'Av. Paulista, 1000 - Bela Vista, São Paulo/SP',
  googleMapsUrl = 'https://maps.google.com',
  wazeUrl = 'https://waze.com',
  vipChannelUrl = 'https://chat.whatsapp.com',
  parkingInfo = 'Estacionamento conveniado com valet no local'
}) {
  return (
    <section className="pb-6 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Cabeçalho do Módulo */}
      <div className="hidden sm:block text-start mb-2">
        <p className="text-xs uppercase tracking-[0.25em] text-champagne-deep font-semibold mb-1 gap-1.5">
          {/* <Sparkles className="w-3.5 h-3.5 inline fill-champagne-deep" /> */}
          Facilidades & Acesso
        </p>
        <h2 className="font-display text-2xl sm:text-3xl text-graphite font-bold">
          Links de Conveniência
        </h2>
        <p className="text-xs sm:text-sm text-brown-muted font-body mt-1">
          Acesso rápido a rotas, canal VIP e orientações importantes.
        </p>
      </div>

      {/* GRID DOS DOIS CARDS PRINCIPAIS: Lado a Lado no Tablet/PC (md:grid-cols-2) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        
        {/* CARD PRINCIPAL 1: Widget do Canal VIP */}
        <div className="relative overflow-hidden rounded-3xl p-5 sm:p-6 bg-graphite text-white shadow-sm border border-champagne/40 flex flex-col justify-between h-full">
          {/* Luz decorativa ambiente */}
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-champagne-deep/20 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-champagne-deep/20 text-champagne-deep text-[10px] font-extrabold tracking-wider uppercase border border-champagne-deep/30">
              <BellRing className="w-3 h-3 text-champagne-deep" /> Canal VIP
            </div>

            <div>
              <h3 className="font-display text-lg sm:text-xl font-bold text-white leading-snug">
                Alertas de Vagas & Promoções
              </h3>
              <p className="text-xs text-white/80 font-body leading-relaxed mt-1">
                Receba ofertas relâmpago e encaixes de última hora diretamente no seu WhatsApp.
              </p>
            </div>
          </div>

          <div className="relative z-10 mt-5 pt-3">
            <a
              href={vipChannelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full px-5 py-3 rounded-full bg-gradient-to-r from-champagne-light to-champagne-deep border border-champagne/40 text-graphite font-extrabold text-xs sm:text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-md active:scale-98"
            >
              <WhatsAppIcon className="w-4 h-4 fill-graphite text-graphite" />
              <span>Entrar no Grupo VIP</span>
            </a>
          </div>
        </div>

        {/* CARD PRINCIPAL 2: Localização & Rotas Rápidas */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-champagne/30 shadow-sm flex flex-col justify-between space-y-4 h-full">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-2xl bg-champagne/20 text-champagne-deep flex items-center justify-center shrink-0 border border-champagne/30">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display text-sm font-bold text-graphite">Como Chegar à Clínica</h3>
                <p className="text-xs text-brown-muted font-body mt-0.5">{address}</p>
              </div>
            </div>

            {parkingInfo && (
              <div className="flex items-center gap-2 bg-graphite/5 border border-champagne/20 p-2.5 rounded-2xl text-[11px] text-brown-muted">
                <Car className="w-4 h-4 text-champagne-deep shrink-0" />
                <span>{parkingInfo}</span>
              </div>
            )}
          </div>

          {/* Botões de Ação Waze / Google Maps */}
          <div className="grid grid-cols-2 gap-2.5 pt-1">
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3 rounded-full bg-graphite hover:bg-black text-white font-bold text-xs transition-all duration-300 flex items-center justify-center gap-1.5 shadow-xs active:scale-98"
            >
              <MapPin className="w-3.5 h-3.5 text-champagne-deep" />
              <span>Google Maps</span>
            </a>

            <a
              href={wazeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3 rounded-full bg-cyan-50 hover:bg-cyan-100 text-cyan-950 font-bold text-xs border border-cyan-200/60 transition-all duration-300 flex items-center justify-center gap-1.5 shadow-xs active:scale-98"
            >
              <Navigation className="w-3.5 h-3.5 text-cyan-600" />
              <span>Waze</span>
            </a>
          </div>
        </div>

      </div>

      {/* 3. Cards de Links Úteis em Grid Responsivo (1 col. Mobile / 2 col. Tablet / 3 col. Desktop) */}
      <div className="space-y-3 pt-2">
        <span className="text-[11px] font-bold text-brown-muted uppercase tracking-wider px-1 block">
          Outros Links Úteis
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {CONVENIENCE_LINKS.map((link) => {
            const IconComponent = link.icon;
            return (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white hover:bg-graphite/5 border border-champagne/30 hover:border-champagne-deep/50 rounded-2xl p-3.5 flex items-center justify-between transition-all duration-300 shadow-2xs hover:shadow-xs active:scale-98"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border border-champagne/20 ${link.iconColor}`}>
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-display text-xs sm:text-sm font-bold text-graphite group-hover:text-champagne-deep transition-colors truncate">
                        {link.title}
                      </h4>
                      {link.badge && (
                        <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded-md bg-champagne/20 text-champagne-deep border border-champagne/30 shrink-0">
                          {link.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-brown-muted truncate">{link.subtitle}</p>
                  </div>
                </div>

                <div className="text-brown-muted group-hover:text-champagne-deep group-hover:translate-x-1 transition-all shrink-0 ml-2">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}