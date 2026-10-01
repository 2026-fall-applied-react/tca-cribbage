import { useNavigate } from "react-router"
import type { GameResult } from "./GameResults";

type PlayProps = {
    addNewGameResult : (r : GameResult) => void
}

export const Play : React.FC<PlayProps> = ({ addNewGameResult }) => {

    const nav = useNavigate();

    return (
        <div>
            <h1>
                Play
            </h1>
            <button
                className="btn btn-soft btn-lg mt-3"
                onClick={
                    () => {
                        addNewGameResult({
                            winner: "Hermione",
                            players: ["Hermione", "Harry", "Ron"],
                        })
                        nav(-2);
                    }
                }
            >
                Game Over
            </button>
        </div>
    )
}