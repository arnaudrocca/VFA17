import React from 'react'
import { connect } from 'react-redux'
import Menu from '../components/Menu'

const mapStateToProps = (state) => {

	return {
		menuState: state.menu
	}

}

const MenuContainer = connect(
	mapStateToProps
)(Menu)

export default MenuContainer
