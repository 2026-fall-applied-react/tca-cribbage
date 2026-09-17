import { useState } from 'react'
import './App.css'

function App() {
    const [count, setCount] = useState(0)

    return (
        <div
            className="p-3"
        >
            <h1 className="text-xl font-bold">
                Get started
            </h1>
            <p>
                Edit <code>src/App.tsx</code> and save to test <code>HMR</code>
            </p>
            <button
                type="button"
                className="btn btn-lg btn-soft btn-primary"
                onClick={() => setCount((count) => count + 1)}
            >
                Count is {count}
            </button>

            <div className="card w-96 bg-base-100 card-lg shadow-sm my-3">
                <div className="card-body">
                    <h2 className="card-title">Large Card</h2>
                    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                    <div className="justify-end card-actions">
                        <button className="btn btn-primary">Buy Now</button>
                    </div>
                </div>
            </div>
            <div className="card w-96 bg-base-100 card-lg shadow-sm my-3">
                <div className="card-body">
                    <h2 className="card-title">Large Card</h2>
                    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                    <div className="justify-end card-actions">
                        <button className="btn btn-primary">Buy Now</button>
                    </div>
                </div>
            </div>
            <div className="card w-96 bg-base-100 card-lg shadow-sm my-3">
                <div className="card-body">
                    <h2 className="card-title">Large Card</h2>
                    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                    <div className="justify-end card-actions">
                        <button className="btn btn-primary">Buy Now</button>
                    </div>
                </div>
            </div>
            <div className="card w-96 bg-base-100 card-lg shadow-sm my-3">
                <div className="card-body">
                    <h2 className="card-title">Large Card</h2>
                    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                    <div className="justify-end card-actions">
                        <button className="btn btn-primary">Buy Now</button>
                    </div>
                </div>
            </div>
            <div className="card w-96 bg-base-100 card-lg shadow-sm my-3">
                <div className="card-body">
                    <h2 className="card-title">Large Card</h2>
                    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                    <div className="justify-end card-actions">
                        <button className="btn btn-primary">Buy Now</button>
                    </div>
                </div>
            </div>
            <div className="card w-96 bg-base-100 card-lg shadow-sm my-3">
                <div className="card-body">
                    <h2 className="card-title">Large Card</h2>
                    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                    <div className="justify-end card-actions">
                        <button className="btn btn-primary">Buy Now</button>
                    </div>
                </div>
            </div>
            <div className="card w-96 bg-base-100 card-lg shadow-sm my-3">
                <div className="card-body">
                    <h2 className="card-title">Large Card</h2>
                    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                    <div className="justify-end card-actions">
                        <button className="btn btn-primary">Buy Now</button>
                    </div>
                </div>
            </div>
            <div className="card w-96 bg-base-100 card-lg shadow-sm my-3">
                <div className="card-body">
                    <h2 className="card-title">Large Card</h2>
                    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                    <div className="justify-end card-actions">
                        <button className="btn btn-primary">Buy Now</button>
                    </div>
                </div>
            </div>
            <div className="card w-96 bg-base-100 card-lg shadow-sm my-3">
                <div className="card-body">
                    <h2 className="card-title">Large Card</h2>
                    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                    <div className="justify-end card-actions">
                        <button className="btn btn-primary">Buy Now</button>
                    </div>
                </div>
            </div>
            <div className="card w-96 bg-base-100 card-lg shadow-sm my-3">
                <div className="card-body">
                    <h2 className="card-title">Large Card</h2>
                    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                    <div className="justify-end card-actions">
                        <button className="btn btn-primary">Buy Now</button>
                    </div>
                </div>
            </div>
            <div className="card w-96 bg-base-100 card-lg shadow-sm my-3">
                <div className="card-body">
                    <h2 className="card-title">Large Card</h2>
                    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                    <div className="justify-end card-actions">
                        <button className="btn btn-primary">Buy Now</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App
