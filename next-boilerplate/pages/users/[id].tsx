import * as React from "react";
import { useRouter } from "next/router";
import { InferGetStaticPropsType, GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import rp from "request-promise";

const URL = "https://jsonplaceholder.typicode.com";

function UserDetail({ user }: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log(user);
  const router = useRouter();

  const { id } = router.query;
  console.log(id);
  return (
    <React.Fragment>
      <Head>
        <title>{`${user.username}님의 신상명세서`}</title>
        <meta name="description" content="유저 리스트 페이지" />
      </Head>
      <div>
        <h1>{`${user.username}님의 신상명세서`}</h1>
        <p>이메일 {`${user.email}`}</p>
        <p>{user.website}</p>
      </div>
    </React.Fragment>
  );
}

// 9.3 버전부터는 getServerSideProps 사용
// getStaticProps = 동적으로 데이터 추가한다.
// 빌드 시점에 1번만 데이터를 가져온다. 값이 계속 변해야하는 API에는 클라이언트에서 한번 더 조회할 필요가있다.
// 파일조회를 브라우저가 아닌 Node에서 하기때문에 path, fs를 이용해서 파일을 읽어드려서도 사용할 수도 있다.
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params;
  const res = await fetch(`${URL}/users/${id}`);
  let user = await res.json();
  const client_id = "Na6NG6o0GWYFrMIqs7RO";
  const client_secret = "o17OTjVnbt";

  var api_url = "https://openapi.naver.com/v1/papago/n2mt";

  function translate() {
    return new Promise((resolve, reject) => {
      Object.keys(user).map(async (item) => {
        if (item === "username") {
          var options = {
            method: "POST",
            url: api_url,
            form: { source: "en", target: "ko", text: user[item] },
            headers: { "X-Naver-Client-Id": client_id, "X-Naver-Client-Secret": client_secret },
          };

          try {
            const res = await rp(options);

            resolve(JSON.parse(res).message.result.translatedText);
          } catch (err) {
            reject(err);
          }
        }
      });
    });
  }

  const text = await translate();
  console.log(text);
  user = { ...user, username: text };
  // console.log(user);
  return {
    props: {
      user,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`${URL}/users`);

  const users = await res.json();

  const paths = users.map((item) => {
    return `/users/${item.id}`;
  });

  return { paths, fallback: false };
};

export default UserDetail;
