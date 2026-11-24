type AdvanceButtonProps = {
    text : string
    disable?: boolean
    callback: () => void
}

export const AdvanceButton: React.FC<AdvanceButtonProps> = ({ text, disable, callback }) => {
    return (
        <div className="flex flex-center my-5">
            <button
                className="btn mx-auto"
                onClick={callback}
                disabled={disable}
            >
                {text}
            </button>
        </div>
    )
}