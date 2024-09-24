// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  boolean,
  date,
  pgTableCreator,
  real,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `mykpoplist_${name}`);

export const idols = createTable("idol", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  nameOriginal: text("name_original").notNull(),
  realName: text("real_name").notNull(),
  realNameOriginal: text("real_name_original").notNull(),
  birthDate: date("birth_date").notNull(),
  nameAlias: text("name_alias"),
  debutDate: text("debut_date"),
  height: real("height"),
  weight: real("weight"),
  thumbUrl: text("thumb_url"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .$onUpdate(() => new Date()),
});

export type Idol = typeof idol.$inferSelect;

export const groups = createTable("group", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  nameOriginal: text("name_original").notNull(),
  agencyName: text("agency_name").notNull(),
  nameAlias: text("name_alias"),
  debutDate: date("debut_date"),
  disbandDate: date("disband_date"),
  thumbUrl: text("thumb_url"),
  parentId: uuid("parent_id"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .$onUpdate(() => new Date()),
});

export const groupToIdol = createTable("group_to_idol", {
  groupId: uuid("group_id").references(() => group.id),
  idolId: uuid("idol_id").references(() => idol.id),
});
