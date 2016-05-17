import { CONSTANTS } from '../constants/index'

const initialHotpoints = [
	{
		id: 0,
		visited: false,
		answers: []
	},
	{
		id: 1,
		visited: false,
		answers: []
	},
	{
		id: 2,
		visited: false,
		answers: []
	},
	{
		id: 3,
		visited: false,
		answers: []
	}
]

const hotpoints = (state = initialHotpoints, action) => {

	switch (action.type) {
		case CONSTANTS.HOTPOINT_UPDATE:
            const result = state.map((hotpoint, index) => {
                if (index == action.mapId) {
					return Object.assign({}, hotpoint, {
						answers: [...hotpoint.answers, action.answer]
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
