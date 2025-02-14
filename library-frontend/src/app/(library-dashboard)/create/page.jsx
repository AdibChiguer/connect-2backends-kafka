"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useState } from "react";

const Page = () => {
  const [book, setBook] = useState({
    isbn: "",
    bookName: "",
    authorName: "",
    publicationYear: "",
    category: "",
    totalCopies: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (book.isbn === "" || book.bookName === "" || book.authorName === "" || book.publicationYear === "" || book.category === "" || book.totalCopies === 0 ) {
      setError("Please fill all the fields");
      return;
    }
    const token = Cookies.get("token");

    if (!token) {
      console.log("No token found");
      return;
    }

    setLoading(true);

    try {
      axios({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_USER_SERVER_URI}/users/books`,
        data: {
          isbn: book.isbn,
          title: book.bookName,
          author: book.authorName,
          publicationYear: book.publicationYear,
          category: book.category,
          totalCopies: book.totalCopies,
        },
        headers: {
            Authorization: `Bearer ${token}`,
          },
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

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
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="isbn">ISBN</Label>
              <Input
                id="isbn"
                type="text"
                placeholder="h3r31sbn"
                required
                value={book.isbn}
                onChange={(e) => setBook({ ...book, isbn: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="bookName">Book name</Label>
              <Input
                id="bookName"
                type="text"
                required
                value={book.bookName}
                onChange={(e) => setBook({ ...book, bookName: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="authorName">Author name</Label>
              <Input
                id="authorName"
                type="text"
                required
                value={book.authorName}
                onChange={(e) => setBook({ ...book, authorName: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="publicationYear">publication year</Label>
              <Input
                id="publicationYear"
                type="text"
                required
                value={book.publicationYear}
                onChange={(e) => setBook({ ...book, publicationYear: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                type="text"
                required
                value={book.category}
                onChange={(e) => setBook({ ...book, category: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="totalCopies">Total copies</Label>
              <Input
                id="totalCopies"
                type="number"
                required
                value={book.totalCopies}
                onChange={(e) => setBook({ ...book, totalCopies: e.target.value })}
              />
            </div>
            <div>
              <p className="text-red-500">{error}</p>
            </div>
            <Button
              type="submit"
              onClick={(e) => handleSubmit(e)}
            >
              {loading ? "Loading..." : "Add"}
            </Button>
          </div>
        </form>
      </div>

    </div>
  );
};

export default Page;
