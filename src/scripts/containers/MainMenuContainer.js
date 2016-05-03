import React from 'react'
import { connect } from 'react-redux'
import MainMenu from '../components/MainMenu'

const mapStateToProps = (state) => {

	return {
		menuState: state.menu
	}

}

const MainMenuContainer = connect(
	mapStateToProps
)(MainMenu)

export default MainMenuContainer
