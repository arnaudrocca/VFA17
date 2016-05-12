import React from 'react'
import RemainingContainer from '../containers/RemainingContainer'
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
				<RemainingContainer />
				<MayorContainer />
				<MainMenuContainer />
				<MapContainer />
				{this.props.children}
			</div>
		)

	}

}

export default Experiment
