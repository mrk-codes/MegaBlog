import {conf} from './config.js';
import { Databases, Client, ID, Storage , Query} from 'appwrite';

export class Service{
    client = new Client();
    Databases;
    Storage;
    
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.Databases = new Databases(this.client);
        this.Storage = new Storage(this.client);
    }

    async createPost({title, slug, featuredImage, content, userId, status}){
        try{
            return await this.Databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    slug,
                    featuredImage,
                    status,
                    userId
                }
            )
       }catch(error){
        console.log("Appwrite Service :: createPost :: error",error);
       }
    }

    async updatePost(slug, {title, content, featuredImage, status, }){
        try{
            return await this.Databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    slug,
                    featuredImage,
                    status,
                }
            )
        }catch(error){
            console.log("Appwrite Service :: updatePost :: error",error);
        }
    }


    async deletePost(slug){
        try{
             await this.Databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true
        }catch(error){
            console.log("Appwrite Service :: deletePost :: error",error);
            return false
        }                   
    }    

    async getPost(slug){
        try{
           return await this.Databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        }catch(error){
            console.log("Appwrite Service :: getPosts :: error",error);
        }
    }

    async getPosts(queries = [Query.equal('status', 'active')]){
        try{
            return await this.Databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            )
        }catch(error){
            console.log("Appwrite Service :: getPosts :: error",error);
        }
    }

    //File Upload Service

    async uploadFile(file){
        try{
            return await this.Storage.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        }catch(error){
            console.log("Appwrite Service :: uploadFile :: error",error);
            return false
        }
    }

    async deleteFile(fileId){
        try{
            return await this.Storage.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
        }catch(error){
            console.log("Appwrite Service :: deleteFile :: error",error);
            return false
        }
    }


    getFilePreview(fileId){
        return this.Storage.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}
const service = new Service()
export default service;