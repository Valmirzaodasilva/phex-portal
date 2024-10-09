const proxy = [
  {
    context: "/api",
    target: "http://localhost:3030",
    pathRewrite: { "^/api": "" },
  },
  {
    context: "/ssw",
    target: "https://ssw.inf.br",
    secure: false,
    changeOrigin: true,
    pathRewrite: { "^/ssw": "" },
  },
];
module.exports = proxy;
