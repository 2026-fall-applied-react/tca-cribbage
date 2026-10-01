import { useEffect } from "react"
import { useNavigate } from "react-router"

type SetupProps = {
    setTitle: (t : string) => void
}

export const Setup : React.FC<SetupProps> = ({ setTitle }) => {

    // 
    // react hooks
    // 
    useEffect(
        () => setTitle("Setup"),
        []
    )

    const nav = useNavigate();

    // 
    // derived state
    // 

    // 
    // return jsx
    // 
    return (
        <div>
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