import { useNavigate } from "react-router"

export const Home = () => {

    const nav = useNavigate();

    return (
        <div>
            <h1>
                Home
            </h1>
            <button
                className="btn btn-soft btn-lg mt-3"
                onClick={
                    () => nav('/setup')
                }
            >
                Setup a Game
            </button>
        </div>
    )
}