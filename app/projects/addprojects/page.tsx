"use client";
import { useState } from "react";
import Link from "next/link";

import Header from '../../../components/header';

export default function AddProject() {
  const [techInput, setTechInput] = useState("");
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [repository, setRepository] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("");


//adiciona tecnologia a tabela
  const addTechnology = () => {
    if (techInput.trim() === "") return;

    setTechnologies([...technologies, techInput.trim()]);
    setTechInput(""); // limpa o input de tecnologias 
  };
//remove tecnologia da tabela
  const removeTechnology = (tech: string) => {
    setTechnologies(technologies.filter(t => t !== tech));
  };

  const handleAddProject = async () => {
    try {
      const token = localStorage.getItem("token");

      //passar o token para liberar a rota
      const response = await fetch("http://localhost:8080/projects/addprojects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          name,
          status,
          repository,
          location
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao adicionar projeto");
      }

      const data = await response.json();
      console.log("TOKEN:", data.token);

      // exemplo de armazenar token
      localStorage.setItem("token", data.token);
      document.cookie = `token=${data.token}; path=/;`;


      // redirecionar
      window.location.href = "/projects/myprojects";

    } catch (err) {
      alert(err);
    }
  };

  return (
    <div>
      <Header/>
      <div className="w-full h-full flex justify-between mt-10">
        <div className="ml-10">
          <Link href="/projects/myprojects">
            <img src="/images/assets/back.png" />
          </Link>

        
          <div className="ml-10 mt-5">
            <p className="text-green-500 font-mono ml-10 text-2xl">
              Project Name:
            </p>
            <input
              type="text"
              className="bg-neutral-800 text-green-500 border border-green-500 rounded-md font-mono p-2 w-100 mt-2 ml-10"
              placeholder="Enter project name here..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

        
          <div className="ml-10 mt-5">
            <p className="text-green-500 font-mono ml-10 text-2xl">
              Technologies
            </p>

            <div>
              <input
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                className="bg-neutral-800 text-green-500 border border-green-500 rounded-md font-mono p-2 w-100 mt-2 ml-10"
                placeholder="Enter project technologies here..."
              />

              <button
                onClick={addTechnology}
                className="bg-green-500 text-neutral-900 font-mono px-3 py-1 rounded-md hover:bg-green-600 transition-colors ml-5 cursor-pointer"
              >
                <img
                  src="/images/assets/add.png"
                  alt="Add"
                  className="inline-block w-5 h-5 mr-2"
                />
                Add
              </button>
            </div>
          </div>

        
          <div className="ml-10 mt-5">
            <p className="text-green-500 font-mono ml-10 text-2xl">
              Link Github:
            </p>
            <input
              type="text"
              className="bg-neutral-800 text-green-500 border border-green-500 rounded-md font-mono p-2 w-100 mt-2 ml-10"
              placeholder="Enter project link here..."
              value={repository}
              onChange={(e) => setRepository(e.target.value)}
            />
          </div>

        
          <div className="ml-10 mt-5">
            <p className="text-green-500 font-mono ml-10 text-2xl">
              Location Path:
            </p>
            <input
              type="text"
              className="bg-neutral-800 text-green-500 border border-green-500 rounded-md font-mono p-2 w-100 mt-2 ml-10"
              placeholder="Enter project path here..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div className="ml-10 mt-5">
            <button 
              onClick={handleAddProject} 
              className="w-100 bg-green-500 text-neutral-900 font-mono px-3 py-1 rounded-md hover:bg-green-600 transition-colors ml-10 mt-5 cursor-pointer">
                Save Project
            </button>
          </div>
        </div>

        <div className="mr-10">
          <div className="ml-10 mt-15">
            <p className="text-green-500 font-mono text-2xl">Status:</p>
            <select 
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-100 mr-10 p-2 bg-neutral-800 text-green-500 border border-green-500 rounded-md font-mono cursor-pointer mt-2">
                <option value="finished">Finished</option>
                <option value="progress">In Progress</option>
                <option value="paused">Paused</option>
                <option value="thinking">Thinking</option>
                <option value="canceled">Canceled</option>
            </select>
          </div>

          <div className="ml-10 mt-10 border-green-500 border-2 p-5 rounded-md w-100 max-h-80 overflow-auto">
            <table>
              <thead>
                <tr>
                  <th className="text-green-500 font-mono text-2xl pb-2">
                    Technology
                  </th>
                  <th className="text-green-500 font-mono text-2xl pb-2"></th>
                </tr>
              </thead>

              <tbody>
                {technologies.map((tech) => (
                  <tr key={tech}>
                    <td>
                      <p className="text-white font-mono text-xl pb-2">
                        {tech}
                      </p>
                    </td>
                    <td>
                      <img
                        onClick={() => removeTechnology(tech)}
                        src="/images/assets/circle-close.png"
                        alt="Remove"
                        className="w-5 h-5 cursor-pointer mt-1.5 ml-5"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
