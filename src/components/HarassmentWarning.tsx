import React, { useState, useEffect } from 'react';
import { Volume2 } from 'lucide-react';
import { harassmentTypes } from '../constants/harassmentData';
import { useAudio } from '../hooks/useAudio';
import { HarassmentType } from '../types/harassment';
import { WarningHeader } from './WarningHeader';
import { AnalysisProgress } from './AnalysisProgress';

export const HarassmentWarning: React.FC = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedType, setSelectedType] = useState<HarassmentType | null>(null);
  const [alertLevel, setAlertLevel] = useState(0);
  const [isEmergencyFlash, setIsEmergencyFlash] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);

  const { speak, playSound } = useAudio();

  useEffect(() => {
    if (isEmergencyFlash) {
      const interval = setInterval(() => {
        setAlertLevel(prev => (prev + 1) % 2);
      }, 500);
      return () => clearInterval(interval);
    }
  }, [isEmergencyFlash]);

  const playThinkingBeeps = async (count: number): Promise<void> => {
    for (let i = 0; i < count; i++) {
      await playSound('thinking');
      await new Promise<void>(resolve => setTimeout(resolve, 300));
      setAnalysisProgress(prev => prev + (100 / count));
    }
  };

  const startWarning = async (type: HarassmentType): Promise<void> => {
    setSelectedType(type);
    setIsAnalyzing(true);
    setIsEmergencyFlash(true);
    setAnalysisProgress(0);

    try {
      await playSound('emergency');
      await speak("警告システム起動。違反行為の分析を開始します。");
      
      await new Promise(resolve => setTimeout(resolve, 500));
      await playThinkingBeeps(5);
      
      await playSound('alert');
      const warning = harassmentTypes[type].warnings[
        Math.floor(Math.random() * harassmentTypes[type].warnings.length)
      ];
      await speak(warning);
      await new Promise(resolve => setTimeout(resolve, 1000));

      setAnalysisProgress(0);
      await speak("違反者への措置を決定します。");
      
      await new Promise(resolve => setTimeout(resolve, 500));
      await playThinkingBeeps(2);
      
      const fine = harassmentTypes[type].fines[
        Math.floor(Math.random() * harassmentTypes[type].fines.length)
      ];
      await speak(fine);
      await new Promise(resolve => setTimeout(resolve, 500));
      await speak(`繰り返します。${fine}`);

      setTimeout(() => {
        setIsAnalyzing(false);
        setIsEmergencyFlash(false);
        setSelectedType(null);
        setAnalysisProgress(0);
      }, 1000);

    } catch (error) {
      console.error('Warning sequence failed:', error);
      setIsAnalyzing(false);
      setIsEmergencyFlash(false);
      setAnalysisProgress(0);
    }
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
                      className="w-full bg-white py-6 px-8 rounded-2xl shadow-lg 
                        hover:bg-red-50 active:bg-red-100 transition-all duration-300 
                        border-2 border-red-100 flex items-center justify-between group"
                    >
                      <span className="text-xl sm:text-2xl font-bold tracking-wider">
                        {value.title}
                      </span>
                      <Volume2 className="w-8 h-8 sm:w-10 sm:h-10 text-red-500 
                        group-hover:scale-110 transition-transform" />
                    </button>
                  ))}
                </div>
              )}

              {isAnalyzing && (
                <AnalysisProgress 
                  isEmergencyFlash={isEmergencyFlash}
                  analysisProgress={analysisProgress}
                />
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}; 