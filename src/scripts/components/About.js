import React from 'react'
import ReactDOM from 'react-dom'
import IconFlowerSmall from './iconsComponents/icon-flower-small'

class About extends React.Component {

	/**
     * @constructor
     */
	constructor() {

		super()

		this.aboutTimeline = new TimelineLite()

	}

    /**
	 * @method
	 * @name componentDidMount
	 */
    componentDidMount() {

        this.aboutNode = ReactDOM.findDOMNode(this.refs.about)
        this.aboutContainerNode = ReactDOM.findDOMNode(this.refs.aboutContainer)
		this.homeVideoMain = document.querySelector('.home__video--main')

    }

    /**
	 * @method
	 * @name clickHandler
	 * @description Close the about pop-in
	 */
    clickHandler() {

		window.cityAudio.setFilter(false)

        this.aboutTimeline
            .fromTo(this.aboutContainerNode, .3, {scale: 1}, {scale: .9})
			.to(this.aboutNode, .3, {opacity: 0, display: 'none'}, '-=.3')

        if (this.homeVideoMain && getComputedStyle(this.homeVideoMain)['display'] == 'block') {
	        this.homeVideoMain.play()
	    }

    }

	/**
	 * @method
	 * @name render
	 */
	render() {

		return (
			<div className="about" ref="about">
                <div className="about__container" ref="aboutContainer">
                    <div className="about__content">
						<div className="about__content__team">
                            <h1 className="about__content__title">
                                <IconFlowerSmall classes="about__content--flowers" color="#FF5951" width="18" />
                                L'équipe
                            </h1>
							<div className="about__content__team--container">
	                            <p className="about__content__team--member">
	                                Maud Butin <br />
	                                <span className="about__content__team--role">Designer</span>
	                            </p>
	                            <p className="about__content__team--member">
	                                Nicolas Loureiro <br />
	                                <span className="about__content__team--role">Designer</span>
	                            </p>
	                            <p className="about__content__team--member">
	                                Yann Kubacki <br />
	                                <span className="about__content__team--role">Développeur</span>
	                            </p>
	                            <p className="about__content__team--member">
	                                Arnaud Rocca <br />
	                                <span className="about__content__team--role">Développeur</span>
	                            </p>
							</div>
						</div>
                        <div className="about__content__thanks">
						    <h1 className="about__content__title">
                                <IconFlowerSmall classes="about__content--flowers" color="#FF5951" width="18" />
                                Remerciements
                            </h1>
    						<p>
    							UN GRAND MERCI À <br />
    							Véronique Ficara, Thierry Audoux, Takumi Kobayashi, Thomas Menia, Catherine Nyeki, Tony Houziaux, Laurent Voulzy, John Ricard et toute l'équipe pédagogique de l'école des Gobelins.
    						</p>
                        </div>
						<div className="about__content__credits">
							<h1 className="about__content__title">
                            	<IconFlowerSmall classes="about__content--flowers" color="#FF5951" width="18" />
                            	Crédits
                        	</h1>
							<p>Les crédits</p>
							<p>Les logos</p>
						</div>
                    </div>
                    <span className="about__close" onClick={this.clickHandler.bind(this)}></span>
                </div>
            </div>
		)

	}

}

export default About
