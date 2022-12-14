import express from 'express';
import 'dotenv/config';
import userRouter from './routes/user.routes';
import roomRouter from './routes/room.routes';
import authRouter from './routes/auth.routes';
import groupRouter from './routes/group.routes';
import cors from 'cors';

const app = express();

app.use(cors())

app.use(express.json())
app.use('/api', userRouter);
app.use('/api', roomRouter);
app.use('/api', authRouter);
app.use('/api', groupRouter);

app.get('/', (req, res) => {
    res.send('Well doddne!');
})

app.listen(process.env.PORT, () => {
    console.log(`On port localhost:${process.env.PORT}`);
})