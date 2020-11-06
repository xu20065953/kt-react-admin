const {createProxyMiddleware} = require("http-proxy-middleware");
module.exports = function(app){
    app.use(
        createProxyMiddleware("/api",{
            target:"https://oa.kstopa.com.cn:8081",
            changeOrigin:true,
            pathRewrite:{
                // "^/api":""
            }
        })
    )

    app.use(
        createProxyMiddleware("/auth",{
            target:"https://oa.kstopa.com.cn:8000",
            changeOrigin:true,
            pathRewrite:{
                "^/auth":""
            }
        })
    )
}
