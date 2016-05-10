import React from 'react'
import IconBorderTop from './svg/icon-border-top'
import IconBorderRight from './svg/icon-border-right'
import IconBorderBottom from './svg/icon-border-bottom'
import IconBorderLeft from './svg/icon-border-left'
import Toolbar from './Toolbar'

class App extends React.Component {

	constructor() {

		super();

	}

	render() {

		return (
			<div id="core">
				<div className="wireframe-side wireframe-side--top">
					<IconBorderTop classes="wireframe-side__trapezoid wireframe-side__trapezoid--top" width="100" fill="#ffffff"/>
				</div>
				<div className="wireframe-side wireframe-side--right">
					<IconBorderRight classes="wireframe-side__trapezoid wireframe-side__trapezoid--right" width="7" fill="#ffffff"/>
					<svg className="wireframe-side__arrow" width="15" height="15">
						<path d="M12.1,14.1L0.8,2.8c-0.8-0.8-0.2-2.3,0.9-2.3H13c0.7,0,1.3,0.6,1.3,1.3v11.3C14.4,14.3,12.9,14.9,12.1,14.1z"/>
					</svg>
					<span className="wireframe-side__timeline-connector"></span>
				</div>
				<div className="wireframe-side wireframe-side--bottom">
					<IconBorderBottom classes="wireframe-side__trapezoid wireframe-side__trapezoid--bottom" width="100" fill="#ffffff"/>
				</div>
				<div className="wireframe-side wireframe-side--left">
					<IconBorderLeft classes="wireframe-side__trapezoid wireframe-side__trapezoid--left" width="7" fill="#ffffff"/>
					<svg className="wireframe-side__arrow" width="15" height="15">
						<path d="M12.1,14.1L0.8,2.8c-0.8-0.8-0.2-2.3,0.9-2.3H13c0.7,0,1.3,0.6,1.3,1.3v11.3C14.4,14.3,12.9,14.9,12.1,14.1z"/>
					</svg>
				</div>
				{this.props.children}
				<Toolbar />
			</div>
		)

	}

}

export default App
