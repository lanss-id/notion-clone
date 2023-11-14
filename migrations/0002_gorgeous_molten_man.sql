ALTER TABLE "files" RENAME COLUMN "forder_id" TO "folder_id";--> statement-breakpoint
ALTER TABLE "files" DROP CONSTRAINT "files_forder_id_folders_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "files" ADD CONSTRAINT "files_folder_id_folders_id_fk" FOREIGN KEY ("folder_id") REFERENCES "folders"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
