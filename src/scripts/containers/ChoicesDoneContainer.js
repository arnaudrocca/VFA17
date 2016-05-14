import React from 'react'
import { connect } from 'react-redux'
import ChoicesDone from '../components/ChoicesDone'

const mapStateToProps = (state) => {

	return {
        choicesDone: state.choicesDone
	}

}

const ChoicesDoneContainer = connect(
	mapStateToProps
)(ChoicesDone)

export default ChoicesDoneContainer
