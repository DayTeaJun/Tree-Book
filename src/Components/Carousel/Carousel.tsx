import Slider from 'react-slick';
import { StyledSlider } from './carousel.style';

const CarouselSlick = () => {
	const sliderSettings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 2,
		slidesToScroll: 2,
		autoplay: true,
		autoplaySpeed: 2500,
	};

	return (
		<>
			<StyledSlider {...sliderSettings}>{}</StyledSlider>
		</>
	);
};

export default CarouselSlick;
