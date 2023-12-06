import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { getBooks } from '../../Api/searchApi';
import { BData } from '../../Types/bookData';
import { HomeFeedSection } from './homFeed.style';

export default function HomeFeed() {
	const { data: books, isLoading } = useQuery({
		queryKey: ['books', '자바스크립트', 6],
		queryFn: () => getBooks('자바스크립트'),
		refetchOnWindowFocus: false,
	});

	return (
		<>
			<h1>Home</h1>
			<p>메인 페이지</p>
			<Link to='/search'>검색 페이지 이동</Link>
			{books && books.length !== 0 ? (
				<HomeFeedSection>
					<div>
						{books.map((el: BData) => (
							<Link to={`./${el.title}`} state={{ bookData: el }} key={el.isbn}>
								<img
									style={{ borderRadius: '5px' }}
									src={el.thumbnail}
									alt={`책 ${el.title}의 이미지`}
								/>
							</Link>
						))}
					</div>
				</HomeFeedSection>
			) : (
				books && books.length === 0 && <h2>not found</h2>
			)}
		</>
	);
}
