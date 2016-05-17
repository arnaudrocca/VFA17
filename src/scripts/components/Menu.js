import React from 'react'
import ReactDOM from 'react-dom'
import { hashHistory } from 'react-router'
import answersData from '../data/answers.json'
import IconDone from './iconsComponents/icon-done'
import IconLocked from './iconsComponents/icon-locked'
import IconTodo from './iconsComponents/icon-todo'


class Menu extends React.Component {

	constructor() {

		super()

		window.addEventListener('resize', this.resize.bind(this))

	}

	componentDidMount() {

		document.body.classList.remove('is-menu-active')

		const windowWidth = window.innerWidth

		const props = this.props
		const menuState = props.menuState
		const choicesState = props.choicesState

		const menuBtn = ReactDOM.findDOMNode(this.refs.menuBtn)
		const menuDragLine = ReactDOM.findDOMNode(this.refs.menuDragLine)

		const sideSize = 20
		const gridWidth = (windowWidth - (sideSize * 2)) / 6

		this.menuBtnDrag = Draggable.create(menuBtn, {
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
					return Math.round(endValue / gridWidth) * gridWidth
				}
			},
			onPress: () => {
				document.body.classList.add('is-menu-active')
				menuBtn.classList.add('is-active')
			},
			onDrag: () => {
				TweenMax.set(menuDragLine,{width: Math.abs(this.x)})
			},
			onRelease: (endValue) => {
				document.body.classList.remove('is-menu-active')
				menuBtn.classList.remove('is-active')

				const selectedId = Math.floor(endValue.x / gridWidth)

				if (selectedId < 5) {
					const selectedItem = menuState.find((menuItem) => {
						return menuItem.id == selectedId
					})

					switch (selectedItem.state) {
						case 'todo':
							TweenMax.to('.experiment', 0.3, {
								opacity: 0,
								delay: 0.3,
								onComplete: () => {
									hashHistory.push(`/choice/${selectedId}`)
								}
							})
							break

						case 'locked':
							document.body.classList.remove('is-menu-active')

							TweenMax.set(menuBtn, {clearProps: 'x'})
							TweenMax.set(menuDragLine, {width: 0})

							const dialog = 'RIP'
							const mood = 'sad'
							props.mayorTalks(dialog, mood)
							break

						case 'done':
							document.body.classList.remove('is-menu-active')

							TweenMax.set(menuBtn, {clearProps: 'x'})
							TweenMax.set(menuDragLine, {width: 0})

							const answer = answersData.find((answer) => {
								return answer.name == choicesState[selectedId].answer
							})
							props.mayorTalks(answer.dialog, answer.mood)
							break

						default:
							break
					}
				}
			}
        })

	}

	resize() {

		console.log(this.menuBtnDrag)

	}

	getContent() {

		this.menuItems = this.props.menuState.map((item, index) => {
			if (item.state == 'todo') {
				return (
					<div key={index} className="menu__slice">
						<div className="menu__item">
							<IconTodo width="75" opacity="0.6" color="#ffffff"/>
							<span className="menu__label">Voyage {index + 1}</span>
						</div>
					</div>
				)
			}
			else if (item.state == 'locked') {
				return (
					<div key={index} className="menu__slice">
						<div className="menu__item">
							<IconLocked width="75" opacity="0.6" color="#ffffff"/>
							<span className="menu__label">Voyage {index + 1}</span>
						</div>
					</div>
				)
			}
			else {
				return (
					<div key={index} className="menu__slice">
						<div className="menu__item">
							<IconDone width="75" opacity="0.6" color="#ffffff"/>
							<span className="menu__label">Voyage {index + 1}</span>
						</div>
					</div>
				)
			}
		})

	}

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
				<div ref="menuDragLine" className="menu__drag-line"></div>
				<div className="menu">
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
