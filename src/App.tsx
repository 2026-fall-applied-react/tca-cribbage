import { useEffect, useState } from 'react';
import localforage from 'localforage';
import {
    HashRouter,
    Routes,
    Route
} from 'react-router';
import './App.css';
import { getGameDurations, getGeneralFacts, getLeaderBoard, getPreviousPlayers, type GameResult } from './GameResults';

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

const DEFAULT_THEME = "light";
const OTHER_THEME = "dark";

const App = () => {

    // 
    // react hook, eg useState, useEffect, use*
    // 

    // const [gameResults, setGameResults] = useState<GameResult[]>([]);
    const [gameResults, setGameResults] = useState<GameResult[]>(dummyGameResults);
    const [currentPlayers, setCurrentPlayers] = useState<string[]>([]);
    const [title, setTitle] = useState(APP_TITLE);
    const [theme, setTheme] = useState(DEFAULT_THEME);

    useEffect(() => {
        const loadTheme = async() => {
            const savedTheme = await localforage.getItem<string>("theme") ?? DEFAULT_THEME;

            if (!ignore) setTheme(savedTheme);
        }

        let ignore = false;
        loadTheme();

        // clean up method - runs after effect runs so will not run again
        return () => {
            ignore = true;
        }
    }, []);

    // 
    // derived or calculated state and helper funcs
    // 
    const addNewGameResult = (newGameResult: GameResult) => setGameResults([...gameResults, newGameResult]);

    // 
    // return jsx
    // 
    return (
        <div
            className="min-h-screen"
            data-theme={theme}
        >
            <div className="navbar bg-base-100 shadow-sm">
                <p className="font-bold text-xl">
                    {title}
                </p>
                <label className="swap swap-rotate ml-auto">
                    {/* this hidden checkbox controls the state */}
                    <input
                        type="checkbox"
                        checked={theme !== DEFAULT_THEME}
                        onChange={
                            async () => {
                                const savedTheme = await localforage.setItem<string>(
                                    "theme",
                                    theme === DEFAULT_THEME
                                        ? OTHER_THEME
                                        : DEFAULT_THEME
                                )
                                setTheme(savedTheme);
                            }
                        }
                    />
                    {/* sun icon */}
                    <svg
                        className="swap-on h-7 w-7 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <path
                            d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                    </svg>

                    {/* moon icon */}
                    <svg
                        className="swap-off h-7 w-7 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <path
                            d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                    </svg>
                </label>
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
                                    gameDurations={
                                        getGameDurations(gameResults)
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
                                    previousPlayers={
                                        getPreviousPlayers(gameResults)
                                    }
                                    setCurrentPlayers={
                                        setCurrentPlayers
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
                                    currentPlayers={
                                        currentPlayers
                                    }
                                />
                            }
                        />
                    </Routes>
                </HashRouter>
            </div>
        </div>
    )
}

export default App
