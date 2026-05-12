import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { CheckCircle, XCircle, Calendar as CalendarIcon, List } from 'lucide-react';
import toast from 'react-hot-toast';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import DataTable from '../../components/common/DataTable';
import { TableSkeleton } from '../../components/common/Skeleton';

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
            // Simulate a slightly longer load for skeleton visibility
            setTimeout(() => setIsLoading(false), 500);
        }
    };

    const columns = [
        { key: 'id', label: 'ID', render: (row) => `#${row.id}` },
        { key: 'advertiser', label: 'Advertiser', render: (row) => `User ${row.advertiser}` },
        { key: 'location', label: 'Space', render: (row) => row.adspace_details?.location || 'N/A' },
        { key: 'startDate', label: 'Dates', render: (row) => (
            <>
                {row.startDate} <br/>
                <small className="text-muted">to {row.endDate}</small>
            </>
        )},
        { key: 'totalPrice', label: 'Total Price', render: (row) => (
            <span style={{ fontWeight: 600 }}>${parseFloat(row.totalPrice).toLocaleString()}</span>
        )},
        { key: 'status', label: 'Status', render: (row) => (
            <span className={`badge ${
                row.status === 'active' ? 'badge-success' : 
                row.status === 'pending' ? 'badge-warning' : 
                row.status === 'completed' ? 'badge-info' : 'badge-danger'
            }`}>
                <span style={{ marginRight: '6px' }}>
                    {row.status === 'active' ? '🟢' : row.status === 'pending' ? '🟡' : row.status === 'completed' ? '🔵' : '🔴'}
                </span>
                {row.status}
            </span>
        )},
        { key: 'actions', label: 'Actions', sortable: false, render: (row) => (
            <div className="flex gap-2">
                {row.status === 'pending' && (
                    <>
                        <button onClick={() => handleAction(row.id, 'approve')} className="btn btn-primary btn-sm btn-ripple" style={{ padding: '4px 8px', fontSize: '10px' }}>
                            <CheckCircle size={14} className="mr-1" /> Approve
                        </button>
                        <button className="btn btn-secondary btn-sm btn-ripple" style={{ padding: '4px 8px', fontSize: '10px' }}>
                            <XCircle size={14} className="mr-1" /> Reject
                        </button>
                    </>
                )}
                {row.status === 'active' && (
                    <button onClick={() => handleAction(row.id, 'complete')} className="btn btn-secondary btn-sm btn-ripple" style={{ padding: '4px 8px', fontSize: '10px' }}>
                        Mark Completed
                    </button>
                )}
            </div>
        )}
    ];

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

            <div className="card p-6">
                {isLoading ? (
                    <TableSkeleton rows={5} />
                ) : viewMode === 'list' ? (
                    <DataTable 
                        columns={columns} 
                        data={bookings} 
                        searchPlaceholder="Search by ID, status or location..." 
                    />
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
