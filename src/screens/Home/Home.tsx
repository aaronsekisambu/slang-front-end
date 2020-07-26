import React, { Fragment, useState, useContext } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import Buttons from '../../components/Buttons/Button';
import Input from '../../components/Inputs/Inputs';
import Typography from '@material-ui/core/Typography';
import Audio from '../../components/Player/Audio';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import QuestionAnswerSharpIcon from '@material-ui/icons/QuestionAnswerSharp';
import PlayCircleFilledWhiteOutlinedIcon from '@material-ui/icons/PlayCircleFilledWhiteOutlined';
import { green, blue, grey, red } from '@material-ui/core/colors';
import { MainStore } from '../../mobX/store';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.primary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 1),
		textAlign: 'center',
		border: `.5px solid #ededed`,
		color: red[900],
		borderRadius: '3px',
		width: '100px',
		padding: theme.spacing(0.2, 0.3),
	},
	text: {
		padding: '.4rem 1.2rem 0',
		fontSize: '13px',
	},
	textIntroduction: {
		padding: '.4rem 1.2rem 0',
		fontSize: '18px',
		color: grey[900],
	},
	textSmall: {
		padding: '.3rem 1.2rem',
		fontSize: '14px',
		color: blue[900],
	},
	textIntro: {
		padding: '.3rem 1.2rem',
		fontSize: '15px',
		color: blue[700],
	},
	content: {
		justifyContent: 'center',
	},
}));

const Home = observer((props: any) => {
	const { history } = props;
	const [spelt, setSpelt] = useState('');
	const [correctWord, setCorrectWord] = useState('');
	const [totalQuestions, setTotalQuestions] = useState(0);
	const [remainingQuestions, setRemainingQuestions] = useState(0);
	const [answer, setAnswer] = useState('');
	const [shuffled, setShuffled] = useState('');
	const [number, setNumber] = useState(0);
	const [speltWord, setSpeltWord] = useState(false);
	const [wrongWord, setWrongWord] = useState(false);
	const [error, setError] = useState('');
	const [passed, setPassed] = useState(0);
	const classes = useStyles();

	const store = useContext(MainStore);

	const questionCount = store.number === 0 ? 1 : store.number;

	const spelling = (event: any) => {
		setSpelt(event.target.value);
		setAnswer(event.target.value);
	};
	const submit = () => {
		if (spelt.toLowerCase() === correctWord.toLowerCase()) {
			setWrongWord(false);
			setError('');
			setSpelt('');
			return setSpeltWord(true);
		}
		setSpeltWord(false);
		setSpelt('');
		setError('');
		return setWrongWord(true);
	};
	const pressNext = async (event: any, number: number) => {
		event.preventDefault();
		try {
			if (speltWord) {
				setPassed(passed + 1);
			}
			if (questionCount === totalQuestions) {
				localStorage.setItem('passed', `${passed}`);
				localStorage.setItem('totalQuestions', `${store.words.totalQuestions}`);
				history.push('/result');
			}
			if (store.number < store.words.totalQuestions) {
				store.number++;
				await store.fetchWords();
				setWrongWord(false);
				setSpeltWord(false);
			}
		} catch (error) {
			setError('Server error or no connection to the server');
		}
	};

	const pressStart = async (event: any,) => {
		event.preventDefault();
		try {
			await store.fetchWords();
			setWrongWord(false);
			setSpeltWord(false);
			store.number++;
		} catch (error) {
			setError('Server error or no connection to the server');
		}
	};

	return (
		<Fragment>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<div className={classes.paper}>
					{store.words.shuffledWord ? (
						<div className={classes.paper}>
							<Avatar className={classes.avatar}>
								<QuestionAnswerSharpIcon />
							</Avatar>

							<Typography component="h5">
								{' '}
								{`Question: ${questionCount}/${store.words.totalQuestions}`}
							</Typography>
							<Typography component="h4" className={classes.text}>
								Re-arrange the scramble or shuffled word below. In a meaningful and correct word.
							</Typography>
							<Typography component="h4" className={classes.textSmall}>
								<strong>
									Click on the play icon next to the word in the box below to hear the word.
									<PlayCircleFilledWhiteOutlinedIcon fontSize="inherit" />
								</strong>
							</Typography>
							<Grid container className={classes.content}>
								<Grid item>
									<Typography className={classes.submit}>
										<strong>{store.words.shuffledWord}</strong>
									</Typography>
								</Grid>
								<Grid item>
									{speltWord || wrongWord ? '' : <Audio source={store.words.originalWord} />}
								</Grid>
							</Grid>
							<Grid item>
								{speltWord || wrongWord ? '' : <Input spelling={spelling} spelt={spelt} />}
							</Grid>
							{speltWord ? (
								<Typography component="h5" className={classes.text}>
									✅ <strong>Congratulations</strong>, You have successful spelt the word{' '}
									<strong>{correctWord}</strong> correctly.
								</Typography>
							) : wrongWord ? (
								<Typography component="h5" className={classes.text}>
									😐oops, The correct spelling of <strong>{shuffled}</strong> is{' '}
									<strong>{correctWord}</strong>
									<Typography>
										You wrote: <strong>{answer}</strong>
									</Typography>
								</Typography>
							) : (
								''
							)}
							{spelt && (!speltWord || !wrongWord) ? (
								<Buttons variant="outlined" name="send" type="submit" submit={submit} />
							) : (
								''
							)}
							<Grid item xs>
								{speltWord || wrongWord ? (
									<Buttons
										variant="contained"
										color="primary"
										name="next"
										pressNext={pressNext}
										type="next"
									/>
								) : (
									''
								)}
							</Grid>
							<Box mt={8}>
								<Typography component="div"> {error}</Typography>
							</Box>
						</div>
					) : (
						<div className={classes.paper}>
							<Typography component="h1" variant="h4">
								Welcome
							</Typography>
							<Typography component="h3" variant="h4" className={classes.textIntroduction}>
								Welcome to the spelling exercise
							</Typography>
							<Typography component="h3" variant="h3" className={classes.textIntro}>
								<strong>Click on the button start</strong>
							</Typography>
							<Buttons
								variant="contained"
								color="secondary"
								name="start"
								pressStart={pressStart}
								type="start"
							/>
						</div>
					)}
				</div>
			</Container>
		</Fragment>
	);
});

export default Home;
