import { Sparkles, ShieldCheck } from 'lucide-react';
import ChatPanel from './ChatPanel';

export default function AiChatConsole({ chat, contextService }) {
  return (
    <div className="hidden lg:flex flex-col h-[calc(100vh-7rem)] sticky top-6 glass-card overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-champagne/30 bg-white/50 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-champagne-light to-champagne-deep flex items-center justify-center shadow-md">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white" />
          </div>
          <div>
            <p className="font-display text-xl leading-none text-graphite">Assistente Lumen IA</p>
            <p className="text-xs text-emerald-600 font-medium mt-1">🟢 Online agora · responde em segundos</p>
          </div>
        </div>
      </div>

      <ChatPanel {...chat} contextService={contextService} />

      <div className="px-4 py-2.5 border-t border-champagne/30 bg-white/40 flex items-center gap-2 text-[11px] text-brown-muted">
        <ShieldCheck className="w-3.5 h-3.5 text-champagne-deep" />
        Conversa protegida · seus dados ficam em sigilo
      </div>
    </div>
  );
}