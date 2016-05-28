import React from 'react'
import Wireframe from './Wireframe'
import Toolbar from './Toolbar'
import About from './About'

class App extends React.Component {

	/**
     * @constructor
     */
	constructor() {

		super()

	}

	/**
     * @method
	 * @name componentWillReceiveProps
     */
	componentWillReceiveProps() {

	    window.previousLocation = this.props.location.pathname

	}

	/**
     * @method
	 * @name render
     */
	render() {

		return (
			<div id="core">
				<Wireframe location={this.props.location} />
				{this.props.children}
				<Toolbar />
				<About />
			</div>
		)

	}

}

export default App
