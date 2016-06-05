import { CONSTANTS } from '../constants/index'

const initialHotpoints = [
	{
		id: 0,
		answers: ''
	},
	{
		id: 1,
		answers: ''
	},
	{
		id: 2,
		answers: ''
	},
	{
		id: 3,
		answers: ''
	},
	{
		id: 4,
		answers: ''
	},
	{
		id: 5,
		answers: ''
	},
	{
		id: 6,
		answers: ''
	},
	{
		id: 7,
		answers: ''
	},
	{
		id: 8,
		answers: ''
	}
]

const hotpoints = (state = initialHotpoints, action) => {

	switch (action.type) {
		case CONSTANTS.HOTPOINT_UPDATE:
            const result = state.map((hotpoint, index) => {
                if (index == action.mapId) {
					return Object.assign({}, hotpoint, {
						answers: action.answer
					})
				} else {
					return hotpoint
				}
            })
            return result

		default:
			return state
	}

}

export default hotpoints
