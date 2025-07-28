
export interface Fixture {
  matchNumber: number;
  roundNumber: number;
  date: string;
  location: string;
  homeTeam: string;
  awayTeam: string;
  actualHomeGoals?: number;
  actualAwayGoals?: number;
}

export interface Tip {
  homeGoals: number;
  awayGoals: number;
}

export interface Player {
  name: string;
}

export interface Score {
  resultPoints: number;
  homeGoalsPoints: number;
  awayGoalsPoints: number;
  bonusPoints: number;
  totalPoints: number;
}

export interface PlayerTotalScore {
    player: Player;
    totalScore: number;
}
