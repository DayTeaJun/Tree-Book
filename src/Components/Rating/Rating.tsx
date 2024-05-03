import { Box, Rating, Typography } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

export const Raiting = ({
	ratingValue,
	setRatingValue,
}: {
	ratingValue: number | null;
	setRatingValue: Dispatch<SetStateAction<number | null>>;
}) => {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				gap: '5px',
			}}
		>
			<Typography component='p' fontSize='1.1em' fontWeight='bold'>
				내가 남긴 별점{' '}
				<Typography component='span' fontSize='1.5em' fontWeight='bold'>
					{`${ratingValue ?? 0}`}.0
				</Typography>
			</Typography>
			<Rating
				size='large'
				name='book-rating'
				value={ratingValue}
				onChange={(event, newValue) => {
					setRatingValue(newValue);
				}}
			/>
		</Box>
	);
};
