CREATE TABLE IF NOT EXISTS "librerian" (
	"id" bigint GENERATED ALWAYS AS IDENTITY NOT NULL UNIQUE,
	"fcs" text NOT NULL,
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "book_issuance" (
	"id" uuid NOT NULL UNIQUE DEFAULT 'gen_random_uuid()',
	"librerianID" bigint NOT NULL,
	"readerID" uuid NOT NULL,
	"bookID" uuid NOT NULL,
	"issue" date NOT NULL,
	"refund" date NOT NULL,
	"status" text NOT NULL DEFAULT 'not returned',
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "reader" (
	"id" uuid NOT NULL UNIQUE DEFAULT 'gen_random_uuid()',
	"fcs" text NOT NULL,
	"birthdate" date NOT NULL,
	"address" text NOT NULL,
	"passport" bigint NOT NULL,
	"workplace" text NOT NULL,
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "book" (
	"id" uuid NOT NULL UNIQUE DEFAULT 'gen_random_uuid()',
	"themeID" bigint NOT NULL,
	"typeID" bigint NOT NULL,
	"publishingID" bigint NOT NULL,
	"storageID" bigint NOT NULL,
	"author" text NOT NULL,
	"title" text NOT NULL,
	"publication" date NOT NULL,
	"pages" bigint NOT NULL,
	"amount" bigint NOT NULL,
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


ALTER TABLE "book_issuance" ADD CONSTRAINT "book_issuance_fk1" FOREIGN KEY ("librerianID") REFERENCES "librerian"("id");

ALTER TABLE "book_issuance" ADD CONSTRAINT "book_issuance_fk2" FOREIGN KEY ("readerID") REFERENCES "reader"("id");

ALTER TABLE "book_issuance" ADD CONSTRAINT "book_issuance_fk3" FOREIGN KEY ("bookID") REFERENCES "book"("id");

ALTER TABLE "book" ADD CONSTRAINT "book_fk1" FOREIGN KEY ("themeID") REFERENCES "theme"("id");

ALTER TABLE "book" ADD CONSTRAINT "book_fk2" FOREIGN KEY ("typeID") REFERENCES "type"("id");

ALTER TABLE "book" ADD CONSTRAINT "book_fk3" FOREIGN KEY ("publishingID") REFERENCES "publishing"("id");

ALTER TABLE "book" ADD CONSTRAINT "book_fk4" FOREIGN KEY ("storageID") REFERENCES "storage"("id");



