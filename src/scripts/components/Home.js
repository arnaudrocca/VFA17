import React from 'react'
import { Link } from 'react-router'

// const Home = () => (
// 	<div>
// 		<h1>Home</h1>
// 		<Link to="/video">Voir la vidéo</Link>
// 	</div>

// )

class Home extends React.Component {

	constructor() {

		super();

	}

	render(){
		return (
			<section className="home">
				<h1>La home</h1>
				<Link to="/video">Voir la vidéo</Link>
			</section>
		)
	}

}

export default Home
