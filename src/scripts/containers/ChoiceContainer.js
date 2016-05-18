import React from 'react'
import { connect } from 'react-redux'
import { choiceMade } from '../actions/index'
import Choices from '../components/Choices'

const mapStateToProps = (state) => {

    return {
        choicesState: state.choices
	}

}

const mapDispatchToProps = (dispatch) => {

	return {
	    onSubmit: (choiceId, answer) => {
	    	dispatch(choiceMade(choiceId, answer))
	    }
    }

}

const ChoiceContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(Choices)

export default ChoiceContainer
