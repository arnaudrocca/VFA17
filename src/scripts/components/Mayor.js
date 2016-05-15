import React from 'react'
import { debounce } from 'lodash'
import { Link } from 'react-router'

class Mayor extends React.Component {

	constructor() {

		super();

		this.state = {
			dialogIndex: 0,
			talked: false
		}

	}

	componentWillMount() {

		this.paragraphs = this.props.dialog.split('§');
		window.addEventListener('keydown', debounce(this.spacebarDownHandler.bind(this), 350));

	}

	componentWillUnmount() {

		window.removeEventListener('keydown', this.spacebarDownHandler.bind(this));

	}

	componentWillReceiveProps() {

		this.setState({
			dialogIndex: 0,
			talked: false
		});

	}

	componentWillUpdate(nextProps) {

		this.paragraphs = nextProps.dialog.split('§');

	}

	componentDidUpdate() {

		TweenMax.staggerFrom('.char', 0, {display:'none'}, .015);

	}

	spacebarDownHandler(e) {

		const event = e || document.event;

		if (event.keyCode == 32) {
			if (this.state.dialogIndex + 1 >= this.paragraphs.length && !this.state.talked) {
				this.setState({
					talked: true
				});
			} else {
				this.setState({
					dialogIndex: this.state.dialogIndex + 1
				});
			}
		}

	}

	getContent() {

		let splittedDialog = this.paragraphs[this.state.dialogIndex].split('');

		this.content = splittedDialog.map((char,index) => {
			return (
				<span className="char" key={index}>{char}</span>
			)
		});

	}

	render() {

		this.getContent();

		return (
			<div className="mayor">
			  	<Link to="/choice/0">Choice 1</Link>
			  	<Link to="/choice/1">Choice 2</Link>
			  	<div className="mayor__dialog">
			  		<p>{this.content}</p>
			  	</div>
			</div>
		)

	}

}

export default Mayor
