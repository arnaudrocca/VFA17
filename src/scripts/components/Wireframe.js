import React from 'react'
import ChoicesDoneContainer from '../containers/ChoicesDoneContainer'
import IconBorderTop from './iconsComponents/icon-border-top'
import IconBorderRight from './iconsComponents/icon-border-right'
import IconBorderRightArrow from './iconsComponents/icon-border-right-arrow'
import IconBorderBottom from './iconsComponents/icon-border-bottom'
import IconBorderLeft from './iconsComponents/icon-border-left'
import IconDragHome from './iconsComponents/icon-drag-home'
import IconCorner from './iconsComponents/icon-corner'
import IconFlowerSmall from './iconsComponents/icon-flower-small'
import Audio from '../utils/audio'

class Wireframe extends React.Component {

	/**
     * @constructor
     */
	constructor() {

		super()

		window.isBeginning = true
		window.isEnding = false

		window.cityAudio = new Audio()
		window.cityAudio.loadSound('assets/audio/ambiance_city.mp3')

		window.enableAudio = true

	}

	/**
	 * @method
	 * @name getContent
	 */
	getContent() {

		const location = this.props.location.pathname.split('/')

		this.classes = 'wireframe'
		this.drag = null
		this.lineTop = null
		this.lineBottom = null
		this.borderRight = <IconBorderRightArrow classes="wireframe__trapezoid wireframe__trapezoid--right" width="14" fill="#FFF" />

		if (location[1] == 'experiment') {
			this.drag = <ChoicesDoneContainer />
		}
		else if (location[1] == 'end') {
			//this.classes += ' is-hidden'
		}
		else if (location[1] == '') {
			this.classes += ' wireframe--home'
			this.drag = <div>
							<span className="wireframe__timeline-connector"></span>
							<IconDragHome classes="wireframe__drag" width="70" />
						</div>
			this.lineTop = <span className="wireframe__line wireframe__line--top">
							<IconFlowerSmall classes="wireframe__flower wireframe__flower--top" width="15" color="#FF5951" />
						</span>

			this.lineBottom = <span className="wireframe__line wireframe__line--bottom">
								<IconFlowerSmall classes="wireframe__flower wireframe__flower--bottom" width="15" color="#FF5951" />
							</span>
		}
		else {
			this.borderRight = <IconBorderRight classes="wireframe__trapezoid wireframe__trapezoid--right" width="7" fill="#FFF" />
		}

	}

	/**
	 * @method
	 * @name render
	 */
	render() {

		this.getContent()

		return (
			<div className={this.classes}>
				<div className="wireframe__side wireframe__side--top">
					{this.lineTop}
					<IconBorderTop classes="wireframe__trapezoid wireframe__trapezoid--top" width="100" fill="#FFF" />
				</div>
				<div className="wireframe__side wireframe__side--right">
					{this.borderRight}
					<IconCorner classes="wireframe__arrow" width="15" color="#FFF" />
					{this.drag}
				</div>
				<div className="wireframe__side wireframe__side--bottom">
					{this.lineBottom}
					<IconBorderBottom classes="wireframe__trapezoid wireframe__trapezoid--bottom" width="100" fill="#FFF" />
				</div>
				<div className="wireframe__side wireframe__side--left">
					<IconBorderLeft classes="wireframe__trapezoid wireframe__trapezoid--left" width="7" fill="#FFF" />
					<IconCorner classes="wireframe__arrow" width="15" color="#FFF" />
				</div>
			</div>
		)

	}

}

export default Wireframe
