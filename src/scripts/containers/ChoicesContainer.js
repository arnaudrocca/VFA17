import React from 'react'
import { connect } from 'react-redux'
import { choiceMade, choicesDoneIncrement } from '../actions/index'
import Choice from '../components/Choice'

const mapStateToProps = (state) => {

    return {
        choicesState: state.choices
	}

}

const mapDispatchToProps = (dispatch) => {

	return {
	    onSubmit: (choiceId, answer) => {
	    	dispatch(choiceMade(choiceId, answer))
	    },
	    onChoiceDone: () => {
	    	dispatch(choicesDoneIncrement())
	    }
    }

}

const ChoicesContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(Choice)

export default ChoicesContainer
