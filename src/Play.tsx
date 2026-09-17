import { useNavigate } from "react-router"

export const Play = () => {

    const nav = useNavigate();

    return (
        <div>
            <h1>
                Play
            </h1>
            <button
                className="btn btn-soft btn-lg mt-3"
                onClick={
                    () => nav(-2)
                }
            >
                Game Over
            </button>
        </div>
    )
}