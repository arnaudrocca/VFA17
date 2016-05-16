import React from 'react'
import { connect } from 'react-redux'
import Mayor from '../components/Mayor'
import { mayorTalks } from '../actions/index'

const mapStateToProps = (state) => {

	return {
		dialog: state.mayor.dialog,
		mood: state.mayor.mood
	}

}

const mapDispatchToProps = (dispatch) => {

	return {
	    mayorTalked: () => {
	    	dispatch(mayorTalks('', 'neutral'))
	    }
    }

}

const MayorContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(Mayor)

export default MayorContainer
