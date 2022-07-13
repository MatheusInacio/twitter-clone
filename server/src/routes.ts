import Router from "@koa/router";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "process";

export const router = new Router();
const prisma = new PrismaClient();

router.get("/tweets", async (ctx) => {

  const authorization = ctx.request.headers.authorization?.split(" ");
  const [, token] = authorization as string[];

  if (!token) {
    ctx.status = 401;
    return;
  }

  try {
    jwt.verify(token, process.env.VITE_JWT_SECRET as string);
    const tweets = await prisma.tweet.findMany();
    ctx.body = tweets; 
  } catch (error) {
    ctx.status = 401;
    return;
  }

});

router.post("/tweets", async (ctx) => {
  const authorization = ctx.request.headers.authorization?.split(" ");
  const [, token] = authorization as string[];

  if (!token) {
    ctx.status = 401;
    return;
  }

  try {
    const payload = jwt.verify(token, process.env.VITE_JWT_SECRET as string);

    const tweet = {
      userId: payload.sub as string,
      text: ctx.request.body.text,
    };

    const doc = await prisma.tweet.create({
      data: tweet,
    });

    ctx.body = doc;
  } catch (error) {
    ctx.status = 401;
    return;
  }
});

router.post("/signup", async (ctx) => {
  const saltRounds = 10;
  const passwordHash = bcrypt.hashSync(ctx.request.body.password, saltRounds);

  try {
    const doc = await prisma.user.create({
      data: {
        name: ctx.request.body.name,
        username: ctx.request.body.username,
        email: ctx.request.body.email,
        password: passwordHash,
      },
    });

    ctx.body = {
      id: ctx.request.body.id,
      name: ctx.request.body.name,
      username: ctx.request.body.username,
      email: ctx.request.body.email,
    };
  } catch (error) {
    if (error instanceof Error) {
      ctx.status = 422;
      ctx.body = "Email ou nome de usuário já existente";
      return;
    }

    ctx.status = 500;
    ctx.body = "Internal Error";
  }
});

router.get("/login", async (ctx) => {
  const authorization = ctx.request.headers.authorization?.split(" ");
  const [, token] = authorization as string[];
  const [email, plainTextPassword] = Buffer.from(token, "base64")
    .toString()
    .split(":");

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    ctx.status = 404;
    return;
  }

  const passwordMatch = bcrypt.compareSync(plainTextPassword, user.password);

  if (passwordMatch) {
    const accessToken = jwt.sign(
      {
        sub: user.id,
      },
      process.env.VITE_JWT_SECRET as string,
      { expiresIn: "24h" }
    );

    ctx.body = {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      accessToken,
    };
  }
});
