import Post from '@/components/Post';

export async function generateMetadata({params}) {
  const postdata = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/post/${params.id}`
  ).then((res) => res.json());

  return {
    title: postdata.title,
    description: postdata.short_description,
  };
}

function PostPage({params}) {
  return <Post params={params} />;
}

export default PostPage;
