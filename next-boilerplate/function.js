const { https } = require("firebase-functions");
const { default: next } = require("next");

// 개발 모드인지 운영모드인지 확인
const isDev = process.env.NODE_ENV !== "production";

// .next를 실행한 후 생성된 폴더의 위치를 conf옵션을 통해서
// Next.js App에 연결한다. yarn build conf
const server = next({
  dev: isDev,
  conf: { distDir: ".next" },
});

//  HTTP 요청 구문 분석하는데 사용할 수 있는 요청핸들러 반환
const nextjsHandle = server.getRequestHandler();

exports.server = https.onRequest((req, res) => {
  // server.prepare를 통해서 SSR 처리를 위해 커스텀 서버에서 실행할 준비
  return server.prepare().then(() => nextjsHandle(req, res));
});
