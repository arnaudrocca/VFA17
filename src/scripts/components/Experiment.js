import React from 'react'
import { Link } from 'react-router'
import RemainingContainer from '../containers/remainingContainer'
import MainMenuContainer from '../containers/mainMenuContainer'
import MapContainer from '../containers/mapContainer'
import ScoreContainer from '../containers/scoreContainer'
import MayorContainer from '../containers/mayorContainer'
import IconFlower from './svg/icon-flower'
import IconShield from './svg/icon-shield'

class Experiment extends React.Component {

	constructor() {

		super();

		/*<div className="mess">
			<RemainingContainer />
			<MainMenuContainer />
			<ScoreContainer />
			<MayorContainer />
		</div>
		<IconFlower width="17" color="#FF5951"/>
						<IconFlower width="17" color="#FF5951"/>
						<IconFlower width="17" color="#6c707b"/>
						<IconFlower width="17" color="#6c707b"/>
						<IconFlower width="17" color="#6c707b"/>
		*/

	}

	render() {

		return (
			<div className="experiment is-menu-active">
				<div className="city">
					<div className="city__panel">
						<IconShield width="25" classes="city__shield"/>
						<span className="city__name">Ayaux-les-Bains</span>
					</div>
					<div className="city__infos">
						<IconFlower width="17" color="#FF5951"/>
						<IconFlower width="17" color="#FF5951"/>
						<IconFlower width="17" color="#6c707b"/>
						<IconFlower width="17" color="#6c707b"/>
						<IconFlower width="17" color="#6c707b"/>
					</div>
				</div>

				<div className="mayor">
				</div>

				
				<MainMenuContainer />

				<MapContainer />
				{this.props.children}
			</div>
		)

	}

}

export default Experiment
