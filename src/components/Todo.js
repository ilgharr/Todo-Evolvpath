import React from 'react';
import Container from 'react-bootstrap/Container';

const TodoList = ({ todos, handleDelete, handleSaveText, handleStatusChange }) => (
    <Container className="todo-list">
        {todos.map((todo, index) => (

            <Container className="todo-item row m-1 p-0" key={index} style={{ backgroundColor: todo.isDone ? "#004000" : "black" }}>
                <input
                    className="todo-text-box col"
                    type="text"
                    placeholder={todo.text}
                    value={todos[index].text}
                    onChange={(e) => handleSaveText(e.target.value, index)}
                />
                <Container className="col-auto d-flex justify-content-end m-0 p-0 item-button-container">
                    <button className="dark-button item-button" onClick={() => handleDelete(index)}>Delete</button>
                    <button className="dark-button item-button" onClick={() => handleStatusChange(index, !todo.isDone)}>
                        {todo.isDone ? 'Un Done' : 'Done'}
                    </button>
                </Container>
            </Container>

        ))}
    </Container>
);

const Todo = ({todos, setTodos}) => {
    const addTodo = () => {
        setTodos([...todos, {text: '', isDone: false}]);
    };
    const deleteTodo = (index) => {
        setTodos((prevTodos) => prevTodos.filter((_, i) => i !== index));
    };
    const markTodoStatus = (index, isDone) => {
        const newTodos = [...todos];
        newTodos[index].isDone = isDone;
        setTodos(newTodos);
    };
    const saveTodoText = (newText, index) => {
        const newTodos = [...todos];
        newTodos[index].text = newText;
        setTodos(newTodos);
    };

    return (
        <>
            <button type="submit" className="new-todo dark-button" onClick={addTodo}>Add Todo</button>
            <TodoList
                todos={todos}
                handleDelete={deleteTodo}
                handleSaveText={saveTodoText}
                handleStatusChange={markTodoStatus}
            />

        </>
    );
};

export default Todo;
