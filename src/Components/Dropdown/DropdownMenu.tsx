import { Dispatch, SetStateAction, useState } from 'react';
import SortIcon from '@mui/icons-material/Sort';
import { Box, Typography } from '@mui/material';

export const DropdownMenu = ({
	isDropdown,
	setIsDropdown,
	setSorted,
}: {
	isDropdown: boolean;
	setIsDropdown: Dispatch<SetStateAction<boolean>>;
	setSorted: Dispatch<SetStateAction<string>>;
}) => {
	const handleSort = (sort: string) => {
		if (sort === 'latest') {
			setSorted('latest');
		} else if (sort === 'popular') {
			setSorted('popular');
		} else if (sort === 'rating') {
			setSorted('rating');
		}
		setIsDropdown(false);
	};

	return (
		<>
			<Box
				sx={{
					position: 'relative',
				}}
			>
				<Box
					component='button'
					type='button'
					onClick={() =>
						isDropdown ? setIsDropdown(false) : setIsDropdown(true)
					}
					sx={{
						background: 'inherit',
						border: 'none',
						color: 'text.secondary',
						display: 'flex',
						alignItems: 'center',
						gap: '5px',
						cursor: 'pointer',
					}}
				>
					<SortIcon />
					<Typography component='p' fontSize='1.1em' fontWeight='bold'>
						정렬 기준
					</Typography>
				</Box>
				{isDropdown && (
					<Box
						sx={{
							width: '95px',
							display: 'flex',
							flexDirection: 'column',
							zIndex: 999,
							position: 'absolute',
							top: '30px',
							borderRadius: '5px',
							overflow: 'hidden',
						}}
					>
						<Box
							component='button'
							sx={{
								border: 'none',
								backgroundColor: 'background.book',
								padding: '10px',
								color: 'inherit',
								cursor: 'pointer',
								'&:hover': {
									backgroundColor: 'background.hover',
								},
							}}
							type='button'
							onClick={() => handleSort('latest')}
						>
							<Typography component='p' fontSize='1em' fontWeight='bold'>
								최신순
							</Typography>
						</Box>
						<Box
							component='button'
							sx={{
								border: 'none',
								backgroundColor: 'background.book',
								padding: '10px',
								color: 'inherit',
								cursor: 'pointer',
								'&:hover': {
									backgroundColor: 'background.hover',
								},
							}}
							onClick={() => handleSort('popular')}
						>
							<Typography component='p' fontSize='1em' fontWeight='bold'>
								인기 리뷰순
							</Typography>
						</Box>
						<Box
							component='button'
							sx={{
								border: 'none',
								backgroundColor: 'background.book',
								padding: '10px',
								color: 'inherit',
								cursor: 'pointer',
								'&:hover': {
									backgroundColor: 'background.hover',
								},
							}}
							onClick={() => handleSort('rating')}
						>
							<Typography component='p' fontSize='1em' fontWeight='bold'>
								별점 높은순
							</Typography>
						</Box>
					</Box>
				)}
			</Box>
		</>
	);
};
