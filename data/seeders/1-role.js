"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("role", [
      {
        id: "05bf3d41-1aa7-4651-af06-1dc217808911",
        name: "Admin",
        description: "Sebagai pengelola pengguna dari aplikasi getStudy",
        created_at: new Date(),
        created_by: JSON.stringify({
          id: "",
          type: "Seeder",
          description: "created by register seeder",
        }),
      },
      {
        id: "d6438c76-fe58-4c29-87e5-7314283f76ce",
        name: "Guru",
        description: "Sebagai pengajar",
        created_at: new Date(),
        created_by: JSON.stringify({
          id: "",
          type: "Seeder",
          description: "created by register seeder",
        }),
      },
      {
        id: "f9db9ac4-3c92-4f0a-bd24-e4251a78037a",
        name: "Siswa",
        description: "Sebagai peserta ajar",
        created_at: new Date(),
        created_by: JSON.stringify({
          id: "",
          type: "Seeder",
          description: "created by register seeder",
        }),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("role", null, {});
  },
};
