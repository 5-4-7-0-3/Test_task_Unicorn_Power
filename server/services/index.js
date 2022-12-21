import { UserServices } from "./user.js";
import { TokenServices } from "./token.js";

const userServices = new UserServices();
const tokenServices = new TokenServices();


export default {
    userServices,
    tokenServices
};