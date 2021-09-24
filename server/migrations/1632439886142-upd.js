const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class upd1632439886142 {

    async up(queryRunner) {
        console.log(111);
    }

    async down(queryRunner) {
        console.log(777);
    }
}
