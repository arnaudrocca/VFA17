import React from 'react'
import ReactDOM from 'react-dom'
import ChoiceIntro from '../ChoiceIntro'

class Choice3A extends React.Component {

	/**
     * @constructor
     */
	constructor() {

		super()

		this.windowWidth = window.innerWidth;
        this.windowHeight = window.innerHeight;

	}

	componentDidMount() {

		//this.interactionContainer = document.querySelector('.choice__interaction-container')

        this.positionX = (this.windowWidth * 0.66) / 2;

        console.log(this.positionX)

        this.DELTA_POSITION = 0;
        this.LAST_POSITION = this.positionX;

		this.cursor = ReactDOM.findDOMNode(this.refs.cursor);

        Draggable.create(this.cursor, {
            type: 'x',
            edgeResistance: .95,
            bounds: {
                minX: -(this.windowWidth * 0.66) / 2,
                maxX: (this.windowWidth * 0.66) / 2
            },
            zIndex: 1000,
            zIndexBoost: false
            // onDrag: () => {
            // 	this.update()
            // }
        });

        TweenMax.ticker.addEventListener('tick', this.update.bind(this));
	}

	 /**
	 * @method
	 * @name resize
	 * @description Resize the scene according to screen size
	 * @param {number} newWidth
	 * @param {number} newHeight
	 */
    resize(newWidth, newHeight) {

        this.windowWidth = newWidth;
        this.windowHeight = newHeight;

        // update Draggable bounds

    }

    update() {

        this.positionX = this.cursor.getBoundingClientRect().left;
        console.log(this.positionX)

        this.DELTA_POSITION = Math.abs(this.positionX - this.LAST_POSITION);
        this.LAST_POSITION = this.positionX;

        const cursorHeight = 50 - this.DELTA_POSITION * .75;

        this.cursor.style.height = `${cursorHeight}px`;
        this.cursor.style.marginTop = `${(this.windowHeight - cursorHeight) / 2}px`;

        const imageId = Math.floor((this.positionX / this.windowWidth) * 5);

        console.log(imageId)

    }

	/**
     * @method
	 * @name render
     */
	render() {

		return (
			<div className="choice__interaction-container">
				<ChoiceIntro title={this.props.choiceData.introTitle} text={this.props.choiceData.introText}/>
				<div className="choice__interaction-main">
					<span id="line"></span>
					<span ref="cursor" id="cursor"></span>
				</div>
			</div>
		)

	}

}

export default Choice3A
