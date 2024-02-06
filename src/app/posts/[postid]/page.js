import { sql } from "@vercel/postgres"
import { auth } from "@clerk/nextjs"
import Link from "next/link";


export default async function Post({params}){
  "use server"
  const { userId } = auth();


  const profileRes = await sql`SELECT posts.id,content,title, username, bio FROM posts JOIN profiles ON profiles.clerk_user_id = posts.clerk_user_id WHERE posts.id = ${params.postid}`;

  console.log(profileRes);

  return (
    <div>
      {profileRes.rows.map((profile) =>{
        return(
          <div className="profiles" key={profile.id} href={`/profle/${profile.id}`}>
            <h3>{profile.id} {profile.username} {profile.title} {profile.content}</h3>
            <p>About {profile.bio}</p>
            <Link href={`/posts/${profile.id},${profile.bio}`}>post</Link>
            {/* <LikePost post_id={post_id} /> */}

          </div>
        );
      })}
    </div>
  )
}
