"use client"
import { SignupForm } from "@/components/signup-form"; 
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const route = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      setError("Please fill in all fields");
      return;
    }
    setError("");

    axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_USER_SERVER_URI}/users/register`,
      data: {
        name : username,
        email,
        password,
        role: "admin",
      },
    })
      .then((res) => {
        console.log(res);
        route.push("/");
      })
      .catch((err) => {
        console.log(err);
        setError(err.response.data.message);
      }).finally(() => {
        setLoading(false);
      });
  }


  return (
    (<div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignupForm 
          username={username} 
          setUsername={setUsername} 
          email={email} 
          setEmail={setEmail} 
          password={password} 
          setPassword={setPassword} 
          error={error}
          loading={loading}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>)
  );
}
