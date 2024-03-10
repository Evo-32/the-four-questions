const readline = require('readline');

class Book {
    constructor(title, author) {
        this.title = title;
        this.author = author;
        this.available = true;
    }
}

/*class Library {
    constructor() {
        this.books = [];
    }*/
    let books= [];
    function addBook(title, author) {
        const newBook = new Book(title, author);
        books.push(newBook);
        console.log(`Book '${title}' by ${author} added to the library.`);
    }

     function displayAvailableBooks() {
        console.log("Available Books:");
        books.forEach(book => {
            if (book.available) {
                console.log(`${book.title} by ${book.author}`);
            }
        });
    }

    function borrowBook(title) {
        const book = books.find(book => book.title === title);

        if (book) {
            if (book.available) {
                book.available = false;
                console.log(`You have successfully borrowed '${title}'.`);
            } else {
                console.log(`Sorry, '${title}' is currently unavailable.`);
            }
        } else {
            console.log(`Book '${title}' not found in the library.`);
        }
    }

     function returnBook(title) {
        const book = books.find(book => book.title === title);

        if (book) {
            if (!book.available) {
                book.available = true;
                console.log(`Thank you for returning '${title}'.`);
            } else {
                console.log(`This book '${title}' is not borrowed.`);
            }
        } else {
            console.log(`Book '${title}' not found in the library.`);
        }
    }
// }

// Function to get user input
async function getUserInput(question) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise(resolve => {
        rl.question(question, (answer) => {
            rl.close();
            resolve(answer);
        });
    });
}

// Example Usage
async function main() {

    while (true) {
        console.log("\nChoose an option:");
        console.log("1. Add a Book");
        console.log("2. Display Available Books");
        console.log("3. Borrow a Book");
        console.log("4. Return a Book");
        console.log("5. Exit");

        const choice = await getUserInput("Enter your choice: ");

        switch (choice) {
            case "1":
                const title = await getUserInput("Enter the book title: ");
                const author = await getUserInput("Enter the author: ");
                addBook(title, author);
                break;
            case "2":
                displayAvailableBooks();
                break;
            case "3":
                const borrowTitle = await getUserInput("Enter the book title to borrow: ");
                borrowBook(borrowTitle);
                break;
            case "4":
                const returnTitle = await getUserInput("Enter the book title to return: ");
                returnBook(returnTitle);
                break;
            case "5":
                console.log("Goodbye!");
                process.exit(0);
            default:
                console.log("Invalid choice. Please choose a valid option.");
        }
    }
}

main();