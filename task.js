const readline = require('readline');

// Create an interface to read input from the terminal
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Task scheduler
const tasks = [];

// Function to add tasks
function addTask(title, description, dueDate) {
    const task = {
        title,
        description,
        dueDate,
        completed: false
    };
    tasks.push(task);
    console.log(`Task "${title}" added successfully!`);
}

// Function to display tasks sorted by due dates
function displayTasks() {
    const sortedTasks = tasks.slice().sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    console.log("\nTasks:");
    sortedTasks.forEach(task => {
        console.log(`${task.title} - Due Date: ${task.dueDate} - Completed: ${task.completed}`);
    });
}

// Function to update or mark tasks as completed
function updateTask(title, newDescription, newDueDate, markCompleted) {
    const taskIndex = tasks.findIndex(task => task.title === title);
    if (taskIndex !== -1) {
        const task = tasks[taskIndex];
        if (newDescription) task.description = newDescription;
        if (newDueDate) task.dueDate = newDueDate;
        if (markCompleted) task.completed = true;
        console.log(`Task "${title}" updated successfully!`);
    } else {
        console.log(`Task "${title}" not found!`);
    }
}

// Function to remove tasks
function removeTask(title) {
    const taskIndex = tasks.findIndex(task => task.title === title);
    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        console.log(`Task "${title}" removed successfully!`);
    } else {
        console.log(`Task "${title}" not found!`);
    }
}

// Function to get user input
function getUserInput(question) {
    return new Promise(resolve => {
        rl.question(question, answer => {
            resolve(answer);
        });
    });
}

// Main interaction loop
async function main() {
    while (true) {
        console.log("\nOptions:");
        console.log("1. Add Task");
        console.log("2. Display Tasks");
        console.log("3. Update Task");
        console.log("4. Remove Task");
        console.log("5. Exit");

        const choice = await getUserInput("Select an option (1-5): ");

        switch (choice) {
            case '1':
                const title = await getUserInput("Enter task title: ");
                const description = await getUserInput("Enter task description: ");
                const dueDate = await getUserInput("Enter due date (YYYY-MM-DD): ");
                addTask(title, description, dueDate);
                break;

            case '2':
                displayTasks();
                break;

            case '3':
                const taskToUpdate = await getUserInput("Enter the title of the task to update: ");
                const newDescription = await getUserInput("Enter new description (or press Enter to skip): ");
                const newDueDate = await getUserInput("Enter new due date (or press Enter to skip): ");
                const markCompleted = (await getUserInput("Mark as completed? (y/n): ")).toLowerCase() === 'y';
                updateTask(taskToUpdate, newDescription, newDueDate, markCompleted);
                break;

            case '4':
                const taskToRemove = await getUserInput("Enter the title of the task to remove: ");
                removeTask(taskToRemove);
                break;

            case '5':
                console.log("Exiting Task Scheduler. Goodbye!");
                rl.close();
                process.exit(0);

            default:
                console.log("Invalid choice. Please enter a number from 1 to 5.");
        }
    }
}

// Start the task scheduler
main();
