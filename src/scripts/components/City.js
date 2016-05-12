import React from 'react'
import IconFlower from './svg/icon-flower'
import IconShield from './svg/icon-shield'

class City extends React.Component {

	constructor() {

		super();

	}
	render() {

		return (
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
		)

	}

}

export default City
