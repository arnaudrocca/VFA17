import React from 'react'
import ReactDOM from 'react-dom'
import { debounce } from 'lodash'
import IconArrows from './iconsComponents/icon-arrows'

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

		this.arrowsTimeline = new TimelineMax({
			repeat: -1
		})

		this.arrowsTimeline
			.staggerFromTo('.menu__drag-arrows path', 1, {
				opacity: 0
			}, {
				opacity: 1,
			},-.3)
			.staggerFromTo('.menu__drag-arrows path', 1, {
				opacity: 1
			}, {
				opacity: 0,
			},-.3)

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
		const arrowsTimeline = this.arrowsTimeline
		const hideTimeline = new TimelineLite()
		const hideTimeline2 = new TimelineLite()

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
					return Math.round(endValue / dragTarget) * dragTarget
				}
			},
			onPress: () => {
				document.body.classList.add('is-menu-active')
				menuBtn.classList.add('is-active')
			},
			onDrag: function() {
				TweenMax.set(menuDragLine, {width: Math.abs(this.x)})
			},
			onRelease: function() {
				menuBtn.classList.remove('is-active')

				if (this.x + dragTarget <= 1) {
					hideTimeline
						.set(menuBtn, {x: -dragTarget})
						.to(menuDragLine, .4, {
							width: 0,
							transition: 'none',
							ease: Expo.easeOut
						})
						.to(menuBtn, .6, {
							scale: 1.1,
							display: 'none',
							transition: 'none',
							ease: Expo.easeOut
						},'-=.4')
						.to(menuBtn, .8, {
							scale: 0,
							display: 'none',
							transition: 'none',
							ease: Expo.easeOut
						},'-=.3')
						.to('.home__logo-center', .2, {
							scale: 1, 
							ease: Back.easeOut
							// onComplete: () => {
							// 	self.arrowsTimeline.pause(0, true);
							// 	self.arrowsTimeline.clear()
							// }
						},'-=.7')
						.to('.home__logo__dots-container', .2, {
							opacity: 0,
							display: 'none',
							ease: Expo.easeOut,
							onComplete: () => {
								hideTimeline2
									.to('.home__logo-container', .3, {
										scale: 0.75,
										ease: Expo.easeOut
									})
									.to('.home__logo-container', .3, {
										scale: 1.25,
										ease: Expo.easeOut
									},'-=.2')
									.to('.home__logo-container', .4, {
										scale: 1,
										ease: Expo.easeOut
									},'-=.2')
									.to('.home__logo__text', .3, {
										opacity: 1,
										display: 'block',
										ease: Expo.easeOut 
									},'-=.4')
									.to('.wireframe__line', 1, {
										height: 0,
										display: 'none',
										ease: Expo.easeOut
									},'-=.3')
									.to('.wireframe__flower--top', 1, {
										scale: 0,
										x: '50%',
										y: 0,
										display: 'none',
										ease: Expo.easeOut
									},'-=1')
									.to('.wireframe__flower--bottom', 1, {
										scale: 0,
										x: '50%',
										y: '-100%',
										display: 'none',
										ease: Expo.easeOut
									},'-=1')
									.to('.home__intro', 1, {
										opacity: 0,
										display: 'none',
										ease: Expo.easeOut
									},'-=1')
										.to('.menu__drag-dots', .4, {
										width: 0,
										display: 'none',
										ease: Expo.easeOut
									},'-=1')
									.to('.menu__drag-arrows', .4, {
										opacity: 0,
										x : 10,
										display: 'none',
										ease: Expo.easeOut
									},'-=.4')
									.to('.menu__drag-start', .8, {
										scale: 0,
										display: 'none',
										ease: Expo.easeOut
									},'-=.4')
									.to('.wireframe__drag', .8, {
										scale: 0,
										display: 'none',
										ease: Expo.easeOut
									},'-=.8')
									.to('.wireframe__timeline-connector', .8, {
										width: 0,
										display: 'none',
										ease: Expo.easeOut
									},'-=.8')
									.to('.home__logo-container', .4, {
										scale: 0,
										display: 'none',
										ease: Expo.easeOut,
										onComplete: () => {
											props.showVideo()
										}
									},'-=.4')
									.to('.home__overlay', .3, {
										opacity: 0
									})
									.to('.btn__main--hidden', .3, {
										opacity: 1,
										display: 'block'
									})

							}
						},'-=.8')
						


						
				} else {
					TweenMax.set(menuBtn, {x: 0})
					TweenMax.set(menuDragLine, {width: 0})
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
				<div className="menu__drag-dots"></div>
				<IconArrows classes="menu__drag-arrows" width="25" color="#FFFFFF"/>
			</div>
		)

	}

}

export default DragHome
