import express from 'express';
import morgan from "morgan";
import routes from "./routes/file.routes";
const app = express();
const port = 8080;
import cors from 'cors';

app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({
    extended: true
}));
app.use(routes)
app.listen(port, () => {
    console.log(`🚀 Server started on port ${port}!`);
});