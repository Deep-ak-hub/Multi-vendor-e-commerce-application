const bcrypt = require("bcryptjs")
const UserModel = require("../modules/users/user.model")
const { AdminConfig } = require("../config/config");
const { UserRoles, Status } = require("../config/constants");

class AdminSeedServices{
    async seedAdmin() {
        const existingAdmin = await UserModel.findOne({
            email: AdminConfig.email
        })

        if(existingAdmin){
            console.log("Admin already exits");
            return
        }

        const hashedPassword = await bcrypt.hash(AdminConfig.password, 10);

        await UserModel.create({
            name: AdminConfig.name,
            email: AdminConfig.email,
            password: hashedPassword,
            role: UserRoles.ADMIN,
            status: Status.ACTIVE
        })
        console.log("Admin seeded successfully");
    }
}

const adminSeedServices = new AdminSeedServices()

module.exports = adminSeedServices