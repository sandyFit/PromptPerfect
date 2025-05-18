import promptTechniques from '../../data/promptTechniques';
import { Sparkles } from 'lucide-react';

const TechniquesCard = () => {
    return (
        <section className='bg-purple-50 p-6 rounded-md'>
            <div className="flex flex-col justify-start">
                <h2 className="flex items-center text-lg text-purple-700 font-semibold mb-2">
                    <Sparkles size={18} className="mr-2" />
                    Boost Your Prompts with These Expert Techniques
                </h2>
                <p className='text-sm text-left text-purple-700 mb-4'>
                    Not sure how to get better responses from AI? Prompt engineering is the secret sauce.
                    These proven techniques help you craft clearer, more focused prompts that get smarter,
                    more useful answers.<br/>
                    ↆ Learn how they work — then select one from the dropdown above to apply it instantly using
                    our AI-powered prompt wizard.
                </p>
                <ul className="flex flex-col items-start justify-start pl-6 space-y-1 list-disc gap-2
                    text-purple-700 text-left">
                    {promptTechniques.map((technique) => (
                        <li key={technique.key}>
                            <h3 className='font-semibold'>
                                {technique.example} — {technique.name}
                            </h3>
                            <p className='text-sm'> 
                                {technique.description}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}

export default TechniquesCard;
