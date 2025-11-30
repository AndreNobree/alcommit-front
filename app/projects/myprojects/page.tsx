import Link from "next/link";

import Header from '../../../components/header';

export default function MyProjects() {
  return (
    <div>
      <Header/>
      <div className="w-full h-full flex justify-between">
        <div className="mt-10">
          <h1 className="text-green-500 font-bold font-mono ml-10 text-2xl">My Projects</h1>
        </div>
        <div className="mt-10 flex items-center">
          <select className="mr-10 p-2 bg-neutral-800 text-green-500 border border-green-500 rounded-md font-mono cursor-pointer">
            <option value="fineshed">Finished</option>
            <option value="progress">In Progress</option>
            <option value="paused">Paused</option>
            <option value="think">Thinking</option>
            <option value="canceled">Canceled</option>
          </select>
          <Link href="/projects/addprojects">
            <button className="bg-green-500 text-neutral-900 font-mono px-3 py-1 rounded-md hover:bg-green-600 transition-colors mr-10 cursor-pointer">
              <img src='/images/assets/add.png' alt="Add" className="inline-block w-5 h-5 mr-2" />
              New Project
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
