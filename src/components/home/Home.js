import React from 'react';
// import { Link as RouterLink } from 'react-router-dom';
import {
	Button,
	Container,
	makeStyles,
	Typography,
} from '@material-ui/core';
import { yellow } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
	main: {
		height: '100vh',
		textAlign: 'center',
		paddingTop: theme.spacing(20),
	},
	title: {
		fontFamily: 'Share Tech Mono',
		fontSize: '7.8rem',
		color: yellow['A200'],
	},
	startButton: {
		marginTop: theme.spacing(10),
		color: yellow['A100'],
	},
	shareTechMonoFont: { fontFamily: 'Share Tech Mono' },
}));

const Home = () => {
	const classes = useStyles();

	return (
		<Container maxWidth="md">
			<div className={classes.main}>
				<Typography variant="h1" className={classes.title} gutterBottom>
					Chat Stories
				</Typography>
				<Button
					className={classes.startButton}
					size="large"
					classes={{ label: classes.shareTechMonoFont }}
					// component={RouterLink}s
					// to="/blog"
					href="/blog"
				>
					Blog
				</Button>
			</div>
		</Container>
	);
};

export default Home;
