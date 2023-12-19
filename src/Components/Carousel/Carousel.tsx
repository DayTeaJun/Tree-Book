import Slider from 'react-slick';
import { StyledSlider } from './carousel.style';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { BData } from '../../Types/bookData';
import { Link } from 'react-router-dom';

type BookProps = {
	bookData: any;
};

const CarouselSlick = ({ bookData }: BookProps) => {
	const sliderSettings = {
		dots: true,
		infinite: true,
		speed: 500,
	};

	return (
		<>
			<Slider {...sliderSettings}>
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
						/>
					</Link>
				))}
			</Slider>
		</>
	);
};

export default CarouselSlick;
