import jwt from 'jsonwebtoken';
export default class AuthenticationService {
    
    async generateAccessToken(user) {
        return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' })
    }
    async generateRefreshToken (user) {
        return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
    }
    async verifyAccount (token) {
        let verifiedAccount
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) throw new Error(err);
            verifiedAccount = user;
        })
        return verifiedAccount
    }
    async refreshToken (refreshToken) {
        let accessToken 
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) throw new Error(err);
            accessToken = this.generateAccessToken(user)
        })
        return accessToken
    }
    async getUserfromToken (token) {
        let user
        await this.verifyAccount(token)
            .then(data => { 
                user = data
            })
        return user;
    }
}