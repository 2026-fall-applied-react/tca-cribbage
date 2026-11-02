import { useEffect, useRef } from "react";

type WinnerDialogProps = {
    winner : string
    callback : (winner : string) => void
}

export const WinnerDialog : React.FC<WinnerDialogProps> = ({ winner, callback }) => {
    const dialogEl= useRef<HTMLDialogElement>(null);
    
    useEffect(
        () => {
            if (winner) showWinnerDialog()
        }
    , [ winner])

    const showWinnerDialog = () => {
        if (dialogEl.current) {
            dialogEl.current.showModal();
        }
    }

    return (
        <dialog id="winnerDialog" className="modal" ref={dialogEl}>
            <div className="modal-box">
                <p className="py-4">{winner} wins!</p>
                <div className="modal-action">
                    <button className="btn" onClick={() => callback(winner)}>End Game</button>
                </div>
            </div>
        </dialog>
    )
}