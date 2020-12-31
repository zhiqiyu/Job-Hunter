const { Seeder } = require("mongo-seeding");

const config = {
    database: {
        host: "127.0.0.1",
        port: 27017,
        name: "jobHunterDB",
    },
    dropDatabase: true,
}

const seeder = new Seeder(config)

