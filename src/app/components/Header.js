import Link from "next/link";

export default function Header() {
  return (
    <header>
      <p>My Blogs</p>
      <nav>
        <Link href="/"></Link>
        <Link href="/profile">CreateProfile</Link>
      </nav>
    </header>
  );
}
