import { conf } from "../config.js";
import { Account, Client, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name,
      );
      if (condition) {
        //call another method for login if account created Successfully
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
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
      return await this.account.get(); // this will return the current logged in user
    } catch (error) {
      throw error;
    }

    return null;
  }

  async logout() {
    try {
      return await this.account.deleteSessions(); // this will delete the all logged in user sessions
    } catch (error) {
      throw error;
    }
  }
}
const authService = new AuthService();

export default authService;
