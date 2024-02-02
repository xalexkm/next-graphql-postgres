import client from "@/src/app/client";
import jwt from "jsonwebtoken";
import { authenticate } from "@/src/app/api/login/utils";
import { LoginDetails, User } from "@/src/app/api/login/types";
import { GET_USER_BY_EMAIL } from "@/src/app/api/sql";
import { hashPassword } from "@/src/app/api/login/utils";

const JWT_SECRET = process.env.JWT_SECRET as string;

export async function POST(req: Request): Promise<Response> {
  try {
    const body = await req.json();
    const { email, password }: LoginDetails = body;

    const { data } = await client.query({
      query: GET_USER_BY_EMAIL,
      variables: { email },
      fetchPolicy: "no-cache",
    });

    const [user_details]: User[] = data.getUserByEmail || [];

    if (!user_details) {
      throw new Error("User not found");
    }

    const { hash: hashed_password } = hashPassword(
      password,
      user_details.password_salt,
    );

    if (hashed_password !== user_details.password_hash) {
      throw new Error("Invalid username or password");
    }

    const token = jwt.sign({ user_id: user_details.user_id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    return new Response(JSON.stringify({ token }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Authentication failed" }), {
      status: 401,
    });
  }
}

export async function GET(req: Request) {
  let newToken: string | null = null;
  try {
    const auth = authenticate(req);
    newToken = jwt.sign({ user_id: auth.user_id }, JWT_SECRET, {
      expiresIn: "1h",
    });
  } catch (e) {
    return new Response(
      JSON.stringify({ message: "Invalid token or session is expired" }),
      { status: 401 },
    );
  }
  return Response.json({ token: newToken });
}
