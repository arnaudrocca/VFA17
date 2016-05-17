import React from 'react'
import IconFlower from './iconsComponents/icon-flower'
import IconShield from './iconsComponents/icon-shield'
import { hashHistory } from 'react-router'

class City extends React.Component {

	constructor() {

		super()
		console.log(hashHistory)

	}

	componentDidMount(){
		console.log('hello')
		if(window.previousLocation == '/video'){
			console.log('oui')
			let introTimeline = new TimelineLite();

			introTimeline.from('.city__panel', 0.3, {
				'width': 0
			})
			.from('.city__panel svg, .city__panel span', 0.3, {
				'x': -10,
				'opacity': 0 
			},'-=0.05')
			.from('.city__infos', 0.3, {
				'width': 0
			},'-=0.3')
			.staggerFrom('city__infos svg', 0.3, {
				scale: 0
			},0.2,'-=0.05')
		}
	}

	getContent() {

		this.flowers = new Array()

		for(let i = 0; i < 5; i++){
			if (i < this.props.score){
				this.flowers.push(<IconFlower key={i} width="17" color="#FF5951"/>)
			} else {
				this.flowers.push(<IconFlower key={i} width="17" color="#6c707b"/>)
			}
		}

	}

	render() {

		this.getContent()

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
