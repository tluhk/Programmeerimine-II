import config from "./apiConfig";
import app from "./app";

const { port } = config;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('Server is running');
});
