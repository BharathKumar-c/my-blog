'use client';
/* eslint-disable @next/next/no-img-element */
import React, {useEffect, useState} from 'react';

function Post({params}) {
  const [post, setPost] = useState(null);
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/${params.id}`)
      .then((res) => res.json())
      .then((res) => setPost(res))
      .catch((e) => console.log(e.message));
  }, [params]);

  return (
    <>
      {post && (
        <main class="container mx-auto px-4 py-6">
          <h2 class="text-4xl font-bold mb-4">{post.title}</h2>
          <p class="text-gray-500">{`Published on ${post.format_date}`}</p>
          <img width={300} src={post.image} alt="Post Image" class="my-4" />
          <p>{post.description}</p>
        </main>
      )}
    </>
  );
}

export default Post;
