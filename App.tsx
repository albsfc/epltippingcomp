
import React, { useState, useEffect, useCallback } from 'react';
import { Fixture, Tip, Player } from './types';
import { fetchFixtures } from './services/fixtureService';
import { calculateTotalScores } from './utils/scoring';
import Header from './components/Header';
import Leaderboard from './components/Leaderboard';
import FixtureList from './components/FixtureList';
import { PLAYERS } from './constants';
import { parseDateString } from './utils/date';

const App: React.FC = () => {
  const [fixtures, setFixtures] = useState<Fixture[]>([]);
  const [tips, setTips] = useState<{ [matchNumber: number]: { [playerName: string]: Tip } }>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFixtures = async () => {
      try {
        setIsLoading(true);
        const fetchedFixtures = await fetchFixtures();
        
        // Sort fixtures by round, then date, then match number for a stable, logical order
        const sortedFixtures = fetchedFixtures.sort((a, b) => {
          // Primary sort: by round number
          if (a.roundNumber !== b.roundNumber) {
            return a.roundNumber - b.roundNumber;
          }
          // Secondary sort: by date, using the reliable parser
          const dateA = parseDateString(a.date);
          const dateB = parseDateString(b.date);
          if (dateA.getTime() !== dateB.getTime()) {
            return dateA.getTime() - dateB.getTime();
          }
          // Tertiary sort: by match number for stable ordering
          return a.matchNumber - b.matchNumber;
        });

        setFixtures(sortedFixtures);
        setError(null);
      } catch (err) {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError("An unknown error occurred.");
        }
      } finally {
        setIsLoading(false);
      }
    };
    loadFixtures();
  }, []);

  const handleTipChange = useCallback((matchNumber: number, playerName: string, tip: Tip) => {
    setTips(prevTips => ({
      ...prevTips,
      [matchNumber]: {
        ...prevTips[matchNumber],
        [playerName]: tip,
      },
    }));
  }, []);

  const handleResultChange = useCallback((matchNumber: number, homeGoals: number, awayGoals: number) => {
    setFixtures(prevFixtures =>
      prevFixtures.map(fixture =>
        fixture.matchNumber === matchNumber
          ? { ...fixture, actualHomeGoals: homeGoals, actualAwayGoals: awayGoals }
          : fixture
      )
    );
  }, []);

  const scores = calculateTotalScores(fixtures, tips, PLAYERS);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      <Header />
      <main className="container mx-auto p-4 lg:p-8">
        <Leaderboard scores={scores} />
        {isLoading && (
          <div className="text-center py-10">
            <p className="text-xl text-cyan-400">Loading fixtures...</p>
          </div>
        )}
        {error && (
          <div className="text-center py-10 bg-red-900/50 p-4 rounded-lg">
            <p className="text-xl text-red-400">Error loading data</p>
            <p className="text-gray-400 mt-2">{error}</p>
          </div>
        )}
        {!isLoading && !error && (
          <FixtureList
            fixtures={fixtures}
            tips={tips}
            players={PLAYERS}
            onTipChange={handleTipChange}
            onResultChange={handleResultChange}
          />
        )}
      </main>
    </div>
  );
};

export default App;
