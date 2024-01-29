import { auth } from "@clerk/nextjs";

export default function AdminPage() {
  const { userId } = auth();

  if (userId !== "") {
    return <p></p>;
  }

  return (<div>
    <p></p>
  </div>
  );
}
