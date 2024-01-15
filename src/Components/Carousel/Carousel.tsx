import errorImg from '../../Assets/No-img.svg';
import { StyledSlider } from './carousel.style';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { BData } from '../../Types/bookData';
import { Link } from 'react-router-dom';

type BookProps = {
	bookData: BData[];
};

const CarouselSlick = ({ bookData }: BookProps) => {
	const sliderSettings = {
		dots: true,
		infinite: true,
		speed: 500,
		autoplaySpeed: 4000,
		autoplay: true,
		slidesToshow: 4,
		slidesToScroll: 1,
		centerMode: true,
		centerPadding: '0px',
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
					infinite: true,
					dots: true,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					initialSlide: 1,
				},
			},
		],
	};
	const onErrorImg = (e: React.SyntheticEvent<HTMLImageElement>) => {
		const target = e.target as HTMLImageElement;
		target.src = errorImg;
	};

	return (
		<>
			<StyledSlider {...sliderSettings}>
				{bookData.map((el: BData) => (
					<Link
						to={`/search/detail/${el.title}`}
						state={{ bookData: el }}
						key={el.isbn}
					>
						<img
							style={{ borderRadius: '5px' }}
							src={el.thumbnail}
							alt={`책 ${el.title}의 이미지`}
							onError={onErrorImg}
						/>
					</Link>
				))}
			</StyledSlider>
		</>
	);
};

export default CarouselSlick;
