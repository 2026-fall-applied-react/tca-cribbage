import { useNavigate } from "react-router"
import type { GameResult } from "./GameResults";
import { useEffect, useState, useRef } from "react";

type PlayProps = {
    addNewGameResult : (r : GameResult) => void
    setTitle : (t : string) => void
    currentPlayers : string[]
}

export const Play: React.FC<PlayProps> = ({ addNewGameResult, setTitle, currentPlayers }) => {
    const WINNING_SCORE = 12;

    // 
    // react hooks
    //
    const [playerScores, setPlayerScores] = useState([0, 0]);
    const [startTimeStamp] = useState(new Date().toISOString());
    const [winner, setWinner] = useState("");

    const dialogEl= useRef<HTMLDialogElement>(null);

    useEffect(
        () => setTitle("Play"),
        []
    )

    const nav = useNavigate();

    // 
    // helpers
    // 
    const declareWinner = (winner : string) => {
        addNewGameResult({
            winner: winner,
            players: currentPlayers,
            start: startTimeStamp,
            end: new Date().toISOString()
        })
        nav(-2);
    }

    const showWinnerDialog = () => {
        if (dialogEl.current) {
            dialogEl.current.showModal();
        }
    }

    // 
    // return jsx
    // 
    return (
        <div
            className="flex flex-col lg:flex-row gap-3"
        >
            {
                currentPlayers.map(
                    (x, index) => (
                        <div
                            key={x}
                            className="flex flex-col content-center"
                        >
                            <label className="mx-3" htmlFor="">
                                {x} Score
                                <input
                                    id={`${x}ScoreInput`}
                                    type="number"
                                    min="0"
                                    className="input"
                                    value={playerScores[index]}
                                    onChange={(e) => {
                                        let newScore = Number(e.currentTarget.value);
                                        // if score is >= 121, player wins, no need to set just declare winner
                                        if (newScore >= WINNING_SCORE) {
                                            setWinner(x);
                                            showWinnerDialog();
                                            return;
                                        }

                                        // else update score
                                        setPlayerScores(playerScores.map(
                                            (p, i) =>  i === index ? Number(e.currentTarget.value) : p
                                        ));
                                    }}
                                />
                            </label>
                        </div>
                    )
                )
            }
            <dialog id="winnerDialog" className="modal" ref={dialogEl}>
                <div className="modal-box">
                    <p className="py-4">{winner} wins!</p>
                    <div className="modal-action">
                        <button className="btn" onClick={() => declareWinner(winner)}>End Game</button>
                    </div>
                </div>
            </dialog>
        </div>
    )
}