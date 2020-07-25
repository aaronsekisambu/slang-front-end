import React, { Fragment } from 'react';
import { Button } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { green, blue } from '@material-ui/core/colors';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			margin: theme.spacing(1, 0),
			width: '100%',
		},
	},
}));

const Input = (props: any) => {
	const { name, spelt, spelling } = props;
    const classes = useStyles();

	return (
		<Fragment>
			<form className={classes.root} noValidate autoComplete="off">
                <TextField id="outlined-basic" size='medium' label="Spell it here" variant="outlined" onChange={spelling}/>
		</form>
		</Fragment>
	);
};

export default Input;

