import React, { Fragment, useState, useContext, useEffect } from 'react';
import { observer, observerBatching } from 'mobx-react-lite';
import Buttons from '../../components/Buttons/Button';
import Input from '../../components/Inputs/Inputs';
import Typography from '@material-ui/core/Typography';
import Audio from '../../components/Player/Audio';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import QuestionAnswerSharpIcon from '@material-ui/icons/QuestionAnswerSharp';
import PlayCircleFilledWhiteOutlinedIcon from '@material-ui/icons/PlayCircleFilledWhiteOutlined';
import { css } from '@emotion/core';
import BarLoader from 'react-spinners/BarLoader';
import { MainStore } from '../../mobX/store';
import { useStyles } from '../../utils/styles/home';
observerBatching();

const Home = observer((props: any) => {
	const { history } = props;
	const [spelt, setSpelt] = useState('');
	const [answer, setAnswer] = useState('');
	const [passed, setPassed] = useState(0);
	const classes = useStyles();

	const store = useContext(MainStore);

	const questionCount = store.number === 0 ? 1 : store.number;

	useEffect(() => {
		if (!store.start) {
			history.push('/');
		}
	}, [history, store.start]);
	const spelling = (event: any) => {
		setSpelt(event.target.value);
		setAnswer(event.target.value);
	};

	const submit = () => {
		if (spelt.toLowerCase() === store.words.originalWord.toLowerCase()) {
			store.speltWord = true;
			store.wrongWord = false;
			store.error = '';
			return setSpelt('');
		}
		store.speltWord = false;
		store.error = '';
		setSpelt('');
		return (store.wrongWord = true);
	};
	const pressNext = async (event: any) => {
		event.preventDefault();
		try {
			if (store.speltWord) {
				setPassed(passed + 1);
			}
			console.log(passed);
			const lastIndexedWord = store.words.totalQuestions - 1;
			if (store.number === lastIndexedWord) {
				localStorage.setItem('passed', `${passed}`);
				localStorage.setItem('totalQuestions', `${store.words.totalQuestions}`);
				return history.push('/result');
			}
			if (store.number < store.words.totalQuestions) {
				store.number++;
				await store.fetchWords();
				store.wrongWord = false;
				return store.speltWord = false;
			}
		} catch (error) {
			return (store.error = 'Server error or no connection to the server');
		}
	};

	const override = css`
		display: block;
		margin: 0 auto;
		border-color: red;
	`;
	console.log(passed);
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
									{store.speltWord || store.wrongWord ? (
										''
									) : (
										<Audio source={store.words.originalWord} />
									)}
								</Grid>
							</Grid>
							<Grid item>
								{store.speltWord || store.wrongWord ? '' : <Input spelling={spelling} spelt={spelt} />}
							</Grid>
							{store.speltWord ? (
								<Typography component="h5" className={classes.text}>
									<span role="img" aria-label="tick">
										✅
									</span>{' '}
									<strong>Congratulations</strong>, You have successful spelt the word{' '}
									<strong>{store.words.originalWord}</strong> correctly.
								</Typography>
							) : store.wrongWord ? (
								<Typography component="h5" className={classes.text}>
									<span role="img" aria-label="sad">
										😐
									</span>{' '}
									oops, The correct spelling of <strong>{store.words.shuffledWord}</strong> is{' '}
									<strong>{store.words.originalWord}</strong>
									<Typography>
										You wrote: <strong>{answer}</strong>
									</Typography>
								</Typography>
							) : (
								''
							)}
							{spelt ? <Buttons variant="outlined" name="send" type="submit" submit={submit} /> : ''}
							<Grid item xs>
								{store.speltWord || store.wrongWord ? (
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
								<Typography component="div"> {store.error}</Typography>
							</Box>
						</div>
					) : (
						<div className={classes.paper}>
							<BarLoader css={override} color={'#123abc'} loading={true} />
						</div>
					)}
				</div>
			</Container>
		</Fragment>
	);
});

export default Home;
