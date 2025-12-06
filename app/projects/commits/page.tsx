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

          <p className="text-green-500 font-mono text-xl">
            [ {project ? project.name : "Carregando..."} ]
          </p>
          <Link href="/projects/myprojects">
            <img className="w-5 h-5" src="/images/assets/edit.png" />
          </Link>
        </div>

        <div className="flex items-center gap-4 mr-15">
          <p className="text-green-500 font-mono text-xl">
            Total de Commits: {totalCommits}
          </p>

          <button className="bg-green-500 text-neutral-900 font-mono px-3 py-1 rounded-md hover:bg-green-600 transition-colors cursor-pointer">
            Commit
          </button>
        </div>
      </div>
    </div>
  );
}
