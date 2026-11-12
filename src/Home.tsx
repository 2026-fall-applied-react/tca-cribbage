import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router"
import { MIN_STREAK_LENGTH, type GameDurationEntry, type GeneralFacts, type LeaderBoardEntry, type StreakGame, type WinStreakEntry } from "./GameResults";

export const APP_TITLE = "Cribbage Companion";

type HomeProps = {
    leaderboard : LeaderBoardEntry[]
    setTitle : (t : string) => void
    generalFacts : GeneralFacts
    gameDurations : GameDurationEntry[]
    winStreaks : WinStreakEntry[]
}

const formatGameDate = (iso : string) => new Date(iso).toLocaleDateString(
    undefined,
    { year: "numeric", month: "short", day: "numeric" }
);

const StreakGameList : React.FC<{
    title : string
    games : StreakGame[]
    player : string
    brokenBy? : WinStreakEntry["longestBrokenBy"]
}> = ({ title, games, player, brokenBy }) => (
    <div className="mt-3">
        <h4 className="font-semibold">{title} ({games.length})</h4>
        {
            games.length === 0 ? (
                <p className="opacity-70">No streak (needs {MIN_STREAK_LENGTH}+ wins in a row)</p>
            ) : (
                <ul className="list-disc ml-5">
                    {
                        games.map(
                            (g, i) => (
                                <li key={i}>
                                    {formatGameDate(g.end)} vs {g.players.filter(p => p !== player).join(", ")}
                                </li>
                            )
                        )
                    }
                    {
                        brokenBy && (
                            <li className="list-none -ml-5 mt-1 px-2 py-1 rounded bg-error/20 text-error-content">
                                Broken by {brokenBy.winner} on {formatGameDate(brokenBy.end)}
                            </li>
                        )
                    }
                </ul>
            )
        }
    </div>
);

export const Home : React.FC<HomeProps> = ({
    leaderboard: lb,
    setTitle,
    generalFacts,
    gameDurations,
    winStreaks
}) => {
    // 
    // react hooks
    // 
    useEffect(
        () => setTitle(APP_TITLE),
        []
    )

    const nav = useNavigate();

    const streakDialog = useRef<HTMLDialogElement>(null);
    const [streakPlayer, setStreakPlayer] = useState<string | null>(null);
    const selectedStreak = winStreaks.find(x => x.player === streakPlayer);

    // 
    // calculated/derived state
    // 

    // 
    // return jsx
    // 
    return (
        <div>
            <button
                className="btn btn-soft btn-lg mt-3 w-full lg:w-64"
                onClick={
                    () => nav('/setup')
                }
            >
                Setup a Game
            </button>
            <div className="card w-full bg-base-100 card-md shadow-lg my-5">
                <div className="card-body p-0">
                    <h2 className="card-title ml-3 mt-3">
                        General
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="table table-zebra">
                            <tbody>
                                <tr>
                                    <td>Last played</td>
                                    <th>{generalFacts.lastPlayed}</th>
                                </tr>
                                <tr>
                                    <td>Total Games</td>
                                    <th>{generalFacts.totalGames}</th>
                                </tr>
                                <tr>
                                    <td>Shortest Game</td>
                                    <th>{generalFacts.shortestGame}</th>
                                </tr>
                                <tr>
                                    <td>Longest Game</td>
                                    <th>{generalFacts.longestGame}</th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="card w-full bg-base-100 card-md shadow-lg my-5">
                <div className="card-body p-0">
                    <h2 className="card-title ml-3 mt-3">
                        Leaderboard
                    </h2>
                    {
                        lb.length === 0 ? (
                            <p className="m-l-3 mb-5">
                                Setup & play a game to see the leaderboard...
                            </p>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="table table-zebra">
                                    <thead>
                                        <tr>
                                            <th>W</th>
                                            <th>L</th>
                                            <th>AVG</th>
                                            <th>PLAYER</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            lb.map(
                                                x => (
                                                    <tr key={x.player}>
                                                        <td>{x.wins}</td>
                                                        <td>{x.losses}</td>
                                                        <td>{x.avg.toFixed(3)}</td>
                                                        <td>{x.player}</td>
                                                    </tr>
                                                )
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        )
                    }
                </div>
            </div>
            <div className="card w-full bg-base-100 card-md shadow-lg my-5">
                <div className="card-body p-0">
                    <h2 className="card-title ml-3 mt-3">
                        Win Streaks
                    </h2>
                    {
                        winStreaks.length === 0 ? (
                            <p className="m-l-3 mb-5">
                                Setup & play a game to see win streaks...
                            </p>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="table table-zebra">
                                    <thead>
                                        <tr>
                                            <th>PLAYER</th>
                                            <th>CURRENT</th>
                                            <th>LONGEST</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            winStreaks.map(
                                                x => (
                                                    <tr key={x.player}>
                                                        <td>{x.player}</td>
                                                        <td>{x.current.length || "-"}</td>
                                                        <td>{x.longest.length || "-"}</td>
                                                        <td>
                                                            <button
                                                                className="btn btn-xs btn-soft"
                                                                onClick={
                                                                    () => {
                                                                        setStreakPlayer(x.player);
                                                                        streakDialog.current?.showModal();
                                                                    }
                                                                }
                                                            >
                                                                Details
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        )
                    }
                </div>
            </div>
            <dialog className="modal" ref={streakDialog}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">
                        {selectedStreak?.player} - Win Streaks
                    </h3>
                    {
                        selectedStreak && (
                            <>
                                <StreakGameList title="Current streak" games={selectedStreak.current} player={selectedStreak.player} />
                                <StreakGameList title="Longest streak" games={selectedStreak.longest} player={selectedStreak.player} brokenBy={selectedStreak.longestBrokenBy} />
                            </>
                        )
                    }
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
            <div className="card w-full bg-base-100 card-md shadow-lg my-5">
                <div className="card-body p-0">
                    <h2 className="card-title ml-3 mt-3">
                        Game Durations
                    </h2>
                    {
                        gameDurations.length === 0 ? (
                            <p className="m-l-3 mb-5">
                                Setup & play a game to see game durations...
                            </p>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="table table-zebra">
                                    <thead>
                                        <tr>
                                            <th>PLAYERS</th>
                                            <th>GAMES</th>
                                            <th>AVG</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            gameDurations.map(
                                                x => (
                                                    <tr key={x.players}>
                                                        <td>{x.players}</td>
                                                        <td>{x.games}</td>
                                                        <td>{x.avg}</td>
                                                    </tr>
                                                )
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}