import React from "react";

export default function Modal({ showModal, setShowModal, currentHymn }) {
  const onClose = () => {
    setShowModal(false);
  };
  return (
    <div>
      {showModal && (
        <div
          style={{
            width: "100vw",
            height: "100vh",
            zIndex: 2,
            position: "fixed",
            backgroundColor: "rgba(0,0,0,0.7)",
          }}
        >
          <div
            style={{
              display: "grid",
              alignItems: "center",
              flexDirection: "column",
              width: "45vw",
              marginLeft: "8vw",
            }}
          >
            <div
              style={{
                color: "black",
                backgroundColor: "white",
                boxShadow: "1px 2px 2px 5px 5px 5px rgba(0,0,0,0.3)",
                padding: 8,
                margin: 10,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div
                  onClick={onClose}
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    margin: 8,
                    cursor: "pointer",
                    color: "black",
                  }}
                >
                  <h3>Close</h3>
                </div>
                <h6> {currentHymn && currentHymn.title} </h6>
                <h4> {currentHymn && currentHymn.HymneNo} </h4>
              </div>
              <div>
                <h5
                  style={{
                    textTransform: "capitalize",
                    lineHeight: 3,
                  }}
                >
                  {currentHymn && currentHymn.body}
                </h5>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
