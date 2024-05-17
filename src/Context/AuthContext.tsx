import { createContext, useEffect, useReducer } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { appAuth } from '../Firebase/config';

export interface AuthContextProps {
	user: User | null;
	isAuthReady: boolean;
	dispatch: React.Dispatch<AuthAction>;
}

type AuthAction =
	| { type: 'login'; payload: User }
	| { type: 'logout' }
	| { type: 'isAuthReady'; payload: User | null; isAuthReady?: boolean };

const authReducer = (
	state: AuthContextProps,
	action: AuthAction
): AuthContextProps => {
	switch (action.type) {
		case 'login':
			return { ...state, user: action.payload };

		case 'logout':
			return { ...state, user: null };

		case 'isAuthReady':
			return { ...state, user: action.payload, isAuthReady: true };

		default:
			return state;
	}
};

const AuthContext = createContext<AuthContextProps>({
	user: null,
	isAuthReady: false,
	dispatch: () => {},
});

interface Props {
	children: JSX.Element | JSX.Element[];
}

const AuthContextProvider = ({ children }: Props) => {
	const [state, dispatch] = useReducer<
		React.Reducer<AuthContextProps, AuthAction>
	>(authReducer, { user: null, isAuthReady: false, dispatch: () => {} });

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(appAuth, (user) => {
			dispatch({ type: 'isAuthReady', payload: user });
		});
		return unsubscribe;
	}, []);

	return (
		<AuthContext.Provider value={{ ...state, dispatch }}>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthContext, AuthContextProvider };
