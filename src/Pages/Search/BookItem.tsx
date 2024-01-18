import { useNavigate } from 'react-router-dom';
import { BookImg } from '../../Components/Books/Books/books.style';
import { ItemProps } from '../../Types/bookData';
import { S } from '../HomeFeed/homFeed.style';
import errorImg from '../../Assets/No-img.svg';

const BookItem = ({ item, id, search }: ItemProps) => {
	const navigate = useNavigate();
	const onMoveBookDetail = () => {
		navigate(`/search/detail/${item.title}`, {
			state: { bookData: item },
		});
	};

	return (
		<S.Container onClick={onMoveBookDetail}>
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
			<S.H2>{item.title}</S.H2>
		</S.Container>
	);
};

export default BookItem;
