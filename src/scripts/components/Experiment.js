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
import IconLocked from './svg/icon-locked'

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
					<div className="city__infos">
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
					<div className="menu__slice">
						<div className="menu__item">
							<IconDone width="75" opacity="0.6" color="#ffffff"/>
							<span className="menu__label">Voyage 1</span>
						</div>
					</div>
					<div className="menu__slice">
						<div className="menu__item">
							<IconDone width="75" opacity="0.6" color="#ffffff"/>
							<span className="menu__label">Voyage 2</span>
						</div>
					</div>
					<div className="menu__slice">
						<div className="menu__item">
							<IconDone width="75" opacity="0.6" color="#ffffff"/>
							<span className="menu__label">Voyage 3</span>
						</div>
					</div>
					<div className="menu__slice">
						<div className="menu__item">
							<IconLocked width="75" opacity="0.6" color="#ffffff"/>
							<span className="menu__label">Voyage 4</span>
						</div>
					</div>
					<div className="menu__slice">
						<div className="menu__item">
							<IconLocked width="75" opacity="0.6" color="#ffffff"/>
							<span className="menu__label">Voyage 5</span>
						</div>
					</div>
					<div className="menu__slice"></div>
					<div className="menu__infos">
						<p>Glissez pour voyager dans le temps</p>
					</div>
				</div>


				<MapContainer />
				{this.props.children}
			</div>
		)

	}

}

export default Experiment
