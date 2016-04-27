import React from 'react'
import { connect } from 'react-redux'
import Score from '../components/Score'

const mapStateToProps = (state) => {

	return {
		score: state.score
	}

}

const scoreContainer = connect(
	mapStateToProps
)(Score)

export default scoreContainer
