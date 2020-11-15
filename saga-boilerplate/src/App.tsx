/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import "./App.css";
import Counter from "./Components/Counter";
import { IReqGetUsers, IUsersState } from "./Store/Users";
import { connect } from "react-redux";
import { reqGetUsers } from "Store/Users/Users.store";
import { User } from "Models/users";
import Thead from "Models/menus";
import { store } from "./Store";

const listener = () => {
  const state = store.getState();
  console.log(state);
};
const unsubscribe = store.subscribe(listener);

interface IApp {
  reqGetUsers: ({ page, limit }: { page: number; limit: number }) => IReqGetUsers;
  users: User[];
}

function App({ reqGetUsers, users }: IApp) {
  const [page, setPage] = React.useState(1);
  React.useEffect(() => {
    reqGetUsers({ page, limit: 2 });
  }, [page]);

  const menuList = ["id", "이름", "닉네임"].map((item) => new Thead(item));
  const [number, setNumber] = React.useState(0);
  return (
    <div className="App">
      <ul>
        {users.map((item) => (
          <li key={item.id}>
            <p>
              {item.id},{item.name} : {item.phone}
            </p>
          </li>
        ))}
      </ul>
      {number}
      <button onClick={() => setPage(page + 1)}>더보기</button>
      <button onClick={() => setNumber(123)}>123출력</button>
      {/* <table>
        <thead>
          {menuList.map((item) => (
            <tr key={item.uniKey}>
              <th>{item.name}</th>
            </tr>
          ))}
        </thead>
        <tbody>
          {users.map((item) => {
            return (
              <tr key={item.id}>
                <td>{JSON.stringify(item.id)}</td>
                <td>{JSON.stringify(item.name)}</td>
                <td>{JSON.stringify(item.username)}</td>
              </tr>
            );
          })}
        </tbody>
      </table> */}
      <Counter />
    </div>
  );
}

export default connect(
  ({ Users }: { Users: IUsersState }) => ({
    users: Users.userList,
  }),
  {
    reqGetUsers,
  }
)(App);
