import { Client, ID, TablesDB, Query, Permission, Role } from "appwrite";
import type { Models } from "appwrite";
import conf from "../conf/conf";

export type PostTag =
  | "personal"
  | "professional"
  | "health"
  | "lifestyle"
  | "technology"
  | null;
export type PostStatus = "Draft" | "Published" | "Deleted";

export type MindBlog = Models.Row & {
  title: string;
  content: string;
  authorId: string;
  publishDate: string;
  tags: PostTag;
  likes: number | null;
  commentsEnabled: boolean | null;
  slug: string;
  status: PostStatus;
  isPrivate: boolean;
};

export type updateData = {
  title: string;
  content: string;
  publishDate: string;
  tags: PostTag;
  commentsEnabled: boolean | null;
  slug: string;
  status: PostStatus;
  isPrivate: boolean;
};

export class postService {
  client = new Client();
  tablesDB;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteEndpoint)
      .setProject(conf.appwriteProjectId);

    this.tablesDB = new TablesDB(this.client);
  }

  async createPost(data: MindBlog) {
    let readPermission: string[] = [];

    if (data.status === "Draft") {
      readPermission = [
        Permission.read(Role.user(data.authorId)),
        Permission.read(Role.team("Admin")),
      ];
    } else if (data.status === "Deleted") {
      readPermission = [Permission.read(Role.team("Admin"))];
    } else if (data.isPrivate && data.status === "Published") {
      readPermission = [
        Permission.read(Role.team("Visiters")),
        Permission.read(Role.team("Authers")),
        Permission.read(Role.team("Admin")),
      ];
    } else if (!data.isPrivate && data.status === "Published") {
      readPermission = [Permission.read(Role.any())];
    }

    try {
      return await this.tablesDB.createRow({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteCollectionId,
        rowId: ID.unique(),
        data,
        permissions: [
          ...readPermission,
          Permission.update(Role.user(data.authorId)),
          Permission.delete(Role.user(data.authorId)),
          Permission.delete(Role.team("Admin")),
        ],
      });
    } catch (err) {
      console.log("createPost error", err);
    }
  }

  async getPost(rowId: string, queries: []) {
    try {
      return this.tablesDB.getRow({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteCollectionId,
        rowId,
        queries,
      });
    } catch (err) {
      console.log("getPost error", err);
    }
  }

  async updatePost(rowId: string, update: updateData) {
    try {
      return await this.tablesDB.updateRow({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteCollectionId,
        rowId,
        data: { ...update },
      });
    } catch (err) {
      console.log("updatePost error", err);
    }
  }

  async softDeletePost(rowId: string, update: updateData) {
    try {
      return await this.tablesDB.updateRow({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteCollectionId,
        rowId,
        data: { ...update, status: "Deleted" },
        permissions: [Permission.delete(Role.team("Admin"))],
      });
    } catch (err) {
      console.log("softDeletePost error", err);
    }
  }

  async deletePost(rowId: string) {
    try {
      return await this.tablesDB.deleteRow({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteCollectionId,
        rowId,
      });
    } catch (err) {
      console.log("softDeletePost error", err);
    }
  }

  async showAllPostByQuery(queries: []) {
    try {
      return this.tablesDB.listRows({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteCollectionId,
        queries,
      });
    } catch (err) {
      console.log("showPost error", err);
    }
  }
}
