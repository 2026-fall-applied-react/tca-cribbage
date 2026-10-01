import { useNavigate } from "react-router"
import type { GameResult } from "./GameResults";
import { useEffect } from "react";

type PlayProps = {
    addNewGameResult : (r : GameResult) => void
    setTitle: (t : string) => void
}

export const Play : React.FC<PlayProps> = ({ addNewGameResult, setTitle }) => {

    // 
    // react hooks
    // 
    useEffect(
        () => setTitle("Play"),
        []
    )
    const nav = useNavigate();

    // 
    // return jsx
    // 
    return (
        <div>
            <button
                className="btn btn-soft btn-lg mt-3 w-full lg:w-64"
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