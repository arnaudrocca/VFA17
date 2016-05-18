import { CONSTANTS } from '../constants/index'

const initialMenu = [
	{
		id: 0,
		state: 'todo'
	},
	{
		id: 1,
		state: 'locked'
	},
	{
		id: 2,
		state: 'locked'
	},
	{
		id: 3,
		state: 'locked'
	},
	{
		id: 4,
		state: 'locked'
	}
]

const menu = (state = initialMenu, action) => {

	switch (action.type) {
		case CONSTANTS.MENU_UPDATE:
			const result = state.map((link, index) => {
		        if (index == action.choiceId) {
		        	return Object.assign({}, link, {
		            	state: 'done'
		        	})
		    	}
				else if (index == parseInt(action.choiceId) + 1) {
		    		return Object.assign({}, link, {
		    			state: 'todo'
		    		})
		    	}
		    	else {
		    		return link
		    	}
	        })
			return result

		default:
			return state
	}

}

export default menu
