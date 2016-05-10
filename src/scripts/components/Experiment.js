import React from 'react'
import { Link } from 'react-router'
import RemainingContainer from '../containers/remainingContainer'
import MainMenuContainer from '../containers/mainMenuContainer'
import MapContainer from '../containers/mapContainer'
import ScoreContainer from '../containers/scoreContainer'
import MayorContainer from '../containers/mayorContainer'
import IconFlower from './svg/icon-flower'
import IconShield from './svg/icon-shield'
import IconDone from './svg/icon-done'

class Experiment extends React.Component {

	constructor() {

		super();

		/*<div className="mess">
			<RemainingContainer />
			<MainMenuContainer />
			<ScoreContainer />
			<MayorContainer />
		</div>*/

	}

	render() {

		return (
			<div className="experiment">
				<div className="city">
					<div className="city__panel">
						<IconShield width="25" classes="city__shield"/>
						<span className="city__name">Ayaux-les-Bains</span>
					</div>
					<div className="city__result">
						<IconFlower width="17" color="#FF5951"/>
						<IconFlower width="17" color="#FF5951"/>
						<IconFlower width="17" color="#d7d9df"/>
						<IconFlower width="17" color="#d7d9df"/>
						<IconFlower width="17" color="#d7d9df"/>
					</div>
				</div>

				<div className="mayor">
				</div>

				<div className="menu">
					<div className="menu__slice"><IconDone width="75" opacity="0.6" color="#ffffff"/></div>
					<div className="menu__slice"><IconDone width="75" opacity="0.6" color="#ffffff"/></div>
					<div className="menu__slice"><IconDone width="75" opacity="0.6" color="#ffffff"/></div>
					<div className="menu__slice"><IconDone width="75" opacity="0.6" color="#ffffff"/></div>
					<div className="menu__slice"><IconDone width="75" opacity="0.6" color="#ffffff"/></div>
					<div className="menu__slice"></div>
				</div>


				<MapContainer />
				{this.props.children}
			</div>
		)

	}

}

export default Experiment
