import React, { useState } from "react";
import { connect } from "react-redux";
import { ActionCreator } from "../../reducer/reducer.js";
import User from "../user/user.jsx";

const Main = (props) => {
  const { users, onSaveAdd, onEdit, onDelete, onSearch,searchData } = props;
  const [add, setAdd] = useState(false);
  const [searching, setSearch]=useState(false)
  const dataType=()=>searching?searchData:users
  return (
    <div className="back">
      <div className="main-board">
        <ul className="title-list">
          <li className="title-item">E-MAIL</li>
          <li className="title-item">PASSWORD</li>
          <li className="title-item">NUMBER</li>
          <li className="title-item">NAME</li>
          <li className="title-item">STATUS</li>
          <li className="title-item">CREATED</li>
          <li className="title-item">CHANGED</li>
        </ul>
        <div className="filters">
          <h4 className="search-title">SEARCH BY E-MAIL</h4>
          <input type="text" className="search" onChange={(evt)=>{
              evt.preventDefault()
              evt.target.value.length>0?setSearch(true):setSearch(false)
              const value=evt.target.value
            onSearch(value,users)

          }}/>

          <h4 className="filter">FILTER BY STATUS</h4>
          <select name="filter" id="status-filt" className="status-filt" onChange={(evt)=>{
              evt.preventDefault()
              
          }}>
              <option value="admin">admin</option>
              <option value="client">client</option>
              <option value="partner">partner</option>
          </select>
        </div>
        {!add ? (
          <button className="add" onClick={() => setAdd(true)}>
            ADD
          </button>
        ) : (
          <div className="add-user">
            <form action="" className="add--user"
            onSubmit={(evt)=>{
                const target=evt.target
                const email=target.querySelector(`.email`).value;
                const password=target.querySelector(`.password`).value;
                const number=target.querySelector(`.number`).value;
                const name=target.querySelector(`.name`).value;
                const status=target.querySelector(`.status`).value;
                evt.preventDefault()
                onSaveAdd(email,password,number,name,status);
                setAdd(false)
            }}>
              <p className="h">E-MAIL</p>
              <input type="email" className="email"  required placeholder="example@gmail.com"/>
              <p className="h">Пароль</p>
              <input type="text" className="password" required minLength="6" placeholder="******"/>
              <p className="h">Номер </p>
              <input type="number" className="number" required placeholder="88005553535"/>
              <p className="h">Имя</p>
              <input type="text" className="name"  required placeholder="Олег Олегович Рыба"/>
              <p className="h">Статус</p>
              <select name="" id="status" className="status" required>
                <option value="admin">admin</option>
                <option value="client">client</option>
                <option value="partner">partner</option>
              </select>
              <button className="save-add">SAVE</button>
            </form>
          </div>
        )}
        <ul className="user-list">
          {dataType().map((it) => {
            return <User user={it} onEdit={onEdit} users={users} onDelete={onDelete} />;
          })}
        </ul>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    users: state.users,
    searchData:state.searchData
  };


};
const mapDispatchToProps=(dispatch)=>{
    return{
        onSaveAdd:(email,password,number,name,status)=>{
            dispatch(ActionCreator.add(email,password,number,name,status))
        },
        onEdit:(id, email, password, number, name, status, users, created)=>{
            dispatch(ActionCreator.edit(id, email, password, number, name, status, users, created))
        },
        onDelete:(user,users)=>{
            dispatch(ActionCreator.delete(user,users))
        },
        onSearch:(inputValue,users)=>{
            dispatch(ActionCreator.search(inputValue,users))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Main);
