import { useState } from 'react'
import './App.css'

function App() {
    const [count, setCount] = useState(0)

    return (
        <div
            className="p-3"
            data-theme="cupcake"
        >
            <h1 className="text-xl font-bold">
                Get started
            </h1>
            <p>
                Edit <code>src/App.tsx</code> and save to test <code>HMR</code>
            </p>
            <button
                type="button"
                className="btn btn-lg btn-soft btn-primary w-full lg:w-64"
                onClick={() => setCount((count) => count + 1)}
            >
                Count is {count}
            </button>

            <div className="card w-full bg-base-100 card-lg shadow-sm my-3">
                <div className="card-body">
                    <h2 className="card-title">Large Card</h2>
                    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                    <div className="justify-end card-actions">
                        <button className="btn btn-primary">Buy Now</button>
                    </div>
                </div>
            </div>

            <div className="card w-full bg-base-100 card-lg shadow-sm my-3">
                <div className="card-body">
                    <h2 className="card-title">Step ...</h2>
                    <ul className="steps steps-vertical">
                        <li className="step step-primary">Register</li>
                        <li className="step step-primary">Choose plan</li>
                        <li className="step">Purchase</li>
                        <li className="step">Receive Product</li>
                    </ul>
                </div>
            </div>

            <div className="card w-full bg-base-100 card-lg shadow-sm my-3">
                <div className="card-body py-0 px-1">
                    <h2 className="card-title">Accordion</h2>
                    <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                        <input type="radio" name="my-accordion-2" defaultChecked />
                        <div className="collapse-title font-semibold">How do I create an account?</div>
                        <div className="collapse-content text-sm">Click the "Sign Up" button in the top right corner and follow the registration process.</div>
                    </div>
                    <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title font-semibold">I forgot my password. What should I do?</div>
                        <div className="collapse-content text-sm">Click on "Forgot Password" on the login page and follow the instructions sent to your email.</div>
                    </div>
                    <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title font-semibold">How do I update my profile information?</div>
                        <div className="collapse-content text-sm">Go to "My Account" settings and select "Edit Profile" to make changes.</div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default App
