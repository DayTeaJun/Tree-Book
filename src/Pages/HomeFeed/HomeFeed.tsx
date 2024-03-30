import { useQuery } from '@tanstack/react-query';
import { BookData } from '../../Types/bookType';
import BookItem from '../../Components/Books/BookItem';
import { getLikedBooks } from '../../Api/Firebase/getLikedBooks';
import { Box } from '@mui/material';
import BestBook from '../../Components/Carousel/BestBook';

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
				sx={{
					display: 'flex',
					flexDirection: 'column',
					width: '100%',
					padding: '20px 0',
					gap: '50px',
				}}
			>
				<Box
					component='section'
					sx={{
						display: 'flex',
						flexDirection: 'column',
						gap: '20px',
						width: '80%',
						height: '100%',
						margin: '0 auto',
					}}
				>
					<BestBook />
				</Box>

				<Box
					component='section'
					sx={{
						display: 'flex',
						width: '100%',
						height: '100%',
						gap: '20px',
						flexWrap: 'wrap',
						paddingTop: '20px',
						justifyContent: 'center',
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
				</Box>
			</Box>
		</>
	);
}
