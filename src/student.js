export const types = {
    LIST: "LIST",
    RANK: "RANK",
    ADD: "ADD",
  };

export const actionCreators = {
  list: items => {
    return { type: types.LIST, payload: items };
  },
  add: item =>{
    return {type: types.ADD, payload: item}
  },
  rank: items =>{
    return {type: types.RANK, payload: items}
  },
};

const initialState = {
    todos: [{}],
    ranks:[{}]
};

export const reducer = (state = initialState, action) => {
  const { todos,ranks } = state;
  const { type, payload } = action;
    switch (type) {
        case types.LIST: {
        return {
          ...state,
          todos: payload,
        };
      }
      case types.ADD: {
        return {
          ...state,
          todos: [...todos, payload],
          ranks: [...ranks, payload]
        };
      }
      case types.RANK: {
        return {
          ...state,
          ranks: payload
        };
      }  
    }
    return state;
  };
