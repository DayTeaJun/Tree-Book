import { useNavigate } from 'react-router-dom';
import { B, ContainerBookImg } from './bookItem.style';
import errorImg from '../../Assets/No-img.svg';
import { BookItemProps } from '../../Types/bookType';
import { Box } from '@mui/material';

const BookItem = ({ item, id, page, search, like, comment }: BookItemProps) => {
	const navigate = useNavigate();
	const isbn = item.isbn;
	const onMoveBookDetail = () => {
		if (like) {
			const likeIsbn =
				like.split(' ')[0] === '' ? like.split(' ')[1] : like.split(' ')[0];
			navigate(`/search/like/${likeIsbn}/1/0`, { state: { isbn } });
		} else {
			navigate(`/search/${search}/${page}/${id}`, { state: { isbn } });
		}
	};

	return (
		<>
			{comment ? (
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						gap: '10px',
						cursor: 'pointer',
						borderRadius: '1em',
						width: '100%',
						padding: '10px',
						backgroundColor: '#eee',
						textAlign: 'center',
						'&:hover': { backgroundColor: '#888888' },
					}}
				>
					<B.H2 style={{ fontSize: '1.2em' }}>{item.title}</B.H2>
					<B.H2
						style={{
							display: 'flex',
							gap: '10px',
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						{comment}
						<B.P>{item.datetime.substr(0, 10).replaceAll('-', '. ')}</B.P>
					</B.H2>
				</Box>
			) : (
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
				</B.Container>
			)}
		</>
	);
};

export default BookItem;
