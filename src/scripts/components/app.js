import React from 'react'
import IconBorderTop from './svg/icon-border-top'
import IconBorderRight from './svg/icon-border-right'
import IconBorderRightArrow from './svg/icon-border-right-arrow'
import IconBorderBottom from './svg/icon-border-bottom'
import IconBorderLeft from './svg/icon-border-left'
import IconDrag from './svg/icon-drag'
import IconDragHome from './svg/icon-drag-home'
import IconCorner from './svg/icon-corner'
import Toolbar from './Toolbar'

class App extends React.Component {

	constructor() {

		super();

	}

	getContent() {
		if(this.props.location.pathname == '/experiment'){
			this.drag = <IconDrag classes="wireframe-side__drag" width="70"/>
			console.log('xp')
		} else {
			this.drag = <IconDragHome classes="wireframe-side__drag" width="70"/>,
			console.log('home')
		}
	}

	render() {
		console.log(this.props.location);

		this.getContent();

		return (
			<div id="core">
				<div className="wireframe-side wireframe-side--top">
					<IconBorderTop classes="wireframe-side__trapezoid wireframe-side__trapezoid--top" width="100" fill="#ffffff"/>
				</div>
				<div className="wireframe-side wireframe-side--right">
					<IconBorderRightArrow classes="wireframe-side__trapezoid wireframe-side__trapezoid--right" width="14" fill="#ffffff"/>
					<IconCorner classes="wireframe-side__arrow" width="15" color="#ffffff"/>
					<span className="wireframe-side__timeline-connector"></span>
					{this.drag}
				</div>
				<div className="wireframe-side wireframe-side--bottom">
					<IconBorderBottom classes="wireframe-side__trapezoid wireframe-side__trapezoid--bottom" width="100" fill="#ffffff"/>
				</div>
				<div className="wireframe-side wireframe-side--left">
					<IconBorderLeft classes="wireframe-side__trapezoid wireframe-side__trapezoid--left" width="7" fill="#ffffff"/>
					<IconCorner classes="wireframe-side__arrow" width="15" color="#ffffff"/>
				</div>

				{this.props.children}
				<Toolbar />
			</div>
		)

	}

}

export default App
