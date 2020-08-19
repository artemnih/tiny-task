import { Component } from '@angular/core';

interface Task {
    text: string;
    done: boolean;
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public tasks: Task[] = [];
    public newTaskText = '';

    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    }

    add() {
        if (this.newTaskText) {
            this.tasks.unshift({ text: this.newTaskText, done: false } as Task);
            this.newTaskText = '';
        }
        this.save();
    }

    complete(id: number) {
        const task = this.tasks.splice(id, 1).pop();
    }

    save() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    check(e: Event, i: number) {
        const checked = (e.currentTarget as HTMLInputElement).checked;
        this.tasks[i].done = checked;
        this.save();
    }

    deleteTask(i: number) {
        this.tasks.splice(i, 1);
    }

}
