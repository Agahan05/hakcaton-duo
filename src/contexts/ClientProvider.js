import React from "react";
import { appleApi, phonesApi } from "../helpers/const";

export const AdminContext = React.createContext();

const reducer = (state, action) => {
  return state;
};

function ClientProvider() {
  const getPhones = () => {
    fetch(phonesApi)
      .then((res) => res.json())
      .then((data) => {});
  };

  return <div></div>;
}

export default Provider;
