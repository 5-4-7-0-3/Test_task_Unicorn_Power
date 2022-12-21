import {payloadToken} from "../helpers/authHelper.js";

class UserController {
    constructor(userService) {
        this.userService = userService
    };

    async info(req, res){
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decode = payloadToken(token);
            const user = await this.userService.findOne_id(decode.id);
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json({
                message: err,
            })
        };

    };
};


export { UserController };