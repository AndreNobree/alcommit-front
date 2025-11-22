import Link from "next/link";

export default function Projects() {
  return (
    <div>
        <div className="w-full h-full flex justify-between mt-10">
            <div className="ml-10">
                <Link href='/'>
                    <img src='/images/assets/back.png'></img>
                </Link>
                <div className="ml-10 mt-5">
                    <p className="text-green-500 font-mono ml-10 text-2xl">Project Name:</p>
                    <input type="text" 
                        className="bg-neutral-800 text-green-500 border border-green-500 rounded-md font-mono p-2 w-100 mt-2 ml-10" 
                        placeholder="Enter project name here..." 
                    />
                </div>
                <div className="ml-10 mt-5">
                    <p className="text-green-500 font-mono ml-10 text-2xl">Technologies</p>
                    <div>
                        <input type="text" 
                            className="bg-neutral-800 text-green-500 border border-green-500 rounded-md font-mono p-2 w-100 mt-2 ml-10" 
                            placeholder="Enter project technologies here..." 
                        />
                        <button 
                            className="bg-green-500 text-neutral-900 font-mono px-3 py-1 rounded-md hover:bg-green-600 transition-colors ml-5 cursor-pointer"
                        >
                            <img src='/images/assets/add.png' alt="Add" className="inline-block w-5 h-5 mr-2" />
                            Add
                        </button>
                    </div>
                </div>
                <div className="ml-10 mt-5">
                    <p className="text-green-500 font-mono ml-10 text-2xl">Link Github:</p>
                    <input type="text" 
                        className="bg-neutral-800 text-green-500 border border-green-500 rounded-md font-mono p-2 w-100 mt-2 ml-10" 
                        placeholder="Enter project link here..."
                    />
                </div>
                <div className="ml-10 mt-5">
                   <button 
                        className="w-100 bg-green-500 text-neutral-900 font-mono px-3 py-1 rounded-md hover:bg-green-600 transition-colors ml-10 mt-5 cursor-pointer"
                    >
                    Save Project
                    </button>
                </div>
            </div>
            <div className="mr-10">
                <div className="ml-10 mt-5">
                    <p className="text-green-500 font-mono text-2xl">Status:</p>
                    <select className="w-100 mr-10 p-2 bg-neutral-800 text-green-500 border border-green-500 rounded-md font-mono cursor-pointer mt-2 ">
                        <option value="fineshed">Fineshed</option>
                        <option value="progress">In Progress</option>
                        <option value="paused">Paused</option>
                        <option value="think">Thinking</option>
                        <option value="canceled">Canceled</option>
                    </select>
                </div>
                <div className="ml-10 mt-10">
                    <table>
                        <thead>
                            <tr>
                                <th className="text-green-500 font-mono text-2xl pb-2">Technology</th>
                                <th className="text-green-500 font-mono text-2xl pb-2"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <p className="text-white font-mono text-xl pb-2">React</p>
                                </td>
                                <td>
                                    <img src='/images/assets/circle-close.png' alt="Remove" className="w-5 h-5 cursor-pointer mt-1.5 ml-5" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
  )
}