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

  const limit = 6;
  const [pagesCount, setPagesCount] = React.useState(1);
  const [currentPage, setCurrentPage] = React.useState(1);

  const getPhones = () => {
    fetch(
      `${phonesApi}?q=${searchWord}&price_gte=${filterByPrice[0]}&price_lte=${filterByPrice[1]}&_limit=${limit}&_page=${currentPage}`
    )
      .then((res) => {
        let count = Math.ceil(res.headers.get("X-Total-Count") / limit);
        setPagesCount(count);
        return res.json();
      })
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

  React.useEffect(() => {
    getPrices();
  }, []);

  const data = {
    phones: state.phones,
    getPhones,
    pagesCount,
    currentPage,
    searchWord,
    setFilterByPrice,
    minMax,
    filterByPrice,
    setCurrentPage,
    setSearchWord,
  };

  return (
    <ClientContext.Provider value={data}>{children}</ClientContext.Provider>
  );
}

export default ClientProvider;
