### Neljas loeng 27.10.2022

### Enne loengut
Kuna sel korral on vaja juba andmebaasiga ühendust, siis on selleks vajalik kõigepealt migni andmebaasi mootor ja andmebaas. Mina kasutan selle aine raames edaspidi [MariaDB andmebaasi Dockeris](https://hub.docker.com/_/mariadb). Selleks, et kõigil läheks loengus kaasategemine võimalikult sujuvalt, olen teinud eraldi MariaDB Dockeri image, mille sisse on juba loodud nii andmebaas, kui ka juba lisatud sinna sisse ka minimaalsed andmed.

Nimetatud image kasutamiseks tee nii:
 - lae alla image käsuga `docker pull mrtrvl/blog_db`
 - käivita konteiner käsuga `docker run -d -p 3306:3306 mrtrvl/blog_db`
 - nüüd peaks olema võimalik ühenduda andmebaasiga **blog**, mis töötab `localhost:3306` aadressil. Kasutajanimi on **admin** ja parool on **parool**

- **Teemad**
  - Andmebaasiga liidestamine
  - MySQL/Mariadb

- **Kood**
 - [Kood peale neljandat loengut](https://github.com/tluhk/Programmeerimine-II/tree/b228da8f6e10a0f0a98baa962dbdfa68296fdc6e)

- **Loengus kõlanud märksõnad**
  - Docker
  - `Interface`de muutmine SQL-päringute vastustega klappimiseks
  - Uued `Interface`d selleks, et esimese hooga kood liiga katki ei läheks
  - `SQL` [update](https://dev.mysql.com/doc/refman/8.0/en/insert.html) päring nii `SET` käsuga kui ilma
  - `MySQL`-i `npm` pakk aitab objekti otse päringusse kirjutada
  - `SQL Injection` ja selle vältimine
  - Vigade haldamine `express` API-s
