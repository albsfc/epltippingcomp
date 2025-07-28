
import React from 'react';
import { Fixture, Tip, Player, Score } from '../types';
import { calculateScore } from '../utils/scoring';
import PlayerTipInput from './PlayerTipInput';
import ScoreBadge from './ScoreBadge';
import TeamLogo from './TeamLogo';
import { parseDateString } from '../utils/date';

interface FixtureCardProps {
  fixture: Fixture;
  tips: { [playerName: string]: Tip };
  players: Player[];
  onTipChange: (matchNumber: number, playerName:string, tip: Tip) => void;
  onResultChange: (matchNumber: number, homeGoals: number, awayGoals: number) => void;
}

const FixtureCard: React.FC<FixtureCardProps> = ({ fixture, tips, players, onTipChange, onResultChange }) => {
  
  const handleResultChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'home' | 'away') => {
    const value = e.target.value === '' ? undefined : parseInt(e.target.value, 10);
    const currentHome = fixture.actualHomeGoals ?? NaN;
    const currentAway = fixture.actualAwayGoals ?? NaN;

    if(field === 'home') {
        onResultChange(fixture.matchNumber, value ?? NaN, currentAway);
    } else {
        onResultChange(fixture.matchNumber, currentHome, value ?? NaN);
    }
  }

  const hasResult = typeof fixture.actualHomeGoals === 'number' && typeof fixture.actualAwayGoals === 'number';
  
  const fixtureDate = parseDateString(fixture.date);
  const displayDate = !isNaN(fixtureDate.getTime())
    ? fixtureDate.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })
    : 'Invalid Date';


  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700/50">
      <div className="p-4 bg-gray-800/50 border-b border-gray-700/50 flex justify-between items-center flex-wrap gap-2">
        <div className="flex items-center gap-3">
            <span className="text-xs font-bold bg-cyan-900/50 text-cyan-300 px-2 py-1 rounded-full">
                Match {fixture.matchNumber}
            </span>
            <span className="text-sm text-gray-400">{displayDate}</span>
        </div>
        <p className="text-sm text-gray-400">{fixture.location}</p>
      </div>
      
      <div className="p-4 md:p-6 flex items-center justify-around">
        <div className="flex flex-col md:flex-row items-center gap-4 w-1/3 justify-end">
          <h3 className="text-lg md:text-xl font-bold text-center md:text-right">{fixture.homeTeam}</h3>
          <TeamLogo teamName={fixture.homeTeam} className="w-12 h-12 md:w-16 md:h-16" />
        </div>

        <div className="flex items-center gap-2 mx-4">
             <input
                type="number"
                min="0"
                aria-label={`Actual score for ${fixture.homeTeam}`}
                className="w-20 h-16 text-3xl font-bold bg-gray-900 text-white text-center rounded-md border border-gray-600 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none"
                value={fixture.actualHomeGoals ?? ''}
                onChange={(e) => handleResultChange(e, 'home')}
                placeholder="-"
            />
            <span className="text-2xl text-gray-500 font-light">-</span>
            <input
                type="number"
                min="0"
                aria-label={`Actual score for ${fixture.awayTeam}`}
                className="w-20 h-16 text-3xl font-bold bg-gray-900 text-white text-center rounded-md border border-gray-600 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none"
                value={fixture.actualAwayGoals ?? ''}
                onChange={(e) => handleResultChange(e, 'away')}
                placeholder="-"
            />
        </div>
        
        <div className="flex flex-col md:flex-row-reverse items-center gap-4 w-1/3 justify-end">
            <h3 className="text-lg md:text-xl font-bold text-center md:text-left">{fixture.awayTeam}</h3>
            <TeamLogo teamName={fixture.awayTeam} className="w-12 h-12 md:w-16 md:h-16" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-700/50">
        {players.map(player => {
          const playerTip = tips[player.name];
          let score: Score | undefined;
          if (hasResult && playerTip) {
            score = calculateScore(playerTip, { homeGoals: fixture.actualHomeGoals!, awayGoals: fixture.actualAwayGoals! });
          }

          return (
            <div key={player.name} className="p-4 bg-gray-800 flex justify-between items-center">
                <div>
                    <p className="font-bold text-white">{player.name}</p>
                    <PlayerTipInput
                        tip={playerTip}
                        onTipChange={(tip) => onTipChange(fixture.matchNumber, player.name, tip)}
                    />
                </div>
                {score && <ScoreBadge score={score} />}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FixtureCard;
