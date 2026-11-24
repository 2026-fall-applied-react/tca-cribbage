type PlayerInfoProps = {
    name : string
    score : number
    reverse : boolean
}

export const PlayerInfo : React.FC<PlayerInfoProps> = ({ name, score, reverse}) => {
    return (
        <h2 className={`card-title flex${reverse && "-row-reverse"} justify-between`}>
            <span>{name}</span>
            <span>{score}</span>
        </h2>
    )
}