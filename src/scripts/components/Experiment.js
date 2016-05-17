import React from 'react'
import ScoreContainer from '../containers/ScoreContainer'
import MenuContainer from '../containers/MenuContainer'
import MapContainer from '../containers/MapContainer'
import MayorContainer from '../containers/MayorContainer'

class Experiment extends React.Component {

	constructor() {

		super()

	}

	render() {

		return (
			<div className="experiment">
				<ScoreContainer />
				<MayorContainer />
				<MenuContainer />
				<MapContainer />
				{this.props.children}
			</div>
		)

	}

}

export default Experiment
