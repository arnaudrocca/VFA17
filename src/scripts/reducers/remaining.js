import { CONSTANTS } from '../constants/index'

const remaining = (state = 5, action) => {

	switch (action.type) {
		case CONSTANTS.REMAINING_DECREMENT:
			return state - 1;

		default:
			return state;
	}

}

export default remaining
