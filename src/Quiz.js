import React from "react";
import { useGlobalContext } from "./context";
import Modal from "./Modal";

const Quiz = () => {
    const { questions, index, correct, nextQuestion, checkAnswer } =
        useGlobalContext();

    const { question, incorrect_answers, correct_answer } =
        questions[index - 1];

    const answers = [...incorrect_answers];
    const tempIndex = Math.floor(Math.random() * 4);

    if (tempIndex === 3) {
        answers.push(correct_answer);
    } else {
        answers.push(answers[tempIndex]);
        answers[tempIndex] = correct_answer;
    }

    return (
        <main>
            <Modal />
            <section className="quiz">
                <p className="correct-answers">
                    correct answers : {correct} / {index}
                </p>
                <article className="container">
                    <h2 dangerouslySetInnerHTML={{ __html: question }} />
                    <div className="btn-container">
                        {answers.map((answer, index) => (
                            <button
                                key={index}
                                className={`answer-btn ${
                                    answer === correct_answer
                                        ? "correct"
                                        : "wrong"
                                }`}
                                onClick={() => {
                                    checkAnswer(answer === correct_answer);
                                }}
                                dangerouslySetInnerHTML={{ __html: answer }}
                            />
                        ))}
                    </div>
                </article>
                <button className="next-question" onClick={nextQuestion}>
                    next question
                </button>
            </section>
        </main>
    );
};

export default Quiz;
