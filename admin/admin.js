const connection = require("../db_config/models");
const { User } = require("../db_config/models").default;
const bcrypt = require("bcryptjs");

const AdminBro = require("admin-bro");
const AdminBroExpress = require("@admin-bro/express");
const AdminBroMongoose = require("@admin-bro/mongoose");

AdminBro.registerAdapter(AdminBroMongoose);

const adminBro = new AdminBro({
  databases: [connection],
  branding: {
    companyName: "MedicAPP Admin",
  },
  rootPath: "/admin",
  resources: [
    {
      resource: User,
      options: {
        listProperties: ["fullname", "email", "dob", "role"],
        properties: {
          updated_at: {
            isVisible: { list: false, filter: true, show: true, edit: false },
          },
          created_at: {
            isVisible: { list: false, filter: true, show: true, edit: false },
          },
          password: {
            isVisible: { list: false, filter: false, show: false, edit: true },
          },
        },
      },
    },
  ],
});

const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
  authenticate: async (email, password) => {
    const user = await User.findOne({ email });
    if (user && user.role === "admin") {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        return user;
      }
      return false;
    }
  },
  cookiePassword: "thisIsOurLittleSecret",
});

module.exports = {
  adminBro,
  router,
};
