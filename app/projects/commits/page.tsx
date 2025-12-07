"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "../../../components/header";

interface Project {
  id: number;
  name: string;
  status: string;
  repository: string;
  location: string;
}

export default function Commits() {
  const searchParams = useSearchParams();
  const projectId = searchParams.get("projectId");

  const [project, setProject] = useState<Project | null>(null);
  const [commits, setCommits] = useState([]);
  const [totalCommits, setTotalCommits] = useState(0);

  function parsePath(path: string) {
  return path.replaceAll("\\", "/").split("/");
}

function FolderTree({ path }: { path: string }) {
  const parts = parsePath(path);

  return (
    <div className="text-green-500 font-mono text-sm p-3">
      {parts.map((folder, index) => (
        <div key={index} className="flex items-center" style={{ marginLeft: index * 12 }}>
          <img
            src="/images/assets/folder.png"
            className="w-4 h-4 mr-2"
            alt="folder"
          />
          {folder}
        </div>
      ))}
    </div>
  );
}


  useEffect(() => {
    if (!projectId) return;

    const loadCommits = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          `http://localhost:8080/projects/commits/${projectId}`,
          {
            headers: {
              "Authorization": `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) throw new Error("Erro ao carregar commits");

        const data = await response.json();

        // Preenchendo cada parte corretamente
        setProject(data.project);
        setCommits(data.commits);
        setTotalCommits(data.totalCommits);

      } catch (error) {
        console.error(error);
      }
    };

    loadCommits();
  }, [projectId]);

  return (
    <div>
      <Header/>
      <div className="flex justify-between w-full mt-10">
        <div className="flex items-center gap-4 ml-10">
          <Link href="/projects/myprojects">
            <img src="/images/assets/back.png" />
          </Link>

          <p className="text-green-500 font-mono text-xl ml-10 mr-5">
            [ {project ? project.name : "Loading..."} ]
          </p>
          <Link href="/projects/myprojects">
            <img className="w-5 h-5" src="/images/assets/edit.png" />
          </Link>
        </div>

        <div className="flex items-center gap-4 mr-15">
          <p className="text-green-500 font-mono text-xl mr-10">
            Total commits: {totalCommits}
          </p>

          <button className="bg-green-500 text-neutral-900 font-mono px-5 py-2 rounded-md hover:bg-green-600 transition-colors cursor-pointer">
            <img className="inline w-5 h-5 mr-2" src="/images/assets/commit.png" />
            Commit
          </button>
          
        </div>
      </div>
      <div className="mt-10 flex justify-between w-full">
        <div className="ml-10 w-80 h-60 border border-green-500 flex flex-col justify-center align-baseline">
          <p className="pl-3 pt-3 text-green-500 font-mono text-sm mb-2">
            PATH:<br></br>
            {project && <FolderTree path={project.location} />}
          </p>
        </div>
        <div className="ml-10 mr-10 w-150 h-90 flex flex-col justify-center align-baseline">
          <p className="text-green-500 font-mono text-xl mb-5 ">
            <img className="inline w-5 h-5 mr-2" src="/images/assets/circle.png" />
            {project ? project.status : "Loading..."}
          </p>
          <p className="text-green-500 font-mono text-xs mb-5 ">
            Link Git:<br></br>
            {project ? project.repository : "Loading..."}
          </p>
          <p className="text-green-500 font-mono text-xs mb-5 ">
            PATH:<br></br>
            {project ? project.location : "Loading..."}
          </p>
        </div>
        <div className="ml-10 mr-10 w-150 h-90 flex flex-col justify-center align-baseline">
          
          <p className="text-green-500 font-mono text-xs mb-5 ">
            DATA CREATE:<br></br>
          </p>
          <p className="text-green-500 font-mono text-xs mb-5 ">
            USER CREATE:<br></br>
          </p>
          <p className="text-green-500 font-mono text-xs mb-5 ">
            DATA UPDATE:<br></br>
          </p>
          <p className="text-green-500 font-mono text-xs mb-5 ">
            USER UPDATE:<br></br>
          </p>
        </div>
      </div>
    </div>
  );
}
