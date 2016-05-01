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

	// <div className="mess">
				// 	<RemainingContainer />
				// 	<MainMenuContainer />
				// 	<ScoreContainer />
				// 	<MayorContainer />
				// </div>

	render() {

		return (
			<div>
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
