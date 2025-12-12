interface AppwriteConfig {
    appwriteEndpoint: string;
    appwriteProjectId: string;
    appwriteDatabaseId: string;
    appwriteCollectionId: string;
    appwriteBucketId: string;
}

const conf: AppwriteConfig = {
    appwriteEndpoint: import.meta.env.VITE_APPWRITE_ENDPOINT as string,
    appwriteProjectId: import.meta.env.VITE_APPWRITE_PROJECT_ID as string,
    appwriteDatabaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID as string,
    appwriteCollectionId: import.meta.env.VITE_APPWRITE_COLLECTION_ID as string,
    appwriteBucketId: import.meta.env.VITE_APPWRITE_BUCKET_ID as string,
};

export default conf