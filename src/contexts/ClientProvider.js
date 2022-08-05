import React from "react";
import { phonesApi } from "../helpers/const";

export const ClientContext = React.createContext();

const reducer = (state, action) => {
  if (action.type === "GET_PHONES") {
    return {
      ...state,
      phones: action.payload,
    };
  } else if (action.type === "GET_PHONES_FROM_BASKET") {
    return {
      ...state,
      basketPhones: action.payload,
    };
  } else if (action.type === "GET_BASKET_COUNT") {
    return {
      ...state,
      basketCount: action.payload,
    };
  }
  return state;
};

function ClientProvider({ children }) {
  const [state, dispatch] = React.useReducer(reducer, {
    phones: [],
    basketPhones: {
      products: [],
      totalPrice: 0,
    },
    basketCount: 0,
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

  // ! Basket

  const addPhonesToBasket = (phone) => {
    let basket = JSON.parse(localStorage.getItem("basket"));
    if (!basket) {
      basket = {
        totalPrice: 0,
        products: [],
      };
    }
    let phoneToBasket = {
      ...phone,
      count: 1,
      subPrice: phone.price,
    };

    let check = basket.products.find((item) => {
      return item.id == -phoneToBasket.id;
    });
    if (check) {
      basket.products = basket.products.map((item) => {
        if (item.id === phoneToBasket.id) {
          item.count++;
          item.subPrice = item.count * item.price;
          return item;
        }
        return item;
      });
    } else {
      basket.products.push(phoneToBasket);
    }
    basket.totalPrice = basket.products.reduce((prev, item) => {
      return prev + item.subPrice;
    }, 0);
    localStorage.setItem("basket", JSON.stringify(basket));
    // getBasketCount();
  };

  const getPhonesFromBasket = () => {
    let basket = JSON.parse(localStorage.getItem("basket"));
    let action = {
      type: "GET_PHONES_FROM_BASKET",
      payload: basket,
    };
    dispatch(action);
  };

  React.useEffect(() => {
    getPrices();
    // getBasketCount();
  }, []);

  const data = {
    phones: state.phones,
    getPhones,
    pagesCount,
    currentPage,
    searchWord,
    basketCount: state.basketCount,
    basketPhones: state.basketPhones,
    setFilterByPrice,
    minMax,
    filterByPrice,
    setCurrentPage,
    setSearchWord,
    addPhonesToBasket,
    getPhonesFromBasket,
  };

  return (
    <ClientContext.Provider value={data}>{children}</ClientContext.Provider>
  );
}

export default ClientProvider;
