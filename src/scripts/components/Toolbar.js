import React from 'react'
import ReactDOM from 'react-dom'
import IconAudio from './iconsComponents/icon-audio'
import IconScreen from './iconsComponents/icon-screen'

class Toolbar extends React.Component {

    /**
     * @constructor
     */
    constructor() {

        super()

        this.fullScreenToggled = false
        this.audioEnable = true

        this.aboutTimeline = new TimelineLite()

        this.spacebarDownHandler = this.spacebarDownHandler.bind(this)

    }

    /**
     * @method
     * @name componentDidMount
     */
    componentDidMount() {

        this.audioButton = ReactDOM.findDOMNode(this.refs.audioButton)
        this.aboutNode = document.querySelector('.about')
        this.aboutContainerNode = document.querySelector('.about__container')

        window.addEventListener('keydown', this.spacebarDownHandler)

    }

    /**
     * @method
     * @name componentWillUnmount
     */
    componentWillUnmount() {

        window.removeEventListener('keydown', this.spacebarDownHandler)

    }

    /**
     * @method
     * @name spacebarDownHandler
     * @param {object} e - event
     */
    spacebarDownHandler(e) {

        const event = e || window.e
        const key = event.keyCode || event.which

        if (key == 32) {
            event.stopPropagation()
            event.preventDefault()
            return false
        }

    }

    /**
     * @method
     * @name mouseEnterHandler
     */
    mouseEnterHandler() {

        if (this.audioEnable) {
            this.audioButton.currentTime = 0
            this.audioButton.play()
        }

    }

    /**
     * @method
     * @name toggleAbout
     */
    toggleAbout() {

        window.cityAudio.setFilter(true)

        
        this.aboutTimeline
            .to(this.aboutNode, .3, {opacity: 1, display: 'flex'})
            .fromTo(this.aboutContainerNode, .3, {scale: 1.1}, {scale: 1}, '-=.3')

        const videoPlayer = document.querySelector('.home__video--main')
        if (videoPlayer) {
            videoPlayer.pause()
        }

    }

    /**
     * @method
     * @name toggleAudio
     */
    toggleAudio() {

        if (this.audioEnable) {
            this.audioEnable = false
            window.cityAudio.setVolume(0)
            TweenMax.staggerTo('.iconAudio-wave', .3, {opacity: .1, fill: 'black'}, .15)
        } else {
            this.audioEnable = true
            window.cityAudio.setVolume(1)
            TweenMax.staggerTo('.iconAudio-wave', .3, {opacity: 1, fill: 'white'}, -.15)
        }

    }

    /**
     * @method
     * @name toggleFullScreen
     */
    toggleFullScreen() {

        if (!this.fullScreenToggled) {
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen()
            }
            else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
            }
            else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen()
            }
            this.fullScreenToggled = true
        } else {
            if (document.cancelFullScreen) {
                document.cancelFullScreen()
            }
            else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen()
            }
            else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen()
            }
            this.fullScreenToggled = false
        }

    }

    /**
     * @method
     * @name render
     */
    render() {

        return (
            <div className="toolbar">
                <button className="toolbar__btn" onClick={this.toggleAbout.bind(this)} onMouseEnter={this.mouseEnterHandler.bind(this)}>
                    <span>Infos</span>
                </button>
                <button className="toolbar__btn" onClick={this.toggleAudio.bind(this)} onMouseEnter={this.mouseEnterHandler.bind(this)}>
                    <span><IconAudio width="18" color="#FFF"/></span>
                </button>
                <button className="toolbar__btn" onClick={this.toggleFullScreen.bind(this)} onMouseEnter={this.mouseEnterHandler.bind(this)}>
                    <span><IconScreen width="22" color="#FFF"/></span>
                </button>
                <audio ref="audioButton" src="assets/audio/button.mp3" preload="auto"></audio>
            </div>
        )

    }

}

export default Toolbar
