import React, { useState, useContext, useEffect } from "react";
import LinesEllipsis from "react-lines-ellipsis";
import OpenModal from "./Modal";
import HymnalContext from "./context/Hymnal/HymnalContext";

export default function ViewHymnal({ setData }) {
  const hymnalContext = useContext(HymnalContext);
  const { Hymn, allHymns, storeCurrentHymn } = hymnalContext;

  const [getHymns, setgetHymns] = useState();
  const [getTotalCount, setgetTotalCount] = useState();
  const [isEmpty, setisEmpty] = useState(false);

  useEffect(() => {
    allHymns();
    if (Hymn && typeof Hymn.getAll === "object") {
      setgetHymns(Hymn.getAll);
      setgetTotalCount(Hymn.total);
    } else {
      setisEmpty(true);
    }
  }, [Hymn]);

  const [showModal, setShowModal] = useState(false);
  const [currentHymn, setcurrentHymn] = useState();

  const openModal = (aHymn) => {
    setShowModal(!showModal);
    setcurrentHymn(aHymn);
  };
  const onEdit = (aHymn) => {
    storeCurrentHymn(aHymn);
  };
  return (
    <div
      style={{
        height: "100vh",
      }}
    >
      <OpenModal
        showModal={showModal}
        setShowModal={setShowModal}
        currentHymn={currentHymn}
      />
      <div
        style={{
          background: "red",
          padding: 12,
          borderRadius: 9,
          position: "fixed",
        }}
      >
        <h3>{getTotalCount} </h3>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          position: showModal && "relative",
        }}
      >
        {getHymns &&
          getHymns.map((aHymn) => (
            <div
              key={aHymn.HymneNo}
              style={{
                width: "40%",
                backgroundColor: "teal",
                color: "white",
                padding: 8,
                margin: 14,
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  flexDirection: "row",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <h4>Number : {aHymn.HymneNo} </h4>
                <h4 onClick={() => onEdit(aHymn)}>Edit</h4>
              </div>

              <div onClick={() => openModal(aHymn)}>
                <h4>title : {aHymn.title}</h4>
                <h4>Category : {aHymn.category}</h4>
                <p></p>
                <LinesEllipsis
                  text={aHymn.body}
                  maxLine="2"
                  ellipsis="..."
                  trimRight
                  basedOn="letters"
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
