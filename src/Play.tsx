import { useNavigate } from "react-router"
import type { GameResult } from "./GameResults";
import { useEffect, useState } from "react";

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

    const [startTimeStamp] = useState(new Date().toISOString());

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
                            start: startTimeStamp,
                            end: new Date().toISOString()
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