"use client";

import { useEffect, useState } from "react";
import { Article, Modal, CompletedTasks } from "../components/index";

export default function Home() {
  const [showModal, setShowModal] = useState(false);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newTask: Task = {
      title: title,
      summary: summary,
    };
    const newTasks: Task[] = [...tasks, newTask];
    setTasks(newTasks);

    // Save newTasks to local storage
    localStorage.setItem("tasks", JSON.stringify(newTasks));

    // clear values
    setShowModal(false);
    setTitle("");
    setSummary("");
  }

  const handleDelete = (index: number) => {
    const updatedList = [...tasks];
    updatedList.splice(index, 1); // Remove task from updatedList

    const newCompletedTasks = [...completedTasks, tasks[index]]; // Access the task from the original tasks array

    setTasks(updatedList);
    setCompletedTasks(newCompletedTasks);

    // Save updated tasks to local storage
    localStorage.setItem("tasks", JSON.stringify(updatedList));
    localStorage.setItem("completedTasks", JSON.stringify(newCompletedTasks));
  };

  function clearCompleted() {
    setCompletedTasks([]);
    localStorage.setItem("completedTasks", JSON.stringify([]));
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
  }, []);

  return (
    <>
      <div className="max-w-[550px] mx-auto my-12 dark">
        <div className="m-4">
          <div className="my-4">
            <h1 className="text-4xl font-black">My Tasks</h1>
          </div>
          <div className="flex flex-col gap-2">
            {tasks.length !== 0 ? (
              tasks.map((t: Task, i) => (
                <Article
                  key={i}
                  title={t.title}
                  body={t.summary}
                  onDelete={() => handleDelete(i)}
                />
              ))
            ) : (
              <p className="py-2 text-center text-xl">No Tasks Added</p>
            )}
          </div>
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
