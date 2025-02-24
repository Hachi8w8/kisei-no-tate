import React from 'react';

interface AnalysisProgressProps {
  isEmergencyFlash: boolean;
  analysisProgress: number;
}

export const AnalysisProgress: React.FC<AnalysisProgressProps> = ({
  isEmergencyFlash,
  analysisProgress
}) => (
  <div className="space-y-6">
    <div className={`h-48 bg-black rounded-lg flex items-center justify-center ${
      isEmergencyFlash ? 'border-2 border-red-500' : ''
    }`}>
      <div className="text-red-500 text-center space-y-4">
        <div className="animate-[pulse_1s_ease-in-out_infinite] text-3xl font-bold">
          ⚠️ 違反行為検出中 ⚠️
        </div>
        <div className="text-xl text-red-400">
          データベースと照合しています...
        </div>
      </div>
    </div>
    <div className="h-4 bg-gray-700 rounded-full overflow-hidden">
      <div 
        className="h-full bg-red-500 transition-all duration-300" 
        style={{width: `${analysisProgress}%`}}
      />
    </div>
  </div>
); 