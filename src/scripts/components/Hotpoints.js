import React from 'react'
import Hotpoint from './Hotpoint'

class Hotpoints extends React.Component {

	constructor() {

		super()

	}

    getContent() {

        this.hotpoints = this.props.hotpoints.map((hotpoint, index) => {
            return (
                <Hotpoint key={index} onClick={this.props.onClick} hotpoint={this.props.hotpoints[index]} />
            )
        })

    }

	render() {

        this.getContent()

		return (
			<div className="hotpoints">
                {this.hotpoints}
            </div>
		)

	}

}

export default Hotpoints
