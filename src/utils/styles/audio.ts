import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
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
