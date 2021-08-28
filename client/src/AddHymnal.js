import React, { useState, useContext, useEffect } from "react";
import HymnalContext from "./context/Hymnal/HymnalContext";
// import ViewHymnal from "./ViewHymnal";

export default function AddHymnal() {
  const hymnalContext = useContext(HymnalContext);
  const { Hymn, addHymnal, storeCurrentHymn, HymnStore, onClear, editHymnal } =
    hymnalContext;

  const [Data, setData] = useState({ HymneNo: "", title: "", body: "" });
  const { HymneNo, title, body } = Data;

  const onChange = (e) => setData({ ...Data, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (HymnStore) {
      editHymnal(Data, HymnStore._id);
      setData({ HymneNo: "", title: "", body: "" });
    } else {
      addHymnal({ HymneNo, title, body });
      setData({ HymneNo: "", title: "", body: "" });
    }
  };
  useEffect(() => {
    if (HymnStore) {
      setData({
        HymneNo: HymnStore.HymneNo,
        title: HymnStore.title,
        body: HymnStore.body,
      });
    } else {
      setData({ HymneNo: "", title: "", body: "" });
    }
  }, [HymnStore]);

  const clear = () => {
    onClear();
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <h1>Add A Hymn</h1>
        <h2
          onClick={clear}
          style={{
            cursor: "pointer",
          }}
        >
          {HymnStore && "Clear"}
        </h2>
      </div>
      <form onSubmit={onSubmit}>
        <div>
          <label>Hymn Number</label>

          <br />
          <br />
          <input
            style={{
              padding: 15,
              width: "35vw",
            }}
            type="HymneNo"
            name="HymneNo"
            value={HymneNo}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <label>Hymn Title</label>
          <br />
          <br />

          <input
            style={{
              padding: 15,
              width: "35vw",
            }}
            type="title"
            name="title"
            value={title}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <label>Body</label>
          <br />
          <br />

          <textarea
            style={{
              padding: 15,
              width: "35vw",
              height: "31vh",
            }}
            type="body"
            name="body"
            value={body}
            onChange={onChange}
          ></textarea>
        </div>
        <br />
        <div>
          <button
            style={{
              padding: 15,
              width: "37vw",
            }}
          >
            {HymnStore ? "Edit" : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
}
