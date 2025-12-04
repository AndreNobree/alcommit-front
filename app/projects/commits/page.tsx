"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Commits() {
  const searchParams = useSearchParams();
  const projectId = searchParams.get("projectId"); // <= pega a ID da URL
  

  const [commits, setCommits] = useState([]);

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
        setCommits(data);

      } catch (error) {
        console.error(error);
      }
    };

    loadCommits();
  }, [projectId]);

  return (
    <div>
      <h1>Commits do Projeto {projectId}</h1>
    </div>
  );
}
