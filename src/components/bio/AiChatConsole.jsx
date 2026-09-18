import { Sparkles, ShieldCheck, MessageCircle, Users } from 'lucide-react';
import ChatPanel from './ChatPanel';
import WhatsAppIcon from './WhatsAppIcon';

const PHONE_NUMBER = '5543996084644';

function generateWhatsappLink(messages) {
  const userMessages = messages.filter((m) => m.role === 'user');
  
  let contextText = 'uma avaliação';
  if (userMessages.length > 0) {
    const lastUserMessage = userMessages[userMessages.length - 1].text.trim();
    contextText = lastUserMessage;
  }
  // TODO aqui precisa ajustar para dar contexto nas mensagens
  // const text = `Olá! Vim LinkIA e gostaria de agendar ${contextText}`;
  const text = `Olá! Vim do LinkIA e quero turbinar meu negócio`;
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
              <p className="font-display text-base leading-none text-graphite truncate">IAra</p>
              <div className="flex items-center justify-center">
                <Users className="w-3 h-3 mr-2 text-emerald-600" />
                <p className="text-[10px] text-emerald-600 font-bold mt-0.5 -ml-1.5">126</p>
                <p className="text-[10px] text-emerald-600 font-medium mt-0.5 ml-1.5">Online agora</p>
              </div>
            </div>
        </div>

        {/* Botão Verde WhatsApp */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-[#d8f8e4] hover:bg-[#20ba5a] text-[#20ba5a] hover:text-[#d8f8e4] text-xs font-semibold shadow-sm transition-all"
        >
          <WhatsAppIcon className="w-5 h-5 text-[#20ba5a] group-hover:text-[#d8f8e4] transition-colors duration-200" />
          <span>continuar</span>
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