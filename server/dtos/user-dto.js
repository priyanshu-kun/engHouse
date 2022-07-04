class userDto {
    _id;
    phone;
    name;
    username;
    avatar;
    activated;
    createdAt;
    constructor(user) {
        this._id = user._id;
        this.phone = user.phone;
        this.name = user.name;
        this.username = user.username;
        this.avatar = user.avatar ? `${process.env.BASE_URL}${user.avatar}`: null;
        this.activated = user.activated;
        this.createdAt = user.createdAt;
    }
}

module.exports = userDto