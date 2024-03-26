import { useQuery } from '@tanstack/react-query';
import { BookData } from '../../Types/bookType';
import BookItem from '../../Components/Books/BookItem';
import { BookBest } from '../../Components/Books/BookBest';
import { BookItemSkeleton } from '../../Components/Books/BookItem.skeleton';
import { getLikedBooks } from '../../Api/Firebase/getLikedBooks';
import { Box, Typography } from '@mui/material';

export default function HomeFeed() {
	const {
		data: likedBooks,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['homeFeedLikedBooks'],
		queryFn: () => getLikedBooks('home'),
	});

	return (
		<>
			<Box
				component='main'
				sx={{ display: 'flex', width: '100%', padding: '20px 0', gap: '20px' }}
			>
				<Box
					component='section'
					sx={{
						display: 'flex',
						flexDirection: 'column',
						gap: '20px',
						width: '30%',
						height: '100%',
					}}
				>
					<Typography
						component='h2'
						fontSize='2em'
						fontWeight='bold'
						fontFamily='OG_Renaissance_Secret-Rg'
						sx={{
							width: '50%',
							textAlign: 'center',
							margin: '0 auto',
							paddingBottom: '15px',
							borderBottom: 'solid 1px #ccc',
						}}
					>
						Best
					</Typography>
					<BookBest />
				</Box>
				<Box
					component='section'
					sx={{
						display: 'flex',
						width: 'calc(70% + 20px)',
						height: '100%',
						gap: '20px',
						flexWrap: 'wrap',
						borderLeft: '1px solid #ccc',
						paddingLeft: '20px',
					}}
				>
					{likedBooks && (
						<>
							{(likedBooks as BookData[]).map(
								(item: BookData, index: number) => (
									<BookItem item={item} key={index} like={item.isbn}></BookItem>
								)
							)}
						</>
					)}
					{isLoading && (
						<>
							{Array.from({ length: 12 }).map((_, index) => (
								<BookItemSkeleton key={index} />
							))}
						</>
					)}
				</Box>
				{likedBooks && likedBooks.length === 0 && <h2>not found</h2>}
			</Box>
		</>
	);
}
