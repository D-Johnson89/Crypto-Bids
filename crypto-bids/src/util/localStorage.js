/**
 * return { status: true } if user is created
 * returns { status: false, error: "message" } if there is an error
 */

const USER_DB_KEY = "crypto-master";

export function createUser({ username, password }) {
	let usersKey = localStorage.getItem(USER_DB_KEY);

	if (!usersKey) {
		usersKey = "[]";
	}

	const usersArray = JSON.parse(usersKey);

	// 1. Check if username already exists
	const duplicate = usersArray.find((user) => user.username === username);

	if (duplicate) {
		return {
			status: false,
			error: "Username already exists",
		};
	}

	// 2. Check password strength
}
