import React, { Fragment } from 'react';
import TextField from '@material-ui/core/TextField';
import { useStyles } from '../../utils/styles/inputs';

const Input = (props: any) => {
	const { spelling } = props;
	const classes = useStyles();

	return (
		<Fragment>
			<form className={classes.root} noValidate autoComplete="off">
				<TextField
					id="outlined-basic"
					size="medium"
					label="Spell it here"
					variant="outlined"
					onChange={spelling}
				/>
			</form>
		</Fragment>
	);
};

export default Input;
