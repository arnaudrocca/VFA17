import React from 'react'
import ReactDOM from 'react-dom'
import { debounce } from 'lodash'
import { hashHistory } from 'react-router'
import ChoiceValidate from './ChoiceValidate'
import IconLogo from './iconsComponents/icon-logo'


class End extends React.Component {

	/**
     * @constructor
     */
	constructor() {

		super()

		this.windowWidth = window.innerWidth
		this.windowHeight = window.innerHeight
		this.parralaxStrength = .03
		this.mousemoveHandler = this.mousemoveHandler.bind(this)
		this.resize = this.resize.bind(this)

		this.enterTimeline = new TimelineLite({paused: true})

	}

	/**
	 * @method
	 * @name componentDidMount
	 */
	componentDidMount() {

		this.endBackgroundNode = ReactDOM.findDOMNode(this.refs.endBackground)
		this.audioButtonNode = ReactDOM.findDOMNode(this.refs.audioButton)

		window.addEventListener('mousemove',this.mousemoveHandler)
		window.addEventListener('resize', debounce(this.resize, 350))

		this.enterTimeline
			.from('.end', .5, {
				opacity: 0,
				ease: Quart.easeOut
			})

		setTimeout(() => {
			this.enterTimeline.play()
		},200)	

	}

	/**
	 * @method
	 * @name componentWillUnmount
	 */
	componentWillUnmount() {

		window.removeEventListener('mousemove',this.mousemoveHandler)
		window.removeEventListener('resize',this.resize)

	}

	/**
	 * @method
	 * @name resize
	 */
	resize() {

		this.windowWidth = window.innerWidth
		this.windowHeight = window.innerHeight

	}

	/**
	 * @method
	 * @name mousemoveHandler
	 */
	mousemoveHandler(e) {

		const event = e || document.event

		const left = ((this.windowWidth / 2) - event.pageX)  * this.parralaxStrength
		const top = ((this.windowHeight / 2) - event.pageY) * this.parralaxStrength

		TweenMax.to(this.endBackgroundNode, .3, {
			x: left,
			y: top,
			ease: Quart.easeOut
		})

	}

	/**
	 * @method
	 * @name clickHandler
	 */
	clickHandler() {

		hashHistory.push('/')

	}

	/**
	 * @method
	 * @name mouseEnterHandler
	 * @description Play button sound
	 */
	mouseEnterHandler() {

		if (window.enableAudio) {
			this.audioButtonNode.currentTime = 0
			this.audioButtonNode.play()
		}

	}

	/**
     * @method
	 * @name render
     */
	render() {

		return (
			<section className="end">
				<div className="end__main">
					<IconLogo classes="end__logo" width="125"/>
					<div className="end__content">
						<h1 className="end__title">Bravo !</h1>
						<div className="end__txt">
							<p>
								Vous avez rendu la machine à John Ricard, ce qui a permis de boucler la boucle. Le lendemain, fier comme un roi, il se vit remettre un Ville Fleurie Award avec un score de {this.props.score} fleurs sur 5. 
							</p>
							<p>
								Mais dans son discours, nul mention de vous ou de la machine… 
							</p>
						</div>
					</div>
					<ChoiceValidate classes="btn__main end__btn" handleSubmit={this.clickHandler.bind(this)} label="Recommencer" labelSecondary="Encore !"/>
				</div>
				<div ref="endBackground" className="end__background"></div>
				<audio ref="audioButton" src="assets/audio/button.wav" preload="auto"></audio>
			</section>
		)

	}

}

export default End
