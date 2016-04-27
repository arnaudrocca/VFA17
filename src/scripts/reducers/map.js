import { CONSTANTS } from '../constants/index'

const initialMap = [
	{
		id: 0,
		version: 'A'
	},
	{
		id: 1,
		version: 'A'
	},
	{
		id: 2,
		version: 'A'
	}
]

const map = (state = initialMap, action) => {

	switch (action.type) {
		case CONSTANTS.MAP_UPDATE:
			const result = state.map((mapItem, index) => {
				if (index == action.itemId) {
					return Object.assign({}, mapItem, {
						version: action.itemVersion
					});
				} else {
					return mapItem;
				}
			});
			return result;

		default:
			return state;
	}

}

export default map
