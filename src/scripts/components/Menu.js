import React from 'react'
import ReactDOM from 'react-dom'
import { hashHistory } from 'react-router'
import { debounce } from 'lodash'
import answersData from '../data/answers.json'
import IconDone from './iconsComponents/icon-done'
import IconLocked from './iconsComponents/icon-locked'
import IconTodo from './iconsComponents/icon-todo'

class Menu extends React.Component {

	/**
     * @constructor
     */
	constructor() {

		super()

		this.createDrag = this.createDrag.bind(this)
		this.menuTimeline = new TimelineLite()

	}

	/**
	 * @method
	 * @name componentDidMount
	 */
	componentDidMount() {

		document.body.classList.remove('is-menu-active')

		this.createDrag()

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
	 */
	createDrag() {

		const props = this.props

		const menu = ReactDOM.findDOMNode(this.refs.menu)
		const menuBtn = ReactDOM.findDOMNode(this.refs.menuBtn)
		const menuDragLine = ReactDOM.findDOMNode(this.refs.menuDragLine)
		const slices = document.querySelectorAll('.menu__slice')

		const windowWidth = window.innerWidth
		const sideSize = 20
		const columnWidth = (windowWidth - (sideSize * 2)) / 6

		Draggable.create(menuBtn, {
			type: 'x',
			bounds: {
				minX: -(windowWidth - (sideSize * 2)) * 10 / 12,
				maxX: 0
			},
			zIndex: 110,
			zIndexBoost: false,
			liveSnap: true,
			snap: {
				x: (endValue) => {
					return Math.round(endValue / columnWidth) * columnWidth
				}
			},
			onPress: () => {
				this.menuTimeline
					.to(menu, .3, {opacity: 1, display: 'flex'})
					.staggerFromTo('.menu__slice', .3, {opacity: 0}, {opacity: 1}, -.03, '-=.15')
					.staggerFromTo('.icon-locked__circle, .icon-done', .3, {rotation: '-30deg'}, {rotation: 0, ease: Quart.easeOut}, -.05, '-=.3')
				menuBtn.classList.add('is-active')
			},
			onDrag: function() {
				TweenMax.set(menuDragLine, {width: Math.abs(this.x)})

				const currentId = Math.round(5 - Math.abs(this.x / columnWidth))
				if (currentId < 5) {
					const currentSlice = document.querySelector(`.menu__slice--${currentId}`)
					for (var i = slices.length - 1; i >= 0; i--) {
						slices[i].classList.remove('is-active')
					}
					currentSlice.classList.add('is-active')
				}
				else {
					for (var i = slices.length - 1; i >= 0; i--) {
						slices[i].classList.remove('is-active')
					}
				}
			},
			onRelease: function(endValue) {
				menuBtn.classList.remove('is-active')
				for (var i = slices.length - 1; i >= 0; i--) {
					slices[i].classList.remove('is-active')
				}

				const selectedId = Math.floor(Math.abs(endValue.x / columnWidth))
				if (selectedId < 5) {
					const selectedItem = props.menuState.find((menuItem) => {
						return menuItem.id == selectedId
					})

					let dialog, mood = ''

					switch (selectedItem.state) {
						case 'todo':
							const todoTimeline = new TimelineLite()
							todoTimeline
								.to('.mapContainer', .3, {scale: .7, transformOrigin: '50% 50%', ease: Expo.easeOut})
								.to('.map', .3, {x: 0, y: 0, ease: Expo.easeOut}, '-=.3')
								.to('.experiment', .3, {
									opacity: 0,
									onComplete: () => {
										hashHistory.push(`/choice/${selectedId}`)
									}
								}, '+=.3')

							dialog = ''
							mood = 'neutral'
							break

						case 'locked':
							TweenMax.set(menuBtn, {clearProps: 'x'})
							TweenMax.set(menuDragLine, {width: 0})
							TweenMax.to(menu, .3, {opacity: 0, display: 'none'})

							dialog = 'Chaque chose en son temps...'
							mood = 'neutral'
							break

						case 'done':
							TweenMax.set(menuBtn, {clearProps: 'x'})
							TweenMax.set(menuDragLine, {width: 0})
							TweenMax.to(menu, .3, {opacity: 0, display: 'none'})

							const answer = answersData.find((answer) => {
								return answer.name == props.choicesState[selectedId].answer
							})
							dialog = answer.dialog
							mood = answer.mood
							break

						default:
							break
					}

					props.mayorTalks(dialog, mood)

				} else {
					TweenMax.to(menu, .3, {opacity: 0, display: 'none'})
				}
			}
		})

	}

	/**
	 * @method
	 * @name getContent
	 */
	getContent() {

		this.menuItems = this.props.menuState.map((item, index) => {
			if (item.state == 'todo') {
				return (
					<div key={index} className={`menu__slice menu__slice--todo menu__slice--${index}`}>
						<div className="menu__item">
							<IconTodo classes="menu__icon" width="75" opacity="0.6" color="#FFF"/>
							<span className="menu__label">Voyage {index + 1}</span>
						</div>
					</div>
				)
			}
			else if (item.state == 'locked') {
				return (
					<div key={index} className={`menu__slice menu__slice--${index}`}>
						<div className="menu__item">
							<IconLocked classes="menu__icon" width="75" opacity="0.6" color="#FFF"/>
							<span className="menu__label">Voyage {index + 1}</span>
						</div>
					</div>
				)
			}
			else {
				return (
					<div key={index} className={`menu__slice menu__slice--${index}`}>
						<div className="menu__item">
							<IconDone classes="menu__icon" width="75" opacity="0.6" color="#FFF"/>
							<span className="menu__label">Voyage {index + 1}</span>
						</div>
					</div>
				)
			}
		})

	}

	/**
	 * @method
	 * @name render
	 */
	render() {

		this.getContent()

		return (
			<div>
				<div className="menu__btn" ref="menuBtn">
					<div className="menu__btn__icon">
						<span></span>
					</div>
				</div>
				<div className="menu__drag-start"></div>
				<div className="menu__drag-line" ref="menuDragLine"></div>
				<div className="menu" ref="menu">
					{this.menuItems}
					<div className="menu__slice menu__slice--empty"></div>
					<div className="menu__infos">
						<p>Glissez pour voyager dans le temps</p>
					</div>
				</div>
			</div>
		)

	}

}

export default Menu
