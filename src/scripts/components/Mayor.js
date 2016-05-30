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

		this.mayorDialogNode = ReactDOM.findDOMNode(this.refs.mayorDialog)
		this.spacebarIconNode = ReactDOM.findDOMNode(this.refs.spacebarIcon)

		if (this.paragraphs != '') {
			TweenMax.to(this.mayorDialogNode, 0.3, {opacity: 1, display: 'flex'})

			this.isTalking = true
			TweenMax.staggerFrom('.char', .1, {opacity: 0}, .015, () => {
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
	componentWillReceiveProps() {

		this.setState({
			dialogIndex: 0
		})

		TweenMax.to(this.mayorDialogNode, 0.3, {opacity: 1, display: 'flex'})

	}

	/**
     * @method
	 * @name componentWillUpdate
	 * @param {object} nextProps
     */
	componentWillUpdate(nextProps) {

		this.paragraphs = nextProps.dialog.split('§')

		if (this.paragraphs == '') {
			TweenMax.to(this.mayorDialogNode, 0.3, {opacity: 0, display: 'none'})
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
			TweenMax.staggerFrom('.char', .1, {opacity: 0}, .015, () => {
				this.isTalking = false
			})
		}

	}

	/**
     * @method
	 * @name spacebarDownHandler
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
					this.props.mayorTalked()
					TweenMax.to(this.mayorDialogNode, 0.3, {opacity: 0, display: 'none'})
				} else {
					this.setState({
						dialogIndex: this.state.dialogIndex + 1
					})
				}
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
				<div ref="mayorDialog" className="mayor__dialog">
					<p>{this.dialog}</p>
					<div className="mayor__instructions">
					<span className="mayor__spacebar" ref="spacebarIcon">Espace</span> pour passer
					</div>
				</div>
			</div>
		)

	}

}

export default Mayor
