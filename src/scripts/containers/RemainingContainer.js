import React from 'react'
import { connect } from 'react-redux'
import City from '../components/City'

const mapStateToProps = (state) => {

	return {
        remaining: state.remaining
	}

}

const RemainingContainer = connect(
	mapStateToProps
)(City)

export default RemainingContainer
