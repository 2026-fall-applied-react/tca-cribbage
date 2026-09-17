import { useNavigate } from "react-router"

export const Setup = () => {

    const nav = useNavigate();

    return (
        <div>
            <h1>
                Setup
            </h1>
            <button
                className="btn btn-soft btn-lg mt-3"
                onClick={
                    () => nav('/play')
                }
            >
                Play the Game
            </button>
        </div>
    )
}