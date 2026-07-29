import { integer, primaryKey, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const provinces = sqliteTable('provinces', {
  id: text('id').primaryKey(),
  order: integer('order').notNull().unique(),
  nameHy: text('name_hy').notNull(),
  nameEn: text('name_en').notNull(),
  transliteration: text('transliteration').notNull(),
  division: text('division', { enum: ['western', 'eastern'] }).notNull(),
  epithet: text('epithet').notNull(),
  shortDescription: text('short_description').notNull(),
  description: text('description').notNull(),
  cantons: integer('cantons'),
  landscape: text('landscape').notNull(),
  centerLat: real('center_lat').notNull(),
  centerLng: real('center_lng').notNull(),
  geoJson: text('geo_json'),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
});

export const provinceNames = sqliteTable('province_names', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  provinceId: text('province_id').notNull().references(() => provinces.id, { onDelete: 'cascade' }),
  language: text('language').notNull(),
  name: text('name').notNull(),
  kind: text('kind', { enum: ['historical', 'modern', 'alternate', 'transliteration'] }).notNull(),
});

export const cities = sqliteTable('cities', {
  id: text('id').primaryKey(),
  provinceId: text('province_id').notNull().references(() => provinces.id, { onDelete: 'cascade' }),
  nameHy: text('name_hy').notNull(),
  nameEn: text('name_en').notNull(),
  modernName: text('modern_name').notNull(),
  latitude: real('latitude').notNull(),
  longitude: real('longitude').notNull(),
  category: text('category', { enum: ['capital', 'city', 'monastery', 'fortress', 'site'] }).notNull(),
  note: text('note').notNull(),
});

export const timelineEntries = sqliteTable('timeline_entries', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  provinceId: text('province_id').notNull().references(() => provinces.id, { onDelete: 'cascade' }),
  period: text('period').notNull(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  sortOrder: integer('sort_order').notNull(),
});

export const savedLocations = sqliteTable('saved_locations', {
  telegramUserId: text('telegram_user_id').notNull(),
  entityType: text('entity_type', { enum: ['province', 'city'] }).notNull(),
  entityId: text('entity_id').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
}, (table) => [primaryKey({ columns: [table.telegramUserId, table.entityType, table.entityId] })]);
