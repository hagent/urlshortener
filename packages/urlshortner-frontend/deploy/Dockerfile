FROM nginx:1.9.10

COPY deploy/default.conf /etc/nginx/conf.d/default.conf
COPY build /usr/share/nginx/html/

CMD ["nginx", "-g", "daemon off;"]
