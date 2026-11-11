import { useNavigate } from "react-router"
import { type Turn, type GameResult } from "./GameResults";
import { useEffect, useState } from "react";
import { WinnerDialog } from "./components/WinnerDialog";

type PlayProps = {
    addNewGameResult : (r : GameResult) => void
    setTitle : (t : string) => void
    currentPlayers : string[]
}

const turnPhases = ["Play", "Show", "Crib"] as const;
type TurnPhase = typeof turnPhases[number];

export const Play: React.FC<PlayProps> = ({ addNewGameResult, setTitle, currentPlayers }) => {
    const WINNING_SCORE = 121;

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
                play: 0,
            })
        )
    ]);
    const [phaseIndex, setPhaseIndex] = useState<number>(0);
    const [phase, setPhase] = useState<TurnPhase>(turnPhases[phaseIndex]);
    const [nextPhase, setNextPhase] = useState<TurnPhase>(turnPhases[phaseIndex + 1])
    const [showScores, setShowScores] = useState<number[]>([0,0]);
    const [cribScore, setCribScore] = useState<number>(0);
    const [dealer, setDealer] = useState<string | null>(null);

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
                        return acc + curr.play + (curr.show ?? 0) + (curr.crib ?? 0)
                    }, 0
                )
            ));
        }
    , [turns]);

    useEffect(
        () => {
            let winningPlayerIndex = playerTotalScores.findIndex(s => s >= WINNING_SCORE);
            if (winningPlayerIndex > -1) setWinner(currentPlayers[winningPlayerIndex]);
        }
    , [playerTotalScores]);

    
    useEffect(
        () => {
            setPhase(turnPhases[phaseIndex]);
        }
    , [phaseIndex]);
        
    useEffect(
        () => {
            let nextPhaseIndex = phaseIndex + 1;
            if (nextPhaseIndex === turnPhases.length) nextPhaseIndex = 0;
            setNextPhase(turnPhases[nextPhaseIndex])
        }
    , [phaseIndex]);

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

    const updatePlayerScoreThisTurn = (playerName : string, phase : TurnPhase, points : number) => {
        let updatedTurns = [...turns];
        let thisTurn = updatedTurns[updatedTurns.length -1];
        let thisScore = thisTurn.find(t => t.player === playerName);
        if (thisScore) {
            if (phase === 'Play') {
                thisScore.play += points;
            } else if (phase === 'Show') {
                thisScore.show = points
            } else {
                thisScore.crib = points
            }
        };

        setTurns([...updatedTurns]);
    }

    const incrementPhase = () => {
        phaseIndex + 1 < turnPhases.length
            ? setPhaseIndex(phaseIndex + 1)
            : setPhaseIndex(0);
    }

    const incrementTurn = () => {
        let newTurn = currentPlayers.map( p => {
            return {
                player: p,
                play: 0
            }
        });
        setTurns([...turns, newTurn])
    }

    const clearScoreInputs = () => {
        setShowScores([0,0]);
        setCribScore(0);
        setDealer(null);
    }

    // 
    // return jsx
    // 
    return (
        <>
        <h2 className="text-center">
            Turn {turns.length} - {phase}
        </h2>
        <div className="w-100 flex justify-between mx-auto">
            {
                currentPlayers.map( (p, index) => {
                    return (
                        <div key={p} className="w-100 text-center">
                            <p className="text-xl">{p} {playerTotalScores[index]}</p>
                        </div>
                    )
                })
            }
        </div>
        <div className="flex justify-between mx-auto my-5 gap-20">
            {phase === "Play" ? (
                currentPlayers.map( (p) => {
                    return (
                            <button
                                className="btn"
                                onClick={() => updatePlayerScoreThisTurn(p, "Play", 1)}
                            >Peg</button>
                    )
                })
            ) : phase === 'Show' ? (
                currentPlayers.map( (p, index) => {
                    const hasScored = Object.hasOwn(turns[turns.length -1][index], "show");
                    return (
                        <div className="join">
                            <input
                                className="input join-item w-20"
                                type="number"
                                value={showScores[index]}
                                onChange={(e) => {
                                    setShowScores((showScores) => {
                                        return showScores.map( (s, i) => {
                                            if (i === index) return parseInt(e.target.value) ?? 0
                                            return s
                                        })
                                    })
                                }}
                            />
                            <button
                                className="btn join-item"
                                disabled={hasScored}
                                onClick={
                                    () => updatePlayerScoreThisTurn(p, "Show", showScores[index])
                            }
                            >Score</button>
                        </div>
                    )
                })
            ) : (
                <div>
                    <div className="tabs tabs-box w-100 flex justify-center" style={{outline: "2px solid red;"}}>
                        {currentPlayers.map( (p) => {
                            return (
                                <input
                                    type="radio"
                                    name="dealer"
                                    className="tab"
                                    aria-label={p}
                                    value={p}
                                    checked={dealer === p}
                                    onChange={
                                        (e) => setDealer(e.target.value)
                                    }
                                />
                            )
                        })}
                    </div>
                    <div className="join w-100 flex justify-center my-5">
                            <input
                                className="input join-item w-20"
                                type="number"
                                value={cribScore}
                                onChange={(e) => {
                                    setCribScore(parseInt(e.target.value))
                                }}
                            />
                            <button
                                className="btn join-item"
                                disabled={dealer === null || turns[turns.length -1].some(
                                    ts => Object.hasOwn(ts, "crib")
                                )}
                                onClick={
                                    () => dealer && updatePlayerScoreThisTurn(dealer, "Crib", cribScore)
                            }
                            >Score</button>
                    </div>
                </div>
            )}
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
                        if (phase === "Crib") {
                            incrementTurn();
                        }
                        clearScoreInputs();
                        incrementPhase();
                    }
                }
                disabled={(
                    (phase === "Show" && !turns[turns.length -1].every( ts => Object.hasOwn(ts, "show")))
                        || phase === "Crib" && !turns[turns.length -1].some( ts => Object.hasOwn(ts, "crib"))
                )}
            >
                {nextPhase === "Play" ? "Next Turn" : `${nextPhase} Phase`}
            </button>
        </div>
        </>
    )
}