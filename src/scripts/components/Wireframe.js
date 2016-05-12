import React from 'react'
import IconBorderTop from './svg/icon-border-top'
import IconBorderRight from './svg/icon-border-right'
import IconBorderRightArrow from './svg/icon-border-right-arrow'
import IconBorderBottom from './svg/icon-border-bottom'
import IconBorderLeft from './svg/icon-border-left'
import IconDrag from './svg/icon-drag'
import IconDragHome from './svg/icon-drag-home'
import IconCorner from './svg/icon-corner'

class Wireframe extends React.Component {

	constructor() {

		super();

	}

	getContent() {

		const location = this.props.location.pathname.split('/')

		console.log(location)
		this.drag = null
		this.borderRight = <IconBorderRightArrow classes="wireframe-side__trapezoid wireframe-side__trapezoid--right" width="14" fill="#ffffff"/>

		if(location[1] == 'experiment'){
			this.drag = <div>
							<span className="wireframe-side__timeline-connector"></span>
							<IconDrag classes="wireframe-side__drag" width="70"/>
						</div>
		} else if(location[1] == ''){
			this.drag = <div>
							<span className="wireframe-side__timeline-connector"></span>
							<IconDragHome classes="wireframe-side__drag" width="70"/>
						</div>
		} else {
			this.borderRight = <IconBorderRight classes="wireframe-side__trapezoid wireframe-side__trapezoid--right" width="7" fill="#ffffff"/>
		}
	}


	render() {

		this.getContent();

		return (
			<div className="wireframe">
				<div className="wireframe-side wireframe-side--top">
					<IconBorderTop classes="wireframe-side__trapezoid wireframe-side__trapezoid--top" width="100" fill="#ffffff"/>
				</div>
				<div className="wireframe-side wireframe-side--right">
					{this.borderRight}
					<IconCorner classes="wireframe-side__arrow" width="15" color="#ffffff"/>
					{this.drag}
				</div>
				<div className="wireframe-side wireframe-side--bottom">
					<IconBorderBottom classes="wireframe-side__trapezoid wireframe-side__trapezoid--bottom" width="100" fill="#ffffff"/>
				</div>
				<div className="wireframe-side wireframe-side--left">
					<IconBorderLeft classes="wireframe-side__trapezoid wireframe-side__trapezoid--left" width="7" fill="#ffffff"/>
					<IconCorner classes="wireframe-side__arrow" width="15" color="#ffffff"/>
				</div>
			</div>
		)

	}

}

export default Wireframe
