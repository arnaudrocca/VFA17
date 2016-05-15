import { CONSTANTS } from '../constants/index'

const initialMayor = {
	dialog: ''
}

const mayor = (state = initialMayor, action) => {

	switch (action.type) {
		case CONSTANTS.MAYOR_TALKS:
			return Object.assign({}, state, {
				dialog: action.dialog
			})

		default:
			return state
	}

}

export default mayor
