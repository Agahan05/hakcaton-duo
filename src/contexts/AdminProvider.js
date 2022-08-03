import React from "react";
import { phonesApi } from "../helpers/const";

export const AdminContext = React.createContext();

const reducer = (state, action) => {
  if (action.type === "GET_PHONES") {
    return {
      ...state,
      phones: action.payload,
    };
  } else if (action.type === "GET_PHONS_EDIT") {
    return {
      ...state,
      phonsToEdit: action.payload,
    };
  }
  return state;
};

function AdminProvider({ children }) {
  const [state, dispatch] = React.useReducer(reducer, {
    phones: [],
    phonsToEdit: null,
  });

  const sendNewPhones = (newPhones) => {
    fetch(phonesApi, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPhones),
    });
  };

  const getPhones = () => {
    fetch(phonesApi)
      .then((res) => res.json())
      .then((data) => {
        let action = {
          type: "GET_PHONES",
          payload: data,
        };
        dispatch(action);
      });
  };

  const deletePhons = (id) => {
    fetch(`${phonesApi}/${id}`, {
      method: "DELETE",
    }).then(() => getPhones());
  };

  const getPhonsEdit = (id) => {
    fetch(`${phonesApi}/${id}`)
      .then((res) => res.json())
      .then((data) => {
        let action = {
          type: "GET_PHONS_EDIT",
          payload: data,
        };
        dispatch(action);
      });
  };

  const saveEditPhons = (editedPhons) => {
    fetch(`${phonesApi}/${editedPhons.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedPhons),
    });
  };

  const data = {
    phones: state.phones,
    phonsToEdit: state.phonsToEdit,
    getPhones,
    deletePhons,
    getPhonsEdit,
    saveEditPhons,
    sendNewPhones,
  };

  return <AdminContext.Provider value={data}>{children}</AdminContext.Provider>;
}

export default AdminProvider;
