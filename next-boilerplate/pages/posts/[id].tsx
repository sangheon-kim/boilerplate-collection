import * as React from "react";
import { InferGetStaticPropsType, GetServerSideProps } from "next";
import Head from "next/head";

function PostDetail({ post }: InferGetStaticPropsType<typeof getServerSideProps>) {
  return (
    <React.Fragment>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.body} />
      </Head>
      <div>
        <h1>{post.title}</h1>
        <p>{post.body}</p>
      </div>
    </React.Fragment>
  );
}

// 9.3 버전부터는 getServerSideProps 사용
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.params;

  const URL = "https://jsonplaceholder.typicode.com";
  const res = await fetch(`${URL}/posts/${id}`);

  const post = await res.json();

  return {
    props: {
      post,
    },
  };
};

export default PostDetail;
