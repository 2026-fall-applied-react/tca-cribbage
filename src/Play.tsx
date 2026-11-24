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
    const WINNING_SCORE = 121;

    type TurnPhase = "play" | "show" | "crib";
    const phaseMap : Record<TurnPhase, TurnPhase> = {
        "play": "show",
        "show": "crib",
        "crib": "play"
    }

    // 
    // react hooks
    //
    const [startTimeStamp] = useState(new Date().toISOString());
    const [turns, setTurns] = useState<Turn[]>([
        currentPlayers.map(
            p => ({
                player: p,
                play: 0,
            })
        )
    ]);
    const [phase, setPhase] = useState<TurnPhase>("play");
    const [showScores, setShowScores] = useState<number[]>([0,0]);
    const [cribScore, setCribScore] = useState<number>(0);
    const [dealer, setDealer] = useState<string | null>(null);

    useEffect(
        () => setTitle("Play"),
        []
    );

    const nav = useNavigate();

    // 
    // derived or calculated state and helper funcs
    // 
    const totals = currentPlayers.map(
        (_p, i) => turns.map(
            turn => turn[i]
        ).reduce(
            (acc, curr) => {
                return acc + curr.play + (curr.show ?? 0) + (curr.crib ?? 0)
            }, 0
        )
    );

    const winnerIndex = totals.findIndex(t => t >= WINNING_SCORE);
    const nextPhase = phaseMap[phase];

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

    const pegForPlayer = (playerName : string) => {
        let updatedTurns = [...turns];
        let thisTurn = updatedTurns[updatedTurns.length -1];
        let thisScore = thisTurn.find(t => t.player === playerName);
        if (thisScore) {
            thisScore.play += 1;
        }

        setTurns([...updatedTurns]);
    }

    const updatePlayerScoreThisTurn = (playerName : string, points : number) => {
        let updatedTurns = [...turns];
        let thisTurn = updatedTurns[updatedTurns.length -1];
        let thisScore = thisTurn.find(t => t.player === playerName);
        if (thisScore) {
            thisScore[phase] = points;
        };

        setTurns([...updatedTurns]);
    }

    const incrementPhase = () => {
        setPhase(nextPhase)
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

    const capitalize = (str : string) => str.split("")
        .map( (c, i) => i === 0 ? c.toUpperCase() : c)
        .join("");

    // 
    // return jsx
    // 
    return (
        <>
        <h2 className="text-center">
            Turn {turns.length} - {capitalize(phase)}
        </h2>
        <div className="w-100 flex justify-between mx-auto">
            {
                currentPlayers.map( (p, index) => {
                    return (
                        <div key={p} className="w-100 text-center">
                            <p className="text-xl">{p} {totals[index]}</p>
                        </div>
                    )
                })
            }
        </div>
        <div className="flex justify-between mx-auto my-5 gap-20">
            {phase === "play" ? (
                currentPlayers.map( (p) => {
                    return (
                            <button
                                className="btn"
                                onClick={() => pegForPlayer(p)}
                            >Peg</button>
                    )
                })
            ) : phase === 'show' ? (
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
                                    () => updatePlayerScoreThisTurn(p, showScores[index])
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
                                    () => dealer && updatePlayerScoreThisTurn(dealer, cribScore)
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
            winner={currentPlayers[winnerIndex]}
            callback={declareWinner}
        />
        </div>
        <div className="flex flex-center">
            <button
                className="btn mx-auto"
                onClick={
                    () => {
                        if (phase === "crib") {
                            incrementTurn();
                        }
                        clearScoreInputs();
                        incrementPhase();
                    }
                }
                disabled={(
                    (phase === "show" && !turns[turns.length -1].every( ts => Object.hasOwn(ts, "show")))
                        || phase === "crib" && !turns[turns.length -1].some( ts => Object.hasOwn(ts, "crib"))
                )}
            >
                {nextPhase === "play" ? "Next Turn" : `${capitalize(nextPhase)} Phase`}
            </button>
        </div>
        </>
    )
}