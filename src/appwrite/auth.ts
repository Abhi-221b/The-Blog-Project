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
        const session = this.login({ email, password });
        return session;
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
      console.log("userData", userData);
      return userData;
    } catch (error) {
      return null;
    }
  }

  async generateMagicUrl(userId: string, userEmail: string) {
    try {
      if (userId) {
        const token = await this.account.createMagicURLToken({
          userId: userId,
          email: userEmail,
          url: "http://localhost:5173/verify",
          phrase: false,
        });
        console.log("token", token);
        return token;
      }
    } catch (error) {
      return error;
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
