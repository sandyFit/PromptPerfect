import React from 'react'
import TranslatePrompts from './pages/TranslatePrompts';
import Landing from './pages/Landing';
import { Route, Routes } from 'react-router-dom';
import Navbar from './layouts/Navbar';

const App = () => {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/app" element={<TranslatePrompts />} />
            </Routes>
        </div>

    )
}

export default App;
