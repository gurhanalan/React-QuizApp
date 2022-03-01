import React from "react";
import { useGlobalContext } from "./context";

import SetupForm from "./SetupForm";
import Loading from "./Loading";
import Quiz from "./Quiz";

function App() {
    const { waiting, loading } = useGlobalContext();
    if (waiting) {
        return <SetupForm />;
    }
    if (loading) {
        return <Loading />;
    }

    return <Quiz />;
}

export default App;
