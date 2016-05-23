import React from 'react'
import ReactDOM from 'react-dom'
import { debounce, throttle } from 'lodash'
import ChoiceIntro from '../ChoiceIntro'

class Choice3A extends React.Component {

	/**
     * @constructor
     */
	constructor() {

		super()

        this.itemsNumber =  7
        this.createDrag = this.createDrag.bind(this)

	}

    /**
     * @method
     * @name componentDidMount
     */
	componentDidMount() {

		this.cursor = ReactDOM.findDOMNode(this.refs.cursor)
        this.sliderItems = document.querySelectorAll('.propaganda__slider__item')

        window.addEventListener('resize', debounce(this.createDrag, 350))

        this.createDrag()

	}

    /**
     * @method
     * @name componentWillUnMount
     */
    componentWillUnMount() {

        window.removeEventListener('resize', this.createDrag)

    }

    /**
     * @method
     * @name createDrag
     */
    createDrag() {

        if (window.innerWidth > 1400) {
            this.mainWidth = (window.innerWidth * 76) / 100
        } else {
            this.mainWidth = (window.innerWidth * 66) / 100
        }
        this.mainHeight = window.innerHeight

        const itemTransitionTimeline = new TimelineLite()
        const cursorRadius = 25
        const lineWidth = (this.mainWidth / 2) * .75
        const lineLeftOffset = (((this.mainWidth - lineWidth) / 2) + (window.innerWidth - this.mainWidth))
        const columnWidth = lineWidth / this.itemsNumber
        const sliderItems = this.sliderItems
        let lastId = Math.floor(this.itemsNumber / 2)

        TweenMax.to(sliderItems[lastId], .2, {display: 'block', opacity: 1})

        Draggable.create(this.cursor, {
            type: 'x',
            edgeResistance: .95,
            bounds: {
                minX: -lineWidth + cursorRadius,
                maxX: lineWidth - cursorRadius
            },
            zIndex: 1000,
            zIndexBoost: false,
            onDrag: throttle(function() {

                const selectedId = Math.floor(((this.x + lineWidth) / columnWidth) / 2)

                if (selectedId != lastId) {
                    const lastItem = sliderItems[lastId]
                    const currentItem = sliderItems[selectedId]

                    itemTransitionTimeline
                        .to(lastItem, .5, {
                            display: 'none',
                            opacity: 0,
                            scale: 1.2
                        })
                        .to(currentItem, .5, {
                            display: 'block',
                            opacity: 1,
                            scale: 1
                        },'-=.5') 
                }

                lastId = selectedId
            },150)
        })

    }

	/**
     * @method
	 * @name render
     */
	render() {

		return (
			<div className="choice__interaction-container">
				<ChoiceIntro title={this.props.choiceData.introTitle} text={this.props.choiceData.introText}/>
				<div className="choice__interaction-main choice__interaction-main">
                    <div className="propaganda">
                        <div className="propaganda__slider">
                            <img data-index="0" className="propaganda__slider__item" src="http://lorempicsum.com/simpsons/245/245/1"/>
                            <img data-index="1" className="propaganda__slider__item" src="http://lorempicsum.com/simpsons/245/245/2"/>
                            <img data-index="2" className="propaganda__slider__item" src="http://lorempicsum.com/simpsons/245/245/3"/>
                            <img data-index="3" className="propaganda__slider__item" src="http://lorempicsum.com/simpsons/245/245/4"/>
                            <img data-index="4" className="propaganda__slider__item" src="http://lorempicsum.com/futurama/245/245/1"/>
                            <img data-index="5" className="propaganda__slider__item" src="http://lorempicsum.com/futurama/245/245/2"/>
                            <img data-index="6" className="propaganda__slider__item" src="http://lorempicsum.com/futurama/245/245/3"/>
                        </div>
    					<span className="propaganda__line"></span>
    					<span ref="cursor" className="propaganda__cursor"></span>
                        <button className="choice__main-btn choice__main-btn--validate choice__main-btn--3A" type="button">
                            <span>Valider</span>
                            <svg x="0px" y="0px" viewBox="1 2 122 48">
                                <g className="choice__main-btn__border">
                                    <g>
                                        <path fill="#FFFFFF" d="M107.1,50H1V2h122v32.1L107.1,50z M3,48h103.3L121,33.3V4H3V48z"/>
                                    </g>
                                </g>
                                <g className="choice__main-btn__fill">
                                    <polygon fill="#FF5951" points="105.7,46 5,46 5,6 119,6 119,32.7"/>
                                </g>
                            </svg>
                        </button>
                    </div>
				</div>
			</div>
		)

	}

}

export default Choice3A
