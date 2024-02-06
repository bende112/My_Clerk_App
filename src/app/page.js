import { sql } from "@vercel/postgres";
import Link from "next/link";
import LikePost from "./components/LikePost";


export default async function Home() {
  const post_id = 1;
  const profileRes = await sql`SELECT posts.id,content,title, username, bio FROM posts JOIN profiles ON profiles.clerk_user_id = posts.clerk_user_id`;
  console.log(profileRes);

  return(
    <div>
      <h1>Welcome to my page</h1>
      {profileRes.rows.map((profile) =>{
        return(
          <div className="profiles" key={profile.id} href={`/profle/${profile.id}`}>
            <h3>{profile.id} {profile.username} {profile.title} {profile.content}</h3>
            <p>About {profile.bio}</p>
            <Link href={`/posts/${profile.id}`}>post</Link>
            <LikePost post_id={post_id} />
          </div>
        );
      })}
    </div>
  );
}
