import React from 'react'
import ReactDOM from 'react-dom'
import { Link, hashHistory } from 'react-router'
import DragHome from './DragHome'
import ChoiceValidate from './ChoiceValidate'
import IconLogo from './iconsComponents/icon-logo'

class Home extends React.Component {

	/**
     * @constructor
     */
	constructor() {

		super()

	}

	/**
	 * @method
	 * @name showVideo
	 */
	showVideo() {

		const videosTimeline = new TimelineLite()

		videosTimeline
			.to('.home__video--intro', .3, {
				display: 'none',
				opacity: 0
			})
			.to('.home__video--main', .3, {
				display: 'block',
				opacity: 1
			})

	}

	goToExperiment() {

		hashHistory.push('/experiment')

	}

	/**
     * @method
	 * @name render
     */
	render() {

		return (
			<section className="home">
				<div className="home__intro">
					<h1 className="home__title">Ville fleurie <br/> Award 2017</h1>
					<h2 className="home__subtitle">Le pouvoir des fleurs</h2>
					<p className="home__content">
						Glissez le bouton au centre de la <br/>
						 fleur pour commencer l’expérience.
					</p>
				</div>
				<IconLogo width="210" classes="home__logo"/>
				<DragHome showVideo={this.showVideo.bind(this)} />
				<video className="home__video home__video--intro" src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4" autoPlay loop muted></video>
				<video className="home__video home__video--main" src="http://techslides.com/demos/sample-videos/small.webm" autoPlay loop muted></video>
				<ChoiceValidate handleSubmit={this.goToExperiment.bind(this)} label="Passer" labelSecondary="Ok papy !" classes="btn__main btn__main--hidden home__btn-video"/>
				<div className="home__overlay"></div>
			</section>
		)

	}

}

export default Home
