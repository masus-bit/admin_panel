import React, { useState } from "react";

const User = (props) => {
  const { user, onEdit, users, onDelete } = props;
  const [edit, setEdit] = useState(false);

  return !edit ? (
    <li className="user-item">
      <div className="user-email info">{user.email}</div>
      <div className="user-password info">{user.password}</div>
      <div className="user-number info">{user.number}</div>
      <div className="user-name info">{user.name}</div>
      <div className="user-status info">{user.status}</div>
      <div className="user-created info">{user.created}</div>
      <div className="user-changed info">{user.changed}</div>
      <div className="btns">
        <button className="edit-btn" onClick={() => setEdit(true)}>
          EDIT
        </button>

        <button
          className="delete"
          onClick={() => {
            onDelete(user, users);
            alert(user.name + "  deleted");
          }}
        >
          DELETE
        </button>
      </div>
    </li>
  ) : (
    <form
      className="edit-form"
      action=""
      onSubmit={(evt) => {
        evt.preventDefault();
        const target = evt.target;
        const email = target.querySelector(`.email-edit`).value;
        const password = target.querySelector(`.password-edit`).value;
        const number = target.querySelector(`.number-edit`).value;
        const name = target.querySelector(`.name-edit`).value;
        const status = target.querySelector(`.status-edit`).value;
        onEdit(
          user.id,
          email,
          password,
          number,
          name,
          status,
          users,
          user.created
        );
        setEdit(false);
      }}
    >
      <input
        type="text"
        className="email-edit edit"
        defaultValue={user.email}
      />
      <input
        type="text"
        className="password-edit edit"
        defaultValue={user.password}
      />
      <input
        type="text"
        className="number-edit edit"
        defaultValue={user.number}
      />
      <input type="text" className="name-edit edit" defaultValue={user.name} />
      <select name="" id="" className="status-edit edit">
        <option value="admin">admin</option>
        <option value="client" selected>
          client
        </option>
        <option value="partner">partner</option>
      </select>
      <button className="save-btn">SAVE</button>
    </form>
  );
};
export default User;
