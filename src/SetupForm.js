import React from "react";
import { useGlobalContext } from "./context";

const SetupForm = () => {
    const { handleChange, handleSubmit, quiz, error } = useGlobalContext();
    return (
        <main>
            <section className="quiz quiz-small">
                <form className="setup-form">
                    {/* amount */}
                    <div className="form-control">
                        <label htmlFor="amount">number of questions</label>
                        <input
                            type="number"
                            name="amount"
                            id="amount"
                            className="form-input"
                            min={1}
                            max={50}
                            onChange={handleChange}
                            value={quiz.amount}
                        />
                    </div>
                    {/* category */}
                    <div className="form-control">
                        <label htmlFor="category">category</label>
                        <select
                            name="category"
                            id="category"
                            className="form-input"
                            onChange={handleChange}
                            value={quiz.category}
                        >
                            <option value="sports">sports</option>
                            <option value="history">history</option>
                            <option value="politics">politics</option>
                        </select>
                    </div>
                    {/* difficulty */}
                    <div className="form-control">
                        <label htmlFor="difficulty">difficulty</label>
                        <select
                            name="difficulty"
                            id="difficulty"
                            className="form-input"
                            onChange={handleChange}
                            value={quiz.difficulty}
                        >
                            <option value="easy">easy</option>
                            <option value="medium">medium</option>
                            <option value="hard">hard</option>
                        </select>
                    </div>
                    {error && (
                        <p className="error">
                            can't generate questions, please try different
                            options
                        </p>
                    )}
                    <button
                        type="submit"
                        className="submit-btn"
                        onClick={handleSubmit}
                    >
                        start
                    </button>
                </form>
            </section>
        </main>
    );
};

export default SetupForm;
