import {User} from "../db/models/user.js"
class UserServices {

    async findOne(id){
       return await User.findOne({ id:id });
    };

    async findOne_id(id){
        return await User.findOne({ _id:id },{id:1, id_type:1});
    };
}

export { UserServices };