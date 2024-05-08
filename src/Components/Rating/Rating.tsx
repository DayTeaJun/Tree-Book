import { Box, Rating, Typography } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

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
				onChange={(event, newValue = 0) => {
					setRatingValue(newValue);
				}}
			/>
		</Box>
	);
};

export const StarRating = ({ rating }: { rating: number }) => {
	return (
		<Box sx={{ display: 'flex' }}>
			{Array.from({ length: rating }).map((_, index) => (
				<StarIcon key={index} fontSize='small' />
			))}
			{Array.from({
				length: 5 - (rating ?? 0),
			}).map((_, index) => (
				<StarOutlineIcon key={index} fontSize='small' />
			))}
		</Box>
	);
};
