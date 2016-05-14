import React from 'react'
import IconFlower from './svg/icon-flower'
import IconShield from './svg/icon-shield'

class City extends React.Component {

	constructor() {

		super();

	}

	getContent() {

		this.flowers = new Array();

		for(let i = 0; i < 5; i++){
			if (i < this.props.score){
				this.flowers.push(<IconFlower key={i} width="17" color="#FF5951"/>)
			} else {
				this.flowers.push(<IconFlower key={i} width="17" color="#6c707b"/>)
			}
		}

	}

	render() {

		this.getContent();

		return (
			<div className="city">
				<div className="city__panel">
					<IconShield width="25" classes="city__shield"/>
					<span className="city__name">Ayaux-les-Bains</span>
				</div>
				<div className="city__infos">
					{this.flowers}
				</div>
			</div>
		)

	}

}

export default City
