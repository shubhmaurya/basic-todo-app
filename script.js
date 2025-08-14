/**
 * Renumbers all todo items after addition or deletion.
 * Ensures numbering is always sequential.
 */
function renumberTodos() {
    const todoTexts = document.querySelectorAll(".todo-text");
    todoTexts.forEach((span, idx) => {
        const text = span.textContent.replace(/^\d+\. /, '');
        span.textContent = `${idx + 1}. ${text}`;
    });
}

/**
 * Adds a new todo item to the list.
 * Handles numbering, editing, and deletion.
 */
function addTodo() {
    const input = document.querySelector(".input");
    const value = input.value.trim();
    if (value === "") return; // Ignore empty input

    // Create todo item container
    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");

    // Create text span with numbering
    const textSpan = document.createElement("span");
    textSpan.textContent = value; // Numbering handled by renumberTodos
    textSpan.classList.add("todo-text");

    // --- Edit Button ---
    const editBtn = document.createElement("button");
    editBtn.textContent = "✏️";
    editBtn.classList.add("edit-btn");
    editBtn.setAttribute("aria-label", "Edit todo");

    // --- Delete Button ---
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑️";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.setAttribute("aria-label", "Delete todo");

    // Assemble todo item
    todoItem.appendChild(textSpan);
    todoItem.appendChild(editBtn);
    todoItem.appendChild(deleteBtn);

    // Add to todo list
    document.querySelector(".todos").appendChild(todoItem);
    input.value = "";

    renumberTodos();
}

// Event delegation for edit and delete buttons
document.querySelector(".todos").addEventListener("click", function (e) {
    const target = e.target;
    const todoItem = target.closest(".todo-item");
    if (!todoItem) return;

    // --- Edit Button ---
    if (target.classList.contains("edit-btn")) {
        const textSpan = todoItem.querySelector(".todo-text");
        const currentText = textSpan.textContent.replace(/^\d+\. /, '');
        const inputField = document.createElement("input");
        inputField.type = "text";
        inputField.value = currentText;
        inputField.classList.add("edit-input");

        // Disable other edit buttons while editing
        document.querySelectorAll(".edit-btn").forEach(btn => btn.disabled = true);
        todoItem.replaceChild(inputField, textSpan);
        inputField.focus();

        // On blur, update text and restore numbering
        inputField.addEventListener("blur", () => {
            const newText = inputField.value.trim();
            if (newText !== "") {
                textSpan.textContent = newText;
            }
            todoItem.replaceChild(textSpan, inputField);
            renumberTodos();
            document.querySelectorAll(".edit-btn").forEach(btn => btn.disabled = false);
        });

        // Allow Enter key to confirm edit
        inputField.addEventListener("keypress", (e) => {
            if (e.key === "Enter") inputField.blur();
        });
    }

    // --- Delete Button ---
    if (target.classList.contains("delete-btn")) {
        todoItem.remove();
        renumberTodos();
    }
});

// Listen for Enter key to add todo
document.querySelector(".input").addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        addTodo();
    }
});

// Add Dark Mode Toggle Button
const darkModeBtn = document.createElement("button");
darkModeBtn.textContent = "🌙 Dark Mode";
darkModeBtn.id = "darkModeBtn";
darkModeBtn.setAttribute("aria-label", "Toggle dark mode");

// Style for top right fixed position
darkModeBtn.style.position = "fixed";
darkModeBtn.style.top = "24px";
darkModeBtn.style.right = "32px";
darkModeBtn.style.zIndex = "1000";
darkModeBtn.style.padding = "10px 18px";
darkModeBtn.style.borderRadius = "10px";
darkModeBtn.style.border = "none";
darkModeBtn.style.background = "#22223b";
darkModeBtn.style.color = "#fff";
darkModeBtn.style.fontWeight = "600";
darkModeBtn.style.cursor = "pointer";
darkModeBtn.style.fontSize = "1rem";
darkModeBtn.style.boxShadow = "0 2px 8px rgba(44,62,80,0.15)";
darkModeBtn.style.transition = "background 0.3s";

// Toggle dark mode and button text
darkModeBtn.onclick = function () {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
        darkModeBtn.textContent = "☀️ Light Mode";
    } else {
        darkModeBtn.textContent = "🌙 Dark Mode";
    }
};

// Add button to body (top right corner)
document.body.appendChild(darkModeBtn);