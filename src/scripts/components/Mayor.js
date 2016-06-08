import React from 'react'
import ReactDOM from 'react-dom'

class Mayor extends React.Component {

	/**
     * @constructor
     */
	constructor() {

		super()

		this.state = {
			dialogIndex: 0
		}

		this.mayorTimeline = new TimelineLite()

		this.spacebarDownHandler = this.spacebarDownHandler.bind(this)
		this.spacebarUpHandler = this.spacebarUpHandler.bind(this)

	}

	/**
     * @method
	 * @name componentWillMount
     */
	componentWillMount() {

		this.paragraphs = this.props.dialog.split('§')

	}

	/**
     * @method
	 * @name componentDidMount
     */
	componentDidMount() {

		if (window.isBeginning) {
			window.isBeginning = false
			setTimeout(() => {
				this.props.mayorTalks('Voici Ayaux-les-Bains. Comme tu peux le constater, il y a du boulot. § Selon les critère VFA, il me faut au moins 4 fleurs sur 5 pour remporter l\'Award. § Fais glisser la ville pour te déplacer et utilise le scroll pour zoomer. § Allez, c’est le moment d’utiliser la machine à remonter le temps à droite de ton écran.', 'neutral')
			}, 1000)
		}

		this.mayorDialogNode = ReactDOM.findDOMNode(this.refs.mayorDialog)
		this.mayorInstructionsNode = ReactDOM.findDOMNode(this.refs.mayorInstructions)
		this.spacebarIconNode = ReactDOM.findDOMNode(this.refs.spacebarIcon)

		if (this.paragraphs != '') {
			this.mayorTimeline
				.to(this.mayorDialogNode, 0.3, {opacity: 1, scale: 1})
				.to(this.mayorInstructionsNode, 0.3, {opacity: 1}, '-=.3')

			this.isTalking = true
			TweenMax.set('.char', {opacity: 0})
			TweenMax.staggerTo('.char', 0, {opacity: 1, delay: .1}, .015, () => {
				this.isTalking = false
			})
		}

		window.addEventListener('keydown', this.spacebarDownHandler)
		window.addEventListener('keyup', this.spacebarUpHandler)

	}

	/**
     * @method
	 * @name componentWillUnmount
     */
	componentWillUnmount() {

		window.removeEventListener('keydown', this.spacebarDownHandler)
		window.removeEventListener('keyup', this.spacebarUpHandler)

	}

	/**
     * @method
	 * @name componentWillReceiveProps
     */
	componentWillReceiveProps(nextProps) {

		this.setState({
			dialogIndex: 0
		})

		if (nextProps.dialog != '') {
			this.mayorTimeline
				.to(this.mayorDialogNode, 0.3, {opacity: 1, scale: 1})
				.to(this.mayorInstructionsNode, 0.3, {opacity: 1}, '-=.3')
		}

	}

	/**
     * @method
	 * @name componentWillUpdate
	 * @param {object} nextProps
     */
	componentWillUpdate(nextProps) {

		this.paragraphs = nextProps.dialog.split('§')

		if (this.paragraphs == '') {
			this.mayorTimeline
				.to(this.mayorDialogNode, 0.3, {opacity: 0, scale: 0})
				.to(this.mayorInstructionsNode, 0.3, {opacity: 0}, '-=.3')
		} else {
			this.isTalking = true
		}

	}

	/**
     * @method
	 * @name componentDidUpdate
     */
	componentDidUpdate() {

		if (this.paragraphs != '') {
			TweenMax.set('.char', {opacity: 0})
			TweenMax.staggerTo('.char', 0, {opacity: 1, delay: .1}, .015, () => {
				this.isTalking = false
			})
		}

	}

	/**
     * @method
	 * @name spacebarDownHandler
	 * @description Triggered when spacebar is pressed
	 * @param {object} e - event
     */
	spacebarDownHandler(e) {

		const event = e || window.e
		const key = event.keyCode || event.which

		const aboutNode = document.querySelector('.about')
		const aboutOpacity = getComputedStyle(aboutNode)['opacity']

		if (key == 32 && this.paragraphs != '' && aboutOpacity == 0) {
			TweenMax.to(this.spacebarIconNode, 0.3, {background: 'rgba(0,0,0,0)', color: '#000'})
		}

	}

	/**
	 * @method
	 * @name spacebarUpHandler
	 * @description Triggered when spacebar is released
	 * @param {object} e - event
	 */
	spacebarUpHandler(e) {

		const event = e || window.e
		const key = event.keyCode || event.which

		const aboutNode = document.querySelector('.about')
		const aboutOpacity = getComputedStyle(aboutNode)['opacity']

		if (key == 32 && this.paragraphs != '' && aboutOpacity == 0) {
			if (!this.isTalking) {
				if (this.state.dialogIndex + 1 == this.paragraphs.length) {
					this.mayorTimeline
						.to(this.mayorDialogNode, 0.3, {opacity: 0, scale: 0})
						.to(this.mayorInstructionsNode, 0.3, {opacity: 0}, '-=.3')
					this.props.mayorTalked()
				} else {
					this.setState({
						dialogIndex: this.state.dialogIndex + 1
					})
				}
			} else {
				TweenMax.set('.char', {opacity: 1})
				this.isTalking = false
			}
			TweenMax.to(this.spacebarIconNode, 0.3, {background: 'rgba(0,0,0,0.2)', color: '#FFF'})
		}

	}

	/**
     * @method
	 * @name getContent
     */
	getContent() {

		let splittedDialog = this.paragraphs[this.state.dialogIndex].split('')
		this.dialog = splittedDialog.map((char, index) => {
			return (
				<span className="char" key={index}>{char}</span>
			)
		})

		this.style = {
			backgroundImage: `url(assets/images/mayor/mayor-${this.props.mood}.png)`
		}

	}

	/**
     * @method
	 * @name render
     */
	render() {

		this.getContent()

		return (
			<div className="mayor" style={this.style}>
				<div className="mayor__dialog" ref="mayorDialog">
					<p>{this.dialog}</p>
				</div>
				<div className="mayor__instructions" ref="mayorInstructions">
					<span className="mayor__spacebar" ref="spacebarIcon">Espace</span> pour passer
				</div>
			</div>
		)

	}

}

export default Mayor
