import { CONSTANTS } from '../constants/index'

const initialMenu = [
	{
		id: 0,
		state: 'todo',
		period: ''
	},
	{
		id: 1,
		state: 'locked',
		period: ''
	},
	{
		id: 2,
		state: 'locked',
		period: ''
	},
	{
		id: 3,
		state: 'locked',
		period: ''
	},
	{
		id: 4,
		state: 'locked',
		period: ''
	}
]

const menu = (state = initialMenu, action) => {

	switch (action.type) {
		case CONSTANTS.MENU_UPDATE:
			const result = state.map((link, index) => {
		        if (index == action.choiceId) {
		        	return Object.assign({}, link, {
		            	state: 'done',
						period: action.period
		        	})
		    	}
				else if (index == parseInt(action.choiceId, 10) + 1) {
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
