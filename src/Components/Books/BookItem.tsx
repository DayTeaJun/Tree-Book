import { useNavigate } from 'react-router-dom';
import { B, ContainerBookImg } from './bookItem.style';
import errorImg from '../../Assets/No-img.svg';
import { BookItemProps } from '../../Types/bookType';

const BookItem = ({ item, id, page, search }: BookItemProps) => {
	const navigate = useNavigate();
	const isbn = item.isbn;
	const onMoveBookDetail = () => {
		navigate(`/search/${search}/${page}/${id}`, { state: { isbn } });
	};

	return (
		<B.Container onClick={onMoveBookDetail}>
			{item.thumbnail ? (
				<ContainerBookImg>
					<img src={item.thumbnail} alt={`책 ${item.title}의 이미지`} />
				</ContainerBookImg>
			) : (
				<ContainerBookImg>
					<img src={errorImg} alt={`책 ${item.title}의 이미지`} />
				</ContainerBookImg>
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
