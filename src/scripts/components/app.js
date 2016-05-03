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
					<svg className="wireframe-side__arrow" width="15" height="15">
						<path d="M12.1,14.1L0.8,2.8c-0.8-0.8-0.2-2.3,0.9-2.3H13c0.7,0,1.3,0.6,1.3,1.3v11.3C14.4,14.3,12.9,14.9,12.1,14.1z"/>
					</svg>
				</div>
				<div className="wireframe-side wireframe-side--bottom">
					<span className="wireframe-side__trapezoid"></span>
				</div>
				<div className="wireframe-side wireframe-side--left">
					<span className="wireframe-side__trapezoid"></span>
					<svg className="wireframe-side__arrow" width="15" height="15">
						<path d="M12.1,14.1L0.8,2.8c-0.8-0.8-0.2-2.3,0.9-2.3H13c0.7,0,1.3,0.6,1.3,1.3v11.3C14.4,14.3,12.9,14.9,12.1,14.1z"/>
					</svg>
				</div>
				{this.props.children}

				<div className="toolbar">
					<button className="toolbar__btn"><span>Infos</span></button>
					<button className="toolbar__btn"><span>picto</span></button>
					<button className="toolbar__btn"><span>picto</span></button>
				</div>
			</div>
		)

	}

}

export default App
