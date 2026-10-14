import { useEffect, useState } from "react"
import { useNavigate } from "react-router"

type SetupProps = {
    setTitle: (t: string) => void
    previousPlayers: string[]
    setCurrentPlayers: (players: string[]) => void
}

export const Setup: React.FC<SetupProps> = ({ setTitle, previousPlayers, setCurrentPlayers }) => {

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

    const [newPlayerName, setNewPlayerName] = useState("");

    useEffect(
        () => setTitle("Setup"),
        []
    );

    const nav = useNavigate();

    // 
    // derived / calculated state (and helpers)
    // 
    const chosenPlayerCount = availablePlayers.filter(
        x => x.checked
    ).length;

    const validateAndAdd = () => {
        // check for dupe names
        const dupe = availablePlayers.find(
            x => x.name.toUpperCase() === newPlayerName.toUpperCase()
        );

        // if dupe, don't add, rather just check
        // if not a dupe, add it, already checked since likely
        // in front of user, ready to play
        setAvailablePlayers(
            prev => [
                // handle dupes by just checking them
                ...prev.map(
                    x => x === dupe
                        ? {
                            ...x,
                            checked: true
                        }
                        : x
                ),

                // now add non dupes
                ...(
                    dupe
                        ? []
                        : [
                            {
                                name: newPlayerName,
                                checked: true
                            }
                        ]
                ),
            ]
        );

        setNewPlayerName("");
    }
    // 
    // return jsx
    // 
    return (
        <div
            className="flex flex-col"
        >
            <button
                className="btn btn-soft btn-lg mt-3 w-full lg:w-64"
                disabled={chosenPlayerCount !== 2}
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
                {
                    chosenPlayerCount !== 2
                        ? "Choose 2 players below"
                        : `Play the game`
                }
            </button>
            <div className="join mt-3 mb-5 w-full lg:w-64">
                <input
                    className="input join-item w-full"
                    placeholder="Enter player name"
                    value={newPlayerName}
                    onChange={(e) => {
                        setNewPlayerName(e.target.value);
                    }}
                />
                <button
                    className="btn join-item"
                    disabled={newPlayerName.length === 0}
                    onClick={validateAndAdd}
                >
                    Add
                </button>
            </div>
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