import React, { useState, useEffect, useRef } from "react";


const BooksTable = ({ books, bookDetails, bookAvailable }) => {
  
  const returnBook = async (book) => {};

  const borrowBook = async (book) => {};

  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto">
        <thead className="bg-gray-100">
          <tr>
            <th className="font-semibold px-4 py-2 text-left">Book Name</th>
            <th className="font-semibold px-4 py-2 text-center">Author</th>
            <th className="font-semibold px-4 py-2 text-center">Publication Year</th>
            <th className="font-semibold px-4 py-2 text-center">Category</th>
            {bookDetails && <th className="font-semibold px-4 py-2 text-center">Return</th>}
            {bookAvailable && <th className="font-semibold px-4 py-2 text-center">Borrow</th>}
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr
              key={index}
              className={`hover:bg-gray-50 ${
                index % 2 === 0 ? "bg-white" : "bg-gray-50"
              }`}
            >
              <td className="px-4 py-2">{book.title}</td>
              <td className="px-4 py-2 text-center">{book.author}</td>
              <td className="px-4 py-2 text-center">
                {book.publicationYear || "unknown"}
              </td>
              <td className="px-4 py-2 text-center">{book.category}</td>
              {bookDetails && (
                <td className="px-4 py-2 text-center">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => returnBook(book)}
                  >
                    Return
                  </button>
                </td>
              )}
              {bookAvailable && (
                <td className="px-4 py-2 text-center">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => borrowBook(book)}
                  >
                    Borrow
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BooksTable;