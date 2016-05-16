import React from 'react'
import { connect } from 'react-redux'
import Mayor from '../components/Mayor'
import { mayorTalks } from '../actions/index'

const mapStateToProps = (state) => {

	return {
		dialog: state.mayor.dialog
	}

}

const mapDispatchToProps = (dispatch) => {

	return {
	    mayorTalked: () => {
	    	dispatch(mayorTalks(''))
	    }
    }

}

const MayorContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(Mayor)

export default MayorContainer
