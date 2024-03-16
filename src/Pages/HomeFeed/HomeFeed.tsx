import { useQuery } from '@tanstack/react-query';
import { BookData } from '../../Types/bookType';
import BookItem from '../../Components/Books/BookItem';
import { S } from './homeFeed.style';
import { BookBest } from '../../Components/Books/BookBest';
import { BookItemSkeleton } from '../../Components/Books/BookItem.skeleton';
import { getLikedBooks } from '../../Api/Firebase/getLikedBooks';

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
			<S.Section>
				<S.ContainerBestBook>
					<S.H2>Best</S.H2>
					<BookBest />
				</S.ContainerBestBook>
				<S.ContainerBook>
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
							{Array.from({ length: 10 }).map((_, index) => (
								<BookItemSkeleton key={index} />
							))}
						</>
					)}
				</S.ContainerBook>
				{likedBooks && likedBooks.length === 0 && <h2>not found</h2>}
			</S.Section>
		</>
	);
}
