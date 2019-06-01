const $=function(id) { return document.getElementById(id)}
document.addEventListener('deviceready', () => {
    window.plugins.speechRecognition.hasPermission(() => {
        $('status').innerHTML = '<marquee>Permission Success</marquee>'
        window.plugins.speechRecognition.isRecognitionAvailable(
            () => {
                $('status').innerHTML = '<marquee>Network Success</marquee>'
                document.dispatchEvent(new Event('isVoiceRecognitionReady'))                
            }, () => {
                $('status').innerHTML = '<marquee>Network Failure</marquee>'
            })
        }, () => {
            $('status').innerHTML = '<marquee>Permission Failure</marquee>'
            
        })
        window.plugins.speechRecognition.requestPermission(() => {
            //TODO: must retrigger the deviceready when requestPermission has been accepted  
        })
    })
    
    document.addEventListener('isVoiceRecognitionReady', () => {
        const options = {
            language: 'en-IE',
            matches: 1,
            showPartial: true
        }
        const speechButton = document.getElementById('toSpeechOrNotToSpeech')
        speechButton.addEventListener('touchstart',() => {
        window.plugins.speechRecognition.startListening( (data) => {
            $('status').innerHTML = JSON.stringify(data)
        }, () => {}, options)
    })
    speechButton.addEventListener('touchend', () => {
        window.plugins.speechRecognition.stopListening( () => {}, () => {}) 
    })

    //button needs to trigger this in here
    window.plugins.speechRecognition.start(() => {
       
    })


})