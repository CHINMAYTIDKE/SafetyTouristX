import React, { useState } from 'react';
import { X, Calendar, Users, User, CreditCard, Loader2 } from 'lucide-react';

const BookingModal = ({ hotel, onClose, onConfirm, loading }) => {
    const [formData, setFormData] = useState({
        name: '',
        checkIn: '',
        checkOut: '',
        guests: 1
    });

    if (!hotel) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onConfirm(formData);
    };

    const today = new Date().toISOString().split('T')[0];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-white">
                    <h2 className="text-xl font-bold text-slate-900">Secure Housing Deposit</h2>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                        <X className="w-5 h-5 text-slate-500" />
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    {/* Property Details */}
                    <div className="flex gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <img src={hotel.image} alt={hotel.name} className="w-20 h-20 rounded-xl object-cover" />
                        <div>
                            <h3 className="font-bold text-slate-900">{hotel.name}</h3>
                            <p className="text-xs text-slate-500 mb-1">{hotel.location}</p>
                            <div className="flex items-center gap-1">
                                <span className="text-brand-600 font-black text-lg">{hotel.price} ALGO</span>
                                <span className="text-xs text-slate-400">/ month</span>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-slate-700">Student Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                                    placeholder="Full Name"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-slate-700">Move-in Date</label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                                    <input
                                        type="date"
                                        required
                                        min={today}
                                        value={formData.checkIn}
                                        onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-500 outline-none transition-all"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-slate-700">Duration (End)</label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                                    <input
                                        type="date"
                                        required
                                        min={formData.checkIn || today}
                                        value={formData.checkOut}
                                        onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-500 outline-none transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Summary with AI Pricing */}
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mt-6 animate-pulse">
                            <div className="flex justify-between items-center text-sm text-slate-600 mb-2">
                                <span>Monthly Rent</span>
                                <span>{hotel.aiDetails?.basePrice || hotel.price} ALGO</span>
                            </div>
                            {hotel.aiDetails && (
                                <div className="flex justify-between items-center text-sm mb-2 font-medium">
                                    <span className={hotel.aiDetails.riskPremium > 0 ? "text-orange-600" : "text-green-600"}>
                                        {hotel.aiDetails.riskLabel}
                                    </span>
                                    <span className={hotel.aiDetails.riskPremium > 0 ? "text-orange-600" : "text-green-600"}>
                                        {hotel.aiDetails.riskPremium > 0 ? '+' : ''}{hotel.aiDetails.riskPremium} ALGO
                                    </span>
                                </div>
                            )}
                            <div className="h-px bg-slate-200 my-2"></div>
                            <div className="flex justify-between items-center font-bold text-slate-900">
                                <span>Security Deposit (1 Month)</span>
                                <span className="text-brand-600 text-lg">{hotel.price} ALGO</span>
                            </div>
                        </div>

                        <p className="text-[10px] text-center text-slate-500 italic">
                            Funds held in Smart Contract Escrow until move-in verification.
                        </p>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold shadow-lg hover:bg-brand-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                        >
                            {loading ? (
                                <><Loader2 className="w-5 h-5 animate-spin" /> Processing Block...</>
                            ) : (
                                <>Pay Security Deposit <span className="text-white/50 text-xs font-normal">(Escrow)</span></>
                            )}
                        </button>

                        {loading && (
                            <p className="text-xs text-center text-brand-600 animate-pulse mt-2">
                                Please sign transaction in Pera Wallet...
                            </p>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;
