import { useNavigate } from 'react-router-dom';
import { B, BookImg } from './bookItem.style';
import errorImg from '../../Assets/No-img.svg';
import { ItemProps } from '../../Types/bookData';

const BookItem = ({ item, id, search }: ItemProps) => {
	const navigate = useNavigate();
	const isbn = item.isbn;
	const onMoveBookDetail = () => {
		navigate(`/search/${search}/${id}`, { state: { isbn } });
	};

	return (
		<B.Container onClick={onMoveBookDetail}>
			{item.thumbnail ? (
				<BookImg
					style={{ borderRadius: '5px' }}
					src={item.thumbnail}
					alt={`책 ${item.title}의 이미지`}
				/>
			) : (
				<BookImg
					style={{ borderRadius: '5px' }}
					src={errorImg}
					alt={`책 ${item.title}의 이미지`}
				/>
			)}
			<B.H2>{item.title}</B.H2>
			<B.P>
				{item.authors.length > 1 ? item.authors.join(' | ') : item.authors}
			</B.P>
			<B.Price>{item.price.toLocaleString('ko-KR')}원</B.Price>
		</B.Container>
	);
};

export default BookItem;
