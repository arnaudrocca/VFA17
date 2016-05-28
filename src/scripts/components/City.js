import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import IconFlower from './iconsComponents/icon-flower'
import IconShield from './iconsComponents/icon-shield'

class City extends React.Component {

	/**
     * @constructor
     */
	constructor() {

		super()

	}

	/**
     * @method
	 * @name componentDidMount
     */
	componentDidMount() {

		if (window.previousLocation == '/video') {

			const introTimeline = new TimelineLite()

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
			},0.2, '-=0.05')
		}
		
	}

	/**
     * @method
	 * @name getContent
     */
	getContent() {

		this.flowers = new Array()

		for (let i = 0; i < 5; i++) {
			if (i < this.props.score) {
				this.flowers.push(<IconFlower classes={`city__score-item city__score-item--${i}`} key={i + 'FF5951'} width="17" color="#FF5951"/>)
			} else {
				this.flowers.push(<IconFlower classes={`city__score-item city__score-item--${i}`} key={i + '6c707b'} width="17" color="#6c707b"/>)
			}
		}

	}

	/**
     * @method
	 * @name render
     */
	render() {

		this.getContent()

		return (
			<div className="city">
				<div className="city__panel">
					<IconShield width="25" classes="city__shield"/>
					<span className="city__name">Ayaux-les-Bains</span>
				</div>
				<div className="city__infos">
					<ReactCSSTransitionGroup className="city__score" transitionName="flowers" component="div"
						transitionEnterTimeout={300} transitionLeaveTimeout={300}>
						{this.flowers}
					</ReactCSSTransitionGroup>
				</div>
			</div>
		)

	}

}

export default City
