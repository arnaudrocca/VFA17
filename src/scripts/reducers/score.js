import { CONSTANTS } from '../constants/index'

const score = (state = 1, action) => {

	switch (action.type) {
		case CONSTANTS.SCORE_UPDATE:
			return state + action.score

		default:
			return state
	}

}

export default score
