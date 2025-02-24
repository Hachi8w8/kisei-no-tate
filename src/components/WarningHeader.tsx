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
    isEmergencyFlash ? 'bg-red-600' : 'bg-red-700'
  } text-white p-6 transition-all duration-300 font-rounded`}>
    <div className="flex items-center gap-4">
      <Shield className="w-14 h-14 sm:w-16 sm:h-16 animate-[pulse_3s_ease-in-out_infinite]" />
      <div>
        <p className="text-sm sm:text-base opacity-75 mb-1 tracking-wide">
          過干渉防衛システム
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-wide">
          帰省の盾
        </h1>
      </div>
    </div>
    <div className="flex items-center gap-4">
      <Siren className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-300" />
      <Zap className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-300" />
    </div>
  </div>
); 