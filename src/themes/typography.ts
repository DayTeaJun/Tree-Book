import { TypographyVariantsOptions } from '@mui/material';

export type ThemeMode = 'light' | 'dark';

export type FontFamily =
	| 'PretendardExtraBold'
	| 'PretendardBold'
	| 'PretendardSemiBold'
	| 'PretendardMedium'
	| 'PretendardRegular';

export interface CustomTypographyVariantsOptions
	extends TypographyVariantsOptions {
	fontWeightSemiBold: number;
	fontWeightExtraBold: number;
}
