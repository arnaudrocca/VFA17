import React from 'react'
import ScoreContainer from '../containers/ScoreContainer'
import MenuContainer from '../containers/MenuContainer'
import MapContainer from '../containers/MapContainer'
import MayorContainer from '../containers/MayorContainer'
import Audio from '../utils/audio'

class Experiment extends React.Component {

	/**
     * @constructor
     */
	constructor() {

		super()

		window.cityAudio = new Audio()
		window.cityAudio.loadSound('assets/audio/ambiance_city.wav')

	}

	/**
     * @method
	 * @name render
     */
	render() {

		return (
			<div className="experiment">
				<ScoreContainer />
				<div className="experiment__wrapper">
					<MayorContainer />
					<MapContainer />
				</div>
				<MenuContainer />
				{this.props.children}
			</div>
		)

	}

}

export default Experiment
