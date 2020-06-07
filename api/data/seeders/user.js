"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("user", [
      {
        id: "df1b44bc-1925-4ea5-9b90-427cb37ca895",
        role_id: "05bf3d41-1aa7-4651-af06-1dc217808911",
        user_id: "ADM001",
        email: "admin@mail.com",
        password: "4f9f10b304cfe9b2b11fcb1387f694e18f08ea358c7e9f567434d3ad6cbd7fc4",
        profile: JSON.stringify({
          name: {
            last_name: "No 1",
            first_name: "Admin",
          },
          images: {
            url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
            filename: "photprofildong",
          },
          address: {
            street: "Kp.kapungan RT/RW 02/01",
            village: "Desadesaan",
            subdistrict: "Kecamatandong",
            city: "Garut",
            province: "Jawa barat",
            postal_code: "44184",
          },
        }),
        verify: true,
        active: true,
        created_at: new Date(),
        created_by: JSON.stringify({
          id: "",
          type: "Seeder",
          description: "created by register seeder",
        }),
      },
      {
        id: "0f58b9b6-deda-41b1-af8f-274d1955ad3e",
        role_id: "d6438c76-fe58-4c29-87e5-7314283f76ce",
        user_id: "GR001",
        email: "guru1@mail.com",
        password: "4f9f10b304cfe9b2b11fcb1387f694e18f08ea358c7e9f567434d3ad6cbd7fc4",
        profile: JSON.stringify({
          name: {
            last_name: "No 1",
            first_name: "Guru",
          },
          images: {
            url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
            filename: "photprofildong",
          },
          address: {
            street: "Kp.kapungan RT/RW 02/01",
            village: "Desadesaan",
            subdistrict: "Kecamatandong",
            city: "Garut",
            province: "Jawa barat",
            postal_code: "44184",
          },
        }),
        verify: true,
        active: true,
        created_at: new Date(),
        created_by: JSON.stringify({
          id: "",
          type: "Seeder",
          description: "created by register seeder",
        }),
      },
      {
        id: "c396b942-9e81-4852-b369-bf756c768720",
        role_id: "d6438c76-fe58-4c29-87e5-7314283f76ce",
        user_id: "GR002",
        email: "guru2@mail.com",
        password: "4f9f10b304cfe9b2b11fcb1387f694e18f08ea358c7e9f567434d3ad6cbd7fc4",
        profile: JSON.stringify({
          name: {
            last_name: "No 2",
            first_name: "Guru",
          },
          images: {
            url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
            filename: "photprofildong",
          },
          address: {
            street: "Kp.kapungan RT/RW 02/01",
            village: "Desadesaan",
            subdistrict: "Kecamatandong",
            city: "Garut",
            province: "Jawa barat",
            postal_code: "44184",
          },
        }),
        verify: true,
        active: true,
        created_at: new Date(),
        created_by: JSON.stringify({
          id: "",
          type: "Seeder",
          description: "created by register seeder",
        }),
      },
      {
        id: "a7417ada-7e5f-47a3-8c90-e25532c486cc",
        role_id: "f9db9ac4-3c92-4f0a-bd24-e4251a78037a",
        user_id: "MR001",
        email: "murid1@mail.com",
        password: "4f9f10b304cfe9b2b11fcb1387f694e18f08ea358c7e9f567434d3ad6cbd7fc4",
        profile: JSON.stringify({
          name: {
            last_name: "No 1",
            first_name: "Murid",
          },
          images: {
            url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
            filename: "photprofildong",
          },
          address: {
            street: "Kp.kapungan RT/RW 02/01",
            village: "Desadesaan",
            subdistrict: "Kecamatandong",
            city: "Garut",
            province: "Jawa barat",
            postal_code: "44184",
          },
        }),
        verify: true,
        active: true,
        created_at: new Date(),
        created_by: JSON.stringify({
          id: "",
          type: "Seeder",
          description: "created by register seeder",
        }),
      },
      {
        id: "924a0d29-7a0a-40ef-85ab-9934b9383da1",
        role_id: "f9db9ac4-3c92-4f0a-bd24-e4251a78037a",
        user_id: "MR002",
        email: "murid2@mail.com",
        password: "4f9f10b304cfe9b2b11fcb1387f694e18f08ea358c7e9f567434d3ad6cbd7fc4",
        profile: JSON.stringify({
          name: {
            last_name: "No 2",
            first_name: "Murid",
          },
          images: {
            url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
            filename: "photprofildong",
          },
          address: {
            street: "Kp.kapungan RT/RW 02/01",
            village: "Desadesaan",
            subdistrict: "Kecamatandong",
            city: "Garut",
            province: "Jawa barat",
            postal_code: "44184",
          },
        }),
        verify: true,
        active: true,
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
    return queryInterface.bulkDelete("user", null, {});
  },
};
