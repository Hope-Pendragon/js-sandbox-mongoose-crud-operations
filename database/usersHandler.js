import User from "./models"; //not require if ioc is use
import { ObjectId } from "mongodb";
export async function createUser(user) {
	try {
		const createdUser = await User.create(user);
		return createdUser;
	} catch (error) {
		return error;
	}
}

export async function readUser(id) {
	try {
		const user = await User.findByID(id);
		return user;
	} catch (error) {
		return error;
	}
}

export async function readUsers() {
	try {
		const users = await User.find();
		return users;
	} catch (error) {
		return error;
	}
}

export async function updateUser(_id, updates) {
	try {
		const id = _id;
		console.log(updates);
		const updatedUser = await User.findByIdAndUpdate(id, updates, {
			strictQuery: false,
			new: true,
		});
		return updatedUser;
	} catch (error) {
		return error;
	}
}

export async function removeUser(id) {
	try {
		console.log(id);
		const removedUser = await User.findByIdAndDelete(id);
		console.log(removedUser);
		return removedUser;
	} catch (error) {
		// res.status(404).send({ error: error });
		return Promise.reject(error);
	}
}
