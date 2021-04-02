import bcrypt from 'bcryptjs';

const users = [
    {
        name: "Admin User",
        email: "admin@gmail.com",
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: "Sahil",
        email: "sahil@gmail.com",
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: "Mayank",
        email: "mayank@gmail.com",
        password: bcrypt.hashSync('123456', 10),
    },
]

export default users;