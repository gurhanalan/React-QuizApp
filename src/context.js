import axios from "axios";
import React, { useState, useContext, useEffect } from "react";

const table = {
    sports: 21,
    history: 23,
    politics: 24,
};

const API_ENDPOINT = "https://opentdb.com/api.php?";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [waiting, setWaiting] = useState(true);
    const [loading, setLoading] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [index, setIndex] = useState(1);
    const [correct, setCorrect] = useState(0);
    const [error, setError] = useState(false);
    const [quiz, setQuiz] = useState({
        amount: 10,
        category: "sports",
        difficulty: "easy",
    });
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchQuestions = async (url) => {
        setLoading(true);
        setWaiting(false);
        const response = await axios(url).catch((err) => console.log(err));

        if (response) {
            const data = response.data.results;
            if (data.length > 0) {
                setQuestions(data);
                setLoading(false);
                setWaiting(false);
                setError(false);
            } else {
                setWaiting(true);
                setError(true);
            }
        } else {
            setWaiting(true);
        }
    };

    const nextQuestion = () => {
        setIndex((oldIndex) => {
            const index = oldIndex + 1;
            if (index > questions.length - 1) {
                openModal();
                return questions.length;
            } else {
                return index;
            }
        });
    };

    const checkAnswer = (value) => {
        if (value) {
            setCorrect((old) => old + 1);
        }
        nextQuestion();
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setWaiting(true);
        setCorrect(0);
        setIndex(0);
    };

    const handleChange = (e) => {
        setQuiz({ ...quiz, [e.target.name]: e.target.value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        const url = `${API_ENDPOINT}amount=${quiz.amount}&difficulty=${
            quiz.difficulty
        }&category=${table[quiz.category]}&type=multiple`;
        console.log(e);
        fetchQuestions(url);
    };

    return (
        <AppContext.Provider
            value={{
                waiting,
                loading,
                questions,
                index,
                correct,
                error,
                isModalOpen,
                nextQuestion,
                checkAnswer,
                closeModal,
                handleChange,
                handleSubmit,
                quiz,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
// make sure use
export const useGlobalContext = () => {
    return useContext(AppContext);
};

export { AppContext, AppProvider };
