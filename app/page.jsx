'use client';
import Link from 'next/link';
import {useEffect, useRef, useState} from 'react';

/* eslint-disable @next/next/no-img-element */
export default function Home() {
  const [posts, setPosts] = useState([]);
  const inputRef = useRef('');
  const [searchLoading, setSearchLoading] = useState(false);
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`)
      .then((res) => res.json())
      .then((res) => setPosts(res))
      .catch((e) => console.log(e.message));
  }, []);

  const searchPost = (e) => {
    if (e.type === 'keydown' && e.key !== 'Enter') return;
    setSearchLoading(true);
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/posts?q=${inputRef.current.value}`
    )
      .then((res) => res.json())
      .then((res) => setPosts(res))
      .catch((e) => console.log(e.message))
      .finally(() => {
        setSearchLoading(false);
        inputRef.current.value = ''; // Clear the input value
        inputRef.current.focus();
      });
  };

  return (
    <>
      <main className="container mx-auto px-4 py-6">
        <h2 className="text-4xl font-bold mb-4">Welcome to Our Blog</h2>
        <p>Here you can read the latest articles</p>
      </main>
      <div className="flex justify-end px-4 mb-4">
        <input
          ref={inputRef}
          onKeyDown={searchPost}
          type="text"
          disabled={searchLoading}
          className="px-4 py-2 border border-gray-300 rounded-md"
          placeholder="Search..."
        />
        <button
          onClick={searchPost}
          disabled={searchLoading}
          className={`${
            searchLoading ? 'bg-blue-200 cursor-not-allowed' : 'bg-blue-500'
          } px-4 py-2 text-white rounded-md ml-4`}>
          {searchLoading ? '...Search' : 'Search'}
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts?.map((post) => (
          <Link key={post._id} href={`/post/${post._id}`}>
            <div className="border border-gray-200 p-4">
              <img
                className="w-full h-48 object-cover mb-4"
                src={post.image}
                alt={post.title}
              />
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-600">{post.short_description}</p>
            </div>
          </Link>
        ))}
        {!posts.length > 0 && inputRef.current.value && (
          <p>
            No post available for this query:<b>{inputRef.current.value}</b>
          </p>
        )}
      </div>
    </>
  );
}
