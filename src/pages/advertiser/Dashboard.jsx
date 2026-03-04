/**
 * @file Dashboard.jsx
 * @description The main landing page for authenticated Advertisers.
 * It displays key performance metrics and a summary of recent bookings.
 */

import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { mockBookings, mockAdSpaces } from '../../data/mockData';
import { TrendingUp, Calendar, CreditCard, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * Dashboard Component:
 * Aggregates information for the advertiser to provide a high-level overview of their campaigns.
 */
export default function Dashboard() {
    const { user } = useAuth(); // Access current logged-in user details

    /**
     * activeBookings: Filters global mock bookings to only show those belonging
     * to the currently logged-in advertiser.
     */
    const activeBookings = mockBookings.filter(b => b.advertiserId === user.id);

    return (
        <div className="animate-fade-in">
            
            {/* 1. Header Section: Personalized welcome message */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 style={{ margin: 0 }}>Welcome back, {user.name}</h1>
                    <p>Here's what's happening with your campaigns today.</p>
                </div>
                <Link to="/search" className="btn btn-primary">Book New Space</Link>
            </div>

            {/* 2. Stats Grid: Displays high-level KPIs */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
                
                {/* Metric: Number of Active Campaigns */}
                <div className="card stat-card">
                    <div className="stat-icon"><Activity size={24} /></div>
                    <div>
                        <div className="stat-label">Active Campaigns</div>
                        <div className="stat-value text-gradient">{activeBookings.length}</div>
                    </div>
                </div>

                {/* Metric: Total Impressions (Static for demo) */}
                <div className="card stat-card">
                    <div className="stat-icon" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)' }}><TrendingUp size={24} /></div>
                    <div>
                        <div className="stat-label">Total Impressions</div>
                        <div className="stat-value">4.2M</div>
                    </div>
                </div>

                {/* Metric: Total Days Live (Static for demo) */}
                <div className="card stat-card">
                    <div className="stat-icon" style={{ background: 'rgba(236, 72, 153, 0.1)', color: 'var(--secondary)' }}><Calendar size={24} /></div>
                    <div>
                        <div className="stat-label">Days Live</div>
                        <div className="stat-value">124</div>
                    </div>
                </div>

                {/* Metric: Total Spend (Static for demo) */}
                <div className="card stat-card">
                    <div className="stat-icon" style={{ background: 'rgba(245, 158, 11, 0.1)', color: 'var(--warning)' }}><CreditCard size={24} /></div>
                    <div>
                        <div className="stat-label">Total Spend &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                        <div className="stat-value">$36.2k</div>
                    </div>
                </div>
            </div>

            {/* 3. Recent Bookings List: Table showing detailed transaction history */}
            <div className="card">
                <div className="flex justify-between items-center mb-6">
                    <h3 style={{ margin: 0 }}>Recent Bookings</h3>
                    <Link to="/advertiser/bookings" className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}>View All</Link>
                </div>

                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Space Details</th>
                                <th>Location</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Status</th>
                                <th>Cost</th>
                            </tr>
                        </thead>
                        <tbody>
                            {activeBookings.map(booking => {
                                // Match the booking to its corresponding ad space for display
                                const space = mockAdSpaces.find(s => s.id === booking.spaceId);
                                return (
                                    <tr key={booking.id}>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <img src={space?.image} alt={space?.title} style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }} />
                                                <div>
                                                    <div style={{ fontWeight: 500 }}>{space?.title}</div>
                                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ID: {booking.id}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{space?.location}</td>
                                        <td>{booking.startDate}</td>
                                        <td>{booking.endDate}</td>
                                        <td>
                                            <span className={`badge ${booking.status === 'approved' ? 'badge-success' : 'badge-warning'}`}>
                                                {booking.status}
                                            </span>
                                        </td>
                                        <td style={{ fontWeight: 600 }}>${booking.totalCost.toLocaleString()}</td>
                                    </tr>
                                );
                            })}
                            
                            {/* Empty state Row */}
                            {activeBookings.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="text-center py-8 text-muted">No recent bookings found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

