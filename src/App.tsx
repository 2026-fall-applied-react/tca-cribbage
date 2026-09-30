import { useState } from 'react';
import {
    HashRouter,
    Routes,
    Route
} from 'react-router';
import './App.css';

import { getLeaderBoard, type GameResult } from './GameResults';
import { Home } from './Home';
import { Setup } from './Setup';
import { Play } from './Play';

const dummyGameResults : GameResult[] = [
  {
    winner: "Bryson",
    players: [
      "Zack",
      "Bryson",
      "Tom",
    ],
  },
  {
    winner: "Bryson",
    players: [
      "Bryson",
      "Tom",
      "Suzie",
    ],
  },
  {
    winner: "Zack",
    players: [
      "Zack",
      "Suzie"
    ]
  },
  {
    winner: "John",
    players: [
      "John",
      "Tom"
    ]
  },
];

const App = () => {

    // 
    // react hook, eg useState, useEffect, use*
    // 

    // const [gameResults, setGameResults] = useState<GameResult[]>([]);
    const [gameResults, setGameResults] = useState<GameResult[]>(dummyGameResults);

    // 
    // derived or calculated state and helper funcs
    // 

    // 
    // return jsx
    // 
    return (
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
                            />
                        }
                    />
                    <Route
                        path="/setup"
                        element={
                            <Setup />
                        }
                    />
                    <Route
                        path="/play"
                        element={
                            <Play />
                        }
                    />
                </Routes>
            </HashRouter>
        </div>
    )
}

export default App
