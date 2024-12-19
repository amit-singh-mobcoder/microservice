import { UserModel } from "../models/UserModel";
import { channel } from "../index";

export class UserService {

    async create(data: any){
        try {
            const isExist = await UserModel.findOne({email: data.email});
            if(isExist){
                throw new Error('User with email already exists');
                
            }
            const user = await UserModel.create({
                name: data.name,
                email: data.email
            })
            const message = JSON.stringify({ type: 'USER_CREATED', user });
            if(channel) channel.sendToQueue('user_queue', Buffer.from(message));
            return user;
        } catch (error) {
            throw error;
        }
    }
}