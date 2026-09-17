import './App.css';
import {
    HashRouter,
    Routes,
    Route
} from 'react-router';

import { Home } from './Home';
import { Setup } from './Setup';
import { Play } from './Play';

const App = () => {
    return (
        <div
            className="p-3"
        >
            <HashRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Home />
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
