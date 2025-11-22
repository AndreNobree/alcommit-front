

export default function Home() {
  return (
    <div>
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
      <div className="w-full h-full flex justify-between">
        <div className="mt-10">
          <h1 className="text-green-500 font-bold font-mono ml-10 text-2xl">My Projects</h1>
        </div>
        <div className="mt-10 flex items-center">
          <select className="mr-10 p-2 bg-neutral-800 text-green-500 border border-green-500 rounded-md font-mono cursor-pointer">
            <option value="fineshed">Fineshed</option>
            <option value="progress">In Progress</option>
            <option value="paused">Paused</option>
            <option value="think">Thinking</option>
            <option value="canceled">Canceled</option>
          </select>
          <button className="bg-green-500 text-neutral-900 font-mono px-3 py-1 rounded-md hover:bg-green-600 transition-colors mr-10 cursor-pointer">
            <img src='/images/assets/add.png' alt="Add" className="inline-block w-5 h-5 mr-2" />
            New Project
          </button>
        </div>
      </div>
    </div>
  );
}
