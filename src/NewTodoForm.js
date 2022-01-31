import React from "react";

function NewTodoForm(props) {
  // const [task, setTask] = React.useState('');
  const inputRef = React.useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputRef.current.value);
    props.handleAddTodo(inputRef.current.value);
    inputRef.current.value = "";
		// props.history.push("/todos");
  };
	
  React.useEffect(() => {
    console.log("Mounted NewTodoForm");
    return () => {
      console.log("Unmounted NewTodoForm");
    }
  }, []);


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input ref={inputRef} type="text" name="task" />
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}

export default NewTodoForm;
