import React from 'react'
import { connect } from 'react-redux'
import Hotpoints from '../components/Hotpoints'
import { mayorTalks } from '../actions/index'

const mapStateToProps = (state) => {

	return {
		hotpoints: state.hotpoints
	}

}

const mapDispatchToProps = (dispatch) => {
	return {
	    onClick: (dialog) => {
	    	dispatch(mayorTalks(dialog));
	    }
    }

}

const HotpointsContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(Hotpoints)

export default HotpointsContainer
