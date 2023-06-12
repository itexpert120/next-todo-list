"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { Article } from "../components/index";
import { json } from "stream/consumers";

type Task = {
  title: string;
  summary: string;
};

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

          {showModal ? (
            <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
              <div className="mx-4 w-[500px] flex flex-col">
                <div className="bg-white p-2 rounded-lg">
                  <div className="p-6 text-left">
                    <h3 className="mb-4 text-xl font-medium text-gray-900">
                      Add New Task
                    </h3>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                      <div>
                        <label
                          htmlFor="title"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Title<span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="title"
                          id="title"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          className="bg-gray-50 border border-gay-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="summary"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Summary
                        </label>
                        <input
                          type="text"
                          name="summary"
                          id="summary"
                          value={summary}
                          onChange={(e) => setSummary(e.target.value)}
                          className="bg-gray-50 border border-gay-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        />
                      </div>
                      <div className="flex justify-between">
                        <button
                          className="text-sky-400 text-sm hover:bg-sky-100 rounded-lg w-[125px] py-2 my-2"
                          onClick={() => setShowModal(false)}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="text-white text-sm bg-sky-500 hover:bg-sky-600 rounded-lg  w-[125px] py-2 my-2"
                        >
                          Add Task
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          <div className="my-4">
            <h1 className="text-2xl font-bold">Completed Tasks</h1>
          </div>
          <div className="my-4 flex flex-col gap-2">
            {completedTasks.length !== 0 && (
              <button
                type="button"
                className="text-white text-sm bg-sky-500 hover:bg-sky-600 rounded-lg w-full py-2"
                onClick={clearCompleted}
              >
                Clear Completed
              </button>
            )}
            {completedTasks.length !== 0 ? (
              completedTasks.map((t: Task, i) => (
                <>
                  <div className="border rounded-lg p-4 bg-gray-100">
                    <div className="flex flex-row justify-between">
                      <h1 className="font-bold text-lg">{t.title}</h1>
                    </div>
                    <p className="text-black my-1">{t.summary}</p>
                  </div>
                </>
              ))
            ) : (
              <p className="py-2 text-center text-md">No Tasks Completed</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
