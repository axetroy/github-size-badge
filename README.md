# github-oauth-serve
用来验证Github的oauth的服务端

验证地址``/oauth?code=:code``

已部署到heroku, https://github-oauth-serve.herokuapp.com/oauth?code=:code

- code为Github授权之后返回的参数, 通过该参数获取到access_token. 这时授权登陆才算完成
