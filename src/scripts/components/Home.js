import React from 'react'
import { Link } from 'react-router'

class Home extends React.Component {

	constructor() {

		super()

	}

	render(){

		return (
			<section className="home">
				<Link className="link" to="/video">Voir la vidéo</Link>
				<div className="home__intro">
					<h1 className="home__title">Ville fleurie <br /> Award 2017</h1>
					<p className="home__content">
						Merci d'être venu si vite ! <br />
						Glissez le bouton au centre pour <br />
						Commencer l'expérience
					</p>
				</div>
				<video className="home__video" src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4" autoPlay loop muted></video>
			</section>
		)
		
	}

}

export default Home
