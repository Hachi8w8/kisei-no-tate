import { useCallback, useRef } from 'react';
import { HarassmentType } from '../types/harassment';

type SoundType = 'alert' | 'thinking';

export const useAudio = () => {
  const alarmRef = useRef<HTMLAudioElement | null>(null);

  const speak = useCallback((text: string, rate: number = 1.3): Promise<void> => {
    return new Promise<void>((resolve) => {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ja-JP';
      utterance.rate = rate;
      utterance.pitch = 0.5;
      utterance.volume = 1;
      
      utterance.onend = () => resolve();
      window.speechSynthesis.speak(utterance);
    });
  }, []);

  const playAlarm = useCallback((): void => {
    if (alarmRef.current) {
      alarmRef.current.pause();
      alarmRef.current = null;
    }

    const audio = new Audio('/sounds/alarm.mp3');
    audio.loop = true;
    audio.volume = 0.5;
    audio.play()
      .catch((error) => {
        console.error('アラーム再生エラー:', error);
        // ユーザーインタラクション後に再生を試みる場合のフォールバック
        const retryPlay = () => {
          audio.play()
            .then(() => {
              document.removeEventListener('click', retryPlay);
              document.removeEventListener('touchstart', retryPlay);
            })
            .catch(console.error);
        };
        document.addEventListener('click', retryPlay);
        document.addEventListener('touchstart', retryPlay);
      });
    alarmRef.current = audio;
  }, []);

  const stopAlarm = useCallback((): void => {
    if (alarmRef.current) {
      alarmRef.current.pause();
      alarmRef.current = null;
    }
  }, []);

  const playSound = useCallback((type: SoundType): Promise<void> => {
    return new Promise<void>((resolve) => {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const audioContext = new AudioContext();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      const soundConfigs = {
        alert: {
          type: 'square' as OscillatorType,
          frequency: [880, 440],
          duration: 0.4,
          gain: 0.3
        },
        thinking: {
          type: 'sine' as OscillatorType,
          frequency: [300, 300],
          duration: 0.2,
          gain: 0.2
        }
      };

      const config = soundConfigs[type];
      oscillator.type = config.type;
      oscillator.frequency.setValueAtTime(config.frequency[0], audioContext.currentTime);
      
      if (config.frequency[0] !== config.frequency[1]) {
        oscillator.frequency.linearRampToValueAtTime(
          config.frequency[1], 
          audioContext.currentTime + config.duration
        );
      }

      gainNode.gain.setValueAtTime(config.gain, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + config.duration);
      
      oscillator.start();
      oscillator.stop(audioContext.currentTime + config.duration);
      setTimeout(resolve, config.duration * 1000);
    });
  }, []);

  return { speak, playSound, playAlarm, stopAlarm };
}; 