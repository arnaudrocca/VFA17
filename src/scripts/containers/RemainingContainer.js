import React from 'react'
import { connect } from 'react-redux'
import Remaining from '../components/Remaining'

const mapStateToProps = (state) => {

	return {
        remaining: state.remaining
	}

}

const remainingContainer = connect(
	mapStateToProps
)(Remaining)

export default remainingContainer
