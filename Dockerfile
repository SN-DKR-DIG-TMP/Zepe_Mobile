FROM nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY dist/app /usr/share/nginx/html
EXPOSE 8999
