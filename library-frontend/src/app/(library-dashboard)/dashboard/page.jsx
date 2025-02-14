"use client";
import BooksTable from "@/components/booksTable";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

const Page = () => {
  const [books, setBooks] = useState([]);
  const router = useRouter();

  const getAllBooks = async () => {
    const token = Cookies.get("token");

    if (!token) {
      console.log("No token found");
      return;
    }

    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_USER_SERVER_URI}/users/books/all`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("hi");

      setBooks(res.data);
    } catch (err) {
      console.log("Invalid token or request error", err);
    }
  };

  useEffect(() => {
    getAllBooks();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="hidden flex-col space-y-8 p-4 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Available Books
            </h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of the available books.
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 overflow-y-auto">
        {books?.length === 0 ? (
          <div className="w-full flex items-center justify-center">
            <p>No Book Available</p>
          </div>
        ) : (
          <BooksTable
            books={books}
          />
        )}
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default Page;
