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

		this.onPress = this.onPress.bind(this)
		this.onRelease = this.onRelease.bind(this)
		this.createDrag = this.createDrag.bind(this)
		this.updateDragLine = this.updateDragLine.bind(this)

		this.arrowsTimeline = new TimelineMax({repeat: -1})
		this.hideTimeline = new TimelineLite()
		this.hideTimeline2 = new TimelineLite()

	}

	/**
	 * @method
	 * @name componentDidMount
	 */
	componentDidMount() {

		this.menuBtn = ReactDOM.findDOMNode(this.refs.menuBtn)
		this.menuDragLine = ReactDOM.findDOMNode(this.refs.menuDragLine)

		this.createDrag()

		this.arrowsTimeline
			.staggerFromTo('.menu__drag-arrows path', 1, {
				opacity: 0
			}, {
				opacity: 1
			}, -.3)
			.staggerFromTo('.menu__drag-arrows path', 1, {
				opacity: 1
			}, {
				opacity: 0
			}, -.3)

		window.addEventListener('resize', debounce(this.createDrag, 350))

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
	 * @description Create the drag using Draggable
	 */
	createDrag() {

		const windowWidth = window.innerWidth
		const sideSize = 20
		const dragOffset = (((windowWidth - (sideSize * 2)) / 12) + sideSize)
		this.dragTarget = ((windowWidth / 2) - dragOffset)

		this.dragHome = Draggable.create(this.menuBtn, {
			type: 'x',
			zIndex: 110,
			zIndexBoost: false,
			bounds: {
				minX: 0,
				maxX: -this.dragTarget
			},
			onPress: () => {
				this.onPress()
			},
			onRelease: () => {
				this.onRelease()
			}
		})

	}

	/**
	 * @method
	 * @name onPress
	 * @description Triggered when the drag is pressed
	 */
	onPress() {

		document.body.style.cursor = 'w-resize'
		this.menuBtn.classList.add('is-active')

		TweenMax.ticker.addEventListener('tick', this.updateDragLine)

	}

	/**
	 * @method
	 * @name updateDragLine
	 * @description Triggered on every TweenMax tick
	 */
	updateDragLine() {

		const menuBtnMatrix = getComputedStyle(this.menuBtn)['-webkit-transform'] ||
			getComputedStyle(this.menuBtn)['-moz-transform'] ||
			getComputedStyle(this.menuBtn)['-ms-transform'] ||
			getComputedStyle(this.menuBtn)['-o-transform'] ||
			getComputedStyle(this.menuBtn)['transform']

		const menuBtnMatrixArray = menuBtnMatrix.split(',')
		const menuBtnTranslateY = menuBtnMatrixArray[4]

		TweenMax.set(this.menuDragLine, {width: Math.abs(menuBtnTranslateY)})

	}

	/**
	 * @method
	 * @name onRelease
	 * @description Triggered when the drag is released
	 */
	onRelease() {

		document.body.style.cursor = 'default'
		this.menuBtn.classList.remove('is-active')

		const distance = Math.abs(this.dragHome[0].x + this.dragTarget)

		if (distance <= 10) {
			this.hideTimeline
				.to(this.menuBtn, .3, {
					x: -this.dragTarget,
					ease: Expo.easeOut
				})
				.to(this.menuDragLine, .4, {
					width: 0,
					transition: 'none',
					ease: Expo.easeOut
				})
				.to(this.menuBtn, .6, {
					scale: 1.1,
					display: 'none',
					transition: 'none',
					ease: Expo.easeOut
				}, '-=.4')
				.to(this.menuBtn, .8, {
					scale: 0,
					display: 'none',
					transition: 'none',
					ease: Expo.easeOut
				}, '-=.3')
				.to('.home__logo-center', .2, {
					scale: 1,
					ease: Back.easeOut
					// onComplete: () => {
					// 	self.arrowsTimeline.pause(0, true);
					// 	self.arrowsTimeline.clear()
					// }
				}, '-=.7')
				.to('.home__logo__dots-container', .2, {
					opacity: 0,
					display: 'none',
					ease: Expo.easeOut,
					onComplete: () => {
						this.hideTimeline2
							.to('.home__logo-container', .3, {
								scale: 0.75,
								ease: Expo.easeOut
							})
							.to('.home__logo-container', .3, {
								scale: 1.25,
								ease: Expo.easeOut
							}, '-=.2')
							.to('.home__logo-container', .4, {
								scale: 1,
								ease: Expo.easeOut
							}, '-=.2')
							.to('.home__logo__text', .3, {
								opacity: 1,
								display: 'block',
								ease: Expo.easeOut
							}, '-=.4')
							.to('.wireframe__line', 1, {
								height: 0,
								display: 'none',
								ease: Expo.easeOut
							}, '-=.3')
							.to('.wireframe__flower--top', 1, {
								scale: 0,
								x: '50%',
								y: 0,
								display: 'none',
								ease: Expo.easeOut
							}, '-=1')
							.to('.wireframe__flower--bottom', 1, {
								scale: 0,
								x: '50%',
								y: '-100%',
								display: 'none',
								ease: Expo.easeOut
							}, '-=1')
							.to('.home__intro', 1, {
								opacity: 0,
								display: 'none',
								ease: Expo.easeOut
							}, '-=1')
							.to('.menu__drag-dots', .4, {
								width: 0,
								display: 'none',
								ease: Expo.easeOut
							}, '-=1')
							.to('.menu__drag-arrows', .4, {
								opacity: 0,
								x : 10,
								display: 'none',
								ease: Expo.easeOut
							}, '-=.4')
							.to('.menu__drag-start', .8, {
								scale: 0,
								display: 'none',
								ease: Expo.easeOut
							}, '-=.4')
							.to('.wireframe__drag', .8, {
								scale: 0,
								display: 'none',
								ease: Expo.easeOut
							}, '-=.8')
							.to('.wireframe__timeline-connector', .8, {
								width: 0,
								display: 'none',
								ease: Expo.easeOut
							}, '-=.8')
							.to('.home__logo-container', .4, {
								scale: 0,
								display: 'none',
								ease: Expo.easeOut,
								onComplete: () => {
									this.props.showVideo()
								}
							}, '-=.4')
							.to('.home__overlay', .3, {
								opacity: 0
							}, '-=.4')
							.to('.btn__main--hidden', .3, {
								opacity: 1,
								display: 'block'
							})

					}
				}, '-=.8')

		} else {
			TweenMax.set(this.menuBtn, {x: 0})
			TweenMax.set(this.menuDragLine, {width: 0})
		}

		TweenMax.ticker.removeEventListener('tick', this.updateDragLine)

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
				<div className="menu__drag-line" ref="menuDragLine"></div>
				<div className="menu__drag-dots"></div>
				<IconArrows classes="menu__drag-arrows" width="25" color="#FFFFFF"/>
			</div>
		)

	}

}

export default DragHome
