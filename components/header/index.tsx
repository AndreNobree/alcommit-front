export default function Header() {
    return(
        <div className="bg-neutral-900 w-full h-full p-3 border-b border-green-500 flex items-center justify-between">
                <div>
                <h2 className="text-green-500 font-mono">AlCommit</h2>
                </div>
                <div className="flex">
                <button className="bg-green-500 text-neutral-900 font-mono px-3 py-1 rounded-md hover:bg-green-600 transition-colors mr-4 cursor-pointer">
                    <img src='/images/assets/terminal.png' alt="Terminal" className="inline-block w-5 h-5 mr-2" />
                    Terminal
                </button>
                <img src='/images/assets/configs.png' alt="Settings" className="w-5 h-5 cursor-pointer mt-1.5 mr-4" />
                <img src='/images/assets/exit.png' alt="Exit" className="w-5 h-5 cursor-pointer mt-1.5" />
                </div>
            </div>
    )
    
}