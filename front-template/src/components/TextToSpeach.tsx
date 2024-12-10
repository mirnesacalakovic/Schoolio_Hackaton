import { useState } from 'react';
import * as SpeechSDK from 'microsoft-cognitiveservices-speech-sdk';

const TextToSpeech = () => {
    const [text, setText] = useState('');

    const handleSynthesize = () => {
        const subscriptionKey = 'apikey';
        const region = 'region';
        const speechConfig = SpeechSDK.SpeechConfig.fromSubscription(subscriptionKey, region);

        // Postavljanje jezika i glasa na srpski
        speechConfig.speechSynthesisLanguage = 'hr-HS';
        speechConfig.speechSynthesisVoiceName = 'hr-HR-GabrijelaNeural'; // Primer glasa za srpski jezik
        // config.speechSynthesisVoiceName = "sr-RS-SophiaNeural";
        const audioConfig = SpeechSDK.AudioConfig.fromDefaultSpeakerOutput();
        const synthesizer = new SpeechSDK.SpeechSynthesizer(speechConfig, audioConfig);

        synthesizer.speakTextAsync(
            text,
            result => {
                if (result.reason === SpeechSDK.ResultReason.SynthesizingAudioCompleted) {
                    console.log('Sinteza je uspešno završena.');
                } else {
                    console.error('Greška u sintezi:', result.errorDetails);
                }
                synthesizer.close();
            },
            error => {
                console.error('Greška:', error);
                synthesizer.close();
            }
        );
    };

    return (
        <div className="p-8 bg-white border-4 border-black shadow-neobrutalism">
            <h1 className="mb-4 text-3xl font-bold text-black">Text to Speech!</h1>
            <h3 className="mb-4 text-3lg font-bold text-black">Paste in what you want to learn and hear it read back to you</h3>
            <textarea
                rows={4}
                cols={50}
                placeholder="Place text you would like to hear..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full p-4 mb-4 text-black bg-yellow-200 border-4 border-black shadow-neobrutalism focus:outline-none"
            ></textarea>
            <button
                onClick={handleSynthesize}
                className="px-6 py-3 font-bold text-white bg-black border-4 border-black shadow-neobrutalism hover:bg-gray-800 active:translate-y-1"
            >
                Convert
            </button>
        </div>

    );
};

export default TextToSpeech;
