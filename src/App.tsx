import { useState } from 'react';
import {
    HashRouter,
    Routes,
    Route
} from 'react-router';
import './App.css';
import { getGeneralFacts, getLeaderBoard, type GameResult } from './GameResults';

import { APP_TITLE, Home } from './Home';
import { Setup } from './Setup';
import { Play } from './Play';

const dummyGameResults: GameResult[] = [
    {
        winner: "Bryson",
        players: [
            "Zack",
            "Bryson",
            "Tom",
        ],
        start: "2026-10-03T22:56:44.285Z",
        end: "2026-10-03T23:06:59.285Z",
    },
    {
        winner: "Bryson",
        players: [
            "Bryson",
            "Tom",
            "Suzzie",
        ],
        start: "2026-10-03T22:56:44.285Z",
        end: "2026-10-03T23:06:59.285Z",
    },
    {
        winner: "Zack",
        players: [
            "Zack",
            "Suzzie",
        ],
        start: "2026-10-03T22:56:44.285Z",
        end: "2026-10-03T23:06:59.285Z",
    },
    {
        winner: "John",
        players: [
            "John",
            "Tom",
        ],
        start: "2026-10-05T22:56:44.285Z",
        end: "2026-10-05T23:16:02.285Z",
    },
];

const App = () => {

    // 
    // react hook, eg useState, useEffect, use*
    // 

    // const [gameResults, setGameResults] = useState<GameResult[]>([]);
    const [gameResults, setGameResults] = useState<GameResult[]>(dummyGameResults);

    const [title, setTitle] = useState(APP_TITLE);
    
    // 
    // derived or calculated state and helper funcs
    // 
    const addNewGameResult = (newGameResult: GameResult) => setGameResults([...gameResults, newGameResult]);

    // 
    // return jsx
    // 
    return (
        <>
            <div className="navbar bg-base-100 shadow-sm">
                <p className="font-bold text-xl">{title}</p>
            </div>
            <div
                className="p-3"
            >
                <HashRouter>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <Home
                                    leaderboard={
                                        getLeaderBoard(gameResults)
                                    }
                                    setTitle={
                                        setTitle
                                    }
                                    generalFacts={
                                        getGeneralFacts(gameResults)
                                    }
                                />
                            }
                        />
                        <Route
                            path="/setup"
                            element={
                                <Setup
                                    setTitle={
                                        setTitle
                                    }
                                />
                            }
                        />
                        <Route
                            path="/play"
                            element={
                                <Play
                                    addNewGameResult={
                                        addNewGameResult
                                    }
                                    setTitle={
                                        setTitle
                                    }
                                />
                            }
                        />
                    </Routes>
                </HashRouter>
            </div>
        </>
    )
}

export default App
