import { useEffect, useState } from "react"
import { useNavigate } from "react-router"

type SetupProps = {
    previousPlayers : string[]
    setTitle: (t : string) => void
}

export const Setup : React.FC<SetupProps> = ({ previousPlayers, setTitle }) => {
    // 
    // react hooks
    // 
    let [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);

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
            <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-64 border p-4">
                <legend className="fieldset-legend">Select two players:</legend>
                {previousPlayers.map( p => (
                    <label className="label" key={p}>
                        <input type="checkbox" checked={selectedPlayers.includes(p)} className="checkbox" disabled={selectedPlayers.length >= 2 && !selectedPlayers.includes(p)} onChange={(e) => {
                            console.log('checked', e.target.checked);
                            if (e.target.checked) {
                                setSelectedPlayers([...selectedPlayers, p])
                            } else {
                                setSelectedPlayers(selectedPlayers.filter(name => name !== p))
                            }
                        }}/>
                        {p}
                    </label>
                ))}
            </fieldset>
            <button
                className="btn btn-soft btn-lg mt-3 w-full lg:w-64"
                disabled={selectedPlayers.length !== 2}
                onClick={
                    () => nav('/play')
                }
            >
                Play the Game
            </button>
        </div>
    )
}