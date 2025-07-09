import aj from "../config/arcjet.js";

const arcjetMiddleware = async (req, res, next) => {
  try {
    const decision = await aj.protect(req, { requested: 1 });

    // Skip Arcjet for Postman and development
    const userAgent = req.headers["user-agent"] || "";
    if (
      process.env.NODE_ENV === "development" ||
      userAgent.includes("PostmanRuntime")
    ) {
      console.log("Skipping Arcjet for Postman/dev");
      return next();
    }

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res.status(429).json({ error: "Rate limit exceeded" });
      }
      //Allowing postman: postman is flagged as bot
      if (decision.reason.isBot()) {
        return res.status(403).json({ error: "Bot detected" });
      }
      return res.status(403).json({ error: "Access denied" });
    }
    next(); //go to the next step weather sign up sign in or anything
  } catch (error) {
    console.log("arcjet middleware error: ", error);
    next(error);
  }
};
export default arcjetMiddleware;
