
import React from 'react';
import { PlayerTotalScore } from '../types';

interface LeaderboardProps {
  scores: PlayerTotalScore[];
}

const Leaderboard: React.FC<LeaderboardProps> = ({ scores }) => {
  const rankColors = [
      'from-amber-400 to-yellow-500', 
      'from-slate-300 to-slate-400',
      'from-amber-600 to-orange-600'
  ];

  return (
    <section className="mb-8 p-6 bg-gray-800/50 rounded-xl shadow-2xl border border-gray-700">
      <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-amber-400">
          <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm.53 5.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72v5.69a.75.75 0 0 0 1.5 0v-5.69l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z" clipRule="evenodd" />
        </svg>
        Leaderboard
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {scores.map((scoreItem, index) => (
          <div
            key={scoreItem.player.name}
            className={`p-4 rounded-lg flex items-center justify-between shadow-lg transition-all duration-300 transform hover:scale-105 border-t-4 ${
                index < 3 ? 'border-t-transparent' : 'border-t-gray-700'
            } ${index < 3 ? 'bg-gradient-to-br ' + rankColors[index] : 'bg-gray-700'}`}
          >
            <div className="flex items-center space-x-4">
              <span className={`text-2xl font-bold ${index < 3 ? 'text-gray-900' : 'text-cyan-400'}`}>#{index + 1}</span>
              <p className={`text-xl font-semibold ${index < 3 ? 'text-gray-800' : 'text-white'}`}>{scoreItem.player.name}</p>
            </div>
            <p className={`text-3xl font-black ${index < 3 ? 'text-gray-900/80' : 'text-white'}`}>{scoreItem.totalScore}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Leaderboard;
