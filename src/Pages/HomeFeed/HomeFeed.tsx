import React from 'react';
import { Link } from 'react-router-dom';

export default function HomeFeed() {
	return (
		<>
			<h1>Home</h1>
			<p>메인 페이지</p>
			<Link to='/search'>검색 페이지 이동</Link>
		</>
	);
}
