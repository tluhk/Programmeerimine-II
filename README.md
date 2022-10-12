# Programmeerimine-II
TLU HK Programmeerimine II aine raames kirjutatud kood

## Millega on tegu?
Tegemist on repositooriumiga, mis sisaldab Tallinna Ülikooli Haapsalu kolledži Rakendusinformaatika õppekava valikaine [Programmeerimine II](https://ois2.tlu.ee/tluois/aine/HKI5003.HK) raames kirjutatud koodi.

Repositoorium on mõeldud toetamaks üliõpilast kursuse jooksul oma API arendamisel paralleelselt sarnast API-t loengute jooksul tehes.

## Loengud
- [Esimene loeng 15.09.2022](apidocs/lectures/first.md)
- [Teine loeng 29.09.2022](apidocs/lectures/second.md)

## Kuidas paigaldada?
1. Klooni repositoorium
```bash
git clone https://github.com/tluhk/Programmeerimine-II.git
```
2. Liigu projekti kausta
```bash
cd Programmeerimine-II
```
3. Paigalda NPM paketid
```bash
npm install
```
4. Käivita projekt
```bash
npm start
```

## Kasutatavad tehnoloogiad
- [NodeJS v16](https://nodejs.org/en/download/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://www.npmjs.com/package/express)

## Kasutatavad tööriistad
- [MS Visual Studio Code](https://code.visualstudio.com/download) koodi kirjutamiseks
 - [Live Share laiendus](https://code.visualstudio.com/learn/collaboration/live-share) koodi jagamiseks loengu ajal jooksvalt
 - [Thunder Client API tööriist](https://www.thunderclient.com/) jooskvalt API endpointidele päringute tegemiseks ja testimiseks

## API dokumentatsioon
### Endpoindid

### API töötamise kontrollimiseks
- `GET /api/v1/health/`

### Kasutajatega seotud
- [Kasutajate pärimine](./apidocs/users/get.md#list-of-users): `GET /api/v1/users/`
- [Kasutaja pärimine id alusel](./apidocs/users/get.md#user-by-id): `GET /api/v1/users/:id/`
- Kasutaja loomine: `POST /api/v1/users/`
- Kasutaja muutmine: `PATCH /api/v1/users/:id/`
- Kasutaja kustutamine: `GET /api/v1/users/:id/`

### Postitustega seotud
- Postituste pärimine: `GET /api/v1/posts/`
- Postituse pärimine id alusel: `GET /api/v1/posts/:id/`
- Postituse loomine: `POST /api/v1/posts/`
- Postituse muutmine: `PATCH /api/v1/posts/:id/`
- Postituse kustutamine: `GET /api/v1/posts/:id/`
- Postitusega seotud kommentaaride pärimine postituse id alusel: `GET /api/v1/posts/:id/comments/`

## Postituse staatusega seotud
- Postituse staatuste pärimine: `GET /api/v1/posts/statuses/`
- Postituse staatuse pärimine id alusel: `GET /api/v1/posts/statuses/:id/`

### Kommentaaridega seotud
- Kommentaaride pärimine: `GET /api/v1/comments/`
- Kommentaari pärimine id alusel: `GET /api/v1/comments/:id/`
- Kommentaari loomine: `POST /api/v1/comments/`
- Kommentaari kustutamine: `GET /api/v1/comments/:id/`
