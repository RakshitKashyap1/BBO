/**
 * @file Home.jsx
 * @description The landing page of the Billboard Organiser platform.
 * It features a hero section with a call-to-action and a highlights section.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, Globe, ShieldCheck } from 'lucide-react';
import HeroVisual from '../../components/common/HeroVisual';

/**
 * Home Component:
 * Renders the introductory content for new visitors.
 */
export default function Home() {
    return (
        <div className="animate-fade-in">
            {/* 1. Hero Section: The first thing a user sees */}
            <section className="hero-section">
                <div className="bg-pattern"></div>
                <div className="container">
                    <div className="hero-grid">
                        {/* Left: Content */}
                        <div className="hero-content">
                            {/* Welcome Badge */}
                            <div className="badge badge-info mb-8" style={{ display: 'inline-flex' }}>
                                Introducing BBO. 2.0
                            </div>

                            {/* Main Headline */}
                            <h1 style={{ lineHeight: '1.1', textAlign: 'left' }}>
                                The Future of <span className="text-gradient">OOH Advertising</span> is Here
                            </h1>

                            {/* Value Proposition */}
                            <p style={{ fontSize: '1.25rem', maxWidth: '540px', margin: '0 0 2rem', color: 'var(--text-muted)', textAlign: 'left' }}>
                                Connect media owners with advertisers globally. Book digital, traditional, and transit advertising spaces with real-time availability.
                            </p>

                            {/* Primary Actions */}
                            <div className="flex items-center gap-4">
                                <Link to="/search" className="btn btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
                                    Start Booking <ArrowRight size={20} />
                                </Link>
                                <Link to="/register" className="btn btn-secondary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
                                    List Your Space
                                </Link>
                            </div>

                            {/* Social Proof Mini Section */}
                            <div className="mt-8 flex items-center gap-6 opacity-60 grayscale">
                                <span style={{ fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase' }}>Trusted By</span>
                                <div style={{ fontWeight: 900, fontSize: '1.2rem' }}>NIKE</div>
                                <div style={{ fontWeight: 900, fontSize: '1.2rem' }}>COCACOLA</div>
                                <div style={{ fontWeight: 900, fontSize: '1.2rem' }}>BMW</div>
                            </div>
                        </div>

                        {/* Right: Visual */}
                        <HeroVisual />
                    </div>
                </div>
            </section>

            {/* 2. Features/Benefits Section: Explaining 'Why Choose Us?' */}
            <section className="section-sm">
                <div className="container">
                    <h2 className="text-center mb-8">Why Choose Us?</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                    
                        {/* Global Reach Feature */}
                        <div className="card text-center" style={{ alignItems: 'center' }}>
                            <div className="stat-icon mb-4" style={{ width: '4rem', height: '4rem' }}>
                                <Globe size={32} />
                            </div>
                            <h3>Global Reach</h3>
                            <p>Access thousands of premium advertising spaces across major cities worldwide instantly.</p>
                        </div>

                        {/* Analytics Feature */}
                        <div className="card text-center" style={{ alignItems: 'center' }}>
                            <div className="stat-icon mb-4" style={{ width: '4rem', height: '4rem', background: 'rgba(236, 72, 153, 0.1)', color: 'var(--secondary)' }}>
                                <BarChart3 size={32} />
                            </div>
                            <h3>Real-time Analytics</h3>
                            <p>Track your campaign performance with detailed insights and footfall estimations.</p>
                        </div>

                        {/* Security Feature */}
                        <div className="card text-center" style={{ alignItems: 'center' }}>
                            <div className="stat-icon mb-4" style={{ width: '4rem', height: '4rem', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)' }}>
                                <ShieldCheck size={32} />
                            </div>
                            <h3>Secure Bookings</h3>
                            <p>Bank-grade security for all transactions and verified media owners for peace of mind.</p>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
}

