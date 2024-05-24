import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import Switch from '@mui/material/Switch';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';
import { toggleDarkMode } from '../../Redux/DarkModeSlice';

export default function DarkToggle() {
	const dispatch = useDispatch();
	const { mode } = useSelector((state: RootState) => state.darkMode);

	const handleDarkMode = () => {
		dispatch(toggleDarkMode());
	};

	return (
		<Switch
			inputProps={{
				'aria-label': 'Darkmode Toggle',
			}}
			sx={{
				'&.MuiSwitch-root': {
					padding: '8px 0',
					width: '60px',
					height: '50px',
					'& .MuiButtonBase-root': {
						width: '28px',
						height: '28px',
						margin: '11px 4px',
						color: 'text.primary',
						backgroundColor: 'background.default',
						transition: '0.3s',
						'&.Mui-checked': {
							transform: 'translateX(24px)',
						},
						'& .MuiSvgIcon-root': {
							fontSize: '18px',
						},
					},
					'& .MuiSwitch-track': {
						backgroundColor: 'primary.light',
						borderRadius: '50px',
					},
				},
			}}
			icon={<LightModeIcon />}
			checkedIcon={<DarkModeIcon />}
			checked={mode === 'dark'}
			onChange={handleDarkMode}
		/>
	);
}
