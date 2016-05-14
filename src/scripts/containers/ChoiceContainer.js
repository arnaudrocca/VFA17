import React from 'react'
import { connect } from 'react-redux'
import { choiceMade } from '../actions/index'
import Choices from '../components/Choices'

const mapStateToProps = (state) => {

    return {
        choiceState: state.choices
	}

}

const mapDispatchToProps = (dispatch) => {

	return {
	    onSubmit: (choiceId, answer, timeout) => {
	    	dispatch(choiceMade(choiceId, answer, timeout));
	    }
    }

}

const ChoiceContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(Choices)

export default ChoiceContainer
