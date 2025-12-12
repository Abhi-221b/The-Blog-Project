import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf";

type basicAccountData = {
  email: string;
  password: string;
  name?: string;
};

export class AppAuth {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteEndpoint)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }: basicAccountData) {
    try {
      const userAccount = await this.account.create({
        userId: ID.unique(),
        email: email,
        password: password,
        name: name,
      });

      if (userAccount) {
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }: basicAccountData) {
    try {
      const session = await this.account.createEmailPasswordSession({
        email: email,
        password: password,
      });
      return session;
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      const userData = await this.account.get();
      return userData;
    } catch (error) {
      return null;
    }
  }

  async getCurrentUserPref() {
    try {
      const userData = await this.account.getPrefs();
      console.log("account data", userData);
      return userData;
    } catch (error) {
      return null;
    }
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Delete Session Error", error);
    }
  }
}

const appAuth = new AppAuth();

export default appAuth;
