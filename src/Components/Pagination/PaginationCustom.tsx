import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/scss/pagination.module.scss';
import { PN } from './paginationCustom.style';

interface Props {
	totalItems: number;
	itemCountPerPage: number;
	pageCount: number;
	currentPage: number;
}

export function PaginationCustom({
	totalItems,
	itemCountPerPage,
	pageCount,
	currentPage,
}: Props) {
	const totalPages = Math.ceil(totalItems / itemCountPerPage);
	const [start, setStart] = useState(1);
	const noPrev = start === 1;
	const noNext = start + pageCount - 1 >= totalPages;

	useEffect(() => {
		if (currentPage === start + pageCount) setStart((prev) => prev + pageCount);
		if (currentPage < start) setStart((prev) => prev - pageCount);
	}, [currentPage, pageCount, start]);

	return (
		<PN.Wrapper>
			<PN.Ul>
				<PN.Li>
					<Link to={`?page=${start - 1}`}>이전</Link>
				</PN.Li>
				{[...Array(pageCount)].map((a, i) => (
					<>
						{start + i <= totalPages && (
							<PN.Li>
								<PN.Page
									className={`${styles.page} ${
										currentPage === start + i && styles.active
									}`}
									to={`?page=${start + i}`}
								>
									{start + i}
								</PN.Page>
							</PN.Li>
						)}
					</>
				))}
				<PN.Li>
					<Link to={`?page=${start + pageCount}`}>다음</Link>
				</PN.Li>
			</PN.Ul>
		</PN.Wrapper>
	);
}
