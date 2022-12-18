const service = require('./users.service');
const User = require('./users.model');
const bcrypt = require('bcrypt');

// Mock fns
jest.mock('./users.model');
const hash = jest.spyOn(bcrypt, 'hash');
const compare = jest.spyOn(bcrypt, 'compare');

beforeEach(() => {
    hash.mockClear();
    compare.mockClear();
    User.findOne.mockClear();
})

const user = {
    _id: "6398496a3abda61ed31ad734",                                          // generated mongo ObjectID
    username: "user",
    password: "$2b$10$JHsxEB3arf2mCIjL7j2Ltu3zdJ3k7Wqm4eX/MyLvApzoKxAWeX6ue", // bcrypt hash with salt rounds of 10 of 'password'
    role: "user"                                                              // default role user
};

describe('User registration', () => {
    it('Should not register without neither username nor password', async () => {
        expect(await service.register(undefined,"password")).toBeNull();
        expect(hash).toHaveBeenCalledTimes(0);
        expect(await service.register("user",undefined)).toBeNull();
        expect(hash).toHaveBeenCalledTimes(0);
    });
    it('Should register the user', async () => {
        const doc = user;
        User.create.mockResolvedValue(doc);
        expect(await service.register("user","password")).toStrictEqual(doc);
        expect(hash).toHaveBeenCalledTimes(1);
    });
});
