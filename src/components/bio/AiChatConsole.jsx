import { Sparkles, ShieldCheck, MessageCircle } from 'lucide-react';
import ChatPanel from './ChatPanel';

const PHONE_NUMBER = '5543996084644';

function generateWhatsappLink(messages) {
  const userMessages = messages.filter((m) => m.role === 'user');
  
  let contextText = 'uma avaliação';
  if (userMessages.length > 0) {
    const lastUserMessage = userMessages[userMessages.length - 1].text.trim();
    contextText = lastUserMessage;
  }

  const text = `Olá! Vim do seu LinkIA e gostaria de agendar ${contextText}`;
  return `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(text)}`;
}

export default function AiChatConsole({ chat, contextService }) {
  const whatsappUrl = generateWhatsappLink(chat.messages);

  return (
    <div className="hidden lg:flex flex-col h-[calc(100vh-7rem)] sticky top-6 glass-card overflow-hidden">
      {/* Header com o botão do WhatsApp */}
      <div className="shrink-0 flex items-center justify-between px-5 py-4 border-b border-champagne/30 bg-white/50 backdrop-blur-md gap-2">
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative shrink-0">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-champagne-light to-champagne-deep flex items-center justify-center shadow-md">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white" />
          </div>
          <div className="truncate">
            <p className="font-display text-xl leading-none text-graphite truncate">Sua Assistente LinkIA</p>
            <p className="text-xs text-emerald-600 font-medium mt-1">responde em segundos</p>
          </div>
        </div>

        {/* Botão Verde WhatsApp */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-semibold shadow-sm transition-all"
        >
          <MessageCircle className="w-3.5 h-3.5 fill-white text-[#25D366]" />
          <span>continuar no whatsapp</span>
        </a>
      </div>

      <div className="flex-1 min-h-0 overflow-hidden">
        <ChatPanel {...chat} contextService={contextService} />
      </div>

      <div className="shrink-0 px-4 py-2.5 border-t border-champagne/30 bg-white/40 flex items-center gap-2 text-[11px] text-brown-muted">
        <ShieldCheck className="w-3.5 h-3.5 text-champagne-deep shrink-0" />
        Conversa protegida · seus dados ficam em sigilo
      </div>
    </div>
  );
}