import './App.css'
import {
    HashRouter,
    Routes,
    Route
} from 'react-router'

const Home = () => <h1>Home</h1>;
const Setup = () => <h1>Setup</h1>;
const Play = () => <h1>Play</h1>;

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
