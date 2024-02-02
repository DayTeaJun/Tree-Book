import { Shimmer } from '../../Styles/Common';
import { B, ContainerBookImg } from './bookItem.style';

export const BookItemSkeleton = () => {
	return (
		<B.Container style={{ height: '222px' }}>
			<ContainerBookImg style={{ height: '145px', overflow: 'hidden' }}>
				<Shimmer />
			</ContainerBookImg>
			<B.H2 style={{ width: '97px', height: '14px', overflow: 'hidden' }}>
				<Shimmer />
			</B.H2>
			<B.P style={{ width: '97px', height: '12px', overflow: 'hidden' }}>
				<Shimmer />
			</B.P>
			<B.Price style={{ width: '97px', height: '12px', overflow: 'hidden' }}>
				<Shimmer />
			</B.Price>
		</B.Container>
	);
};
