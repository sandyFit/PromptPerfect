import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, WandSparkles, ScanSearch, AlertCircle, FlaskConical } from 'lucide-react';
import features from '../data/features';
import LandingCard from '../components/LandingCard';
import Footer from '../layouts/Footer';

const Landing = () => {
    const navigate = useNavigate();

    const getIconForFeature = (id) => {
        switch (id) {
            case 1: return <WandSparkles size={24} />;
            case 2: return <ScanSearch size={24} />;
            case 3: return <AlertCircle size={24} />;
            case 4: return <FlaskConical size={24} />;
            default: return null;
        }
    };

    return (
        <section className='w-full max-h-screen bg-purple-100 px-24 pt-4 flex flex-col justify-between'>
            <div className="flex flex-col justify-center items-center flex-grow -mt-6">
                <h1 className='text-5xl font-bold pt-12 text-center'>
                    One Prompt, Five Voices with <br />
                    <span className='bg-gradient-to-r from-violet-600 via-purple-500 to-pink-400 
                        inline-block text-transparent bg-clip-text leading-[70px] text-6xl'>
                        PromptPerfect
                    </span>
                </h1>
                <h3 className='w-[93%] text-lg pt-4'>
                    Welcome to your AI prompt control center — Translate and optimize
                    prompts across top LLMs like OpenAI, Claude, Gemini, and Bedrock-compatible models.
                    Whether you're building apps, agents, or experiments, PromptPerfect ensures your intent,
                    tone, and output quality remain consistent everywhere.  <br />
                    Built with Amazon Q Developer, PromptPerfect goes beyond translation with advanced capabilities:
                </h3>

               

                <div className="flex justify-center items-center mt-9 gap-8 flex-wrap">
                    {features.map(feature => (
                        <LandingCard
                            key={feature.id}
                            icon={getIconForFeature(feature.id)}
                            title={feature.title}
                            description={feature.description}
                        />
                    ))}
                </div>

                <button onClick={() => navigate('/app')}
                    className="flex items-center px-12 py-3 gap-2 tracking-wide font-medium 
                        bg-purple-600 text-white mt-12 rounded">
                    See PromptPerfect In Action
                    <ArrowRight size={18} />
                </button>
            </div>
            <Footer />
        </section>
    )
}

export default Landing;
