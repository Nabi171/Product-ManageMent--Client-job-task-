/* eslint-disable prettier/prettier */
import { useForm } from 'react-hook-form';
import {useSingleBookQuery} from "../../../features/books/booksApi";
import { useParams } from 'react-router-dom';
import {EditForm} from "../../../components/pages/Books/EditForm";
import React, { useState } from 'react';

export default function EditeBook() {
  const { editId } = useParams();
  const { data, isLoading, error } = useSingleBookQuery(editId);
// console.log('this is data',data);
// console.log(editId)

const {
  _id,
  title: initialTitle,
  author: initialAuthor,
  genre: initialtotalGenre,
  publicationDate: initialtotalPublicationDate,

} = data;
const [title, setTitle] = useState(initialTitle);
// console.log('initial',initialTitle)
const [author, setAuthor] = useState(initialAuthor);
const [genre, setGenre] = useState(initialtotalGenre);
const [publicationDate, setPublicationDate] = useState(initialtotalPublicationDate);



    return(
     <div>
        
        <form 

        // onSubmit={handleSubmit(onSubmit)} 
        
        className="max-w-sm mx-auto">
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        //   {...register('title', { required: true })}
          className={`border focus:ring-blue-500 focus:border-blue-500 block w-full rounded-md py-2 px-4`}
        />
        {/* {errors.title && <p className="text-red-500 text-xs mt-1">Title is required.</p>} */}
      </div>

      <div className="mb-4">
        <label htmlFor="author" className="block text-gray-700 text-sm font-bold mb-2">Author:</label>
        <input
          type="text"
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        //   {...register('author', { required: true })}
          className={`border focus:ring-blue-500 focus:border-blue-500 block w-full rounded-md py-2 px-4`}
        />
        {/* {errors.author && <p className="text-red-500 text-xs mt-1">Author is required.</p>} */}
      </div>

      <div className="mb-4">
        <label htmlFor="genre" className="block text-gray-700 text-sm font-bold mb-2">Genre:</label>
        <input
          type="text"
          id="genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        //   {...register('genre', { required: true })}
          className={`border focus:ring-blue-500 focus:border-blue-500 block w-full rounded-md py-2 px-4`}
        />
        {/* {errors.genre && <p className="text-red-500 text-xs mt-1">Genre is required.</p>} */}
      </div>

      <div className="mb-4">
        <label htmlFor="publicationDate" className="block text-gray-700 text-sm font-bold mb-2">Publication Date:</label>
        <input
          type="text"
          id="publicationDate"
          value={publicationDate}
          onChange={(e) => setPublicationDate(e.target.value)}
        //   {...register('publicationDate', { required: true })}
          className={`border focus:ring-blue-500 focus:border-blue-500 block w-full rounded-md py-2 px-4`}
        />
        {/* {errors.publicationDate && <p className="text-red-500 text-xs mt-1">Publication Date is required.</p>} */}
      </div>

      <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Edit</button>
    </form>
        
    </div>
     );
  }
  