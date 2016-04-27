import React from 'react'
import { connect } from 'react-redux'
import Mayor from '../components/Mayor'

const mapStateToProps = (state) => {

	return {
		dialog: state.mayor.dialog
	}

}

const mayorContainer = connect(
	mapStateToProps
)(Mayor)

export default mayorContainer
