import React from 'react';

const STORE_URL = 'https://scullys-development.tebex.io/';
const DISCORD_URL = 'https://discord.gg/scully';

export function Hero() {
  return (
    <section className="sd-hero">
      <div className="sd-hero-copy">
        <span className="sd-eyebrow"><span className="sd-pulse" />Documentation</span>
        <h1>
          Everything you need to <span className="sd-gradient">ship it</span>.
        </h1>
        <p>
          Installation guides, configuration references and fixes for common issues for resources provided by Scully's Development.
        </p>
        <div className="sd-actions">
          <a href="/paid" className="sd-btn sd-btn-primary">Get started →</a>
          <a href={STORE_URL} target="_blank" rel="noreferrer" className="sd-btn sd-btn-ghost">Visit the store</a>
        </div>
      </div>
      <div className="sd-hero-art" aria-hidden="true">
        <div className="sd-ring" />
        <div className="sd-ring sd-ring-2" />
        <img src="/logo.png" alt="" />
      </div>
    </section>
  );
}

type Card = { title: string; description: string; href: string; icon: string; external?: boolean };

const cards: Card[] = [
  { title: 'Paid Releases', description: 'FAQ, asset transfers and common error fixes.', href: '/paid', icon: '◆' },
  { title: 'Holster', description: 'Add some realism to your server\'s gunplay.', href: '/paid/holster', icon: '01' },
  { title: 'Sling', description: 'Comfortable, synced weapon placement for your players.', href: '/paid/sling', icon: '02' },
  { title: 'Law Enforcement', description: 'An easy-to-use LEO system with everything you need.', href: '/paid/law_enforcement', icon: '03' },
  { title: 'Stratagem Menu', description: 'An interaction menu inspired by Helldivers 2.', href: '/paid/stratagems', icon: '04' },
  { title: 'Vehicle Radio', description: 'A spinning-record station picker with signal zones.', href: '/paid/vehicle_radio', icon: '05' },
];

export function Cards() {
  return (
    <div className="sd-cards">
      {cards.map((card) => (
        <a key={card.href} href={card.href} className="sd-card">
          <span className="sd-card-index">{card.icon}</span>
          <span className="sd-card-title">{card.title}</span>
          <span className="sd-card-desc">{card.description}</span>
          <span className="sd-card-arrow">→</span>
        </a>
      ))}
    </div>
  );
}

export function Support() {
  return (
    <div className="sd-cta">
      <div>
        <span className="sd-eyebrow">Need a hand?</span>
        <h3>Our team is on Discord</h3>
        <p>Can't find what you're looking for? Open a ticket and we'll help you get set up.</p>
      </div>
      <a href={DISCORD_URL} target="_blank" rel="noreferrer" className="sd-btn sd-btn-primary">Join Discord</a>
    </div>
  );
}
