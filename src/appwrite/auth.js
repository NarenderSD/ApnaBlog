import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client()
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.account = new Account(this.client)
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)

            if (userAccount) {
                // call login method 
                return this.login({ email, password })
            } else {
                return userAccount;
            }
        } catch (error) {
            throw error
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            const isLoggedIn = await this.account.get()

            if (isLoggedIn) {
                return isLoggedIn
            } else {
                return null
            }

        } catch (error) {
            console.log("Appwrite service Error :: getCurrentUser error : ", error)
        }
    }

    async logout() {
        try {
            await this.account.deleteSessions()
        } catch (error) {
            console.log("Appwrite Service :: logout error : ", error)
        }
    }
}

const authService = new AuthService();
export default authService;
