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
  const [showPopup, setShowPopup] = useState(false);
  const [branch, setBranch] = useState("main");
  const [repo, setRepo] = useState("");
  const [message, setMessage] = useState("");
  
  const handleAdCommit = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:8080/commits/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          projectId,
          branch,
          message
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao adicionar commit");
      }

      alert("Commit adicionado com sucesso!");

      // 🔥 Atualiza a lista de commits sem reload
      await loadCommits();

      // limpar mensagem
      setMessage("");

      // fechar popup
      setShowPopup(false);

    } catch (err) {
      alert(err);
    }
  };


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

  function getStatusImage(status: string) {
    switch (status) {
      case "progress":
        return "/images/assets/circle.png";
      case "finished":
        return "/images/assets/correct.png";
      case "paused":
        return "/images/assets/clock.png";
      case "thinking":
        return "/images/assets/brain.png";
      case "canceled":
        return "/images/assets/circle-close.png";
      default:
        return "/images/assets/circle.png"; // fallback
    }
  }
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

      setProject(data.project);
      setCommits(data.commits);
      setTotalCommits(data.totalCommits);

    } catch (error) {
      console.error(error);
    }
  };




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

  useEffect(() => {
    if (project) {
      setRepo(project.repository);
    }
  }, [project]);


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

          <button
            className="bg-green-500 text-neutral-900 font-mono px-5 py-2 rounded-md hover:bg-green-600 transition-colors cursor-pointer"
            onClick={() => setShowPopup(true)}
          >
            <img className="inline w-5 h-5 mr-2" src="/images/assets/commit.png" />
            Commit
          </button>

          
        </div>
      </div>
      <div className="mt-10 flex justify-between w-full">
        <div className="ml-10 w-80 h-60 border border-green-500 flex flex-col justify-center align-baseline">
          <div className="ml-3 text-green-500 font-mono text-sm">
            PATH:<br></br>
            {project && <FolderTree path={project.location} />}
          </div>
          
        </div>
        <div className="ml-10 mr-10 w-150 h-60 flex flex-col justify-center">
          
          <div className="text-green-500 font-mono text-sm">
            {project && (
              <img
                className="inline w-5 h-5 mr-2"
                src={getStatusImage(project.status)}
                alt="status icon"
              />
            )}
            {project ? project.status : "Loading..."}
          </div>
          
          <div className="text-green-500 font-mono text-sm mt-5">
            Link Repository:<br></br>
            {project ? project.repository : "Loading..."}
          </div>
          
          
          <div className="text-green-500 font-mono text-sm mt-5">
            PATH:<br></br>
            {project ? project.location : "Loading..."}
          </div>
          
        </div>
        <div className="ml-10 mr-10 w-100 h-60 flex flex-col justify-center  text-right">
          
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
      <div className="mt-20 px-10">
        <h2 className="text-green-500 font-mono text-2xl mb-5">Commits</h2>

        <div className="grid grid-cols-4 gap-6 max-h-[600px] overflow-y-auto pr-3">

          {commits.map((c: any, index: number) => (
            <div
              key={index}
              className="border border-green-500 rounded-lg p-5 hover:bg-neutral-900 transition-colors cursor-default shadow-md"
            >
              {/* TÍTULO DO COMMIT */}
              <h3 className="text-green-400 font-mono text-lg font-bold mb-2">
                Commit #{index + 1}
              </h3>

              {/* MENSAGEM */}
              <p className="text-green-500 font-mono text-sm">
                <span className="text-green-400">Message:</span> {c.message}
              </p>

              {/* BRANCH */}
              <p className="text-green-500 font-mono text-sm mt-1">
                <span className="text-green-400">Branch:</span> {c.branch}
              </p>

              {/* DATA */}
              <p className="text-green-500 font-mono text-sm mt-1">
                <span className="text-green-400">Created:</span>{" "}
                {new Date(c.createAt).toLocaleString()}
              </p>
            </div>
          ))}

          {/* SE NÃO TIVER COMMITS */}
          {commits.length === 0 && (
            <p className="text-green-500 font-mono text-xl col-span-4">
              No commits found.
            </p>
          )}

        </div>
      </div>


      {showPopup && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowPopup(false)} // fecha ao clicar fora
        >
          <div
            className="bg-neutral-900 border border-green-500 rounded-md p-6 w-96 font-mono text-green-500"
            onClick={(e) => e.stopPropagation()} // impede fechar ao clicar dentro
          >
            <h2 className="text-xl mb-4">New Commit</h2>

            <label className="block text-sm mb-1">Branch:</label>
            <input
              className="w-full p-2 mb-3 bg-neutral-800 border border-green-500 rounded text-green-500"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
            />

            <label className="block text-sm mb-1">Repository:</label>
            <input
              className="w-full p-2 mb-3 bg-neutral-800 border border-green-500 rounded text-green-500"
              value={repo}
              onChange={(e) => setRepo(e.target.value)}
              disabled
            />

            <label className="block text-sm mb-1">Message:</label>
            <textarea
              className="w-full p-2 mb-4 bg-neutral-800 border border-green-500 rounded text-green-500 h-24 resize-none"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>

            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-red-600 text-neutral-900 rounded hover:bg-red-700 cursor-pointer"
                onClick={() => setShowPopup(false)}
              >
                Cancel
              </button>

              <button
                className="px-4 py-2 bg-green-500 text-neutral-900 rounded hover:bg-green-600 cursor-pointer"
                onClick={handleAdCommit}
              >
                Commit
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
