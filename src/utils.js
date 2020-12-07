import { store } from "./index.js";
import { ActionCreator } from "./reducer/reducer";

export const loadToStorage = (data, store) => {
  data.usr.map((it) => {
    console.log(it);
    localStorage.setItem(it.id, JSON.stringify(it));
    store.dispatch(ActionCreator.init(localStorage.getItem(it.id)));
  });
};
export const loadFromLocalStorage = () => {
  localStorage.removeItem("loglevel:webpack-dev-server");
  return Object.keys(localStorage).map((it) => {
    return JSON.parse(localStorage.getItem(it));
  });
};
export const max = (list) => {
  return list.reduce((a, b) => (a > b ? a : b));
};
export const date = (date) => {
  return (
    date.getHours() +
    ":" +
    date.getMinutes() +
    " " +
    date.getDate() +
    "." +
    date.getMonth() +
    "." +
    date.getFullYear()
  );
};
export const addToStorage = (email, password, number, name, status) => {
  localStorage.removeItem("loglevel:webpack-dev-server");
  const newData = {
    id: Number(max(Object.keys(localStorage))) + 1,
    email: email,
    password: password,
    number: number,
    name: name,
    status: status,
    created: date(new Date()),
    changed: date(new Date()),
  };

  localStorage.setItem(
    Number(max(Object.keys(localStorage))) + 1,
    JSON.stringify(newData)
  );
  store.dispatch(ActionCreator.init(newData));
};
export const edit = (
  id,
  email,
  password,
  number,
  name,
  status,
  users,
  created
) => {
  const changed = date(new Date());
  const index = (arr) => arr.findIndex((item) => item.id === id);
  let splicedArray = [...users];
  splicedArray.splice(index(users), 1, {
    id,
    email,
    password,
    number,
    name,
    status,
    created,
    changed,
  });
  localStorage.removeItem(id);
  localStorage.setItem(
    id,
    JSON.stringify({
      id,
      email,
      password,
      number,
      name,
      status,
      created,
      changed,
    })
  );
  return splicedArray;
};
export const deleteUser=(user,users)=>{
        const index = (arr) => arr.findIndex((item) => item.id === user.id);
        let splicedArray = [...users];
        splicedArray.splice(index(users), 1);
        localStorage.removeItem(user.id)
        return splicedArray;
      
}
export const searchUser = (inputValue, users) => {
    return users.filter((item) => {
      let regexp = new RegExp(`${inputValue}`, "i");
      if (regexp.test(item.email)) {
        return item;
      }
    });
    
  };
  export const filterByStatus = (inputValue, users) => {
    return users.filter((item) => {
      let regexp = new RegExp(`${inputValue}`, "i");
      if (regexp.test(item.status)) {
        return item;
      }
    });
    
  };