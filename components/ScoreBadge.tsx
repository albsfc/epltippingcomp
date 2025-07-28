
import React from 'react';
import { Score } from '../types';

interface ScoreBadgeProps {
  score: Score;
}

const ScoreBadge: React.FC<ScoreBadgeProps> = ({ score }) => {
  const { totalPoints, resultPoints, homeGoalsPoints, awayGoalsPoints, bonusPoints } = score;
  const isPerfect = bonusPoints > 0;

  const scoreDetails = `Result: ${resultPoints} | Home: ${homeGoalsPoints} | Away: ${awayGoalsPoints} | Bonus: ${bonusPoints}`;

  return (
    <div className="relative group">
      <div
        className={`flex items-center justify-center w-14 h-14 rounded-full font-black text-2xl transition-all duration-300
        ${isPerfect ? 'bg-gradient-to-tr from-amber-400 to-yellow-400 text-gray-900 shadow-lg shadow-yellow-500/30' 
                   : totalPoints > 0 ? 'bg-gradient-to-tr from-cyan-500 to-teal-500 text-white' 
                                     : 'bg-gray-700 text-gray-400'}`}
      >
        {totalPoints}
      </div>
      <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-max p-2 text-xs bg-gray-900 text-white rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
        {scoreDetails}
        <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-gray-900"></div>
      </div>
    </div>
  );
};

export default ScoreBadge;
