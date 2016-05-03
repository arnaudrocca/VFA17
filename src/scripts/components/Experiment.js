import React from 'react'
import { Link } from 'react-router'
import RemainingContainer from '../containers/remainingContainer'
import MainMenuContainer from '../containers/mainMenuContainer'
import MapContainer from '../containers/mapContainer'
import ScoreContainer from '../containers/scoreContainer'
import MayorContainer from '../containers/mayorContainer'

class Experiment extends React.Component {

	constructor() {

		super();

	}

	// <div className="mess">
	// 	<RemainingContainer />
	// 	<MainMenuContainer />
	// 	<ScoreContainer />
	// 	<MayorContainer />
	// </div>

	render() {

		return (
			<div>
				<div className="mess">
					<RemainingContainer />
					<MainMenuContainer />
					<ScoreContainer />
					<MayorContainer />
				</div>
				<div className="city">
					<div className="city__panel">
						<span className="city__name">Ayaux-les-Bains</span>
					</div>
					<div className="city__result">
					</div>
				</div>

				<MapContainer />
				{this.props.children}
			</div>
		)

	}

}

export default Experiment
