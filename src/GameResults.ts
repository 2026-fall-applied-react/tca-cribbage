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
    start : string
    end : string
}

export type LeaderBoardEntry = {
    wins : number
    losses : number
    avg : number
    player : string
}

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

const getPreviousPlayers = (
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
