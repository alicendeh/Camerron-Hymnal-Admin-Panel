export default (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "ADD_HYMN":
      return {
        ...state,
        ...payload,
        Hymn: [state.Hymn, action.payload],
      };
    case "EDIT_HYMN":
      return {
        ...state,
        ...payload,
        Hymn: [state.Hymn, action.payload],
      };
    case "ALL_HYMNS":
      return {
        ...state,
        ...payload,
        Hymn: action.payload,
      };
    case "STORE_HYMN":
      return {
        ...state,
        ...payload,
        HymnStore: action.payload,
      };
    case "CLEAR_HYMN":
      return {
        ...state,
        ...payload,
        HymnStore: null,
      };
  }
};
