import { useState } from 'react';

export function ImgPreview() {
	const [imageSrc, setImageSrc]: any = useState(null);
	const [imgUrl, setImgUrl] = useState(null);
	const [imgFilter, setImgFilter] = useState(false);

	const onUpload = (e: any) => {
		const fileRegex = /(.*?)\.(jpg|jpeg|png|gif|bmp)$/;
		const file = e.target.files[0];

		if (file) {
			const fileEx = '.' + file.name.split('.').pop().toLowerCase();
			if (fileRegex.test(fileEx)) {
				setImgUrl(file);
				const reader = new FileReader();
				reader.readAsDataURL(file);

				return new Promise<void>((resolve) => {
					reader.onload = () => {
						setImageSrc(reader.result || null);
						resolve();
					};
				});
			} else {
				setImgFilter(true);
				return;
			}
		} else {
			return;
		}
	};

	return { imageSrc, imgUrl, imgFilter, setImgFilter, onUpload };
}
