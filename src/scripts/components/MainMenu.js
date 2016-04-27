import React from 'react'
import { Link } from 'react-router'

class MainMenu extends React.Component {

	constructor() {

		super();

	}

	getContent() {



	}

	render() {

		this.getContent();

		return (
			<div className="mainMenu">
				{
					this.props.menuState.map(function(link) {
						return (
							<div key={link.id}>
								<Link to={`/experiment/choice/${link.id}`} className={link.state}>Choix {link.id}</Link>
								<br/>
							</div>
						)
					})
				}
			</div>
		)

	}

}

export default MainMenu
