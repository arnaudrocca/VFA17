import React from 'react'
import Hotpoint from './Hotpoint'

class Hotpoints extends React.Component {

	constructor() {

		super()

	}

    getContent() {

        const hotpointsPosition = [
            {
                x: 600,
                y: 250
            },
            {
                x: 400,
                y: 400
            },
            {
                x: 300,
                y: 300
            },
            {
                x: 500,
                y: 500
            }
        ]

        this.hotpoints = this.props.hotpoints.map((hotpoint, index) => {
            return (
                <Hotpoint key={index} onClick={this.props.onClick} hotpoint={this.props.hotpoints[index]}
                    x={hotpointsPosition[index].x} y={hotpointsPosition[index].y} />
            )
        })

    }

	render() {

        this.getContent()

		return (
			<g>
                {this.hotpoints}
            </g>
		)

	}

}

export default Hotpoints
