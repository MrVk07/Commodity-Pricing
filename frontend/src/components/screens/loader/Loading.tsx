
const Loading = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-transparent">
            <div className="relative w-72 h-72">
                <div className="absolute flex justify-center items-center w-28 h-28 p-1.5 bg-red-500 animate-spin-slow">
                    <div className="w-full h-full bg-gray-800"></div>
                </div>
                <div className="absolute flex justify-center items-center w-28 h-28 p-1.5 bg-teal-400 rotate-45 animate-spin-reverse-slow">
                    <div className="w-full h-full bg-gray-800"></div>
                </div>
            </div>
        </div>
    );
};

export default Loading;
