import React from 'react'
import { connect } from 'react-redux'
import Menu from '../components/Menu'
import { mayorTalks } from '../actions/index'

const mapStateToProps = (state) => {

	return {
		menuState: state.menu,
		choicesState: state.choices
	}

}

const mapDispatchToProps = (dispatch) => {

	return {
	    mayorTalks: (dialog, mood) => {
	    	dispatch(mayorTalks(dialog, mood))
	    }
    }

}

const MenuContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(Menu)

export default MenuContainer
