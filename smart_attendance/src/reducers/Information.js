export const SET_USER_TYPE = 'USER_TYPE';
export const SET_LOGIN = 'LOGIN';
export const SET_USER = 'USER';
export const SET_USER_DATA = 'USER_DATA';
export const SET_COURSE = 'COURSE';
export const setUserType = (setType) => ({ type: SET_USER_TYPE, setType });
export const setLogin = (enableLogin) => ({ type: SET_LOGIN, enableLogin });
export const setUser = (user) => ({ type: SET_USER, user });
export const setUserData = (userData) => ({ type: SET_USER_DATA, userData });
export const setCourse = (course) => ({ type: SET_COURSE, course });
export default function reducer(
	state = {
		setType: 'student',
		enableLogin: false,
		user: null,
		userData: null,
		course: null,
	},
	action
) {
	switch (action.type) {
		case SET_USER_TYPE:
			return { ...state, setType: action.setType };
		case SET_LOGIN:
			return { ...state, enableLogin: action.enableLogin };
		case SET_USER:
			return { ...state, user: action.user };
		case SET_USER_DATA:
			return { ...state, userData: action.userData };
		case SET_COURSE:
			return { ...state, course: action.course };
	}
	return state;
}
