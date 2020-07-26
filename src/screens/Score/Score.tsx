import React, { Fragment, useEffect, useContext } from 'react';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import { calculatePercentage } from '../../Helpers/helper';
import { useStyles } from '../../utils/styles/landing';
import { observer} from 'mobx-react-lite';
import { MainStore } from '../../mobX/store';

const Score = observer((props: any) => {
	const classes = useStyles();
	const { history } = props;
	const passed = localStorage.getItem('passed');
	const totalQuestions = localStorage.getItem('totalQuestions');
	const store = useContext(MainStore);

	useEffect(() => {
		if (!passed || !totalQuestions) {
			history.push('/');
		}
	}, [history, passed, totalQuestions]);
	const reWrite = () => {
		localStorage.clear();
		history.push('/');
		store.start = false;
		store.number = 0;
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
});

export default Score;
