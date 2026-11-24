type TurnInfoProps = {
    num : number
    phase : string
}

export const TurnInfo : React.FC<TurnInfoProps> = ({ num, phase}) => {
    return (
        <div className="text-center">
            <h2 className="text-xl">Turn {num}</h2>
            <span className="font-bold">{phase}</span>
        </div>
    )
}