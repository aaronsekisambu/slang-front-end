import { blue } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';


export const useStyles = makeStyles((theme) => ({
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