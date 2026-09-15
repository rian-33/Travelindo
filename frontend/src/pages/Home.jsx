import { Hero } from '@/components/home/Hero';
import { PromoBanner } from '@/components/home/PromoBanner';
import { DestinationGrid } from '@/components/home/DestinationGrid';
import { IslandShowcase } from '@/components/home/IslandShowcase';
import { Section } from '@/components/layout/Section';

export default function Home() {
  return (
    <div className="bg-surface-bg min-h-screen">
      <Hero />
      <Section variant="full-bleed" spacing="lg">
        <PromoBanner />
      </Section>
      <Section variant="editorial" spacing="lg">
        <DestinationGrid onViewAll={() => window.location.href = '/destinations'} />
      </Section>
      <Section variant="alternating" spacing="lg" background="muted">
        <IslandShowcase />
      </Section>
    </div>
  );
}