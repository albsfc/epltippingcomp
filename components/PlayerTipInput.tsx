
import React from 'react';
import { Tip } from '../types';

interface PlayerTipInputProps {
  tip?: Tip;
  onTipChange: (tip: Tip) => void;
}

const PlayerTipInput: React.FC<PlayerTipInputProps> = ({ tip, onTipChange }) => {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'home' | 'away') => {
    const value = e.target.value === '' ? NaN : parseInt(e.target.value, 10);
    const newTip = {
      homeGoals: field === 'home' ? value : tip?.homeGoals ?? NaN,
      awayGoals: field === 'away' ? value : tip?.awayGoals ?? NaN,
    };
    onTipChange(newTip);
  };

  return (
    <div className="flex items-center space-x-2 mt-2">
      <input
        type="number"
        min="0"
        className="w-16 h-12 text-xl bg-gray-700 text-white text-center rounded-md border border-gray-600 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none"
        value={isNaN(tip?.homeGoals ?? NaN) ? '' : tip!.homeGoals}
        onChange={(e) => handleChange(e, 'home')}
        placeholder="-"
        aria-label="Home team tip"
      />
      <span className="text-gray-400">-</span>
      <input
        type="number"
        min="0"
        className="w-16 h-12 text-xl bg-gray-700 text-white text-center rounded-md border border-gray-600 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none"
        value={isNaN(tip?.awayGoals ?? NaN) ? '' : tip!.awayGoals}
        onChange={(e) => handleChange(e, 'away')}
        placeholder="-"
        aria-label="Away team tip"
      />
    </div>
  );
};

export default PlayerTipInput;
