import React, { Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import { useStyles } from '../../utils/styles/landing';

const Notfound = (props: any) => {
	const { history } = props;
	const classes = useStyles();
	const goBack = () => {
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
						<strong>404</strong>
					</Typography>
					<Typography component="h4" className={classes.text}>
						Page not found
					</Typography>
					<Button onClick={goBack} className={classes.textSmall}>
						Go Back Home
					</Button>
				</div>
			</Container>
		</Fragment>
	);
};

export default Notfound;
