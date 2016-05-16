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
			TweenMax.to(this.mayorDialogNode, 0.3, {visibility: 'visible', opacity: 1})
		}

	}

	componentWillUnmount() {

		window.removeEventListener('keydown', this.spacebarDownHandler.bind(this))

	}

	componentWillReceiveProps() {

		this.setState({
			dialogIndex: 0
		})

		TweenMax.to(this.mayorDialogNode, 0.3, {visibility: 'visible', opacity: 1})

	}

	componentWillUpdate(nextProps) {

		this.paragraphs = nextProps.dialog.split('§')

	}

	componentDidUpdate() {

		TweenMax.staggerFrom('.char', 0, {display: 'none'}, .015)

	}

	spacebarDownHandler(e) {

		const event = e || document.event

		if (event.keyCode == 32 && this.paragraphs != '') {
			if (this.state.dialogIndex + 1 == this.paragraphs.length) {
				this.props.mayorTalked()
				TweenMax.to(this.mayorDialogNode, 0.3, {visibility: 'hidden', opacity: 0})
			} else {
				this.setState({
					dialogIndex: this.state.dialogIndex + 1
				})
			}
		}

	}

	getContent() {

		let splittedDialog = this.paragraphs[this.state.dialogIndex].split('')
		this.content = splittedDialog.map((char,index) => {
			return (
				<span className="char" key={index}>{char}</span>
			)
		})

	}

	render() {

		this.getContent()

		return (
			<div className="mayor">
			  	<div ref="mayorDialog" className="mayor__dialog">
			  		<p>{this.content}</p>
			  	</div>
			</div>
		)

	}

}

export default Mayor
