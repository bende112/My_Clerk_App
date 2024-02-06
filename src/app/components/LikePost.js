import { auth } from "@clerk/nextjs";
import { sql } from "@vercel/postgres";

export default async function LikePost({post_id}) {
  const { userId } = auth();

  const likesNum = await sql`SELECT * FROM posts_likes WHERE post_id = ${post_id}`;

  // const likedRes = await sql`SELECT * FROM posts_likes WHERE post_id = ${post_id} AND user_id = ${userId}`;
  const likedRes = await sql`SELECT * FROM posts_likes WHERE post_id = ${post_id}`;


  const liked = likedRes.rows.length === 0 ? false : true;

  async function handleLikes(){
    "use server"

    await sql`INSERT INTO post_likes (user_id, post_id) VALUES (${userId}, ${post_id})`;
    revalidatePath(`/this/path`)
  }

  return (
    <form action={handleLikes}>
      <p>{likesNum.rows.length}</p>
      <button>Likes</button>
    </form>
  )
}


