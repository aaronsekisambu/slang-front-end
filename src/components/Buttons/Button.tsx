import React, { Fragment } from 'react';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { green, blue } from '@material-ui/core/colors';
import { useStyles } from '../../utils/styles/buttons';

const Buttons = (props: any) => {
	const { name, color, variant, submit, pressNext, type, pressStart } = props;
	const classes = useStyles();

	const ColorButton = withStyles((theme) => ({
		root: {
			color: variant === 'outlined' ? theme.palette.getContrastText(blue[50]) : 'white',
			backgroundColor: variant === 'outlined' ? 'none' : blue[700],
			textTransform: 'capitalize',
			fontSize: 20,
			fontWeight: 100,
			'&:hover': {
				backgroundColor: variant === 'outlined' ? green[900] : blue[900],
				border: 'none',
				color: 'white',
			},
		},
	}))(Button);
	return (
		<Fragment>
			<ColorButton
				variant={variant}
				fullWidth
				color={color}
				className={classes.margin}
				onClick={type === 'next' ? pressNext : type === 'start' ? pressStart : submit}
			>
				{name}
			</ColorButton>
		</Fragment>
	);
};

export default Buttons;
