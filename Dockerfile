# Prepare nginx
FROM nginx:1.16.0-alpine

COPY build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY nginx/gzip.conf /etc/nginx/conf.d/gzip.conf

# Fire up nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]