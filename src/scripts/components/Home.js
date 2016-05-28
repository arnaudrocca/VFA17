import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'
import DragHome from './DragHome'

class Home extends React.Component {

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

		this.videoNode = ReactDOM.findDOMNode(this.refs.video)
		console.log(this.videoNode)

	}

	showVideo() {

		console.log(this.videoNode)
		this.videoNode.setAttribute('src','http://techslides.com/demos/sample-videos/small.webm')

	}

	/**
     * @method
	 * @name render
     */
	render() {

		return (
			<section className="home">
				<Link className="link" to="/experiment">Passer</Link>
				<div className="home__intro">
					<h1 className="home__title">Ville fleurie <br/> Award 2017</h1>
					<p className="home__content">
						Merci d'être venu si vite ! <br/>
						Glissez le bouton au centre pour <br/>
						Commencer l'expérience
					</p>
				</div>
				<DragHome showVideo={this.showVideo.bind(this)} />
				<video ref="video" className="home__video" src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4" autoPlay loop muted></video>
			</section>
		)

	}

}

export default Home
