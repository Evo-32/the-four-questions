const readlineSync = require('readline-sync');

// ToDo list represented as an array
const todoList = [];

// Function to add tasks to the ToDo list with specified categories
function addTask() {
  const taskName = readlineSync.question('Enter task name: ');
  const category = readlineSync.question('Enter task category: ');

  // Add the task as an object to the ToDo list array
  todoList.push({
    name: taskName,
    category: category,
    completed: false,
  });

  console.log('Task added successfully!\n');
}

// Function to display tasks grouped by their categories
function displayTasksByCategory() {
  const categories = {};

  // Group tasks by category
  todoList.forEach((task) => {
    if (!categories[task.category]) {
      categories[task.category] = [];
    }

    categories[task.category].push(task);
  });

  // Display tasks by category
  Object.keys(categories).forEach((category) => {
    console.log(`\nCategory: ${category}`);
    categories[category].forEach((task) => {
      console.log(`- [${task.completed ? 'X' : ' '}] ${task.name}`);
    });
  });
}

// Function to mark tasks as completed
function markTaskAsCompleted() {
  const taskIndex = readlineSync.questionInt('Enter the index of the task to mark as completed: ');

  if (taskIndex >= 0 && taskIndex < todoList.length) {
    todoList[taskIndex].completed = true;
    console.log('Task marked as completed!\n');
  } else {
    console.log('Invalid task index.\n');
  }
}

// Function to remove tasks from the ToDo list
function removeTask() {
  const taskIndex = readlineSync.questionInt('Enter the index of the task to remove: ');

  if (taskIndex >= 0 && taskIndex < todoList.length) {
    todoList.splice(taskIndex, 1);
    console.log('Task removed successfully!\n');
  } else {
    console.log('Invalid task index.\n');
  }
}

// Main loop for user interactions
function main() {
  let choice;

  do {
    console.log('\nToDo List Menu:');
    console.log('1. Add Task');
    console.log('2. Display Tasks by Category');
    console.log('3. Mark Task as Completed');
    console.log('4. Remove Task');
    console.log('5. Exit');

    choice = readlineSync.questionInt('Enter your choice: ');

    switch (choice) {
      case 1:
        addTask();
        break;
      case 2:
        displayTasksByCategory();
        break;
      case 3:
        markTaskAsCompleted();
        break;
      case 4:
        removeTask();
        break;
      case 5:
        console.log('Exiting ToDo List. Goodbye!');
        break;
      default:
        console.log('Invalid choice. Please try again.');
    }
  } while (choice !== 5);
}

// Start the application
main();
