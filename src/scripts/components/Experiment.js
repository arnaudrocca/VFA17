import React from 'react'
import { Link } from 'react-router'
import RemainingContainer from '../containers/RemainingContainer'
import MainMenuContainer from '../containers/MainMenuContainer'
import MapContainer from '../containers/MapContainer'
import ScoreContainer from '../containers/ScoreContainer'
import MayorContainer from '../containers/MayorContainer'

class Experiment extends React.Component {

	constructor() {

		super();

	}

	render() {

		return (
			<div>
				<div className="mess">
					<RemainingContainer />
					<MainMenuContainer />
					<ScoreContainer />
					<MayorContainer />
				</div>
				<MapContainer />
				{this.props.children}
			</div>
		)

	}

}

export default Experiment
