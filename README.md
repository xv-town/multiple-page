#### 样式

```css
main: 
color1: #1890ff;

sub:
color1: #E8E8E8;
```

#### nginx 配置

```
# 前端资源存放服务
server {
  listen 84;
  server_name multiple_page;

  # 前端静态资源转发
  location ^~ / {
    alias /Volumes/dev-1/self/templates/multiple-page/dist/;
  }
  # 路由转发模板
  location ^~ /eg-vue/ {
    root /Volumes/dev-1/self/templates/multiple-page/dist;
    try_files $uri $uri/ /eg-vue/index.html;
  }
  location ^~ /eg-react/ {
    root /Volumes/dev-1/self/templates/multiple-page/dist;
    try_files $uri $uri/ /eg-react/index.html;
  }
}

# 过网关二级目录模拟服务
server {
  listen 86;
  server_name gateway;

  location ^~ /passid/ {
    proxy_pass http://localhost:84/;
    proxy_set_header Host $host:$server_port;
  }
}
```