import React from 'react'
import ReactDOM from 'react-dom'
import { debounce } from 'lodash'

class DragHome extends React.Component {

	/**
     * @constructor
     */
	constructor() {

		super()

		this.createDrag = this.createDrag.bind(this)

		window.addEventListener('resize', debounce(this.createDrag, 350))

	}

	/**
	 * @method
	 * @name componentDidMount
	 */
	componentDidMount() {

		this.createDrag()

	}

	/**
	 * @method
	 * @name componentWillUnmount
	 */
	componentWillUnmount() {

		window.removeEventListener('resize', this.createDrag)

	}

	/**
	 * @method
	 * @name createDrag
	 */
	createDrag() {

		const props = this.props
		const hideTimeline = new TimelineLite()

		const menuBtn = ReactDOM.findDOMNode(this.refs.menuBtn)
		const menuDragLine = ReactDOM.findDOMNode(this.refs.menuDragLine)

		const windowWidth = window.innerWidth
		const sideSize = 20
		const dragOffset = (((windowWidth - (sideSize * 2)) / 12) + sideSize)
		const dragTarget = ((windowWidth / 2) - dragOffset)

		Draggable.create(menuBtn, {
			type: 'x',
			zIndex: 110,
			zIndexBoost: false,
			bounds: {
				minX: 0,
				maxX: -dragTarget
			},
			liveSnap: true,
			snap: {
				x: (endValue) => {
					return Math.round(endValue / dragTarget) *  dragTarget
				}
			},
			onPress: () => {
				document.body.classList.add('is-menu-active')
				menuBtn.classList.add('is-active')
			},
			onDrag: function() {
				TweenMax.to(menuDragLine, 0, {width: Math.abs(this.x)})
			},
			onRelease: function() {
				menuBtn.classList.remove('is-active')

				if (this.x != 0) {

					const rule = CSSRulePlugin.getRule(".wireframe--home .wireframe__line:after");

					hideTimeline
						// .set(menuBtn, {clearProps: 'x', delay: 2000})
						.to(menuDragLine, .1, {
							width: 0
						})
						.to(menuBtn, .3, {
							scale: 0,
							display: 'none'
						})
						.to(rule, .3, {cssRule:{
							scale: 0,
							display: 'none'
						}})
						.to('.wireframe__line', .3,{
							height: 0,
							display: 'none'
						})
						.to('.home__intro', .3, {
							y : 50,
							opacity: 0,
							display: 'none'
						})
						.to('.menu__drag-start', .3, {
							scale: 0,
							display: 'none'
						})
						.to('.menu__btn', .3, {
							scale: 0,
							display: 'none'
						})
						.to('.wireframe__drag', .3, {
							scale: 0,
							display: 'none'
						})
						.to('.wireframe__timeline-connector', .3, {
							width: 0,
							display: 'none',
							onComplete: () => {
								props.showVideo()
							}
						})
						.to('.home__video', .3, {
							opacity: 1
						})
				}
			}
		})

	}

	/**
	 * @method
	 * @name render
	 */
	render() {

		return (
			<div>
				<div className="menu__btn" ref="menuBtn">
					<div className="menu__btn__icon">
						<span></span>
					</div>
				</div>
				<div className="menu__drag-start"></div>
				<div ref="menuDragLine" className="menu__drag-line"></div>
			</div>
		)

	}

}

export default DragHome
