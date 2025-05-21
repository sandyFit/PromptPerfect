import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, WandSparkles, ScanSearch, AlertCircle, FlaskConical } from 'lucide-react';
import features from '../data/features';
import LandingCard from '../components/cards/LandingCard';
import Footer from '../layouts/Footer';
import Navbar from '../layouts/Navbar';

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
            <Navbar />
            <div className="flex flex-col justify-center items-center flex-grow -mt-6">
                <h1 className='text-5xl font-bold pt-10 text-center'>
                    Get Smarter, More Effective AI Responses with <br />
                    <span className='bg-gradient-to-r from-violet-600 via-purple-500 to-pink-400 
                        inline-block text-transparent bg-clip-text leading-[70px] text-6xl'>
                        PromptPerfect
                    </span>
                </h1>
                <h3 className='mx-12 text-lg pt-4'>
                    Welcome to PromptPerfect — your all-in-one prompt control center built to supercharge your
                    interactions with AI.
                    
                    Whether you're a beginner or a pro, our powerful AI-powered prompt wizard helps you craft,
                    refine, and test your prompts with precision. Just choose a technique, enter your prompt,
                    and make it perfect and ready to copy, test, or export. This is what sets PromptPerfect appart ⇲
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
                        bg-purple-600 text-white mt-10 rounded">
                    See PromptPerfect In Action
                    <ArrowRight size={18} />
                </button>
            </div>
            <Footer />
        </section>
    )
}

export default Landing;
