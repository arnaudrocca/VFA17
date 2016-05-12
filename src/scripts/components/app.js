import React from 'react'
import Wireframe from './Wireframe'
import Toolbar from './Toolbar'

class App extends React.Component {

	constructor() {

		super();

	}

	

	render() {

		return (
			<div id="core">
				<Wireframe location={this.props.location} />

					{this.props.children}

				<Toolbar />
			</div>
		)

	}

}

export default App
