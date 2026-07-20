CREATE TABLE IF NOT EXISTS "reading_lists" (
  "id" serial PRIMARY KEY NOT NULL,
  "user_id" integer NOT NULL,
  "blog_id" integer NOT NULL,
  "read" boolean DEFAULT false NOT NULL,
  CONSTRAINT "reading_lists_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT "reading_lists_blog_id_blogs_id_fk" FOREIGN KEY ("blog_id") REFERENCES "blogs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);
