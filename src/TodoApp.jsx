import React, { useState, useEffect } from "react";
import { Card } from "antd";
import { Button, Input, Select } from "antd";
import { CheckOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

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
    <div className="max-w-lg mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold">Todo List</h1>
      <div className="flex gap-2">
        <Input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a task..."
        />
        <Button type="primary" onClick={addTodo}>
          Add
        </Button>
      </div>
      <div className="flex justify-between">
        <Select value={filter} onChange={(value) => setFilter(value)}>
          <Option value="all">All</Option>
          <Option value="completed">Completed</Option>
          <Option value="pending">Pending</Option>
        </Select>
        <Select value={sort} onChange={(value) => setSort(value)}>
          <Option value="newest">Newest First</Option>
          <Option value="oldest">Oldest First</Option>
        </Select>
      </div>
      <div className="space-y-2">
        {sortedTodos.map((todo) => (
          <Card key={todo.id} className="flex justify-between items-center p-2">
            {editing === todo.id ? (
              <Input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
            ) : (
              <span
                className={todo.completed ? "line-through text-gray-500" : ""}
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
                    icon={<CheckOutlined />}
                    onClick={() => toggleComplete(todo.id)}
                  />
                  <Button
                    size="small"
                    type="text"
                    icon={<EditOutlined />}
                    onClick={() => startEdit(todo)}
                  />
                  <Button
                    size="small"
                    type="text"
                    icon={<DeleteOutlined />}
                    onClick={() => deleteTodo(todo.id)}
                  />
                </>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TodoApp;
