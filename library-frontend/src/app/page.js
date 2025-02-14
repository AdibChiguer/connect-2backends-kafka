"use client"
import { LoginForm } from "@/components/login-form";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    setError("");
    setLoading(true);
    axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_USER_SERVER_URI}/users/login`,
      data: {
        email,
        password,
      },
    })
      .then((res) => {
        console.log(res);
        Cookies.set("token", res.data.token, { expires: 1 });
        router.push("/dashboard");
      })
      .catch((err) => {
        console.log(err);
        setError(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          loading={loading}
          error={error}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
