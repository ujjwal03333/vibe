import { getServerSession } from "@/lib/auth-helpers";
import { db } from "@/lib/db";
import { user } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
  const session = await getServerSession();
  if (!session?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  await deleteUser(session.user.id);
  return Response.redirect(new URL("/sign-in", request.url), 303);
}

async function deleteUser(userId: string) {
  await db.delete(user).where(eq(user.id, userId));
}
