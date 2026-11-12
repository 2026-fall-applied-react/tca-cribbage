import { durationFormatter } from "human-readable";

const formatGameDuration = durationFormatter<string>();

const formatLastPlayed = durationFormatter<string>(
    {
        allowMultiples: ['y', 'mo', 'd'],
    }
);

// 
// type defs/aliases
// 
export type GameResult = {
    winner : string
    players : string[]
    turns : Turn[]
    start : string
    end : string
}

export type Turn = TurnScore[]

export type TurnScore = {
    player: string
    play: number
    show?: number
    crib?: number
}

export type LeaderBoardEntry = {
    wins : number
    losses : number
    avg : number
    player : string
}

export type GameDurationEntry = {
    players : number
    games : number
    avg : string
}

export type StreakGame = {
    end : string
    players : string[]
}

export type WinStreakEntry = {
    player : string
    current : StreakGame[] // empty unless the active run is a real streak
    longest : StreakGame[] // empty unless the best run is a real streak
    longestBrokenBy? : StreakGame & { winner : string } // undefined if the longest streak is still active
}

// a "streak" needs at least this many consecutive wins
export const MIN_STREAK_LENGTH = 1;

export type GeneralFacts = {
    lastPlayed : string
    totalGames : number
    shortestGame : string
    longestGame : string
};

// 
// public funcs
// 
export const getLeaderBoard = (
        games: GameResult[]
    ): LeaderBoardEntry[] => getPreviousPlayers(
        games
    ).map(
        x => ({
            ...getLeaderBoardEntry(
                games,
                x
            )
        })
    )
    .sort(
        (a, b) => (
            a.avg === b.avg
                ? a.wins === 0 && b.wins === 0
                    ? (a.wins + a.losses) - (b.wins + b.losses) // 0 wins, more losses, lower on leaderboard
                    : (b.wins + b.losses) - (a.wins + a.losses) // more games with a win and tied avg means higher on leaderboard
                : b.avg - a.avg
        )
    )

// Streaks only count games the player took part in; a loss ends a streak.
// Runs shorter than MIN_STREAK_LENGTH are reported as empty.
export const getWinStreaks = (
    games: GameResult[]
): WinStreakEntry[] => {
    const chronological = [...games].sort(
        (a, b) => Date.parse(a.end) - Date.parse(b.end)
    );

    return getPreviousPlayers(games).map(
        player => {
            let run: StreakGame[] = [];
            let longest: StreakGame[] = [];
            let longestBrokenBy: WinStreakEntry["longestBrokenBy"];

            chronological
                .filter(g => g.players.includes(player))
                .forEach(
                    g => {
                        if (g.winner === player) {
                            run = [...run, { end: g.end, players: g.players }];
                            if (run.length > longest.length) {
                                longest = run;
                                longestBrokenBy = undefined;
                            }
                        } else {
                            // first loss right after the longest run ends it
                            if (run.length > 0 && run === longest) {
                                longestBrokenBy = { end: g.end, players: g.players, winner: g.winner };
                            }
                            run = [];
                        }
                    }
                );

            const qualifies = (s: StreakGame[]) => s.length >= MIN_STREAK_LENGTH;

            return {
                player,
                current: qualifies(run) ? run : [],
                longest: qualifies(longest) ? longest : [],
                longestBrokenBy: qualifies(longest) ? longestBrokenBy : undefined,
            };
        }
    ).sort(
        (a, b) => b.longest.length - a.longest.length
            || b.current.length - a.current.length
            || a.player.localeCompare(b.player)
    );
};

export const getGeneralFacts = (
    games: GameResult[]
) : GeneralFacts => {
    
    // bail early if no game dummyGameResults
    if (games.length === 0) {
        return (
            {
                lastPlayed: "N/A",
                totalGames: 0,
                shortestGame: "N/A",
                longestGame: "N/A"
            }
        );        
    }

    const nowForCalcs = Date.now();

    const gamesLastPlayedInMs = games.map(
        x => nowForCalcs - Date.parse(x.end)
    );
    
    const mostRecentGameInMs = Math.min(
        ...gamesLastPlayedInMs
    )

    const gameDurationsInMs = games.map(
        x => Date.parse(x.end) - Date.parse(x.start)
    )

    return (
        {
            lastPlayed: `${(formatLastPlayed(mostRecentGameInMs))} ago`,
            totalGames: games.length,
            shortestGame: formatGameDuration(
                Math.min(...gameDurationsInMs)
            ),
            longestGame: formatGameDuration(
                Math.max(...gameDurationsInMs)
            ),
        }
    );
}

export const getGameDurations = (
    games: GameResult[]
): GameDurationEntry[] => games
    // unique player counts
    .map(
        x => x.players.length
    )
    .filter(
        (x, i, a) => i === a.indexOf(x)
    )
    .sort(
        (a, b) => a - b
    )
    .map(
        playerCount => {
            const durationsInMs = games.filter(
                x => x.players.length === playerCount
            ).map(
                x => Date.parse(x.end) - Date.parse(x.start)
            );

            return {
                players: playerCount,
                games: durationsInMs.length,
                avg: formatGameDuration(
                    durationsInMs.reduce((a, b) => a + b, 0) / durationsInMs.length
                )
            };
        }
    );

export const getPreviousPlayers = (
    games: GameResult[]
): string[] => games
    // just the players as a string array
    .flatMap(
        x => x.players
    )
    // just unique players
    .filter(
        (x, i, a) => i === a.findIndex(
            y => y === x
        )
    )
    // sorted alphabetically
    .sort(
        (a, b) => a.localeCompare(b)
    );

// 
// helper funcs
// 
const getLeaderBoardEntry = (
    games: GameResult[],
    player: string,
): LeaderBoardEntry => {

    const numberOfPlayerGames = games.filter(
        x => x.players.some(
            y => y === player
        )
    ).length;

    const numberOfPlayerWins = games.filter(
        x => x.winner === player
    ).length;

    return {
        wins: numberOfPlayerWins,
        losses: numberOfPlayerGames - numberOfPlayerWins,
        avg: numberOfPlayerGames > 0
            ? numberOfPlayerWins / numberOfPlayerGames
            : 0,
        player: player
    }
};


export const generateDummyTurnsArray = (p1 : string, p2 : string) => {
    let numTurns = Math.floor(Math.random() * 15) + 5;
    let turnsArr : Turn[] = []
    for (let i = 0; i < numTurns; i++) {
        turnsArr.push([
            {
                player: p1,
                play: Math.floor(Math.random() * 8) + 2
            },
            {
                player: p2,
                play: Math.floor(Math.random() * 8) + 2
            }
        ])
    }

    return turnsArr
}