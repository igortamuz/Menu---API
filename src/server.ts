import app  from './app';

const port = process.env.MONGODB_PORT || 4000;
export default app.listen(port, () => console.log(`Server running in port: ${port}`));