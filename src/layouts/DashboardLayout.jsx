/**
 * @file DashboardLayout.jsx
 * @description The layout used for authenticated users (Advertisers, Owners, Admins).
 * It features a persistent Sidebar with role-specific navigation and a main content area.
 */

import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    Monitor, LayoutDashboard, CalendarDays, Megaphone, Upload, PieChart,
    User, Image as ImageIcon, PlusCircle, DollarSign, Users, ShieldAlert, LogOut, Menu, X
} from 'lucide-react';

/**
 * navConfig: Configuration object that defines which navigation links 
 * should be shown to which user role.
 */
const navConfig = {
    advertiser: [
        { label: 'Dashboard', path: '/advertiser/dashboard', icon: LayoutDashboard },
        { label: 'Bookings', path: '/advertiser/bookings', icon: CalendarDays },
        { label: 'Campaigns', path: '/advertiser/campaigns', icon: Megaphone },
        { label: 'Upload Creative', path: '/advertiser/upload-creative', icon: Upload },
        { label: 'Reports', path: '/advertiser/reports', icon: PieChart },
        { label: 'Profile', path: '/advertiser/profile', icon: User }
    ],
    owner: [
        { label: 'Dashboard', path: '/owner/dashboard', icon: LayoutDashboard },
        { label: 'Ad Spaces', path: '/owner/adspaces', icon: ImageIcon },
        { label: 'Add Ad Space', path: '/owner/add-adspace', icon: PlusCircle },
        { label: 'Bookings', path: '/owner/bookings', icon: CalendarDays },
        { label: 'Earnings', path: '/owner/earnings', icon: DollarSign },
        { label: 'Profile', path: '/owner/profile', icon: User }
    ],
    admin: [
        { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
        { label: 'Users', path: '/admin/users', icon: Users },
        { label: 'Ad Spaces', path: '/admin/adspaces', icon: ImageIcon },
        { label: 'Bookings', path: '/admin/bookings', icon: CalendarDays },
        { label: 'Payments', path: '/admin/payments', icon: DollarSign },
        { label: 'Reports', path: '/admin/reports', icon: ShieldAlert }
    ]
};

/**
 * DashboardLayout Component:
 * Manages the authenticated UI shell, including logic for the dynamic sidebar.
 */
export default function DashboardLayout() {
    const { user, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

    // If no user is logged in, we return null (though ProtectedRoute should prevent this)
    if (!user) return null;

    // Filter the sidebar links based on the user's role
    const links = navConfig[user.role] || [];

    /**
     * handleLogout: Handles session termination and navigation to the home page.
     */
    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const closeSidebar = () => setIsSidebarOpen(false);

    return (
        <div className={`dashboard-layout ${isSidebarOpen ? 'sidebar-open' : ''}`}>
            
            {/* Sidebar Overlay (Mobile only) */}
            {isSidebarOpen && <div className="sidebar-overlay" onClick={closeSidebar}></div>}

            {/* 1. Sidebar Panel */}
            <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <Monitor size={24} /> <span>BBO.</span>
                </div>

                {/* Vertical Navigation Links */}
                <nav className="sidebar-nav">
                    <ul className="flex-col gap-2">
                        {links.map((link) => {
                            const Icon = link.icon;
                            const isActive = location.pathname.startsWith(link.path);
                            return (
                                <li key={link.path}>
                                    <Link
                                        to={link.path}
                                        className={`sidebar-link ${isActive ? 'active' : ''}`}
                                    >
                                        <Icon size={18} />
                                        {link.label}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* Sidebar Bottom: User Profile Info & Logout */}
                <div style={{ padding: '1.5rem', borderTop: '1px solid var(--border)' }}>
                    <div className="flex items-center gap-2 mb-4">
                        {/* Avatar Bubble */}
                        <div style={{ width: '32px', height: '32px', borderRadius: '16px', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.8rem' }}>
                            {user.name.charAt(0)}
                        </div>
                        <div>
                            <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)' }}>{user.name}</p>
                            <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'capitalize' }}>{user.role}</p>
                        </div>
                    </div>
                    <button onClick={handleLogout} className="btn btn-secondary w-full">
                        <LogOut size={16} /> Logout
                    </button>
                </div>
            </aside>

            {/* 2. Main Content Container */}
            <div className="main-content">
                <header className="top-header">
                    {/* Sidebar Toggle (Mobile only) */}
                    <button className="sidebar-toggle" onClick={toggleSidebar} aria-label="Toggle Sidebar">
                        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>

                    {/* Top utility bar (view public site link) */}
                    <div className="flex gap-4 items-center">
                        <Link to="/" className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>View Site</Link>
                    </div>
                </header>
                
                {/* Specific page content (e.g., Dashboard, Reports) is injected here */}
                <main className="page-content">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

