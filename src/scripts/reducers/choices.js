import { CONSTANTS } from '../constants/index'

const initialChoices = [
	{
		id: 0,
		version: '',
		answer: 'undefined'
	},
	{
		id: 1,
		version: '',
		answer: 'undefined'
	},
	{
		id: 2,
		version: 'undefined',
		answer:'undefined'
	},
	{
		id: 3,
		version: 'undefined',
		answer: 'undefined'
	},
	{
		id: 4,
		version: 'undefined',
		answer: 'undefined'
	}
]

const choices = (state = initialChoices, action) => {

	switch (action.type) {
		case CONSTANTS.CHOICE_UPDATE:
			const result = state.map((choice, index) => {
				if (index == action.choiceId) {
					return Object.assign({}, choice, {
						answer: action.choice
					})
				}
				else if (index == parseInt(action.choiceId) + 1) {
					return Object.assign({}, choice, {
						version: action.nextChoiceVersion
					})
				}
				else {
					return choice
				}
			})
			return result

		default:
			return state
	}

}

export default choices
