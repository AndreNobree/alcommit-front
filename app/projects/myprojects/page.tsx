"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "../../../components/header";

export default function MyProjects() {
  //const [projects, setProjects] = useState([]);
    interface Project {
      id: number;
      name: string;
      status: string;
  }
  function getStatusColor(status: string) {
    switch (status) {
      case "progress":
        return "#0005FF"; // azul
      case "finished":
        return "#22c55e"; // Tailwind green-500
      case "paused":
        return "#FF0000"; // vermelho
      case "thinking":
        return "#FF7700"; // laranja
      case "canceled":
        return "#3A3A3A"; // cinza escuro
      default:
        return "#FFFFFF"; // fallback
    }

}


const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
      const fetchProjects = async () => {
        try {
          const token = localStorage.getItem("token");

          const response = await fetch("http://localhost:8080/projects/myprojects", {
            headers: {
              "Authorization": `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            throw new Error("Erro ao carregar projetos");
          }

          const data = await response.json();
          setProjects(data);

        } catch (error) {
          console.error(error);
        }
      };

      fetchProjects();
    }, []);

  function handleProjectClick(id: number): void {
    const projectId = id;
    //alert(`Project ID: ${projectId} clicked!`);
    window.location.href = `/projects/commits?projectId=${projectId}`;
  }

    return (
      <div>
        <Header />

        <div className="w-full h-full flex justify-between">
          {/* TITULO */}
          <div className="mt-10">
            <h1 className="text-green-500 font-bold font-mono ml-10 text-2xl">
              My Projects
            </h1>
          </div>

          {/* FILTRO + NOVO PROJETO */}
          <div className="mt-10 flex items-center">
            <select className="mr-10 p-2 bg-neutral-800 text-green-500 border border-green-500 rounded-md font-mono cursor-pointer">
              <option value="finished">Finished</option>
              <option value="progress">In Progress</option>
              <option value="paused">Paused</option>
              <option value="thinking">Thinking</option>
              <option value="canceled">Canceled</option>
            </select>

            <Link href="/projects/addprojects">
              <button className="bg-green-500 text-neutral-900 font-mono px-3 py-1 rounded-md hover:bg-green-600 transition-colors mr-10 cursor-pointer">
                <img
                  src="/images/assets/add.png"
                  alt="Add"
                  className="inline-block w-5 h-5 mr-2"
                />
                New Project
              </button>
            </Link>
          </div>
        </div>

        {/* GRID DE CARDS */}
        <div className="mt-10 px-10">
          <div className="grid grid-cols-4 gap-6 max-h-[600px] overflow-y-auto pr-3">

            {projects.map((p, index) => (
              <div
                key={index}
                className="border border-green-500 rounded-lg p-5 hover:bg-neutral-900 transition-colors cursor-pointer shadow-md"
                style={{ borderColor: getStatusColor(p.status) }}
                onClick={() => handleProjectClick(p.id)}
              >
                <h2 className="text-green-500 font-mono text-xl font-bold">
                  {p.name}
                </h2>

                <p className="mt-2 text-white font-mono text-md">
                  Status: <span className="text-green-400">{p.status.toUpperCase()}</span>
                </p>
              </div>
            ))}

            {/* Caso não tenha projetos */}
            {projects.length === 0 && (
              <p className="text-green-500 font-mono text-xl col-span-4">
                No projects found.
              </p>
            )}

          </div>
        </div>
      </div>
    );
}
