type DealerPickerProps = {
    players : string[]
    dealer : string | null
    updater: (player: string) => void
}

export const DealerPicker: React.FC<DealerPickerProps> = ({ players, dealer, updater }) => {
    return (
        <div className="tabs tabs-box flex justify-center">
            {players.map((p) => {
                return (
                    <input
                        type="radio"
                        name="dealer"
                        className="tab"
                        aria-label={p}
                        value={p}
                        checked={dealer === p}
                        onChange={
                            (e) => {
                                updater(e.target.value)
                            }
                        }
                        key={p}
                    />
                )
            })}
        </div>
    )
}