import { auth } from "@clerk/nextjs"
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/dist/server/api-utils";

export default function CreateProfile() {
  const { userId } = auth();

  async function newProfile(formData) {
    "use server";
    const username = formData.get("username");
    const bio = formData.get("bio");

    await sql`INSERT INTO profiles (clerk_user_id, username, bio) VALUES (${userId}, ${username}, ${bio})`;
    revalidatePath("/");
    redirect("/");

  }

  return (
      <div>
        <form action={newProfile}>
          <label htmlFor="user">Username</label>
          <input name="username" id="username" placeholder="user" required />
          <label htmlFor="content">Content</label>
          <textarea name="bio" placeholder="bio" required ></textarea>
          <button type="submit">Create Profile</button>
        </form>
      </div>
    );
}
