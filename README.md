# Programmeerimine-II
TLU HK Programmeerimine II aine raames kirjutatud kood

## Millega on tegu?
Tegemist on repositooriumiga, mis sisaldab Tallinna Ülikooli Haapsalu kolledži Rakendusinformaatika õppekava valikaine [Programmeerimine II](https://ois2.tlu.ee/tluois/aine/HKI5003.HK) raames kirjutatud koodi.

Repositoorium on mõeldud toetamaks üliõpilast kursuse jooksul oma API arendamisel paralleelselt sarnast API-t loengute jooksul tehes.

## Loengud
### Esimene loeng 15.09.2022
- Märksõnad
  - API
  - [NodeJS](https://nodejs.org/en/)
  - [NPM](https://www.npmjs.com/)
  - [TypeScript](https://www.typescriptlang.org/)
  - [ts-node](https://www.npmjs.com/package/ts-node)
  - [nodemon](https://nodemon.io/)
  - [Issue linkimine branchiga](https://docs.github.com/en/issues/tracking-your-work-with-issues/creating-a-branch-for-an-issue)
  - [callback funktsioon](https://developer.mozilla.org/en-US/docs/Glossary/Callback_function)
  - endpoint
  - [objekti destruktureerimine](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
  - [template literal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)


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
- 

## Kasutatavad tööriistad
- [MS Visual Studio Code](https://code.visualstudio.com/download) koodi kirjutamiseks
 - [Live Share laiendus](https://code.visualstudio.com/learn/collaboration/live-share) koodi jagamiseks loengu ajal jooksvalt
 - [Thunder Client API tööriist](https://www.thunderclient.com/) jooskvalt API endpointidele päringute tegemiseks ja testimiseks

## API dokumentatsioon
### Endpoindid

### Kasutajatega seotud
- [Kasutajate pärimine](./apidocs/users/get.md#list-of-users): `GET /api/v1/users/`
- [Kasutaja pärimine id alusel](./apidocs/users/get.md#user-by-id): `GET /api/v1/users/:id/`
- Kasutaja loomine: `POST /api/v1/users/`
- Kasutaja muutmine: `GET /api/v1/users/:id/`
- Kasutaja kustutamine: `GET /api/v1/users/:id/`
