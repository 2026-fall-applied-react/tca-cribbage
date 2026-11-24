import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { type Turn, type GameResult } from "./GameResults";

import { WinnerDialog } from "./components/WinnerDialog";
import { TurnInfo } from "./components/TurnInfo";
import { AdvanceButton } from "./components/AdvanceButton";
import { ScoreInput } from "./components/ScoreInput";
import { PlayerInfo } from "./components/PlayerInfo";
import { DealerPicker } from "./components/DealerPicker";

type PlayProps = {
    addNewGameResult: (r: GameResult) => void
    setTitle: (t: string) => void
    currentPlayers: string[]
}



export const Play: React.FC<PlayProps> = ({ addNewGameResult, setTitle, currentPlayers }) => {
    const WINNING_SCORE = 121;

    type TurnPhase = "play" | "show" | "crib";
    const phaseMap: Record<TurnPhase, TurnPhase> = {
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

    // disallow advancing turn if show phase AND not ALL scores set, or crib and not SOME score set
    const disableAdvance =
        (phase === "show" && !turns[turns.length - 1].every(ts => Object.hasOwn(ts, "show")))
        || (phase === "crib" && !turns[turns.length - 1].some(ts => Object.hasOwn(ts, "crib")))

    const declareWinner = (winner: string) => {
        addNewGameResult({
            winner: winner,
            players: currentPlayers,
            turns,
            start: startTimeStamp,
            end: new Date().toISOString()
        })
        nav(-2);
    }

    const pegForPlayer = (playerName: string) => {
        let updatedTurns = [...turns];
        let thisTurn = updatedTurns[updatedTurns.length - 1];
        let thisScore = thisTurn.find(t => t.player === playerName);
        if (thisScore) {
            thisScore.play += 1;
        }

        setTurns([...updatedTurns]);
    }

    const updatePlayerScoreThisTurn = (playerName: string, points: number) => {
        let updatedTurns = [...turns];
        let thisTurn = updatedTurns[updatedTurns.length - 1];
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
        let newTurn = currentPlayers.map(p => {
            return {
                player: p,
                play: 0
            }
        });
        setTurns([...turns, newTurn])
    }

    const clearScoreInputs = () => {
        setDealer(null);
    }

    const capitalize = (str: string) => str.split("")
        .map((c, i) => i === 0 ? c.toUpperCase() : c)
        .join("");

    // 
    // return jsx
    // 
    return (
        <>
            <TurnInfo
                num={turns.length}
                phase={capitalize(phase)}
            />
            <div className="flex justify-center">
                {phase === "play" && currentPlayers.map((p, index) => {
                    return (
                        <div className="card w-96 bg-base-100 card-xl shadow-sm" key={p}>
                            <div className="card-body p-5">
                                <PlayerInfo
                                    name={p}
                                    score={totals[index]}
                                    reverse={index > 0}
                                />
                                <div className="justify-center card-actions">
                                    <button
                                        className="btn"
                                        onClick={() => pegForPlayer(p)}
                                    >
                                        Peg
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                })}
                {phase === "show" && currentPlayers.map((p, index) => {
                    return (
                        <div className="card w-96 bg-base-100 card-xl shadow-sm" key={p}>
                            <div className="card-body p-5">
                                <PlayerInfo
                                    name={p}
                                    score={totals[index]}
                                    reverse={index > 0}
                                />
                                <div className="justify-center card-actions">
                                    <ScoreInput
                                        disabled={Object.hasOwn(turns[turns.length - 1][index], "show")}
                                        updater={(score: number) => updatePlayerScoreThisTurn(p, score)}
                                    />
                                </div>
                            </div>
                        </div>
                    )
                })}
                {phase === 'crib' && (
                    <div className="flex-column">
                        <div className="flex justify-between">
                            {currentPlayers.map((p, index) => {
                                return (
                                    <PlayerInfo
                                        name={p}
                                        score={totals[index]}
                                        reverse={index > 0}
                                        key={p}
                                    />
                                )
                            })}
                        </div>
                        <div className="card w-96 bg-base-100 card-xl shadow-sm">
                            <div className="card-body">
                                <DealerPicker
                                    players={currentPlayers}
                                    dealer={dealer}
                                    updater={(player : string) => setDealer(player)}
                                />
                                <ScoreInput
                                    disabled={dealer === null || turns[turns.length - 1].some(
                                        ts => Object.hasOwn(ts, "crib")
                                    )}
                                    updater={
                                        (score: number) => dealer && updatePlayerScoreThisTurn(dealer, score)
                                    }
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <WinnerDialog
                winner={currentPlayers[winnerIndex]}
                callback={declareWinner}
            />
            <AdvanceButton
                text={nextPhase === "play" ? "Next Turn" : `${capitalize(nextPhase)} Phase`}
                disable={disableAdvance}
                callback={() => {
                    if (phase === "crib") {
                        incrementTurn();
                    }
                    clearScoreInputs();
                    incrementPhase();
                }}
            />
        </>
    )
}