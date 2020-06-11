"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("absen", [
      {
        id: "6e567dc0-8f24-4673-866b-2b46859392c7",
        class_id: "0e338454-96b0-42f8-bed3-5dfe0115f6ca",
        users: JSON.stringify(["0f58b9b6-deda-41b1-af8f-274d1955ad3e", "a7417ada-7e5f-47a3-8c90-e25532c486cc"]),
        created_at: new Date(),
        created_by: JSON.stringify({
          id: "",
          type: "Seeder",
          description: "created by register seeder",
        }),
      },
      {
        id: "804f6618-647b-49ec-98ec-cddc7a213f6e",
        class_id: "185e72b5-8f27-4ca7-9e98-6d21f4c2ee04",
        users: JSON.stringify(["c396b942-9e81-4852-b369-bf756c768720", "924a0d29-7a0a-40ef-85ab-9934b9383da1"]),
        created_at: new Date(),
        created_by: JSON.stringify({
          id: "",
          type: "Seeder",
          description: "created by register seeder",
        }),
      },
      {
        id: "08ecc5cb-2f88-4b95-8bd2-a140abeba342",
        class_id: "1d9a5acf-aedd-48d4-a6ca-e5e2fa374f11",
        users: JSON.stringify(["0f58b9b6-deda-41b1-af8f-274d1955ad3e", "924a0d29-7a0a-40ef-85ab-9934b9383da1"]),
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
    return queryInterface.bulkDelete("absen", null, {});
  },
};
