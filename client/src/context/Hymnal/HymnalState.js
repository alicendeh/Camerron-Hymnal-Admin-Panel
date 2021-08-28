import HymnalContext from "./HymnalContext";
import HymnalReducer from "./HymnalReducer";
import React, { useReducer } from "react";

import axios from "axios";

const HymnalState = (props) => {
  const initialState = {
    Hymn: null,
    HymnStore: null,
  };

  const [state, dispatch] = useReducer(HymnalReducer, initialState);

  //add hymn
  const addHymnal = async (formData) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      let res = await axios.post(
        "/api/CH/AdminAuth/createHymn",
        formData,
        config
      );
      dispatch({ type: "ADD_HYMN", payload: res.data });
    } catch (error) {
      console.log(error.message);
    }
  };

  //get all hymns
  const allHymns = async () => {
    try {
      let res = await axios.get("/api/CH/AdminAuth/getAll");
      dispatch({ type: "ALL_HYMNS", payload: res.data });
    } catch (error) {
      console.log(error.message);
    }
  };

  //store
  const storeCurrentHymn = (hymnData) => {
    dispatch({ type: "STORE_HYMN", payload: hymnData });
  };

  //onClear
  const onClear = () => {
    dispatch({ type: "CLEAR_HYMN" });
  };
  const editHymnal = async (formData, HymnID) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      let res = await axios.put(
        `/api/CH/AdminAuth/edit/${HymnID}`,
        formData,
        config
      );
      dispatch({ type: "EDIT_HYMN", payload: res.data });
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <HymnalContext.Provider
      value={{
        Hymn: state.Hymn,
        HymnStore: state.HymnStore,
        addHymnal,
        storeCurrentHymn,
        allHymns,
        onClear,
        editHymnal,
      }}
    >
      {props.children}
    </HymnalContext.Provider>
  );
};

export default HymnalState;
