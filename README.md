# 보일러 플레이트 모음

**Window 유저의 경우에는 Git Bash설치 후 Bash 쉘을 가지고 작업해주시면 더 원할하게 하실 수 있습니다**

- SVN의 경우에는 경로를 지정해서 checkout을 해올 수 있으나, GIT은 그런기능이 없을까? 고민하던중에 찾아보다가 발견하게 되어 정리하였습니다.

- 특정 폴더만 Clone(Checkout) 하는 방법

- 예) saga-boilerplate폴더 아래에 있는것만 받아와보자

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
  git remote add -f origin https://github.com/sangheon-kim/boilerplate-collection.git
  ```

  4. echo "saga-boilerplate/\*" > .git/info/sparse-checkout
  5. git checkout master

끝
