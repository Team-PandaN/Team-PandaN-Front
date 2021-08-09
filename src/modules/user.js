import { createAction, handleActions } from "redux-actions";
import { userApi } from "../shared/api"; 

/* == User - initial state */
const initialState = {
  user: {
    name : "",
    email : "",
    picture : "",
  },
  isLoggedIn: false,
};

/* == action */
const LOGOUT = "user/LOGOUT";
const GET_USER_DETAIL = "user/GET_USER_DETAIL"

/* == action creator */
const logout = createAction(LOGOUT, () => ({}));
const getUserDetail = createAction(GET_USER_DETAIL, ( user ) => ({ user }));

/* == thunk function */
const __logout =
  () =>
  async (dispatch, getState, { history }) => {
    try {
      await userApi.logout();
      dispatch(logout());
		  history.push("/login");
    } catch (e) {
      console.log(e);
    }
  };

const __getUserDetail =
  () =>
  async (dispatch, getState, { history }) => {
    try {
      const { data } = await userApi.getUserDetail();
      console.log(data);
      // dispatch(getUserDetail(data));
    } catch (e) {
      console.log(e);
    }
  };

/* == reducer */
const user = handleActions(
  {
    [LOGOUT]: (state, action) => {
			return {
				...state,
				isLoggedIn: false,
			};
		},
    [GET_USER_DETAIL]: (state, action) => {
			return {
				...state,
				user: action.payload.user,
        isLoggedIn: true,
			};
		},
  },
  initialState,
);

/* == export actions */
export const userActions = {
  __logout,
  __getUserDetail,
};

export default user;
