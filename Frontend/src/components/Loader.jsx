import React from 'react';

function Loader() {
    return (
        <div className="h-screen flex justify-center items-center bg-white">
            <div className="flex space-x-2">
                <div className="w-4 h-4 bg-[#fa91c6] rounded-full animate-bounce"></div>
                <div className="w-4 h-4 bg-[#fa91c6] rounded-full animate-bounce [animation-delay:-0.2s]"></div>
                <div className="w-4 h-4 bg-[#fa91c6] rounded-full animate-bounce [animation-delay:-0.4s]"></div>

            </div>
        </div>
    );
}

export default Loader;
