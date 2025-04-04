const proxy = [
  {
    context: "/api",
    // target: "http://localhost:3030",
    target: "https://srv779085.hstgr.cloud:3000",
    pathRewrite: { "^/api": "" },
    secure: false,
    changeOrigin: true
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
