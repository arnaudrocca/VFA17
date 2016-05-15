import React from 'react'
import { Link } from 'react-router'
import IconDone from './svg/icon-done'
import IconLocked from './svg/icon-locked'
import IconTodo from './svg/icon-todo'

class Menu extends React.Component {

	constructor() {

		super();

	}

	componentDidMount() {

		this.bodyNode = document.querySelector('body')

		Draggable.create('.js-menu-btn', {
            type: 'x',
            bounds: {
                minX: -window.innerWidth * 10 / 12,
                maxX: 0
            },
			zIndex: 1000,
			zIndexBoost: false
        });

	}

	mouseDownHandler() {

		this.bodyNode.classList.add('is-menu-active')

	}

	mouseUpHandler() {

		this.bodyNode.classList.remove('is-menu-active')

	}

	render() {

		return (
			<div>
				<div className="menu__btn js-menu-btn"
					onMouseDown={this.mouseDownHandler.bind(this)} onMouseUp={this.mouseUpHandler.bind(this)}>
					<span></span>
				</div>
				<div className="menu">
					<div className="menu__slice">
						<div className="menu__item">
							<IconDone width="75" opacity="0.6" color="#ffffff"/>
							<span className="menu__label">Voyage 1</span>
						</div>
					</div>
					<div className="menu__slice">
						<div className="menu__item">
							<IconDone width="75" opacity="0.6" color="#ffffff"/>
							<span className="menu__label">Voyage 2</span>
						</div>
					</div>
					<div className="menu__slice">
						<div className="menu__item">
							<IconTodo width="75" opacity="0.6" color="#ffffff"/>
							<span className="menu__label">Voyage 3</span>
						</div>
					</div>
					<div className="menu__slice">
						<div className="menu__item">
							<IconLocked width="75" opacity="0.6" color="#ffffff"/>
							<span className="menu__label">Voyage 4</span>
						</div>
					</div>
					<div className="menu__slice">
						<div className="menu__item">
							<IconLocked width="75" opacity="0.6" color="#ffffff"/>
							<span className="menu__label">Voyage 5</span>
						</div>
					</div>
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
