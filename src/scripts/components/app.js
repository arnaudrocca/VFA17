import React from 'react'

class App extends React.Component {

	constructor() {

		super();

	}

	render() {

		return (
			<div id="core">
				<div className="wireframe-side wireframe-side--top">
					<span className="wireframe-side__trapezoid"></span>
				</div>
				<div className="wireframe-side wireframe-side--right">
					<span className="wireframe-side__trapezoid"></span>
					<span className="wireframe-side__arrow"></span>
				</div>
				<div className="wireframe-side wireframe-side--bottom">
					<span className="wireframe-side__trapezoid"></span>
				</div>
				<div className="wireframe-side wireframe-side--left">
					<span className="wireframe-side__trapezoid"></span>
					<span className="wireframe-side__arrow"></span>
				</div>
				{this.props.children}
			</div>
		)

	}

}

export default App
