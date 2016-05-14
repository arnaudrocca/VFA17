import React from 'react'
import ScoreContainer from '../containers/ScoreContainer'
import MainMenuContainer from '../containers/MainMenuContainer'
import MapContainer from '../containers/MapContainer'
import MayorContainer from '../containers/MayorContainer'

class Experiment extends React.Component {

	constructor() {

		super();

	}

	render() {

		return (
			<div className="experiment">
				<ScoreContainer />
				<MayorContainer />
				<MainMenuContainer />
				<MapContainer />
				{this.props.children}
			</div>
		)

	}

}

export default Experiment
