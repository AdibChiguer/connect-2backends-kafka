"use client"
import BooksTable from "@/components/booksTable";
import axios from "axios";
import Cookies from "js-cookie";
import React, { use, useEffect, useState } from "react";

const Page = () => {
  const [books , setBooks] = useState([]);

  const getBorrowedBooks = async () => {
    const token = Cookies.get("token");

    if (!token) {
      console.error("No token found");
      router.push("/");
      return;
    }

    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_USER_SERVER_URI}/users/books/borrowed`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      setBooks(res.data);
    } catch (err) {
      console.error("Invalid token or request error", err);
    }
  }

  useEffect(() => {
    getBorrowedBooks();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="hidden flex-col space-y-8 p-4 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Borrowed Books</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of the borrowed books.
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 overflow-y-auto">
        {books.length === 0 ? (
          <div className="w-full flex items-center justify-center">
            <p>No Book Available</p>
          </div>
        ) : (
          <BooksTable 
            books={books}
            setBooks={setBooks}
            bookAvailable={false}
            bookDetails={true}
          />
        )}
      </div>
    </div>
  );
};

export default Page;
