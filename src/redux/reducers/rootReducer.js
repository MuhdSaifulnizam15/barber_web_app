import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
// reducer
import userReducer from "redux/slices/user";
import branchReducer from "redux/slices/branch";

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "redux-",
  whitelist: [],
};

const rootReducer = combineReducers({
  user: userReducer,
  branch: branchReducer,
});

export { rootPersistConfig, rootReducer };
