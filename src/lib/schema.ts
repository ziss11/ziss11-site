import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const experiences = sqliteTable('experiences', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  position: integer('position').notNull(),
  role: text('role').notNull(),
  company: text('company').notNull(),
  type: text('type').notNull(),
  period: text('period').notNull(),
  descr: text('descr').notNull(),
  tech: text('tech').notNull(), // JSON array string
  side: text('side').notNull(),
});

export const projects = sqliteTable('projects', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  position: integer('position').notNull(),
  title: text('title').notNull(),
  category: text('category').notNull(),
  tech: text('tech').notNull(),
  description: text('description').notNull(),
  githubUrl: text('github_url'),
  playStoreUrl: text('play_store_url'),
  appStoreUrl: text('app_store_url'),
});
