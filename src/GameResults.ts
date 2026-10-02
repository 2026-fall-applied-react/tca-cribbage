// 
// type defs/aliases
// 
export type GameResult = {
    winner: string;
    players: string[];
}

export type LeaderBoardEntry = {
    wins: number
    losses: number
    avg: number
    player: string
}

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
