```json
{
  "hosting": {
    "public": "public",
    // public  프로젝트 디렉토리에서 ignore 정의
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    // 파일 또는 디렉토리 요청없는 경우 재작성 규칙
    "rewrites": [
      {
        "source": "**",
        "function": "server"
      }
    ]
  },
  "functions": {
    "source": ".",
    "runtime": "nodejs12"
  }
}
```
