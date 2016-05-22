import React from 'react'
import ReactDOM from 'react-dom'
import { debounce } from 'lodash'

class Mayor extends React.Component {

	/**
     * @constructor
     */
	constructor() {

		super()

		this.state = {
			dialogIndex: 0
		}

	}

	/**
     * @method
	 * @name componentWillMount
     */
	componentWillMount() {

		this.paragraphs = this.props.dialog.split('§')
		window.addEventListener('keydown', debounce(this.spacebarDownHandler.bind(this), 350))

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
			TweenMax.staggerFrom('.char', 0, {display: 'none'}, .015)
		}

	}

	/**
     * @method
	 * @name componentWillUnmount
     */
	componentWillUnmount() {

		window.removeEventListener('keydown', this.spacebarDownHandler.bind(this))

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
		}

	}

	/**
     * @method
	 * @name componentDidUpdate
     */
	componentDidUpdate() {

		TweenMax.staggerFrom('.char', 0, {display: 'none'}, .015)

	}

	/**
     * @method
	 * @name spacebarDownHandler
	 * @param {object} e - event
     */
	spacebarDownHandler(e) {

		const event = e || document.event

		if (event.keyCode == 32 && this.paragraphs != '') {
			if (this.state.dialogIndex + 1 == this.paragraphs.length) {
				this.props.mayorTalked()
				TweenMax.to(this.mayorDialogNode, 0.3, {opacity: 0, display: 'none'})
			} else {
				this.setState({
					dialogIndex: this.state.dialogIndex + 1
				})
			}
			// let introTimeline = new TimelineLite()
			//
			// introTimeline
			// .to(this.spacebarIconNode, 0.3, {
			// 	background: 'rgba(0,0,0,0)',
			// 	color: '#000'
			// })
			// .to(this.spacebarIconNode, 0.3, {
			// 	background: 'rgba(0,0,0,0.2)',
			// 	color: '#FFF'
			// })
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
