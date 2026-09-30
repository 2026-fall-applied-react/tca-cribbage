import { useNavigate } from "react-router"
import type { LeaderBoardEntry } from "./GameResults";

type HomeProps = {
    leaderboard : LeaderBoardEntry[]
}

export const Home : React.FC<HomeProps> = ({
    leaderboard: lb
}) => {

    console.log(lb)
    const nav = useNavigate();

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
        </div>
    )
}