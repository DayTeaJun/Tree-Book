import { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';

export const useAuthContext = () => {
	const context = useContext(AuthContext);

	return context; // state, dispatch 함수
};
