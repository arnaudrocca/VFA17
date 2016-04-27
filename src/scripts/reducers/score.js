import { CONSTANTS } from '../constants/index'

const score = (state = 2, action) => {

	switch (action.type) {
		case CONSTANTS.SCORE_UPDATE:
			return state + action.score;

		default:
			return state;
	}

}

export default score
