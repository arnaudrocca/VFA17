import React from 'react'
import { connect } from 'react-redux'
import City from '../components/City'

const mapStateToProps = (state) => {

	return {
		score: state.score
	}

}

const ScoreContainer = connect(
	mapStateToProps
)(City)

export default ScoreContainer
