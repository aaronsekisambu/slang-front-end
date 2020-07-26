import React, { Fragment } from 'react';
import IconButton from '@material-ui/core/IconButton';
import PlayCircleFilledWhiteOutlinedIcon from '@material-ui/icons/PlayCircleFilledWhiteOutlined';
import { useStyles } from '../../utils/styles/audio';

const Audio = (props: any) => {
	const { source } = props;
	const classes = useStyles();
	const tts = window.speechSynthesis;
	let voices = [];
	voices = tts.getVoices();

	const replaySound = () => {
		var toSpeak = new SpeechSynthesisUtterance(source);
		voices = tts.getVoices();
		voices.forEach((voice) => {
			if (voice.name === 'Daniel') {
				toSpeak.voice = voice;
			}
		});
		tts.speak(toSpeak);
	};
	return (
		<Fragment>
			{' '}
			<IconButton aria-label="play word" className={classes.margin} size="small" onClick={replaySound}>
				<PlayCircleFilledWhiteOutlinedIcon fontSize="small" />
			</IconButton>
		</Fragment>
	);
};

export default Audio;
