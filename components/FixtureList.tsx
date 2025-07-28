
import React, { useState } from 'react';
import { Fixture, Tip, Player } from '../types';
import FixtureCard from './FixtureCard';

interface FixtureListProps {
  fixtures: Fixture[];
  tips: { [matchNumber: number]: { [playerName: string]: Tip } };
  players: Player[];
  onTipChange: (matchNumber: number, playerName: string, tip: Tip) => void;
  onResultChange: (matchNumber: number, homeGoals: number, awayGoals: number) => void;
}

const FixtureList: React.FC<FixtureListProps> = ({ fixtures, tips, players, onTipChange, onResultChange }) => {
  // Group fixtures by round number
  const groupedFixtures = fixtures.reduce<Record<string, Fixture[]>>((acc, fixture) => {
    const round = fixture.roundNumber.toString();
    if (!acc[round]) {
      acc[round] = [];
    }
    acc[round].push(fixture);
    return acc;
  }, {});

  // Sort the round numbers numerically to ensure they are displayed in order
  const sortedRoundNumbers = Object.keys(groupedFixtures).sort((a, b) => parseInt(a, 10) - parseInt(b, 10));
  
  // State to track which rounds are expanded. Initialize with the first round open.
  const [openRounds, setOpenRounds] = useState<Set<string>>(() => 
    sortedRoundNumbers.length > 0 ? new Set([sortedRoundNumbers[0]]) : new Set()
  );

  const toggleRound = (roundNumber: string) => {
    setOpenRounds(prevOpenRounds => {
      const newOpenRounds = new Set(prevOpenRounds);
      if (newOpenRounds.has(roundNumber)) {
        newOpenRounds.delete(roundNumber);
      } else {
        newOpenRounds.add(roundNumber);
      }
      return newOpenRounds;
    });
  };

  return (
    <div className="space-y-4">
      {sortedRoundNumbers.map(roundNumber => {
        const isOpen = openRounds.has(roundNumber);
        return (
          <section key={roundNumber} className="bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700/50 transition-all duration-300">
            <h2 id={`round-heading-${roundNumber}`} className="text-xl font-bold text-white mb-0">
              <button
                type="button"
                className="w-full flex justify-between items-center p-4 md:p-6 text-left hover:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-inset"
                onClick={() => toggleRound(roundNumber)}
                aria-expanded={isOpen}
                aria-controls={`round-content-${roundNumber}`}
              >
                <span>Round {roundNumber}</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={`w-6 h-6 text-cyan-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
            </h2>
            {isOpen && (
              <div id={`round-content-${roundNumber}`} className="p-4 md:p-6 border-t border-gray-700/50">
                <div className="space-y-6">
                  {groupedFixtures[roundNumber].map(fixture => (
                    <FixtureCard
                      key={fixture.matchNumber}
                      fixture={fixture}
                      tips={tips[fixture.matchNumber] || {}}
                      players={players}
                      onTipChange={onTipChange}
                      onResultChange={onResultChange}
                    />
                  ))}
                </div>
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
};

export default FixtureList;
