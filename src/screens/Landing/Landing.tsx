import React, { Fragment, useEffect, useContext } from 'react';
import Typography from '@material-ui/core/Typography';
import { useStyles } from '../../utils/styles/home';
import Buttons from '../../components/Buttons/Button';
import { observer } from 'mobx-react-lite';
import { MainStore } from '../../mobX/store';

const Landing = observer((props: any) => {
	const classes = useStyles();
	const { history } = props;
	const store = useContext(MainStore);
	const passed = localStorage.getItem('passed');
	const totalQuestions = localStorage.getItem('totalQuestions');

	useEffect(() => {
		if (!passed || !totalQuestions) {
			history.push('/');
		}
    }, [history, passed, totalQuestions]);
    
	const pressStart = async (event: any) => {
		event.preventDefault();
		try {
			await store.fetchWords();
            store.start = true;
			store.speltWord = false;
			store.wrongWord = false;
			history.push('/start');
		} catch (error) {
			store.error = 'Server error or no connection to the server';
		}
	};

	return (
		<Fragment>
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
				<Buttons variant="contained" color="secondary" name="start" pressStart={pressStart} type="start" />
			</div>
		</Fragment>
	);
});

export default Landing;
