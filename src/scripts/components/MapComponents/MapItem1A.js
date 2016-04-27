import React from 'react'

class MapItem2A extends React.Component {

	constructor() {

		super();

	}

	render() {

		return (
			<g id={`mapItem${this.props.id}`}>
				<g>
					<g enable-background="new    ">
						<g>
							<polygon fill="#C34747" points="484.1,331.3 409.2,374.8 333.9,331.3 408.8,287.8 				"/>
						</g>
						<g>
							<polygon fill="#AE3F3F" points="484.1,331.3 483.8,421 409,464.5 409.2,374.8 				"/>
						</g>
						<g>
							<polygon fill="#792C2C" points="409.2,374.8 409,464.5 333.7,421 333.9,331.3 				"/>
						</g>
					</g>
				</g>
				<g>
					<g enable-background="new    ">
						<defs>
							<polygon id="SVGID_11_" enable-background="new    " points="258.8,464.4 333.7,420.9 409,464.4 334.1,507.9 				"/>
						</defs>
						<clipPath id="SVGID_12_">
							<use xlinkHref="#SVGID_11_"  overflow="visible"/>
						</clipPath>
						<g clip-path="url(#SVGID_12_)">
							<polyline fill="#282828" points="409,464.4 333.7,420.9 258.8,464.4 334.1,507.9 409,464.4 				"/>
						</g>
					</g>
				</g>
			</g>
		)

	}

}

export default MapItem2A
