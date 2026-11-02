import { useNavigate } from "react-router"
import { type Turn, type GameResult } from "./GameResults";
import { useEffect, useState } from "react";
import { WinnerDialog } from "./components/WinnerDialog";

type PlayProps = {
    addNewGameResult : (r : GameResult) => void
    setTitle : (t : string) => void
    currentPlayers : string[]
}

export const Play: React.FC<PlayProps> = ({ addNewGameResult, setTitle, currentPlayers }) => {
    const WINNING_SCORE = 10;

    // 
    // react hooks
    //
    const [playerTotalScores, setTotalPlayerScores] = useState([0, 0]);
    const [startTimeStamp] = useState(new Date().toISOString());
    const [winner, setWinner] = useState("");
    const [turns, setTurns] = useState<Turn[]>([
        currentPlayers.map(
            p => ({
                player: p,
                play: 0
            })
        )
    ]);

    useEffect(
        () => setTitle("Play"),
        []
    )

    useEffect(
        () => {
            setTotalPlayerScores(currentPlayers.map(
                (_p, i) => turns.map(
                    turn => turn[i]
                ).reduce(
                    (acc, curr) => {
                        return acc + curr.play
                    }, 0
                )
            ));
        }
    , [turns])

    useEffect(
        () => {
            let winningPlayerIndex = playerTotalScores.findIndex(s => s >= WINNING_SCORE);
            if (winningPlayerIndex > -1) setWinner(currentPlayers[winningPlayerIndex]);
        }
    , [playerTotalScores])

    const nav = useNavigate();

    // 
    // helpers
    // 
    const declareWinner = (winner : string) => {
        addNewGameResult({
            winner: winner,
            players: currentPlayers,
            turns,
            start: startTimeStamp,
            end: new Date().toISOString()
        })
        nav(-2);
    }

    const updatePlayerScoreThisTurn = (playerName : string) => {
        let updatedTurns = [...turns];
        let thisTurn = updatedTurns[updatedTurns.length -1];
        let thisScore = thisTurn.find(t => t.player === playerName);
        if (thisScore) thisScore.play++;

        setTurns([...updatedTurns]);
    }

    // 
    // return jsx
    // 
    return (
        <>
        <h2 className="text-center">
            Turn {turns.length}
        </h2>
        <div className="w-100 flex justify-between mx-auto">
            {
                currentPlayers.map( (p, index) => {
                    return (
                        <div key={p}>
                            <p className="text-xl">{p} {playerTotalScores[index]}</p>
                            <button
                                className="btn"
                                onClick={() => updatePlayerScoreThisTurn(p)}
                            >Peg</button>
                        </div>
                    )
                })
            }
        </div>
        <div
            className="flex flex-col lg:flex-row gap-3 justify-center"
        >
        <WinnerDialog
            winner={winner}
            callback={declareWinner}
        />
        </div>
        <div className="flex flex-center">
            <button
                className="btn mx-auto"
                onClick={
                    () => {
                        let newTurn = currentPlayers.map( p => {
                            return {
                                player: p,
                                play: 0
                            }
                        });
                        setTurns([...turns, newTurn])
                    }
                }
            >
                Next Turn
            </button>
        </div>
        </>
    )
}