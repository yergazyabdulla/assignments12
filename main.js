// your_script_file.js
Vue.component('app', {
    template: `
    <div>
      <h1>Task Management App</h1>
      
      <!-- Display Task List -->
      <task-list
        :tasks="tasks"
        @mark-complete="markComplete"
        @mark-incomplete="markIncomplete"
      />
  
      <!-- Add New Task Form -->
      <task-form @add-task="addTask" />
  
      <!-- Display Total Completed and Incomplete Tasks -->
      <task-summary :completed="completedTasks.length" :incomplete="incompleteTasks.length" />
    </div>
    `,
    data() {
        return {
            tasks: [
                { id: 1, title: 'Task 1', completed: false },
                { id: 2, title: 'Task 2', completed: true },
                // ... other tasks
            ],
        };
    },
    computed: {
        completedTasks() {
            return this.tasks.filter(task => task.completed);
        },
        incompleteTasks() {
            return this.tasks.filter(task => !task.completed);
        },
    },
    methods: {
        addTask(newTask) {
            this.tasks.push({
                id: this.tasks.length + 1,
                title: newTask.title,
                completed: newTask.completed,
            });
        },
        markComplete(task) {
            task.completed = true;
        },
        markIncomplete(task) {
            task.completed = false;
        },
    },
    watch: {
        tasks: {
            handler(newTasks) {
                console.log('Task list modified:', newTasks);
            },
            deep: true,
        },
    },
    created() {
        // Fetch initial data or perform setup operations
        // For example, you can make an API request here
    },
});

Vue.component('task-list', {
    template: `
    <div>
      <h2>Task List</h2>
      <ul>
        <li v-for="task in incompleteTasks" :key="task.id">
          {{ task.title }} - Incomplete
          <button @click="markIncomplete(task)">Mark Incomplete</button>
        </li>
        <li v-for="task in completedTasks" :key="task.id">
          {{ task.title }} - Completed
          <button @click="markComplete(task)">Mark Complete</button>
        </li>
      </ul>
    </div>
    `,
    props: {
        tasks: Array,
    },
    methods: {
        markComplete(task) {
            this.$emit('mark-complete', task);
        },
        markIncomplete(task) {
            this.$emit('mark-incomplete', task);
        },
    },
    computed: {
        completedTasks() {
            return this.tasks.filter(task => task.completed);
        },
        incompleteTasks() {
            return this.tasks.filter(task => !task.completed);
        },
    },
});

Vue.component('task-form', {
    template: `
    <div>
      <h2>Add New Task</h2>
      <form @submit.prevent="submitForm">
        <label for="title">Title:</label>
        <input v-model="newTask.title" type="text" id="title" required>
  
        <label for="completed">Completed:</label>
        <input v-model="newTask.completed" type="checkbox" id="completed">
  
        <button type="submit">Add Task</button>
      </form>
    </div>
    `,
    data() {
        return {
            newTask: {
                title: '',
                completed: false,
            },
        };
    },
    methods: {
        submitForm() {
            this.$emit('add-task', this.newTask);
            this.newTask = { title: '', completed: false };
        },
    },
});

Vue.component('task-summary', {
    template: `
    <div>
      <h2>Task Summary</h2>
      <p>Total Completed Tasks: {{ completed }}</p>
      <p>Total Incomplete Tasks: {{ incomplete }}</p>
    </div>
    `,
    props: {
        completed: Number,
        incomplete: Number,
    },
});

// Create and mount the root instance
new Vue({
    el: '#app',
});
