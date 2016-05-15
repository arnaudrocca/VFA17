import React from 'react'
import IconDone from './svg/icon-done'
import IconLocked from './svg/icon-locked'
import IconTodo from './svg/icon-todo'

class Menu extends React.Component {

	constructor() {

		super()

	}

	componentDidMount() {

		this.windowWidth = window.innerWidth

		const sideSize = 20
		const gridWidth = ((this.windowWidth - (sideSize * 2)) / 6)

		Draggable.create('.js-menu-btn', {
            type: 'x',
			// edgeResistance: .95,
            bounds: {
                minX: -(this.windowWidth - (sideSize * 2)) * 10 / 12,
                maxX: 0
            },
			liveSnap: true,
			snap: {
				x: function(endValue) {
					return Math.round(endValue / gridWidth) * gridWidth
				}
			},
			zIndex: 1000,
			zIndexBoost: false
        })

	}

	mouseDownHandler() {

		document.body.classList.add('is-menu-active')

	}

	mouseUpHandler() {

		document.body.classList.remove('is-menu-active')

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

		this.getContent();

		return (
			<div>
				<div className="menu__btn js-menu-btn"
					onMouseDown={this.mouseDownHandler.bind(this)} onMouseUp={this.mouseUpHandler.bind(this)}>
					<span></span>
				</div>
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
