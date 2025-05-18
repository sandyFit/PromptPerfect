import React from 'react'

const Footer = () => {
    return (
        <footer className='w-full mt-10 flex justify-between items-center text-gray-600'>
            <div className="flex gap-1">
                &copy; {new Date().getFullYear()} <strong>PromptPerfect</strong>
                — All rights reserved.
               
            </div>
           
            <div className="flex">

                <strong>Demo Project</strong>  — Built with love by Trish 💜
            </div>
        </footer>
    )
}

export default Footer;

