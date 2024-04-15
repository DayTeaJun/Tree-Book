import { Box, Typography } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

export const Footer = () => {
	return (
		<Box
			component='footer'
			sx={{
				width: '100%',
				bottom: '0',
			}}
		>
			<Box
				component='nav'
				sx={{
					padding: '10px 0',
					textAlign: 'center',
				}}
			>
				<Box
					component='a'
					fontWeight='bold'
					color='text.primary'
					sx={{
						cursor: 'pointer',
					}}
					onClick={() => {
						window.open('https://github.com/DayTeaJun');
					}}
				>
					<GitHubIcon fontSize='large' />
				</Box>
				<Typography
					component='p'
					fontSize='0.9em'
					sx={{ display: 'flex', gap: '10px', justifyContent: 'center' }}
				>
					ⓒ DayTeaJun.
					<br /> All Rights Reserved.
				</Typography>
			</Box>
		</Box>
	);
};
