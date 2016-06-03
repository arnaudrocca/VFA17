class Audio {

    /**
	 * @constructor
	 */
    constructor() {

        const Constructor = window.AudioContext || window.webkitAudioContext
        this.audioContext = new Constructor()
        this.gainNode = this.audioContext.createGain()
        this.filter = this.audioContext.createBiquadFilter();
        this.analyser = this.audioContext.createAnalyser()
        this.frequencyData = new Uint8Array(this.analyser.frequencyBinCount)
        this.volume = 0
        this.volumeMin = .3
        this.volumeMask = .3
        this.enableAudio = true
        this.filterDisableFrequency = 2048
        this.filterEnableFrequency = 512

    }

    /**
	 * @method
	 * @name loadSound
	 * @description Load the sound
     * @param {string} soundPath
	 */
    loadSound(soundPath) {

        this.soundPath = soundPath

        const request = new XMLHttpRequest()
        request.open('GET', this.soundPath, true)
        request.responseType = 'arraybuffer'

        // Decode asynchronously
        request.onload = () => {

            this.audioContext.decodeAudioData(request.response, (buffer) => {

                // SUCCESS CALLBACK

                // Create sound from buffer
                this.audioBuffer = buffer
                this.audioSource = this.audioContext.createBufferSource()
                this.audioSource.buffer = this.audioBuffer

                // Connect the audio source to context's output
                this.audioSource.connect(this.filter)
                this.filter.connect(this.gainNode)
                this.gainNode.connect(this.audioContext.destination)

                // Audio source params
                this.audioSource.crossOrigin = 'anonymous'
                this.audioSource.loop = true

                // Filter params
                this.filter.type = 'lowpass'
                this.filter.frequency.value = this.filterDisableFrequency

                // Play the sound
                this.audioSource.start(this.audioContext.currentTime)

                // Mute the sound
                this.gainNode.gain.value = this.volume

            }, (error) => {

                // ERROR CALLBACK
                console.info(`The following error occured : \n${error}`)

            })

        }

        request.send()

    }

    /**
     * @method
     * @name setVolume
     * @param {number} volume
     */
    setVolume(volume) {

        TweenMax.to(this, 1, {volume: volume})
        TweenMax.to(this.gainNode.gain, 1, {value: volume})

    }

    /**
     * @method
     * @name setFilter
     * @param {boolean} enable
     */
    setFilter(enable) {

        if (enable == true) {
            TweenMax.to(this.filter.frequency, 1, {value: this.filterEnableFrequency})
        } else {
            TweenMax.to(this.filter.frequency, 1, {value: this.filterDisableFrequency})
        }


    }

    /**
	 * @method
	 * @name readSound
	 * @description Read the sound from the microphone
	 */
    readSound() {

        if (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia) {

            navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia

            navigator.getUserMedia({

                'audio': true,
                'video': false

            }, (stream) => {

                // SUCCESS CALLBACK
                this.userMedia = 'success'

                this.audioStream = stream
                this.audioSource = this.audioContext.createMediaStreamSource(this.audioStream)

                this.analyser.fftSize = 4096
                this.audioSource.connect(this.analyser)

            }, (error) => {

                // ERROR CALLBACK
                this.userMedia = 'error'
                console.info(`The following error occured : \n${error}`)

            })

        } else {

            this.userMedia = 'error'
            console.info("getUserMedia not supported.")

        }

    }

    /**
     * @method
     * @name stopAudioStream
     */
    stopAudioStream() {

        const audioStreamTracks = this.audioStream.getAudioTracks()

        for (let audioTrack of audioStreamTracks) {
            audioTrack.stop()
        }

    }

    /**
	 * @method
	 * @name getAverage
     * @description Calculate the average amplitude
	 * @return {number} average
	 */
    getAverage() {

        this.analyser.getByteFrequencyData(this.frequencyData)

        let average = 0
        for (let frequency of this.frequencyData) {
            average += frequency
        }
        average = average / this.frequencyData.length

        return average

    }

}

export default Audio
