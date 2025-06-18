import { Request, Response } from "express";
import { PrismaClient, tasks } from "@prisma/client";

const client = new PrismaClient();

export const getAllTasks = async (_req: Request, res: Response) => {
  try {
    const tasks = await client.tasks.findMany();
    res.status(200).json(tasks);
  } catch (_e) {
    res
      .status(500)
      .json({ error: "Something went wrong! Please try again later!" });
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description }: tasks = req.body;
    const newTask = await client.tasks.create({
      data: {
        title,
        description,
        isCompleted: false,
      },
    });
    res.status(201).json(newTask);
  } catch (e) {
    res
      .status(500)
      .json({ error: "Something went wrong! Please try again later!" });
  }
};

export const getTaskById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const task = await client.tasks.findUnique({
      where: { id: String(id) },
    });
    if (task) {
      res.status(200).json(task);
    } else {
      res.status(404).json({ message: "Task was not found" });
    }
  } catch (e) {
    res.status(500).json({ message: "Something went wrong. Try again Later!" });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, isCompleted } = req.body;
    const task = await client.tasks.update({
      where: {
        id: String(id),
      },
      data: {
        title: title && title,
        description: description && description,
        isCompleted: isCompleted && isCompleted,
      },
    });
    res.status(200).json(task);
  } catch (e) {
    console.error("Error updating task:", e);
    res.status(500).json({ message: "Something went wrong. Try again Later!" });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await client.tasks.delete({
      where: { id: String(id) },
    });
    res.status(204).send();
  } catch (e) {
    console.error("Error deleting task:", e);
    res.status(500).json({ message: "Something went wrong. Try again Later!" });
  }
};
