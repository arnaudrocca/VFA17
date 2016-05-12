import React from 'react'
import { Link } from 'react-router'

const Video = () => (

	<div className="video">
		<h1>Video</h1>
		<Link className="link" to="/experiment">Passer la vidéo</Link>
		<video className="video__video" src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4" autoPlay loop></video>
	</div>

)

export default Video
