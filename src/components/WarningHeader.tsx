import React from 'react';
import { Shield, Siren, Zap } from 'lucide-react';

interface WarningHeaderProps {
  isEmergencyFlash: boolean;
  isAnalyzing: boolean;
}

export const WarningHeader: React.FC<WarningHeaderProps> = ({
  isEmergencyFlash,
  isAnalyzing
}) => (
  <div className={`flex items-center justify-between ${
    isEmergencyFlash ? 'bg-red-800' : 'bg-blue-800'
  } text-white p-4 transition-all duration-300`}>
    <div className="flex items-center gap-3">
      <Shield className="w-8 h-8" />
      <div>
        <p className="text-xs sm:text-sm opacity-75 mb-0.5">過干渉防衛システム</p>
        <h1 className="text-xl sm:text-2xl font-bold tracking-wider">帰省の盾</h1>
      </div>
    </div>
    <div className="flex items-center gap-3">
      <Siren className={`w-8 h-8 ${isAnalyzing ? 'animate-[pulse_0.5s_ease-in-out_infinite] text-red-300' : ''}`} />
      <Zap className={`w-8 h-8 ${isEmergencyFlash ? 'animate-[pulse_0.5s_ease-in-out_infinite] text-yellow-300' : ''}`} />
    </div>
  </div>
); 