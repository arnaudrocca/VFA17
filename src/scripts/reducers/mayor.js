import { CONSTANTS } from '../constants/index'

const initialMayor = {
	dialog: '',
	mood: 'neutral'
}

const mayor = (state = initialMayor, action) => {

	switch (action.type) {
		case CONSTANTS.MAYOR_TALKS:
			return Object.assign({}, state, {
				dialog: action.dialog,
				mood: action.mood
			})

		default:
			return state
	}

}

export default mayor
