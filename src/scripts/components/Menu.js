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

		this.onPress = this.onPress.bind(this)
		this.onDrag = this.onDrag.bind(this)
		this.onRelease = this.onRelease.bind(this)
		this.createDrag = this.createDrag.bind(this)
		this.updateDragLine = this.updateDragLine.bind(this)

	}

	/**
	 * @method
	 * @name componentDidMount
	 */
	componentDidMount() {

		document.body.classList.remove('is-menu-active')

		this.menu = ReactDOM.findDOMNode(this.refs.menu)
		this.menuBtn = ReactDOM.findDOMNode(this.refs.menuBtn)
		this.menuDragLine = ReactDOM.findDOMNode(this.refs.menuDragLine)
		this.menuInfos = ReactDOM.findDOMNode(this.refs.menuInfos)
		this.slices = document.querySelectorAll('.menu__slice')

		this.menuTimeline = new TimelineLite()

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

		const windowWidth = window.innerWidth
		const sideSize = 20
		this.columnWidth = (windowWidth - (sideSize * 2)) / 6

		this.dragMenu = Draggable.create(this.menuBtn, {
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
					return Math.round(endValue / this.columnWidth) * this.columnWidth
				}
			},
			onPress: () => {
				this.onPress()
			},
			onDrag: () => {
				this.onDrag()
			},
			onRelease: (endValue) => {
				this.onRelease(endValue)
			}
		})

	}

	/**
	 * @method
	 * @name onPress
	 */
	onPress() {

		this.menuTimeline
			.to(this.menu, .3, {opacity: 1, display: 'flex'})
			.staggerFromTo('.menu__slice', .3, {opacity: 0}, {opacity: 1}, -.03, '-=.15')
			// .staggerFromTo('.icon-locked__circle, .icon-done', .3, {rotation: '-30deg'}, {rotation: 0, ease: Quart.easeOut}, -.05, '-=.3')

		window.cityAudio.setFilter(true)
		document.body.style.cursor = 'w-resize'
		this.menuBtn.classList.add('is-active')

		this.lastId = 5
		this.lastState = 'initial'

		TweenMax.ticker.addEventListener('tick', this.updateDragLine)

	}

	/**
	 * @method
	 * @name onDrag
	 */
	onDrag() {

		const currentId = Math.round(5 - Math.abs(this.dragMenu[0].x / this.columnWidth))

		if (currentId != this.lastId) {
			if (currentId < 5) {
				const currentSlice = document.querySelector(`.menu__slice--${currentId}`)
				for (var i = this.slices.length - 1; i >= 0; i--) {
					this.slices[i].classList.remove('is-active')
				}
				currentSlice.classList.add('is-active')

				const currentItem = this.props.menuState.find((menuItem) => {
					return menuItem.id == currentId
				})

				if (currentItem.state != this.lastState) {
					switch (currentItem.state) {
						case 'todo':
							TweenMax.fromTo(this.menuInfos, .3, {opacity: 0}, {opacity: 1, textContent: 'Voyager vers le passé'})
							break

						case 'locked':
							TweenMax.fromTo(this.menuInfos, .3, {opacity: 0}, {opacity: 1, textContent: 'Bloqué'})
							break

						case 'done':
							TweenMax.fromTo(this.menuInfos, .3, {opacity: 0}, {opacity: 1, textContent: 'Résumé'})
							break

						default:
							break
					}
				}

				this.lastState = currentItem.state

			} else {
				this.lastState = 'initial'
				TweenMax.fromTo(this.menuInfos, .3, {opacity: 0}, {opacity: 1, textContent: 'Glisse le bouton pour voyager vers le passé'})
				for (var i = this.slices.length - 1; i >= 0; i--) {
					this.slices[i].classList.remove('is-active')
				}
			}
		}

		this.lastId = currentId

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
	 * @param {object} endValue
	 */
	onRelease(endValue) {

		document.body.style.cursor = 'default'
		this.menuBtn.classList.remove('is-active')
		for (var i = this.slices.length - 1; i >= 0; i--) {
			this.slices[i].classList.remove('is-active')
		}
		TweenMax.fromTo(this.menuInfos, .3, {opacity: 0}, {opacity: 1, textContent: 'Glisse le bouton pour voyager vers le passé', delay: .5})

		const selectedId = Math.floor(Math.abs(endValue.x / this.columnWidth))

		if (selectedId < 5) {
			let dialog, mood = ''

			const selectedItem = this.props.menuState.find((menuItem) => {
				return menuItem.id == selectedId
			})

			switch (selectedItem.state) {
				case 'todo':
					TweenMax.to('.experiment', .3, {opacity: 0, delay: .3,
						onComplete: () => {
							hashHistory.push(`/choice/${selectedId}`)
						}
					})

					dialog = ''
					mood = 'neutral'
					break

				case 'locked':
					window.cityAudio.setFilter(false)
					TweenMax.set(this.menuBtn, {clearProps: 'x'})
					TweenMax.set(this.menuDragLine, {width: 0})
					TweenMax.to(this.menu, .3, {opacity: 0, display: 'none'})

					dialog = 'Chaque chose en son temps...'
					mood = 'neutral'
					break

				case 'done':
					window.cityAudio.setFilter(false)
					TweenMax.set(this.menuBtn, {clearProps: 'x'})
					TweenMax.set(this.menuDragLine, {width: 0})
					TweenMax.to(this.menu, .3, {opacity: 0, display: 'none'})

					const answer = answersData.find((answer) => {
						return answer.name == this.props.choicesState[selectedId].answer
					})
					dialog = answer.dialog
					mood = answer.mood
					break

				default:
					break
			}

			this.props.mayorTalks(dialog, mood)

		} else {
			window.cityAudio.setFilter(false)
			TweenMax.to(this.menu, .3, {opacity: 0, display: 'none'})
		}

		TweenMax.ticker.removeEventListener('tick', this.updateDragLine)

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
				<div className="menu__drag-line menu__drag-line" ref="menuDragLine"></div>
				<div className="menu" ref="menu">
					{this.menuItems}
					<div className="menu__slice menu__slice--empty"></div>
					<div className="menu__infos">
						<p ref="menuInfos">Glisse le bouton pour voyager vers le passé</p>
					</div>
				</div>
			</div>
		)

	}

}

export default Menu
