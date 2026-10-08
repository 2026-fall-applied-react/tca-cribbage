import { useEffect } from "react";
import { useNavigate } from "react-router"
import type { GeneralFacts, LeaderBoardEntry } from "./GameResults";

export const APP_TITLE = "Cribbage Companion";

type HomeProps = {
    leaderboard : LeaderBoardEntry[]
    setTitle : (t : string) => void
    generalFacts : GeneralFacts
}

export const Home : React.FC<HomeProps> = ({
    leaderboard: lb,
    setTitle,
    generalFacts
}) => {
    // 
    // react hooks
    // 
    useEffect(
        () => setTitle(APP_TITLE),
        []
    )

    const nav = useNavigate();

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
        </div>
    )
}