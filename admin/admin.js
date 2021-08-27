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
          encrytedPassword: {
            isVisible: false,
          },
          password: {
            type: "string",
            isVisible: {
              list: false,
              filter: false,
              show: false,
              edit: true
            }
          }
        },
        actions: {
          new: {
            before: async (request) => {
              if(request.payload.password) {
                request.payload = {
                  ...request.payload,
                  encrytedPassword: await bcrypt.hash(request.payload.password, 10),
                  password: undefined
                }
              }
              return request
            }
          },
          edit: {
            new: {
              before: async (request) => {
                if(request.payload.password) {
                  request.payload = {
                    ...request.payload,
                    encrytedPassword: await bcrypt.hash(request.payload.password, 10),
                    password: undefined
                  }
                }
                return request
              }
            },
          }
        }
      },
    },
  ],
});

const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
  authenticate: async (email, password) => {
    const user = await User.findOne({ email });
    if (user && user.role === "admin") {
      const isMatch = await bcrypt.compare(password, user.encrytedPassword);
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
