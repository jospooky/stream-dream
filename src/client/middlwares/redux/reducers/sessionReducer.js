import storage from 'redux-persist/lib/storage';
import {
	persistReducer
} from 'redux-persist';

const initialState = {
	user: {
		email: '',
		display_name: '',
		avatar: '',
		id: -1
	},
	refreshFollowed: false
};

const SET_USER_PROPS = 'SET_USER_PROPS';
const FORCE_FOLLOWED_REFRESH = 'FORCE_FOLLOWED_REFRESH'

function sessionReducer(state = initialState, action) {
	switch (action.type) {
		case SET_USER_PROPS:
			return Object.assign({}, state, {
				user: action.payload
			});

		case FORCE_FOLLOWED_REFRESH:
			return Object.assign({}, state, {
				refreshFollowed: action.payload
			})
		default:
			return state;
	}
}

export function setUserProps(user) {
	return {
		type: SET_USER_PROPS,
		payload: user
	};
}

export function forceFollowedUsersRefresh(force) {
	return {
		type: FORCE_FOLLOWED_REFRESH,
		payload: force
	}
}

const persistConfig = {
	key: 'root',
	storage
};

export default persistReducer(persistConfig, sessionReducer);