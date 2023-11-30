import mongoose from 'mongoose'


let isConnected: boolean = false ;

export const connectionToDatabase = async () => {
    mongoose.set('strictQuery',true)

    if(!process.env.MONGOE)

}