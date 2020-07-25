import React, { Fragment, useEffect } from 'react';

import Buttons from '../../components/Buttons/Button';
import Input from '../../components/Inputs/Inputs';
import Typography from '@material-ui/core/Typography';
import Audio from '../../components/Player/Audio';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import QuestionAnswerSharpIcon from '@material-ui/icons/QuestionAnswerSharp';
import PlayCircleFilledWhiteOutlinedIcon from '@material-ui/icons/PlayCircleFilledWhiteOutlined';
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import { green, blue } from '@material-ui/core/colors';
import { calculatePercentage } from '../../Helpers/helper';

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
		color: blue[900],
		borderRadius: '3px',
		width: '100px',
		padding: theme.spacing(0.2, 0.3),
	},
	text: {
		padding: '1rem 1.2rem 0',
		fontSize: '12px',
	},
	textSmall: {
		padding: '.3rem 1.2rem',
		fontSize: '13px',
		color: blue[900],
		margin: '1rem',
	},
	content: {
		justifyContent: 'center',
	},
}));

const Landing = (props: any) => {
	const classes = useStyles();
	const { history } = props;
	const passed = localStorage.getItem('passed');
	const totalQuestions = localStorage.getItem('totalQuestions');

	useEffect(() => {
		if (!passed || !totalQuestions) {
			history.push('/');
		}
		// return () => {
		//     cleanup
		// };
	}, []);
	const reWrite = () => {
		localStorage.clear();
		history.push('/');
	};

	return (
		<Fragment>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<CheckCircleOutlineOutlinedIcon />
					</Avatar>
					<Typography component="h4" className={classes.text}>
						Scored : <strong>{calculatePercentage(totalQuestions, passed)}</strong>
					</Typography>
					<Button onClick={reWrite} className={classes.textSmall}>
						Start again
					</Button>
				</div>
			</Container>
		</Fragment>
	);
};

export default Landing;
