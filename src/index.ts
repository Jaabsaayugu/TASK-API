import express from 'express';
import { getAllTasks, createTask, getTaskById, updateTask, deleteTask} from './controllers/tasks.controller'; 

const app = express();
app.use(express.json());

app.get('/', (_req, res) => {
  res.send('<h1>Welcome to Task API!</h1>');
});

app.get('/tasks', getAllTasks);
app.post('/tasks', createTask);
app.get('/tasks/:id', getTaskById);
app.patch('/tasks/:id', updateTask);
app.delete('/tasks/:id', deleteTask);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`App running on http://localhost:${PORT}`));