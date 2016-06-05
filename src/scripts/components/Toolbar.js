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

        this.openAboutTimeline = new TimelineLite()

        this.keyDownHandler = this.keyDownHandler.bind(this)
        this.fullScreenHandler = this.fullScreenHandler.bind(this)

    }

    /**
     * @method
     * @name componentDidMount
     */
    componentDidMount() {

        this.audioButton = ReactDOM.findDOMNode(this.refs.audioButton)
        this.aboutNode = document.querySelector('.about')
        this.aboutContainerNode = document.querySelector('.about__container')
        this.homeVideoMain = document.querySelector('.home__video--main')

        window.addEventListener('keydown', this.keyDownHandler)
        window.addEventListener('fullscreenchange', this.fullScreenHandler)
        window.addEventListener('webkitfullscreenchange', this.fullScreenHandler)
        window.addEventListener('mozfullscreenchange', this.fullScreenHandler)
        window.addEventListener('MSFullscreenChange', this.fullScreenHandler)

    }

    /**
     * @method
     * @name componentWillUnmount
     */
    componentWillUnmount() {

        window.removeEventListener('keydown', this.keyDownHandler)
        window.removeEventListener('fullscreenchange', this.fullScreenHandler)
        window.removeEventListener('webkitfullscreenchange', this.fullScreenHandler)
        window.removeEventListener('mozfullscreenchange', this.fullScreenHandler)
        window.removeEventListener('MSFullscreenChange', this.fullScreenHandler)

    }

    /**
     * @method
     * @name openAbout
     * @description Open the about pop-in
     */
    openAbout() {

        window.cityAudio.setFilter(true)

        this.openAboutTimeline
            .to(this.aboutNode, .3, {opacity: 1, display: 'flex'})
            .fromTo(this.aboutContainerNode, .3, {scale: 1.1}, {scale: 1}, '-=.3')

        if (this.homeVideoMain) {
            this.homeVideoMain.pause()
        }

    }

    /**
     * @method
     * @name toggleAudio
     * @description Enable/Disable all the sounds
     */
    toggleAudio() {

        if (window.enableAudio) {
            window.enableAudio = false
            window.cityAudio.volumeMask = window.cityAudio.volume
            window.cityAudio.setVolume(0)
            if (this.homeVideoMain) {
                this.homeVideoMain.muted = true
            }
            TweenMax.staggerTo('.iconAudio-wave', .3, {opacity: .15, fill: 'black'}, .15)
        } else {
            window.enableAudio = true
            window.cityAudio.setVolume(window.cityAudio.volumeMask)
            if (this.homeVideoMain) {
                this.homeVideoMain.muted = false
            }
            TweenMax.staggerTo('.iconAudio-wave', .3, {opacity: 1, fill: 'white'}, -.15)
        }

    }

    /**
     * @method
     * @name toggleFullScreen
     * @description Toggle the fullscreen
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
            TweenMax.to('.icon-screen-path', 1, {scale: -1, transformOrigin: '50% 50%'})
            this.fullScreenToggled = true
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen()
            }
            else if (document.cancelFullScreen) {
                document.cancelFullScreen()
            }
            else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen()
            }
            else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen()
            }
            TweenMax.to('.icon-screen-path', 1, {scale: 1, transformOrigin: '50% 50%'})
            this.fullScreenToggled = false
        }

    }

    /**
     * @method
     * @name fullScreenHandler
     * @description Triggered when the fullscreen value change
     */
    fullScreenHandler() {

        const isFullscreen = document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement

        if (!isFullscreen) {
            TweenMax.to('.icon-screen-path', 1, {scale: 1, transformOrigin: '50% 50%'})
            this.fullScreenToggled = false
        }

    }

    /**
     * @method
     * @name mouseEnterHandler
     * @description Play button sound
     */
    mouseEnterHandler() {

        if (window.enableAudio) {
            this.audioButton.currentTime = 0
            this.audioButton.play()
        }

    }

    /**
     * @method
     * @name keyDownHandler
     * @description Prevent spacebar actions
     * @param {object} e - event
     */
    keyDownHandler(e) {

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
     * @name render
     */
    render() {

        return (
            <div className="toolbar">
                <button className="toolbar__btn" onClick={this.openAbout.bind(this)} onMouseEnter={this.mouseEnterHandler.bind(this)}>
                    <span>Infos</span>
                </button>
                <button className="toolbar__btn" onClick={this.toggleAudio.bind(this)} onMouseEnter={this.mouseEnterHandler.bind(this)}>
                    <span><IconAudio width="18" color="#FFF" /></span>
                </button>
                <button className="toolbar__btn" onClick={this.toggleFullScreen.bind(this)} onMouseEnter={this.mouseEnterHandler.bind(this)}>
                    <span><IconScreen width="22" color="#FFF" /></span>
                </button>
                <audio ref="audioButton" src="assets/audio/button.wav" preload="auto"></audio>
            </div>
        )

    }

}

export default Toolbar
