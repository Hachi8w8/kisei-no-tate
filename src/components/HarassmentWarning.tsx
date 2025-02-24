import React, { useState, useEffect } from 'react';
import { Volume2 } from 'lucide-react';
import { harassmentTypes } from '../constants/harassmentData';
import { useAudio } from '../hooks/useAudio';
import { HarassmentType } from '../types/harassment';
import { WarningHeader } from './WarningHeader';

export const HarassmentWarning: React.FC = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedType, setSelectedType] = useState<HarassmentType | null>(null);
  const [alertLevel, setAlertLevel] = useState(0);
  const [isEmergencyFlash, setIsEmergencyFlash] = useState(false);

  const { speak, playAlarm, stopAlarm } = useAudio();

  useEffect(() => {
    if (isEmergencyFlash) {
      const interval = setInterval(() => {
        setAlertLevel(prev => (prev + 1) % 2);
      }, 500);
      return () => clearInterval(interval);
    }
  }, [isEmergencyFlash]);

  const startWarning = async (type: HarassmentType): Promise<void> => {
    setSelectedType(type);
    setIsAnalyzing(true);
    setIsEmergencyFlash(true);

    try {
      playAlarm();

      await speak("違反行為検出");
      await new Promise(resolve => setTimeout(resolve, 500));
      await speak("違反行為検出");
      
      const warning = harassmentTypes[type].warnings[
        Math.floor(Math.random() * harassmentTypes[type].warnings.length)
      ];
      await speak(warning);
      
      const fine = harassmentTypes[type].fines[
        Math.floor(Math.random() * harassmentTypes[type].fines.length)
      ];
      await speak(fine);
      await speak(`繰り返します。${fine}`);

      await new Promise(resolve => setTimeout(resolve, 1000));
      stopAlarm();

      setTimeout(() => {
        setIsAnalyzing(false);
        setIsEmergencyFlash(false);
        setSelectedType(null);
      }, 500);

    } catch (error) {
      console.error('Warning sequence failed:', error);
      stopAlarm();
      setIsAnalyzing(false);
      setIsEmergencyFlash(false);
      setSelectedType(null);
    }
  };

  const getTitleParts = (title: string) => {
    const parts = {
      marriage: ["結婚催促", "レーダー"],
      children: ["子孫継承強要", "センサー"],
      age: ["年齢干渉", "スキャナー"]
    };
    return parts[title as keyof typeof parts] || [title, ""];
  };

  return (
    <div className="w-full min-h-screen bg-white flex flex-col">
      <div className={`w-full flex-1 ${
        isEmergencyFlash ? (alertLevel === 1 ? 'bg-red-50' : 'bg-white') : 'bg-white'
      } transition-all duration-300`}>
        <div className="min-h-screen flex flex-col">
          <WarningHeader 
            isEmergencyFlash={isEmergencyFlash}
            isAnalyzing={isAnalyzing}
          />

          <main className="flex-1">
            <div className="w-full max-w-5xl mx-auto px-6 sm:px-8 pt-8 sm:pt-12">
              {!isAnalyzing && (
                <div className="grid gap-6 sm:gap-8">
                  {Object.entries(harassmentTypes).map(([key, value]) => (
                    <button
                      key={key}
                      onClick={() => startWarning(key as HarassmentType)}
                      className="relative w-full bg-white py-5 px-8 rounded-2xl shadow-lg 
                        hover:bg-red-50 active:bg-red-100 transition-all duration-300 
                        border-2 border-red-100 group overflow-hidden"
                    >
                      {/* 警告線パターン */}
                      <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-red-500/10
                        [mask-image:linear-gradient(45deg,#000_25%,transparent_25%,transparent_50%,#000_50%,#000_75%,transparent_75%,transparent)]
                        bg-[length:24px_24px] opacity-0 group-hover:opacity-100 transition-opacity" />
                      
                      <div className="relative flex items-center justify-between">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-2">
                          <div className="text-xl sm:text-2xl font-bold tracking-wider leading-tight">
                            {getTitleParts(key)[0]}
                          </div>
                          <div className="text-xl sm:text-2xl font-bold tracking-wider leading-tight">
                            {getTitleParts(key)[1]}
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-1.5">
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-sm text-red-500 opacity-75 tracking-wider">ALERT READY</span>
                          </div>
                          <Volume2 className="w-7 h-7 sm:w-8 sm:h-8 text-red-500 
                            group-hover:scale-110 transition-transform" />
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {isAnalyzing && (
                <div className="h-[calc(100vh-200px)] flex items-center justify-center">
                  <div className="text-red-500 text-center space-y-4">
                    <div className="animate-[pulse_1s_ease-in-out_infinite] text-3xl font-bold">
                      ⚠️ 違反行為検出中 ⚠️
                    </div>
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}; 