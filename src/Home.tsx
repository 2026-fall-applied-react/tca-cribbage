import { useNavigate } from "react-router"
import type { LeaderBoardEntry } from "./GameResults";

type HomeProps = {
    leaderboard: LeaderBoardEntry[]
}

export const Home: React.FC<HomeProps> = ({
    leaderboard: lb
}) => {
    // 
    // react hooks
    // 
    const nav = useNavigate();

    // 
    // calculated/derived state
    // 

    // 
    // return jsx
    // 
    return (
        <div>
            <h1>
                Home
            </h1>
            <button
                className="btn btn-soft btn-lg mt-3"
                onClick={
                    () => nav('/setup')
                }
            >
                Setup a Game
            </button>
            <div className="card w-full bg-base-100 card-md shadow-lg my-5">
                <div className="card-body p-0">
                    <h2 className="card-title ml-3 mt-3">
                        Leaderboard
                    </h2>
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
                                            <tr>
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
                </div>
            </div>
        </div>
    )
}