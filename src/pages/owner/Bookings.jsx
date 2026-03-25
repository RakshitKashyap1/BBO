import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { CheckCircle, XCircle, Calendar as CalendarIcon, List } from 'lucide-react';
import toast from 'react-hot-toast';
import Spinner from '../../components/common/Spinner';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function ReceivedBookings() {
    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [viewMode, setViewMode] = useState('list'); // 'list' or 'calendar'

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        setIsLoading(true);
        try {
            const response = await api.get('/bookings/');
            setBookings(response.data.results || response.data);
        } catch (error) {
            console.error("Error fetching received bookings:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAction = async (id, action) => {
        try {
            if (action === 'approve') {
                await api.put(`/bookings/${id}/approve/`);
                toast.success("Booking approved!");
            } else if (action === 'complete') {
                await api.put(`/bookings/${id}/complete/`);
                toast.success("Booking marked as completed!");
            }
            fetchBookings();
        } catch (error) {
            toast.error(`Failed to ${action} booking`);
        }
    };

    // CSS for calendar highlighting
    const calendarStyles = `
        .booked-day { background: var(--primary) !important; color: white !important; border-radius: 50%; }
        .pending-day { background: var(--warning) !important; color: black !important; border-radius: 50%; }
        .react-calendar { border: 3px solid var(--border) !important; font-family: var(--font-family) !important; border-radius: var(--radius-sm); width: 100% !important; }
        .react-calendar__tile--active { background: var(--secondary) !important; }
    `;

    const getTileClassName = ({ date, view }) => {
        if (view === 'month') {
            const dateStr = date.toISOString().split('T')[0];
            const booking = bookings.find(b => dateStr >= b.startDate && dateStr <= b.endDate);
            if (booking) {
                return booking.status === 'active' ? 'booked-day' : 'pending-day';
            }
        }
        return null;
    };

    return (
        <div className="animate-fade-in">
            <style>{calendarStyles}</style>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1>Received Bookings</h1>
                    <p>Manage requests from advertisers for your ad spaces.</p>
                </div>
                <div className="flex border-3 border-black rounded overflow-hidden" style={{ border: '3px solid black' }}>
                    <button 
                        onClick={() => setViewMode('list')}
                        className={`p-2 ${viewMode === 'list' ? 'bg-accent' : 'bg-white'}`}
                        style={{ borderRight: '3px solid black' }}
                    >
                        <List size={20} />
                    </button>
                    <button 
                        onClick={() => setViewMode('calendar')}
                        className={`p-2 ${viewMode === 'calendar' ? 'bg-accent' : 'bg-white'}`}
                    >
                        <CalendarIcon size={20} />
                    </button>
                </div>
            </div>

            <div className="card p-0">
                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <Spinner size="lg" />
                    </div>
                ) : viewMode === 'list' ? (
                    <div className="table-container" style={{ margin: 0 }}>
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Advertiser</th>
                                    <th>Space</th>
                                    <th>Dates</th>
                                    <th>Total Price</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.map(booking => (
                                    <tr key={booking.id}>
                                        <td>#{booking.id}</td>
                                        <td>User {booking.advertiser}</td>
                                        <td>{booking.adspace_details?.location}</td>
                                        <td>
                                            {booking.startDate} <br/>
                                            <small className="text-muted">to {booking.endDate}</small>
                                        </td>
                                        <td style={{ fontWeight: 600 }}>${parseFloat(booking.totalPrice).toLocaleString()}</td>
                                        <td>
                                            <span className={`badge ${
                                                booking.status === 'active' ? 'badge-success' : 
                                                booking.status === 'pending' ? 'badge-warning' : 
                                                booking.status === 'completed' ? 'badge-info' : 'badge-danger'
                                            }`}>
                                                <span style={{ marginRight: '6px' }}>{booking.status === 'active' ? '🟢' : booking.status === 'pending' ? '🟡' : booking.status === 'completed' ? '🔵' : '🔴'}</span>
                                                {booking.status}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="flex gap-2">
                                                {booking.status === 'pending' && (
                                                    <>
                                                        <button onClick={() => handleAction(booking.id, 'approve')} className="btn btn-primary btn-sm" style={{ padding: '4px 8px', fontSize: '10px' }}>
                                                            <CheckCircle size={14} className="mr-1" /> Approve
                                                        </button>
                                                        <button className="btn btn-secondary btn-sm" style={{ padding: '4px 8px', fontSize: '10px' }}>
                                                            <XCircle size={14} className="mr-1" /> Reject
                                                        </button>
                                                    </>
                                                )}
                                                {booking.status === 'active' && (
                                                    <button onClick={() => handleAction(booking.id, 'complete')} className="btn btn-secondary btn-sm" style={{ padding: '4px 8px', fontSize: '10px' }}>
                                                        Mark Completed
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {bookings.length === 0 && (
                                    <tr>
                                        <td colSpan="7" className="text-center py-20 text-muted">No booking requests received yet.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="p-8">
                        <div className="flex gap-8 items-start">
                            <div className="flex-1">
                                <Calendar 
                                    tileClassName={getTileClassName}
                                    className="neo-calendar"
                                />
                            </div>
                            <div className="w-64 flex flex-col gap-4">
                                <h3>Legend</h3>
                                <div className="flex items-center gap-2 mb-2"><span className="w-4 h-4 rounded-full" style={{ background: 'var(--primary)' }}></span> Active Booking</div>
                                <div className="flex items-center gap-2 mb-4"><span className="w-4 h-4 rounded-full" style={{ background: 'var(--warning)' }}></span> Pending Request</div>
                                <p className="text-sm">Circles indicate dates with scheduled bookings. Switch to List view for full details.</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
