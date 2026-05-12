import React from 'react';
import CampaignBanners from './CampaignBanners';

export default function HeroVisual() {
  return (
    <div className="hero-visual animate-fade-in">
      {/* Background Cityscape */}
      <img 
        src="/assets/images/cityscape.png" 
        className="visual-bg" 
        alt="Cityscape"
      />

      {/* Main 3D Billboard Illustration */}
      <div className="visual-main">
        <img 
          src="/assets/images/billboard_3d.png" 
          alt="3D Billboard" 
          style={{ width: '100%', border: 'none' }}
        />
        {/* The rotating banners embedded in the billboard mockup */}
        <CampaignBanners />
      </div>

      {/* Floating Dashboard Preview (Glassmorphism) */}
      <div className="visual-float-1 glass-card">
        <img 
          src="/assets/images/dashboard_preview.png" 
          alt="Dashboard Preview" 
          style={{ width: '100%', borderRadius: 'var(--radius-md)', border: 'none' }}
        />
        <div style={{ padding: '0.5rem', fontSize: '0.75rem', fontWeight: 800, textAlign: 'center', textTransform: 'uppercase' }}>
          Real-time Analytics
        </div>
      </div>

      {/* Another floating element for depth */}
      <div className="visual-float-2 glass-card" style={{ padding: '0.75rem' }}>
        <div className="flex items-center gap-2">
          <div className="badge badge-success" style={{ padding: '0.1rem 0.4rem', fontSize: '0.6rem' }}>LIVE</div>
          <div style={{ fontSize: '0.7rem', fontWeight: 800 }}>Campaign Active: Nike NYC</div>
        </div>
      </div>
    </div>
  );
}
