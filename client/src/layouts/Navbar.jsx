import React from 'react'

const Navbar = () => {
    return (
        <header className="mb-6">
            <h1 className="text-3xl font-bold text-indigo-700">
                PromptPort
                <span className="text-lg font-normal text-gray-500 ml-2">
                    Cross-LLM Prompt Translator
                </span>
            </h1>
            <p className="text-gray-600">
                Translate, optimize, and test prompts across major language model platforms
            </p>
        </header>
    )
}

export default Navbar
