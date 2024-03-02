import { useState } from 'react';

export function ImgPreview() {
	const [imageSrc, setImageSrc]: any = useState(null);
	const [imgUrl, setImgUrl] = useState(null);

	const onUpload = (e: any) => {
		const file = e.target.files[0];
		setImgUrl(file);
		if (!file) {
			return;
		}
		const reader = new FileReader();
		reader.readAsDataURL(file);

		return new Promise<void>((resolve) => {
			reader.onload = () => {
				setImageSrc(reader.result || null);
				resolve();
			};
		});
	};

	return { imageSrc, imgUrl, onUpload };
}
