import { useState } from 'react';
import { useChat } from '@/hooks/useChat';
import Hero from '@/components/bio/Hero';
import QuickPills from '@/components/bio/QuickPills';
import BeforeAfterCarousel from '@/components/bio/BeforeAfterCarousel';
import ServiceShowcase from '@/components/bio/ServiceShowcase';
import SocialProof from '@/components/bio/SocialProof';
import StickyCta from '@/components/bio/StickyCta';
import AiChatConsole from '@/components/bio/AiChatConsole';
import AiChatWidget from '@/components/bio/AiChatWidget';
import SocialProofBadge from '@/components/bio/SocialProofBadge';

export default function Home() {
  const chat = useChat();
  const [widgetOpen, setWidgetOpen] = useState(false);
  const [contextService, setContextService] = useState(undefined);

  const handleAskAi = (message, service) => {
    setContextService(service);
    if (window.matchMedia('(max-width: 1023px)').matches) {
      setWidgetOpen(true);
    }
    setTimeout(() => chat.sendMessage(message, service), 60);
  };

  return (
    <div className="min-h-screen pb-28 lg:pb-8">
      <Hero />
      <SocialProofBadge/>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-6 lg:gap-8">
          <main className="min-w-0">
            {/* <QuickPills onAskAi={handleAskAi} /> */}
            <BeforeAfterCarousel onAskAi={handleAskAi} />
            <ServiceShowcase onAskAi={handleAskAi} />
            <SocialProof />
          </main>

          <aside className="lg:block min-w-0">
            <AiChatConsole chat={chat} contextService={contextService} />
          </aside>
        </div>
      </div>

      <AiChatWidget chat={chat} open={widgetOpen} setOpen={setWidgetOpen} contextService={contextService} />
      <StickyCta onAskAi={handleAskAi} />
    </div>
  );
}