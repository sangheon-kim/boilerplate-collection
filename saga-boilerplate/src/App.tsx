import React from "react";
import Counter from "./Components/Counter";
import { IReqGetUsers, IUsersState } from "./Store/Users";
import { connect } from "react-redux";
import { reqGetUsers } from "Store/Users/Users.store";
import { User } from "Models/users";
import Thead from "Models/menus";

interface IApp {
  reqGetUsers: () => IReqGetUsers;
  users: User[];
}

function App({ reqGetUsers, users }: IApp) {
  React.useEffect(() => {
    reqGetUsers();
  }, []);
  const menuList = ["id", "이름", "닉네임"].map((item) => new Thead(item));

  return (
    <div className="App">
      <table>
        <thead>
          {menuList.map((item) => (
            <tr key={item.uniKey}>
              <th>{item.name}</th>
            </tr>
          ))}
        </thead>
        <tbody>
          {users.map((item) => {
            console.log(item);
            return (
              <tr key={item.id}>
                <td>{JSON.stringify(item.id)}</td>
                <td>{JSON.stringify(item.name)}</td>
                <td>{JSON.stringify(item.username)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Counter number={0} />
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
