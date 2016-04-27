import { combineReducers } from 'redux'
import choices from './choices'
import remaining from './remaining'
import menu from './menu'
import map from './map'
import score from './score'
import mayor from './mayor'
import hotpoints from './hotpoints'

const mainReducer = combineReducers({

	choices,
	remaining,
	menu,
	map,
	score,
	mayor,
	hotpoints

})

export default mainReducer
