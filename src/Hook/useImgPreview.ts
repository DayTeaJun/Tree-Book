import { useSnackbar } from 'notistack';
import { ChangeEvent, useState } from 'react';

export function ImgPreview() {
	const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null>(null);
	const [imgUrl, setImgUrl] = useState<File | null>(null);
	const { enqueueSnackbar } = useSnackbar();

	const onUpload = (e: ChangeEvent<HTMLInputElement>) => {
		const fileRegex = /(.*?)\.(jpg|jpeg|png|gif|bmp)$/;
		const file = e.target.files?.[0];

		if (file) {
			const fileEx = '.' + file.name.split('.').pop()?.toLowerCase();
			if (fileEx && fileRegex.test(fileEx)) {
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
				enqueueSnackbar('이미지만 등록할 수 있습니다!', { variant: 'error' });
				return;
			}
		} else {
			return;
		}
	};

	return { imageSrc, imgUrl, onUpload };
}
