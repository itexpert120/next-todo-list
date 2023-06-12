"use client";

import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { Article, Modal, CompletedTasks } from "../components/index";

function useTasks(initialTasks: Task[] = []) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  function addTask(newTask: Task) {
    const updatedTasks: Task[] = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  }

  return {
    tasks,
    addTask,
    setTasks,
  };
}

function useCompletedTasks(initialCompletedTasks: Task[] = []) {
  const [completedTasks, setCompletedTasks] = useState<Task[]>(
    initialCompletedTasks
  );

  const clearCompleted = () => {
    setCompletedTasks([]);
    localStorage.setItem("completedTasks", JSON.stringify([]));
  };

  return {
    completedTasks,
    clearCompleted,
    setCompletedTasks,
  };
}

function TasksList({
  tasks,
  onDelete,
}: {
  tasks: Task[];
  onDelete: (index: number) => void;
}) {
  if (tasks.length === 0) {
    return <p className="py-2 text-center text-xl">No Tasks Added</p>;
  }

  return (
    <div className="flex flex-col gap-2">
      {tasks.map((t: Task, i) => (
        <Article
          key={i}
          title={t.title}
          body={t.summary}
          onDelete={() => onDelete(i)}
        />
      ))}
    </div>
  );
}

export default function Home() {
  const [showModal, setShowModal] = useState(false);

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");

  const { tasks, addTask, setTasks } = useTasks([]);
  const { completedTasks, clearCompleted, setCompletedTasks } =
    useCompletedTasks([]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newTask: Task = {
      id: uuid(),
      title: title,
      summary: summary,
    };
    addTask(newTask);

    // clear values
    setShowModal(false);
    setTitle("");
    setSummary("");
  }

  function deleteTask(index: number) {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    const newCompletedTasks = [...completedTasks, tasks[index]];
    setTasks(updatedTasks);
    setCompletedTasks(newCompletedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    localStorage.setItem("completedTasks", JSON.stringify(newCompletedTasks));
  }

  useEffect(() => {
    // Retrieve tasks from local storage on component mount
    const savedTasks = localStorage.getItem("tasks");
    const savedCompletedTasks = localStorage.getItem("completedTasks");

    if (savedTasks) {
      const parsedTasks: Task[] = JSON.parse(savedTasks);
      setTasks(parsedTasks);
    }

    if (savedCompletedTasks) {
      const parsedCompletedTasks: Task[] = JSON.parse(savedCompletedTasks);
      setCompletedTasks(parsedCompletedTasks);
    }
  }, [setCompletedTasks, setTasks]);

  return (
    <>
      <div className="max-w-[550px] mx-auto my-12 dark">
        <div className="m-4">
          <div className="my-4">
            <h1 className="text-4xl font-black">My Tasks</h1>
          </div>

          <TasksList tasks={tasks} onDelete={deleteTask} />

          <button
            type="button"
            className="text-white text-sm bg-sky-500 hover:bg-sky-600 rounded-lg w-full py-2 my-4"
            onClick={() => setShowModal(true)}
          >
            New Task
          </button>

          <Modal
            showModal={showModal}
            handleSubmit={handleSubmit}
            title={title}
            setTitle={setTitle}
            summary={summary}
            setSummary={setSummary}
            setShowModal={setShowModal}
          />

          <CompletedTasks
            completedTasks={completedTasks}
            clearCompleted={clearCompleted}
          />
        </div>
      </div>
    </>
  );
}
