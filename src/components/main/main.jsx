import React, { useState } from "react";
import { connect } from "react-redux";
import { ActionCreator } from "../../reducer/reducer.js";
import User from "../user/user.jsx";

const Main = (props) => {
  const { users, onSaveAdd, onEdit, onDelete, onSearch, searchData } = props;
  const [add, setAdd] = useState(false);
  const [searching, setSearch] = useState(false);
  const [flag, setFlag] = useState(null);
  const dataType = () => (searching ? searchData : users);
  return (
    <div className="back">
      <div className="main-board">
        <div className="filters">
          <div className="filter-wrapper">
            <h4 className="search-title">SEARCH BY E-MAIL</h4>
            <input
              type="text"
              className="search"
              onChange={(evt) => {
                evt.preventDefault();
                evt.target.value.length > 0
                  ? setSearch(true)
                  : setSearch(false);
                const value = evt.target.value;
                setFlag("email");
                onSearch(value, users, flag);
              }}
            />
          </div>
          <div className="filter-wrapper">
            <h4 className="search-title">SEARCH BY PHONE NUMBER</h4>
            <input
              type="number"
              className="search"
              onChange={(evt) => {
                evt.preventDefault();
                evt.target.value.length > 0
                  ? setSearch(true)
                  : setSearch(false);
                const value = evt.target.value;
                setFlag("number");
                onSearch(value, users, flag);
              }}
            />
          </div>
          <div className="filter-wrapper">
            <h4 className="search-title">FILTER BY STATUS</h4>
            <select
              name="filter"
              id="status-filt"
              className="status-filt"
              onChange={(evt) => {
                evt.target.value === "all" ? setSearch(false) : setSearch(true);
                evt.preventDefault();
                setFlag("status");
                onSearch(evt.target.value, users, flag);
              }}
            >
              <option value="all">all</option>
              <option value="admin">admin</option>
              <option value="client">client</option>
              <option value="partner">partner</option>
            </select>
          </div>
        </div>

        {!add ? (
          <button className="add" onClick={() => setAdd(true)}>
            ADD
          </button>
        ) : (
          <div className="add-user">
            <form
              action=""
              className="add--user"
              onSubmit={(evt) => {
                const target = evt.target;
                const email = target.querySelector(`.email`).value;
                const password = target.querySelector(`.password`).value;
                const number = target.querySelector(`.number`).value;
                const name = target.querySelector(`.name`).value;
                const status = target.querySelector(`.status`).value;
                evt.preventDefault();
                onSaveAdd(email, password, number, name, status);
                setAdd(false);
              }}
            >
              <div className="input-wrapper">
                <p className="h">E-MAIL</p>
                <input
                  type="email"
                  className="email"
                  required
                  placeholder="example@example.com"
                />
              </div>
              <div className="input-wrapper">
                <p className="h">Пароль</p>
                <input
                  type="text"
                  className="password"
                  required
                  minLength="6"
                  maxLength="20"
                  placeholder="******"
                />
              </div>
              <div className="input-wrapper">
                <p className="h">Номер </p>
                <input
                  type="number"
                  className="number"
                  required
                  placeholder="88005553535"
                />
              </div>
              <div className="input-wrapper">
                <p className="h">Имя</p>
                <input
                  type="text"
                  className="name"
                  required
                  placeholder="Олег Олегович Рыба"
                  maxLength="50"
                />
              </div>
              <div className="input-wrapper">
                <p className="h">Статус</p>
                <select name="" id="status" className="status" required>
                  <option value="admin">admin</option>
                  <option value="client">client</option>
                  <option value="partner">partner</option>
                </select>
              </div>
              <button className="save-add add-btn">SAVE</button>
              <button
                className="cancel-add add-btn"
                onClick={() => {
                  setAdd(false);
                }}
              >
                CANCEL
              </button>
            </form>
          </div>
        )}
        <ul className="user-list">
          <li className="title-list">
            <div className="title-item">E-MAIL</div>
            <div className="title-item">PASSWORD</div>
            <div className="title-item">NUMBER</div>
            <div className="title-item">NAME</div>
            <div className="title-item">STATUS</div>
            <div className="title-item">CREATED</div>
            <div className="title-item">CHANGED</div>
          </li>
          {dataType().map((it) => {
            return (
              <User
                user={it}
                onEdit={onEdit}
                users={users}
                onDelete={onDelete}
                key={it.id}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    users: state.users,
    searchData: state.searchData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onSaveAdd: (email, password, number, name, status) => {
      dispatch(ActionCreator.add(email, password, number, name, status));
    },
    onEdit: (id, email, password, number, name, status, users, created) => {
      dispatch(
        ActionCreator.edit(
          id,
          email,
          password,
          number,
          name,
          status,
          users,
          created
        )
      );
    },
    onDelete: (user, users) => {
      dispatch(ActionCreator.delete(user, users));
    },
    onSearch: (inputValue, users, flag) => {
      dispatch(ActionCreator.search(inputValue, users, flag));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Main);
