import { SIDEBAR_OPEN, SIDEBAR_CLOSE } from "./../actions";

const navbar_reducer = (state: boolean, action: any) => {
  if (action.type === SIDEBAR_OPEN) {
    return { state, isSidebarOpen: true };
  }
  if (action.type === SIDEBAR_CLOSE) {
    return { state, isSidebarOpen: false };
  }
  return state;
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default navbar_reducer;
