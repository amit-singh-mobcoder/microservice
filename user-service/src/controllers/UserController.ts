import { UserService } from "../services/UserService"
import {Request, Response } from 'express'

export class UserController {
    private userService: UserService;

    constructor(){
        this.userService = new UserService();
    }

    register = async (req: Request, res: Response) =>{
        try {
            console.log("req body==>", req.body)
            const { name, email } = req.body;
            const user = await this.userService.create({name, email});
            res.status(201).json({
                success: true,
                message: "User created successfully",
                user
            })
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: 'Something went wrong',
                error: error.message || error
            })
        }
    }
}