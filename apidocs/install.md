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
4. `\src` kausta loo `apiConfigSample.ts` faili alusel `apiConfig.ts` fail oma poolt valitud väärtustega (port, jwtSecret jne)
5. Käivita projekt
```bash
npm start
```
API töötamist saad kontrollida:


[http://localhost:3000/api/v1/health](http://localhost:3000/api/v1/health)

