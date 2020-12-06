const initialState = {
  users: null,
};
const actionType = {
  INIT: "INIT",
};
export const ActionCreator = {
  init: (data) => {
    return {
      type: actionType.INIT,
      payload: JSON.parse(data),
    };
  },
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.INIT:
      return Object.assign({}, state, {
        users: action.payload,
      });
  }
  return state;
};
