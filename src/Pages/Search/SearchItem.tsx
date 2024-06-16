import { Box, Divider, Typography } from '@mui/material';
import errorImg from '../../Assets/No-img.svg';
import { useMediaQueries } from '../../Hook/useMediaQueries';
import { BookData } from '../../Types/bookType';

interface Props {
	item: BookData;
	index: number;
	onMoveBookDetail: (id: number, isbn: string) => void;
}

function SearchItem({ item, index, onMoveBookDetail }: Props) {
	const { isDownMD } = useMediaQueries();

	return (
		<Box
			component='li'
			sx={{
				width: `${isDownMD ? '100%' : 'calc((100% - 20px) / 2)'}`,
				height: '120px',
				display: 'flex',
				color: 'text.primary',
				fontWeight: 'bold',
				paddingRight: '20px',
				marginBottom: '10px',
			}}
		>
			<Box
				sx={{
					width: '100%',
					height: '100%',
					display: 'flex',
					alignItems: 'center',
					gap: '20px',
					cursor: 'pointer',
				}}
				onClick={() => onMoveBookDetail(index, item.isbn)}
			>
				<Box
					sx={{
						width: '80px',
						borderRadius: '5px',
						overflow: 'hidden',
						flexShrink: 0,
					}}
				>
					{item.thumbnail ? (
						<img src={item.thumbnail} alt={`책 ${item.title}의 이미지`} />
					) : (
						<img src={errorImg} alt={`책 ${item.title}의 이미지`} />
					)}
				</Box>
				<Box
					sx={{
						width: 'calc(90% - 140px)',
						height: '100%',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'space-around',
						gap: '3px',
					}}
				>
					<Typography
						fontSize='1.1em'
						fontWeight={'bold'}
						sx={{
							overflow: 'hidden',
							textOverflow: 'ellipsis',
							whiteSpace: 'nowrap',
							'&:hover': {
								textDecoration: 'underline',
								textDecorationColor: '#ccc',
								textUnderlinePosition: 'under',
							},
						}}
					>
						{item.title}
					</Typography>
					<Typography
						component='p'
						fontSize={'0.9em'}
						fontWeight={'bold'}
						sx={{
							color: 'text.secondary',
							whiteSpace: 'nowrap',
							overflow: 'hidden',
							textOverflow: 'ellipsis',
						}}
					>
						{item.authors.length > 1 ? item.authors.join(' | ') : item.authors}
					</Typography>
					<Divider sx={{ margin: '5px 0' }} />
				</Box>
			</Box>
		</Box>
	);
}

export default SearchItem;
