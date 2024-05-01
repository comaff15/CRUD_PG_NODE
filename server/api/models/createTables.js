const db = require('../config/database.js');

const CreateTable = async () => {
    try {
        const query = `
        CREATE TABLE IF NOT EXISTS "librerian" (
            "id" bigint GENERATED ALWAYS AS IDENTITY NOT NULL UNIQUE,
            "fcs" text NOT NULL,
            PRIMARY KEY ("id")
        );
        
        CREATE TABLE IF NOT EXISTS "book_issuance" (
            "id" uuid NOT NULL UNIQUE DEFAULT gen_random_uuid(),
            "librerian_id" bigint NOT NULL,
            "reader_id" uuid NOT NULL,
            "book_id" uuid NOT NULL,
            "issue" date NOT NULL,
            "refund" date NOT NULL,
            "status" text NOT NULL DEFAULT 'not returned',
            PRIMARY KEY ("id")
        );
        
        CREATE TABLE IF NOT EXISTS "reader" (
            "id" uuid NOT NULL UNIQUE DEFAULT gen_random_uuid(),
            "fcs" text NOT NULL,
            "birthdate" date NOT NULL,
            "address" text NOT NULL,
            "passport" bigint NOT NULL,
            "workplace" text NOT NULL,
            PRIMARY KEY ("id")
        );
        
        CREATE TABLE IF NOT EXISTS "book" (
            "id" uuid NOT NULL UNIQUE DEFAULT gen_random_uuid(),
            "theme_id" bigint NOT NULL,
            "type_id" bigint NOT NULL,
            "publishing_id" bigint NOT NULL,
            "storage_id" bigint NOT NULL,
            "author" text NOT NULL,
            "title" text NOT NULL,
            "publication" date NOT NULL,
            "pages" bigint NOT NULL,
            PRIMARY KEY ("id")
        );
        
        CREATE TABLE IF NOT EXISTS "storage" (
            "id" bigint GENERATED ALWAYS AS IDENTITY NOT NULL UNIQUE,
            "place" text NOT NULL,
            PRIMARY KEY ("id")
        );
        
        CREATE TABLE IF NOT EXISTS "theme" (
            "id" bigint GENERATED ALWAYS AS IDENTITY NOT NULL UNIQUE,
            "title" text NOT NULL,
            PRIMARY KEY ("id")
        );
        
        CREATE TABLE IF NOT EXISTS "publishing" (
            "id" bigint GENERATED ALWAYS AS IDENTITY NOT NULL UNIQUE,
            "title" text NOT NULL,
            "city" text NOT NULL,
            PRIMARY KEY ("id")
        );
        
        CREATE TABLE IF NOT EXISTS "type" (
            "id" bigint GENERATED ALWAYS AS IDENTITY NOT NULL UNIQUE,
            "type" text NOT NULL,
            PRIMARY KEY ("id")
        );
        
        
        ALTER TABLE "book_issuance" ADD CONSTRAINT "book_issuance_fk1" FOREIGN KEY ("librerian_id") REFERENCES "librerian"("id");
        
        ALTER TABLE "book_issuance" ADD CONSTRAINT "book_issuance_fk2" FOREIGN KEY ("reader_id") REFERENCES "reader"("id");
        
        ALTER TABLE "book_issuance" ADD CONSTRAINT "book_issuance_fk3" FOREIGN KEY ("book_id") REFERENCES "book"("id");
        
        ALTER TABLE "book" ADD CONSTRAINT "book_fk1" FOREIGN KEY ("theme_id") REFERENCES "theme"("id");
        
        ALTER TABLE "book" ADD CONSTRAINT "book_fk2" FOREIGN KEY ("type_id") REFERENCES "type"("id");
        
        ALTER TABLE "book" ADD CONSTRAINT "book_fk3" FOREIGN KEY ("publishing_id") REFERENCES "publishing"("id");
        
        ALTER TABLE "book" ADD CONSTRAINT "book_fk4" FOREIGN KEY ("storage_id") REFERENCES "storage"("id");
               
        `;

        await db.query(query);
        console.log('Tables was created')
    } catch (err){
        console.log(err);
        console.log('Tables creation was failed')
    }
}

module.exports = CreateTable;