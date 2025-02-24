import React, { useState, useEffect } from 'react';
import { Volume2 } from 'lucide-react';
import { harassmentTypes } from '../constants/harassmentData';
import { useAudio } from '../hooks/useAudio';
import { HarassmentType } from '../types/harassment';
import { WarningHeader } from './WarningHeader';

const TELOP_TEXT = "みなさん、今は令和ですよ！アップデートしよ🤍";
const REPEAT_COUNT = 20;  // 繰り返す回数

export const HarassmentWarning: React.FC = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedType, setSelectedType] = useState<HarassmentType | null>(null);
  const [alertLevel, setAlertLevel] = useState(0);
  const [isEmergencyFlash, setIsEmergencyFlash] = useState(false);
  const [currentWarning, setCurrentWarning] = useState<string>('');
  const [currentFine, setCurrentFine] = useState<string>('');

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
    // 先に警告テキストを設定
    const warning = harassmentTypes[type].warnings[
      Math.floor(Math.random() * harassmentTypes[type].warnings.length)
    ];
    const fine = harassmentTypes[type].fines[
      Math.floor(Math.random() * harassmentTypes[type].fines.length)
    ];
    
    setCurrentWarning(warning);
    setCurrentFine(fine);
    setSelectedType(type);
    setIsAnalyzing(true);
    setIsEmergencyFlash(true);

    try {
      playAlarm();
      await speak("違反行為検出");
      await new Promise(resolve => setTimeout(resolve, 500));
      await speak("違反行為検出");
      await speak(warning);
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
      marriage: ["結婚催促", "検知"],
      children: ["子孫継承強要", "検知"],
      age: ["年齢干渉", "検知"]
    };
    return parts[title as keyof typeof parts] || [title, ""];
  };

  // メッセージを分割する関数を追加
  const splitWarningMessage = (message: string) => {
    const [level, detail] = message.split('：');
    return { level, detail };
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
                        border-2 border-red-100 group overflow-hidden
                        hover:scale-[1.02] hover:shadow-xl"
                    >
                      {/* 警告線パターン */}
                      <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-red-500/10
                        [mask-image:linear-gradient(45deg,#000_25%,transparent_25%,transparent_50%,#000_50%,#000_75%,transparent_75%,transparent)]
                        bg-[length:24px_24px] opacity-0 group-hover:opacity-100 transition-opacity" />
                      
                      <div className="relative flex items-center justify-between">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-2">
                          <div className="flex lg:items-center gap-2">
                            <img 
                              src="/images/2325796.png" 
                              alt=""
                              className="w-8 h-8 sm:w-10 sm:h-10 
                                group-hover:scale-110 group-focus:scale-110 group-active:scale-110 
                                transition-all self-center"
                            />
                            <div className="flex flex-col">
                              <div className="text-xl sm:text-2xl font-togalite tracking-wider leading-tight
                                group-hover:scale-105 group-focus:scale-105 group-active:scale-105 
                                transition-transform origin-left">
                                {getTitleParts(key)[0]}
                              </div>
                              <div className="text-xl sm:text-2xl font-togalite tracking-wider leading-tight
                                group-hover:scale-105 transition-transform origin-left">
                                {getTitleParts(key)[1]}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-1.5">
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                            <span className="text-sm text-red-500 opacity-75 tracking-wider">READY</span>
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
                  <div className="w-full max-w-3xl bg-black p-8 rounded-lg border-2 border-red-500/30">
                    <div className="space-y-12 text-center">
                      {/* 警告タイトル */}
                      <div className="space-y-4 sm:space-y-8">
                        {/* タイトル */}
                        <div className="flex items-center justify-center gap-2 sm:gap-4">
                          <span className="hidden sm:inline text-4xl sm:text-5xl text-yellow-500 animate-blink">⚠️</span>
                          <div className="text-3xl sm:text-4xl md:text-5xl font-togalite text-red-500 
                            animate-blink
                            [text-shadow:0_0_10px_rgba(239,68,68,0.5)]">
                            {selectedType && getTitleParts(selectedType)[0]}行為を検出
                          </div>
                          <span className="hidden sm:inline text-4xl sm:text-5xl text-yellow-500 animate-blink">⚠️</span>
                        </div>

                        {/* 警告レベルと詳細 */}
                        <div className="p-4 sm:p-6 md:p-8 bg-black rounded-lg border border-red-500/30">
                          <div className="flex flex-col items-center justify-center gap-1 sm:gap-2">
                            <div className="text-xl sm:text-2xl md:text-3xl text-red-500 font-togalite">
                              {currentWarning && splitWarningMessage(currentWarning).level}
                            </div>
                            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-togalite text-red-500
                              [text-shadow:0_0_10px_rgba(239,68,68,0.5)]">
                              {currentWarning && splitWarningMessage(currentWarning).detail}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 警告メッセージは不要なので削除 */}
                      {/* <div className="p-8 bg-black rounded-lg border border-red-500/30">
                        <div className="text-xl sm:text-2xl font-togalite text-red-500 animate-blink">
                          {currentWarning}
                        </div>
                      </div> */}

                      {/* 罰則内容 */}
                      <div className="p-4 sm:p-6 md:p-8 bg-black rounded-lg border border-red-500/30">
                        <div className="text-lg sm:text-xl md:text-2xl font-togalite text-white mb-4 sm:mb-6">
                          違反者への執行命令
                        </div>
                        <div className="text-xl sm:text-2xl md:text-3xl font-togalite text-white">
                          {currentFine}
                        </div>
                      </div>

                      {/* テロップ */}
                      <div className="absolute bottom-0 left-0 right-0 bg-black border-t border-red-500/30 py-4 overflow-hidden">
                        <div className="marquee-text text-xl sm:text-2xl font-togalite text-white">
                          {Array(REPEAT_COUNT).fill(TELOP_TEXT).join('')}
                        </div>
                      </div>
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