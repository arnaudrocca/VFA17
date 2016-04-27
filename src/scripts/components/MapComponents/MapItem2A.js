import React from 'react'

class MapItem3A extends React.Component {

	constructor() {

		super();

	}

	render() {

		return (
			<g id={`mapItem${this.props.id}`}>
				<g>
					<g enable-background="new    ">
						<g>
							<polygon fill="#DCC700" points="590,405.5 515.2,449 439.9,405.5 514.7,362 				"/>
						</g>
						<g>
							<polygon fill="#C5B200" points="590,405.5 589.8,495.2 514.9,538.7 515.2,449 				"/>
						</g>
						<g>
							<polygon fill="#897C00" points="515.2,449 514.9,538.7 439.6,495.2 439.9,405.5 				"/>
						</g>
					</g>
				</g>
				<g>
					<g enable-background="new    ">
						<defs>
							<polygon id="SVGID_13_" enable-background="new    " points="365,538.8 439.8,495.3 515.1,538.8 440.3,582.3 				"/>
						</defs>
						<clipPath id="SVGID_14_">
							<use xlinkHref="#SVGID_13_"  overflow="visible"/>
						</clipPath>
						<g clip-path="url(#SVGID_14_)">
							<polyline fill="#282828" points="515.1,538.8 439.8,495.3 365,538.8 440.3,582.3 515.1,538.8 				"/>
						</g>
					</g>
				</g>
			</g>
		)

	}

}

export default MapItem3A
