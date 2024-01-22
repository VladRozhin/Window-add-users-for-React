import React, { useEffect } from "react";
import "./index.css";
import { Success } from "./components/Success";
import { Users } from "./components/Users";

// Тут список пользователей: https://reqres.in/api/users

function App() {

  const [users, setUsers] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const [invites, setInvites] = React.useState([]);
  const [hide, setHide] = React.useState(["Hide window", "flex"]);

  React.useEffect(() => {
    fetch("https://reqres.in/api/users")
    .then(res => res.json())
    .then(json => {
      setUsers(json.data);
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => setIsLoading(false))
  }, []); 

  const onChangeSearchValue = (event) => {
    setSearchValue(event.target.value)
  }

  const onClickInvite = (id) => {
    if(invites.includes(id)) {
      setInvites(prev => prev.filter(prevId => prevId !== id))
    } else {
      setInvites(prev => [...prev, id])
    }
  }

  const onClickHide = () => {
    if(hide[0] === "Hide window") {
      setHide(["Open window", "none"])
    } else {
      setHide(["Hide window", "flex"])
    }
  }

  const onClickSendInvites = () => {
    setIsSuccess(true);
  }

  return (
    <div className="App">
      {
        isSuccess ? (<Success invites={invites} />) :
        <Users hide={hide} onClickHide={onClickHide} onClickSendInvites={onClickSendInvites} onClickInvite={onClickInvite} invites={invites} onChangeSearchValue={onChangeSearchValue} isLoading={isLoading} items={users} searchValue={searchValue}/>
      }
      </div>
  );
}

export default App;
