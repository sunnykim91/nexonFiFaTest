import "./App.css";
import HomePage from "./HomePage/HomPage";
import { Routes, Route } from "react-router-dom";
import MatchRecordPage from "./MatchRecordPage/MatchRecordPage";
import { RootProvider } from "./RootContext";

function App() {
    return (
        <RootProvider>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/total" element={<MatchRecordPage />} />
            </Routes>
        </RootProvider>
    );
}

export default App;
