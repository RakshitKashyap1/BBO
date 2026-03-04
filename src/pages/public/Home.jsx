/**
 * @file Home.jsx
 * @description The landing page of the Billboard Organiser platform.
 * It features a hero section with a call-to-action and a highlights section.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, Globe, ShieldCheck } from 'lucide-react';

/**
 * Home Component:
 * Renders the introductory content for new visitors.
 */
export default function Home() {
    return (
        <div className="animate-fade-in">
            {/* 1. Hero Section: The first thing a user sees */}
            <section className="hero-section">
                <div className="hero-glow"></div>
                <div className="container">
                    {/* Welcome Badge */}
                    <div className="badge badge-info mb-8" style={{ display: 'inline-flex', margin: '0 auto' }}>
                        Introducing BBO. 2.0
                    </div>

                    {/* Main Headline */}
                    <h1 style={{ fontSize: '4rem', maxWidth: '800px', margin: '0 auto 1.5rem', lineHeight: '1.1' }}>
                        The Future of <span className="text-gradient">OOH Advertising</span> is Here
                    </h1>

                    {/* Value Proposition */}
                    <p style={{ fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto 2rem', color: 'var(--text-muted)' }}>
                        Connect media owners with advertisers globally. Book digital, traditional, and transit advertising spaces with real-time availability.
                    </p>

                    {/* Primary Actions */}
                    <div className="flex items-center justify-center gap-4">
                        <Link to="/search" className="btn btn-primary" style={{ padding: '0.875rem 2rem', fontSize: '1rem' }}>
                            Start Booking <ArrowRight size={18} />
                        </Link>
                        <Link to="/register" className="btn btn-secondary" style={{ padding: '0.875rem 2rem', fontSize: '1rem' }}>
                            List Your Space
                        </Link>
                    </div>
                </div>
            </section>

            {/* 2. Features/Benefits Section: Explaining 'Why Choose Us?' */}
            <section className="container mt-8" style={{ paddingBottom: '6rem' }}>
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
            </section>
        </div>
    );
}

