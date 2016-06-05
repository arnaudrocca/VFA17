import React from 'react'
import { connect } from 'react-redux'
import End from '../components/End'

const mapStateToProps = (state) => {

	return {
		score: state.score
	}

}

const EndContainer = connect(
	mapStateToProps
)(End)

export default EndContainer
