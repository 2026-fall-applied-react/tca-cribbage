import { useState } from "react"

type ScoreInputProps = {
    disabled : boolean
    updater : (score : number) => void
}

export const ScoreInput : React.FC<ScoreInputProps> = ({ disabled, updater }) => {
    const [score, setScore] = useState(0);

    return (
        <div className="join mx-auto">
            <input
                type="number"
                className="join-item w-20 text-center"
                min="0"
                value={score}
                disabled={disabled}
                onChange={e => setScore(parseInt(e.target.value))}
            />
            <button
                className="btn join-item"
                disabled={disabled}
                onClick={() => updater(score)}
            >
                Score
            </button>
        </div>
    )
}