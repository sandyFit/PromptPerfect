import React from 'react'
import TranslatePrompts from './pages/TranslatePrompts';
import Landing from './pages/Landing';
import { Route, Routes } from 'react-router-dom';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<TranslatePrompts />} />
        </Routes>

    )
}

export default App
