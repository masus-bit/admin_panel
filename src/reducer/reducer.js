
import { loadToStorage, loadFromLocalStorage, max, addToStorage, edit, deleteUser, searchUser } from "../utils";

const initialState = {
  users: [],
  searchData:[]
};
const actionType = {
  INIT: "INIT",
  LOAD:"LOAD",
  LOAD_TO_STORE:"LOAD_TO_STORE",
  ADD:"ADD",
  EDIT:"EDIT",
  DELETE:"DELETE",
  SEARCH:"SEARCH"
};
export const ActionCreator = {
  init: (data) => {
    return {
      type: actionType.INIT,
      payload:typeof data==='object'?data:JSON.parse(data),
    };
  },
  load:(data,store)=>{
    return{
      type:actionType.LOAD,
      payload: loadToStorage(data,store)
    }
  },
  loadToStore:()=>{
    return{
      type:actionType.LOAD_TO_STORE,
      payload: loadFromLocalStorage()
    }
  },
add:(email, password, number, name, status)=>{
  return{
    type:actionType.ADD,
    payload:addToStorage(email,password,number,name,status)
  }
},
edit:(id, email, password, number, name, status, users, created)=>{
  return{
    type:actionType.EDIT,
    payload:edit(id, email, password, number, name, status, users, created)
  }
},
delete:(user,users)=>{
  return{
    type:actionType.DELETE,
    payload:deleteUser(user,users)
  }
},
search:(inputValue,users)=>{
  return{
    type:actionType.SEARCH,
    payload:searchUser(inputValue,users)
  }
}

};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.INIT:
     
      return Object.assign({}, state, {
        users: state.users.concat(action.payload)
      });
    case actionType.LOAD_TO_STORE:
      return Object.assign({}, state, {
        users:action.payload
      });
    case actionType.EDIT:
      return Object.assign({},state,{
        users:action.payload
      });
    case actionType.DELETE:
      return Object.assign({},state,{
        users:action.payload
      });
    case actionType.SEARCH:
      return Object.assign({},state,{
        searchData:action.payload
      })
    
  }
  return state;
};

