import { CONSTANTS } from '../constants/index'

const choicesDone = (state = 1, action) => {

	switch (action.type) {
		case CONSTANTS.CHOICESDONE_INCREMENT:
			return state + 1;

		default:
			return state;
	}

}

export default choicesDone
