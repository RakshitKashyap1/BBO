/**
 * @file Login.jsx
 * @description Provides a mock login interface for the application.
 * Users can select a role (Advertiser, Owner, Admin) and 'login' to see the respective dashboards.
 */

import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Monitor, User, Megaphone, ShieldCheck } from 'lucide-react';

/**
 * Login Component:
 * Managed a simple form where users choose their simulated persona.
 */
export default function Login() {
    const { login } = useAuth(); // Hook to trigger our mock authentication
    const navigate = useNavigate(); // Hook for programmatic navigation
    
    // State to track which role is currently selected in the UI
    const [role, setRole] = useState('advertiser');

    /**
     * handleLogin: Executed when the form is submitted.
     * 1. Prevents default browser reload.
     * 2. Calls login action via context.
     * 3. Redirects the user to their respective dashboard route.
     */
    const handleLogin = (e) => {
        e.preventDefault();
        login(role);

        // Routing logic based on the selected role
        if (role === 'advertiser') navigate('/advertiser/dashboard');
        else if (role === 'owner') navigate('/owner/dashboard');
        else navigate('/admin/dashboard');
    };

    return (
        <div className="container animate-fade-in flex items-center justify-center pt-20" style={{ minHeight: '80vh' }}>
            <div className="card w-full" style={{ maxWidth: '450px', margin: 'auto' }}>
                
                {/* 1. Header Section */}
                <div className="text-center mb-8">
                    <Monitor size={48} className="text-primary mb-4 mx-auto" style={{ margin: '0 auto 1rem' }} />
                    <h2>Welcome Back</h2>
                    <p>Login to your account (Mock Demo)</p>
                </div>

                {/* 2. Login Form */}
                <form onSubmit={handleLogin}>
                    <div className="form-group mb-6">
                        <label className="form-label" style={{ marginBottom: '1rem' }}>Select Role to Login As</label>
                        
                        {/* Role Selection Grid: Custom Radio-like card inputs */}
                        <div className="grid grid-cols-1 gap-4">

                            {/* Option: Advertiser */}
                            <label
                                className={`card p-4 flex items-center gap-4 cursor-pointer transition ${role === 'advertiser' ? 'border-primary' : ''}`}
                                style={{ borderColor: role === 'advertiser' ? 'var(--primary)' : 'var(--border)' }}
                                onClick={() => setRole('advertiser')}
                            >
                                <div style={{ width: '3rem', height: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', background: role === 'advertiser' ? 'rgba(59,130,246,0.1)' : 'rgba(255,255,255,0.05)', color: role === 'advertiser' ? 'var(--primary)' : 'var(--text-muted)' }}>
                                    <Megaphone size={24} />
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '1rem', margin: 0 }}>Advertiser</h3>
                                    <p style={{ fontSize: '0.75rem', margin: 0 }}>Brands & Agencies</p>
                                </div>
                            </label>

                            {/* Option: Media Owner */}
                            <label
                                className={`card p-4 flex items-center gap-4 cursor-pointer transition ${role === 'owner' ? 'border-primary' : ''}`}
                                style={{ borderColor: role === 'owner' ? 'var(--primary)' : 'var(--border)' }}
                                onClick={() => setRole('owner')}
                            >
                                <div style={{ width: '3rem', height: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', background: role === 'owner' ? 'rgba(59,130,246,0.1)' : 'rgba(255,255,255,0.05)', color: role === 'owner' ? 'var(--primary)' : 'var(--text-muted)' }}>
                                    <User size={24} />
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '1rem', margin: 0 }}>Media Owner</h3>
                                    <p style={{ fontSize: '0.75rem', margin: 0 }}>Space Providers</p>
                                </div>
                            </label>

                            {/* Option: Administrator */}
                            <label
                                className={`card p-4 flex items-center gap-4 cursor-pointer transition ${role === 'admin' ? 'border-primary' : ''}`}
                                style={{ borderColor: role === 'admin' ? 'var(--primary)' : 'var(--border)' }}
                                onClick={() => setRole('admin')}
                            >
                                <div style={{ width: '3rem', height: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', background: role === 'admin' ? 'rgba(59,130,246,0.1)' : 'rgba(255,255,255,0.05)', color: role === 'admin' ? 'var(--primary)' : 'var(--text-muted)' }}>
                                    <ShieldCheck size={24} />
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '1rem', margin: 0 }}>Administrator</h3>
                                    <p style={{ fontSize: '0.75rem', margin: 0 }}>Platform Mgmt</p>
                                </div>
                            </label>

                        </div>
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="btn btn-primary w-full" style={{ padding: '0.875rem' }}>
                        Continue as {role.charAt(0).toUpperCase() + role.slice(1)}
                    </button>
                </form>
            </div>
        </div>
    );
}

