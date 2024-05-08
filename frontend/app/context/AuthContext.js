import { createContext, useContext, useEffect, useState } from "react";
import storageUtil from "./storage";

const TOKEN_KEY = "my-jwt";
export const API_URL = process.env.EXPO_PUBLIC_API_URL;
const AuthContext = createContext(null);

export function useAuth() {
	const authContext = useContext(AuthContext);
	if (authContext === undefined) {
		throw new Error("Context is outside of provider");
	}
	return authContext;
}

export function AuthProvider({ children }) {
	const [authState, setAuthState] = useState({
		token: null,
		authenticated: null,
	});

	useEffect(() => {
		// tohle se zavola jen poprve pri startu appky
		async function loadToken() {
			const token = await storageUtil.getItem(TOKEN_KEY);
			console.log(`stored: ${token}`);

			const resUser = await fetch(`${API_URL}/auth/status`, {
				credentials: "include",
			});

			const userData = await resUser.json();

			if (token && resUser.status == 200) {
				setAuthState({
					token: token,
					authenticated: true,
					user: userData.data,
				});

				return;
			}
			setAuthState({
				authenticated: false,
				token: null,
				user: null,
			});
		}
		loadToken();
	}, []);

	async function register(username, email, password) {
		try {
			const res = await fetch(`${API_URL}/auth/signup`, {
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					username,
					email,
					password,
				}),
			});
			return res;
		} catch (err) {
			return { error: true, msg: err.response.data };
		}
	}

	async function login(email, password) {
		try {
			const resLogin = await fetch(`${API_URL}/auth/signin`, {
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email,
					password,
				}),
			});

			const loginData = await resLogin.json();

			const resUser = await fetch(`${API_URL}/auth/status`, {
				credentials: "include",
			});

			if (resUser.status != 200) {
				throw Error("user does not have user data");
			}

			const userData = await resUser.json();

			setAuthState({
				token: loginData.data.jwt,
				authenticated: true,
				user: userData.data,
			});

			await storageUtil.setItem(TOKEN_KEY, loginData.data.jwt);
		} catch (err) {
			console.error("Failed to log in", err);
			return { error: true, msg: err.res };
		}
	}

	async function logout() {
		let res = await fetch(`${API_URL}/auth/logout`, {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({}),
		});
		res = await res.json();

		await storageUtil.delItem(TOKEN_KEY);

		setAuthState({
			token: null,
			authenticated: false,
			user: null,
		});
	}

	const value = {
		onSignin: register,
		onLogin: login,
		onLogout: logout,
		authState,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
