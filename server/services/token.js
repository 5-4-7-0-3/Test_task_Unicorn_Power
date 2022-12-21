import {Token} from "../db/models/token.js";
import {User} from "../db/models/user.js";
class TokenServices {

    async signup(id, hashPassword, id_type){
        return await new User({
            id,
            password: hashPassword,
            id_type
          }).save();
    };

    async saveRefreshToken(userId, refreshToken){
        await new Token({
            userId,
            refreshToken
          }).save();
    };

    async logoutOne(refreshToken) {
        return await Token.deleteOne({refreshToken});
    };

    async logoutMany(userId) {
        return await Token.deleteMany({userId});
    };

    async findOneRefreshToken(refreshToken) {
        return await Token.findOne({refreshToken});
    };

}

export { TokenServices };