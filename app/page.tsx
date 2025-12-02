"use client";

import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("Login inválido");
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
    <div className="flex items-center justify-center w-full h-screen">
      <div className="w-96 p-8 border-2 border-green-500">
        <label className="block mb-2 text-green-500">Email</label>
        <input
          className="w-full p-3 border-2 text-green-500 outline-0"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="block mb-2 text-green-500 mt-5">Password</label>
        <input
          className="w-full p-3 border-2 text-green-500 outline-0"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full mt-10 p-3 bg-neutral-900 text-green-500 cursor-pointer border-2 hover:bg-green-500 hover:text-neutral-900 transition-colors"
        >
          Login
        </button>

        <div>
          <p className="mt-5 text-green-500">Don't have an account? </p>
          <a href="/register" className="text-green-500 underline">
            Register
          </a>
        </div>
      </div>
    </div>
  );
}
