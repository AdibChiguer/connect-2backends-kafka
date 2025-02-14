import React, { useState, useEffect, useRef } from "react";

const BooksTable = ({ books }) => {

  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto">
        <thead className="bg-gray-100">
          <tr>
            <th className="font-semibold px-4 py-2 text-left">ISBN</th>
            <th className="font-semibold px-4 py-2 text-left">Book Name</th>
            <th className="font-semibold px-4 py-2 text-center">Author</th>
            <th className="font-semibold px-4 py-2 text-center">
              Publication Year
            </th>
            <th className="font-semibold px-4 py-2 text-center">Category</th>
            <th className="font-semibold px-4 py-2 text-center">available copies</th>
            <th className="font-semibold px-4 py-2 text-center">total copies</th>
          </tr>
        </thead>
        <tbody>
          {books?.map((book, index) => (
            <tr
              key={index}
              className={`hover:bg-gray-50 ${
                index % 2 === 0 ? "bg-white" : "bg-gray-50"
              }`}
            >
              <td className="px-4 py-2">{book.isbn}</td>
              <td className="px-4 py-2">{book.title}</td>
              <td className="px-4 py-2 text-center">{book.author}</td>
              <td className="px-4 py-2 text-center">
                {book.publicationYear || "unknown"}
              </td>
              <td className="px-4 py-2 text-center">{book.category}</td>
              <td className="px-4 py-2 text-center">{book.availableCopies}</td>
              <td className="px-4 py-2 text-center">{book.totalCopies}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BooksTable;
