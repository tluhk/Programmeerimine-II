FROM mariadb
COPY ../databaseModel/createDb.sql /docker-entrypoint-initdb.d/
COPY ../databaseModel/insertData.sql /docker-entrypoint-initdb.d/
ENV MYSQL_DATABASE blog
ENV MYSQL_USER admin
ENV MYSQL_PASSWORD parool
ENV MYSQL_ROOT_PASSWORD parool
ENV LANG=C.UTF-8
CMD ["mysqld"]
EXPOSE 3306
