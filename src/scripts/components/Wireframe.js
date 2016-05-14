import React from 'react'
import ChoicesDoneContainer from '../containers/ChoicesDoneContainer'
import IconBorderTop from './svg/icon-border-top'
import IconBorderRight from './svg/icon-border-right'
import IconBorderRightArrow from './svg/icon-border-right-arrow'
import IconBorderBottom from './svg/icon-border-bottom'
import IconBorderLeft from './svg/icon-border-left'
import IconDragHome from './svg/icon-drag-home'
import IconCorner from './svg/icon-corner'

class Wireframe extends React.Component {

	constructor() {

		super();

	}

	getContent() {

		const location = this.props.location.pathname.split('/')

		this.classes = 'wireframe'
		this.drag = null
		this.borderRight = <IconBorderRightArrow classes="wireframe__trapezoid wireframe__trapezoid--right" width="14" fill="#ffffff"/>

		if(location[1] == 'experiment'){
			this.drag = <ChoicesDoneContainer />
		} else if(location[1] == ''){
			this.classes += ' wireframe--home'
			this.drag = <div>
							<span className="wireframe__timeline-connector"></span>
							<IconDragHome classes="wireframe__drag" width="70"/>
						</div>
		} else {
			this.borderRight = <IconBorderRight classes="wireframe__trapezoid wireframe__trapezoid--right" width="7" fill="#ffffff"/>
		}
	}


	render() {

		this.getContent();

		return (
			<div className={this.classes}>
				<div className="wireframe__side wireframe__side--top">
					<span className="wireframe__line wireframe__line--top"></span>
					<IconBorderTop classes="wireframe__trapezoid wireframe__trapezoid--top" width="100" fill="#ffffff"/>
				</div>
				<div className="wireframe__side wireframe__side--right">
					{this.borderRight}
					<IconCorner classes="wireframe__arrow" width="15" color="#ffffff"/>
					{this.drag}
				</div>
				<div className="wireframe__side wireframe__side--bottom">
					<span className="wireframe__line wireframe__line--bottom"></span>
					<IconBorderBottom classes="wireframe__trapezoid wireframe__trapezoid--bottom" width="100" fill="#ffffff"/>
				</div>
				<div className="wireframe__side wireframe__side--left">
					<IconBorderLeft classes="wireframe__trapezoid wireframe__trapezoid--left" width="7" fill="#ffffff"/>
					<IconCorner classes="wireframe__arrow" width="15" color="#ffffff"/>
				</div>
			</div>
		)

	}

}

export default Wireframe
