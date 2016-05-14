import React from 'react'
import { connect } from 'react-redux'
import DragRemaining from '../components/DragRemaining'

const mapStateToProps = (state) => {

	return {
        remaining: state.remaining
	}

}

const RemainingContainer = connect(
	mapStateToProps
)(DragRemaining)

export default RemainingContainer
