# Gulp Boilerplate

## Usage

**Window 유저의 경우에는 Git Bash설치 후 Bash 쉘을 가지고 작업해주시면 더 원할하게 하실 수 있습니다**

- SVN의 경우에는 경로를 지정해서 checkout을 해올 수 있으나, GIT은 그런기능이 없을까? 고민하던중에 찾아보다가 발견하게 되어 정리하였습니다.

  1. 클론할 저장소를 만들고 이동

  ```bash
  $ git init [directoryName]
  $ cd [directoryName]
  ```

  2. sparse Checkout이 가능하도록 만든다.

  ```bash
  $ git config core.sparseCheckout true
  ```

  3. remote를 추가한다.

  ```bash
  $ git remote add -f origin https://github.com/sangheon-kim/boilerplate-collection.git
  ```

  4. echo 명령을 활용해서 특정 폴더경로를 지정해서 .git/info/sparse-checkout 폴더에 입력해주자.

  ```bash
  $ echo "gulp-boilerplate/*" > .git/info/sparse-checkout
  ```

  5. master 브랜치 체크아웃

  ```bash
  $ git checkout master
  ```

  6. 해당 폴더가 생긴것을 확인 한 후 디렉터리 이동 후 .git 폴더 삭제 후 사용 그리고 새로 repo에 push한다.

  ```bash
  $ cd gulp-boilerplate
  $ rm -rf .git
  ```

  끝
