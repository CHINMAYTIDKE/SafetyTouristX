import React from 'react';
import { ShieldCheck, Shield, Award, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const ReputationNFT = ({ level, checkIns, nextLevelAt }) => {
    // Dynamic NFT Assets (Simulated with SVGs)
    const getNFTAsset = () => {
        switch (level) {
            case 1:
                return (
                    <div className="w-48 h-48 bg-slate-100 rounded-2xl border-4 border-slate-300 flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-slate-200/50 rotate-45 scale-150"></div>
                        <Shield className="w-24 h-24 text-slate-400" />
                        <div className="absolute bottom-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Fresher Tenant</div>
                    </div>
                );
            case 2:
                return (
                    <div className="w-48 h-48 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border-4 border-blue-400 flex items-center justify-center relative overflow-hidden shadow-lg shadow-blue-500/20">
                        <div className="absolute inset-0 bg-blue-200/30 rotate-12 scale-150"></div>
                        <ShieldCheck className="w-24 h-24 text-blue-500" />
                        <div className="absolute bottom-4 text-[10px] font-black uppercase tracking-widest text-blue-600">Reliable Sophomore</div>
                    </div>
                );
            case 3:
                return (
                    <div className="w-48 h-48 bg-gradient-to-br from-brand-50 to-purple-100 rounded-2xl border-4 border-brand-500 flex items-center justify-center relative overflow-hidden shadow-xl shadow-brand-500/40">
                        <div className="absolute w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
                        <Award className="w-24 h-24 text-brand-600 animate-pulse" />
                        <div className="absolute bottom-4 text-[10px] font-black uppercase tracking-widest text-brand-700">Dean's List Tenant</div>
                        <div className="absolute top-2 right-2 flex gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    const progress = Math.min(100, (checkIns / nextLevelAt) * 100);

    return (
        <div className="bg-white p-6 rounded-[24px] border border-slate-200 shadow-premium flex flex-col items-center">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Your Dynamic NFT Passport</h3>

            <motion.div
                key={level}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="mb-6 transform hover:scale-105 transition-transform duration-300"
            >
                {getNFTAsset()}
            </motion.div>

            <div className="w-full space-y-2">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                    <span className="text-slate-500">Semester {level} Progress</span>
                    <span className="text-brand-600">{checkIns}/{nextLevelAt} Months Rent</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-500 transition-all duration-1000" style={{ width: `${progress}%` }}></div>
                </div>
                <p className="text-[9px] text-slate-400 text-center pt-2 italic">
                    AI verifies on-chain rent payments to build your Tenant Score.
                </p>
            </div>
        </div>
    );
};

export default ReputationNFT;
