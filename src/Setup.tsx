import { useEffect, useState } from "react"
import { useNavigate } from "react-router"

type SetupProps = {
    setTitle : (t : string) => void
    previousPlayers : string[]
    setCurrentPlayers : (players : string[]) => void
}

export const Setup : React.FC<SetupProps> = ({ setTitle, previousPlayers, setCurrentPlayers }) => {

    // 
    // react hooks
    //
    const [availablePlayers, setAvailablePlayers] = useState(
        previousPlayers.map(
            x => ({
                name: x,
                checked: false
            })
        )
    );

    useEffect(
        () => setTitle("Setup"),
        []
    );

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
                className="btn btn-soft btn-lg mt-3 w-full lg:w-64"
                onClick={
                    () => {
                        setCurrentPlayers(availablePlayers
                            .filter(
                                x => x.checked
                            )
                            .map(x => x.name))

                        nav('/play');
                    }
                }
            >
                Play the Game
            </button>
            {
                availablePlayers.map(
                    x => (
                        <p key={x.name} className="my-3">
                            <label className="text-lg my-5">
                                <input
                                    type="checkbox"
                                    className="checkbox checkbox-lg mr-3"
                                    checked={
                                        x.checked
                                    }
                                    onChange={(e) => {
                                        setAvailablePlayers(
                                            players => players.map(
                                                player => player.name === x.name
                                                    ? {
                                                        ...player,
                                                        checked: e.target.checked
                                                    }
                                                    : player
                                            )
                                        )
                                    }}
                                />
                                {x.name}
                            </label>
                        </p>
                    )
                )
            }
        </div>
    )
}