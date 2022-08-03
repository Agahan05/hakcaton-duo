import React from "react";
import { phonesApi } from "../helpers/const";

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
  const [filterByPrice, setFilterByPrice] = React.useState([0, 150000]);
  const [minMax, setMinMax] = React.useState([0, 150000]);

  const getPhones = () => {
    fetch(
      `${phonesApi}?q=${searchWord}&price_gte=${filterByPrice[0]}&price_lte=${filterByPrice[1]}`
    )
      .then((res) => res.json())
      .then((data) => {
        let action = {
          type: "GET_PHONES",
          payload: data,
        };
        dispatch(action);
      });
  };

  const getPrices = () => {
    fetch(phonesApi)
      .then((res) => res.json())
      .then((data) => {
        data.sort((a, b) => a.price - b.price);
        let max = data[data.length - 1].price;
        let min = data[0].price;
        setMinMax([min, max]);
        setFilterByPrice([min, max]);
      });
  };

  const data = {
    phones: state.phones,
    getPhones,
    setFilterByPrice,
    minMax,
    filterByPrice,
  };

  return (
    <ClientContext.Provider value={data}>{children}</ClientContext.Provider>
  );
}

export default ClientProvider;
