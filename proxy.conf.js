const proxy = [
  {
    context: "/api",
    target: "http://localhost:3030",
    pathRewrite: { "^/api": "" },
  },
];
module.exports = proxy;
