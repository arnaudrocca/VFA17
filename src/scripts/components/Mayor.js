import React from 'react'
import ReactDOM from 'react-dom'
import { debounce } from 'lodash'

class Mayor extends React.Component {

	constructor() {

		super()

		this.state = {
			dialogIndex: 0
		}

	}

	componentWillMount() {

		this.paragraphs = this.props.dialog.split('§')
		window.addEventListener('keydown', debounce(this.spacebarDownHandler.bind(this), 350))

	}

	componentDidMount() {

		this.mayorDialogNode = ReactDOM.findDOMNode(this.refs.mayorDialog)

		if (this.paragraphs != '') {
			TweenMax.to(this.mayorDialogNode, 0.3, {opacity: 1, display: 'flex'})
			TweenMax.staggerFrom('.char', 0, {display: 'none'}, .015)
		}

	}

	componentWillUnmount() {

		window.removeEventListener('keydown', this.spacebarDownHandler.bind(this))

	}

	componentWillReceiveProps() {

		this.setState({
			dialogIndex: 0
		})

		TweenMax.to(this.mayorDialogNode, 0.3, {opacity: 1, display: 'flex'})

	}

	componentWillUpdate(nextProps) {

		this.paragraphs = nextProps.dialog.split('§')

		if (this.paragraphs == '') {
			TweenMax.to(this.mayorDialogNode, 0.3, {opacity: 0, display: 'none'})
		}

	}

	componentDidUpdate() {

		TweenMax.staggerFrom('.char', 0, {display: 'none'}, .015)

	}

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
		}

	}

	getContent() {

		let splittedDialog = this.paragraphs[this.state.dialogIndex].split('')
		this.dialog = splittedDialog.map((char, index) => {
			return (
				<span className="char" key={index}>{char}</span>
			)
		})

		this.style = {
			backgroundImage: `url(assets/images/mayor/mayor-${this.props.mood}.jpg)`
		}

	}

	render() {

		this.getContent()

		return (
			<div className="mayor" style={this.style}>
			  	<div ref="mayorDialog" className="mayor__dialog">
			  		<p>{this.dialog}</p>
			  	</div>
			</div>
		)

	}

}

export default Mayor
