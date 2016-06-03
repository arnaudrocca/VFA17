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

		this.videosTimeline = new TimelineLite()

	}

	/**
	 * @method
	 * @name componentDidMount
	 */
	componentDidMount() {

		this.videoNode = ReactDOM.findDOMNode(this.refs.video)

	}


	/**
	 * @method
	 * @name showVideo
	 */
	showVideo() {

		this.videosTimeline
			.to('.home__video--intro', .3, {
				display: 'none',
				opacity: 0
			})
			.to('.home__video--main', .3, {
				display: 'block',
				opacity: 1,
				onComplete : () => {
					this.videoNode.play()
				}
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
						Glisse le bouton au centre de la <br/>
						 fleur pour commencer l’expérience.
					</p>
				</div>
				<div className="home__logo-container">
					<IconLogo width="210" classes="home__logo"/>
					<span className="home__logo-center"></span>
				</div>
				<DragHome showVideo={this.showVideo.bind(this)} />
				<video className="home__video home__video--intro" src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4" autoPlay loop muted></video>
				<video ref="video" className="home__video home__video--main" src="http://techslides.com/demos/sample-videos/small.webm" loop></video>
				<ChoiceValidate handleSubmit={this.goToExperiment.bind(this)} label="Passer" labelSecondary="Ok papy !" classes="btn__main btn__main--hidden home__btn-video"/>
				<div className="home__overlay"></div>
			</section>
		)

	}

}

export default Home
