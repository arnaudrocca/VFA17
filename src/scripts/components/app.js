import React from 'react'

class App extends React.Component {

	constructor() {

		super();

	}

	render() {

		return (
			<div id="core">
				<div className="wireframe-side wireframe-side--top"></div>
				<div className="wireframe-side wireframe-side--right"></div>
				<div className="wireframe-side wireframe-side--bottom"></div>
				<div className="wireframe-side wireframe-side--left"></div>
				{this.props.children}
			</div>
		)

	}

}

export default App
