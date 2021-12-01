if (process.env.NODE_ENV === "development") {
  require("dotenv").config();
}

module.exports = {
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXT_PUBLIC_CLIENT_SECRET: process.env.NEXT_PUBLIC_CLIENT_SECRET,
    NEXT_PUBLIC_CLIENT_ID: process.env.NEXT_PUBLIC_CLIENT_ID,
    JWT_SECRET: process.env.JWT_SECRET,
  },
};
