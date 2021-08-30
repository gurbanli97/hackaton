const connection = require("../db_config/models");
const { User, Appointment } = require("../db_config/models").default;
const bcrypt = require("bcryptjs");
const mailer = require("../tools/nodemailer");

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
              edit: true,
            },
          },
        },
        actions: {
          new: {
            before: async (request) => {
              if (request.payload.password) {
                request.payload = {
                  ...request.payload,
                  encrytedPassword: await bcrypt.hash(
                    request.payload.password,
                    10
                  ),
                  password: undefined,
                };
              }
              return request;
            },
          },
          edit: {
            new: {
              before: async (request) => {
                if (request.payload.password) {
                  request.payload = {
                    ...request.payload,
                    encrytedPassword: await bcrypt.hash(
                      request.payload.password,
                      10
                    ),
                    password: undefined,
                  };
                }
                return request;
              },
            },
          },
        },
      },
    },
    {
      resource: Appointment,
      options: {
        listProperties: [
          "fullname",
          "email",
          "phone",
          "date",
          "time",
          "place",
          "isVaccinated",
        ],
        properties: {
          updated_at: {
            isVisible: { list: false, filter: true, show: true, edit: false },
          },
          created_at: {
            isVisible: { list: false, filter: true, show: true, edit: false },
          },
          isVaccinated: {
            position: -1,
          },
        },
        actions: {
          edit: {
            before: async (request) => {
              if (request.payload) {
                if (request.payload.isVaccinated) {
                  mailer("OK", request.payload.email, request.payload.fullname);
                }
              }
              return request;
            },
          },
        },
      },
    },
  ],
});

const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
  authenticate: async (loginEmail, password) => {
    const user = await User.findOne({ email: loginEmail });
    if (user && user.role === "admin") {
      const isMatch = await bcrypt.compare(password, user.encrytedPassword);
      if (isMatch) {
        return user;
      }
      return false;
    } else {
      return true;
    }
  },
  cookiePassword: "thisIsOurLittleSecret",
});

module.exports = {
  adminBro,
  router,
};
