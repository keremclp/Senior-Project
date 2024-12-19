import { sign, verify } from "jsonwebtoken";


const createJWT = ({payload}) =>{
    // check the why do we have to send like this {}
    const token = sign(payload, process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME,});
    return token;
}

const isTokenValid = ({ token }) => verify(token, process.env.JWT_SECRET)

const attachCookiesToResponse = ({res, tokenUser}) => {
    const token = createJWT({ payload: tokenUser });

    const oneDay = 1000 * 60 * 60 * 24;
    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + oneDay),
      secure: process.env.NODE_ENV === 'production',
      signed: true,
    });
}

export default {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
};