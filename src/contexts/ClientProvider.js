import React from "react";
import { appleApi, phonesApi } from "../helpers/const";

export const ClientContext = React.createContext();

const reducer = (state, action) => {
  if (action.type === "GET_PHONES") {
    return {
      ...state,
      phones: action.payload,
    };
  }
  return state;
};

function ClientProvider({ children }) {
  const [state, dispatch] = React.useReducer(reducer, {
    phones: [],
  });

  const [searchWord, setSearchWord] = React.useState("");

  const getPhones = () => {
    fetch(`${phonesApi}?q=${searchWord}`)
      .then((res) => res.json())
      .then((data) => {
        let action = {
          type: "GET_PHONES",
          payload: data,
        };
        dispatch(action);
      });
  };

  const data = {
    phones: state.phones,
    getPhones,
  };

  return (
    <ClientContext.Provider value={data}>{children}</ClientContext.Provider>
  );
}

export default ClientProvider;
