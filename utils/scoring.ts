
import { Tip, Score, Fixture, Player, PlayerTotalScore } from '../types';

// Determines if the predicted result (win/loss/draw) matches the actual result.
const getResult = (homeGoals: number, awayGoals: number): 'HOME_WIN' | 'AWAY_WIN' | 'DRAW' => {
  if (homeGoals > awayGoals) return 'HOME_WIN';
  if (awayGoals > homeGoals) return 'AWAY_WIN';
  return 'DRAW';
};

// Calculates the score for a single tip against an actual result.
export const calculateScore = (tip: Tip, actual: { homeGoals: number; awayGoals: number }): Score => {
  const tipResult = getResult(tip.homeGoals, tip.awayGoals);
  const actualResult = getResult(actual.homeGoals, actual.awayGoals);

  const resultPoints = tipResult === actualResult ? 3 : 0;
  const homeGoalsPoints = tip.homeGoals === actual.homeGoals ? 3 : 0;
  const awayGoalsPoints = tip.awayGoals === actual.awayGoals ? 3 : 0;

  const allCorrect = resultPoints === 3 && homeGoalsPoints === 3 && awayGoalsPoints === 3;
  const bonusPoints = allCorrect ? 1 : 0;

  const totalPoints = resultPoints + homeGoalsPoints + awayGoalsPoints + bonusPoints;

  return { resultPoints, homeGoalsPoints, awayGoalsPoints, bonusPoints, totalPoints };
};


// Calculates the total scores for all players across all completed fixtures.
export const calculateTotalScores = (fixtures: Fixture[], tips: { [matchNumber: number]: { [playerName: string]: Tip } }, players: Player[]): PlayerTotalScore[] => {
    const playerScores: { [playerName: string]: number } = players.reduce((acc, player) => ({ ...acc, [player.name]: 0 }), {});

    fixtures.forEach(fixture => {
        if (typeof fixture.actualHomeGoals === 'number' && typeof fixture.actualAwayGoals === 'number') {
            const matchTips = tips[fixture.matchNumber];
            if (matchTips) {
                players.forEach(player => {
                    const playerTip = matchTips[player.name];
                    if (playerTip) {
                        const score = calculateScore(playerTip, { homeGoals: fixture.actualHomeGoals!, awayGoals: fixture.actualAwayGoals! });
                        playerScores[player.name] += score.totalPoints;
                    }
                });
            }
        }
    });

    return players.map(player => ({
        player,
        totalScore: playerScores[player.name]
    })).sort((a, b) => b.totalScore - a.totalScore);
};
