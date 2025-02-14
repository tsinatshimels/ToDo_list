import React, { useState, useEffect } from "react";
import { Card, Button, Input, Select } from "antd";
import {
  CheckOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";

const { Option } = Select;

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("newest");
  const [editing, setEditing] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(savedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!task.trim()) return;
    const newTodo = {
      id: Date.now(),
      text: task,
      completed: false,
      date: new Date(),
    };
    setTodos([...todos, newTodo]);
    setTask("");
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const startEdit = (todo) => {
    setEditing(todo.id);
    setEditText(todo.text);
  };

  const saveEdit = (id) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: editText } : todo))
    );
    setEditing(null);
  };

  const filteredTodos = todos.filter((todo) =>
    filter === "all"
      ? true
      : filter === "completed"
      ? todo.completed
      : !todo.completed
  );

  const sortedTodos = filteredTodos.sort((a, b) =>
    sort === "newest" ? b.date - a.date : a.date - b.date
  );

  return (
    <div className="width mx-auto p-6   rounded-lg mt-10">
      <h1 className="text-[3.5rem] font-semibold text-center text-gray-800 mb-10">
        Todo List
      </h1>

      <div className="flex gap-4 mb-4">
        <Input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a task..."
          className="w-full border rounded-lg px-3 py-2"
        />
        <Button type="primary" icon={<PlusOutlined />} onClick={addTodo}>
          Add
        </Button>
      </div>

      <div className="flex justify-between mb-4 gap-3">
        <Select
          className="w-1/2"
          value={filter}
          onChange={(value) => setFilter(value)}
        >
          <Option value="all">All</Option>
          <Option value="completed">Completed</Option>
          <Option value="pending">Pending</Option>
        </Select>
        <Select
          className="w-1/2"
          value={sort}
          onChange={(value) => setSort(value)}
        >
          <Option value="newest">Newest First</Option>
          <Option value="oldest">Oldest First</Option>
        </Select>
      </div>

      <div className="space-y-3">
        {sortedTodos.map((todo) => (
          <Card
            key={todo.id}
            className=" items-center p-3 border rounded-lg shadow-sm bg-gray-50"
          >
            <div className="gap-2 flex justify-between items-center">
              {editing === todo.id ? (
                <Input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="w-full"
                />
              ) : (
                <span
                  className={`text-lg ${
                    todo.completed
                      ? "line-through text-gray-500"
                      : "text-gray-800"
                  }`}
                >
                  {todo.text}
                </span>
              )}

              <div className="flex gap-2">
                {editing === todo.id ? (
                  <Button
                    size="small"
                    type="default"
                    onClick={() => saveEdit(todo.id)}
                  >
                    Save
                  </Button>
                ) : (
                  <>
                    <Button
                      size="small"
                      type="text"
                      icon={<CheckOutlined className="text-green-500" />}
                      onClick={() => toggleComplete(todo.id)}
                    />
                    <Button
                      size="small"
                      type="text"
                      icon={<EditOutlined className="text-blue-500" />}
                      onClick={() => startEdit(todo)}
                    />
                    <Button
                      size="small"
                      type="text"
                      icon={<DeleteOutlined style={{ color: "red" }} />}
                      onClick={() => deleteTodo(todo.id)}
                    />
                  </>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TodoApp;
