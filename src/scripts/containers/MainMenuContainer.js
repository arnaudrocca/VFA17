import React from 'react'
import { connect } from 'react-redux'
// import MainMenu from '../components/MainMenu'
import Menu from '../components/Menu'

const mapStateToProps = (state) => {

	return {
		menuState: state.menu
	}

}

const MainMenuContainer = connect(
	mapStateToProps
)(Menu)

export default MainMenuContainer
