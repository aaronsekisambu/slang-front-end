import React, { Fragment, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Button } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { PlayArrow } from '@material-ui/icons';
import PlayCircleFilledWhiteOutlinedIcon from '@material-ui/icons/PlayCircleFilledWhiteOutlined';

const useStyles = makeStyles((theme) => ({
	margin: {
		margin: theme.spacing(3, 0),
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
}));

const Audio = (props: any) => {
	const { source } = props;
	const classes = useStyles();
	const [word, setWord] = useState('');
	const tts = window.speechSynthesis;
	let voices = [];
	voices = tts.getVoices();

	useEffect(() => {
		const fetchVoices = () => {
			voices = tts.getVoices();
		};
		fetchVoices();
		// return () => {
		//     cleanup
		// }
	}, []);

	const handleChange = (event: any) => {
		setWord(event.target.value);
	};

	const replaySound = (event: any) => {
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
