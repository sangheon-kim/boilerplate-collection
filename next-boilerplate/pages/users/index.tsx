import * as React from "react";
import { InferGetStaticPropsType, GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";

function PostDetail({ users }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <React.Fragment>
      <Head>
        <title>유저 리스트</title>
        <meta name="description" content="유저 리스트 페이지" />
      </Head>
      <div>
        {users.map((item) => {
          return <li>{item.username}</li>;
        })}
      </div>
    </React.Fragment>
  );
}

// 9.3 버전부터는 getServerSideProps 사용
// getStaticProps = 동적으로 데이터 추가한다.
// 빌드 시점에 1번만 데이터를 가져온다. 값이 계속 변해야하는 API에는 클라이언트에서 한번 더 조회할 필요가있다.
// 파일조회를 브라우저가 아닌 Node에서 하기때문에 path, fs를 이용해서 파일을 읽어드려서도 사용할 수도 있다.
export const getStaticProps: GetStaticProps = async () => {
  const URL = "https://jsonplaceholder.typicode.com";
  const res = await fetch(`${URL}/users`);

  let users = await res.json();

  return {
    props: {
      users,
    },
  };
};

export default PostDetail;
