# 보일러 플레이트 모음

- 해당 보일러 플레이트만 클론하는 방법

- saga-boilerplate 설명

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
