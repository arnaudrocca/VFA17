import { CONSTANTS } from '../constants/index'

const initialMenu = [
	{
		id: 0,
		state: 'todo'
	},
	{
		id: 1,
		state: 'disabled'
	},
	{
		id: 2,
		state: 'disabled'
	},
	{
		id: 3,
		state: 'disabled'
	},
	{
		id: 4,
		state: 'disabled'
	}
]

const menu = (state = initialMenu, action) => {

	switch (action.type) {
		case CONSTANTS.MENU_UPDATE:
			const result = state.map((link, index) => {
		        if (index == action.choiceId) {
		        	return Object.assign({}, link, {
		            	state: 'done'
		        	});
		    	}
				else if (index == action.choiceId + 1) {
		    		return Object.assign({}, link, {
		    			state: 'todo'
		    		});
		    	}
		    	else {
		    		return link;
		    	}
	        });
			return result;

		default:
			return state;
	}

}

export default menu
