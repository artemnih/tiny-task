import { Component, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

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
    @ViewChildren('nodeInput') nodeInputs: QueryList<ElementRef>;

    public tasks: Task[] = [];
    public newTaskText = '';
    public editIndex = -1;
    public editorValue = '';

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

    clear() {
        this.newTaskText = '';
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
        if (window.confirm('Are you sure?')) {
            this.tasks.splice(i, 1);
            this.save();
        }
    }

    drop(e: CdkDragDrop<Task[]>) {
        moveItemInArray(this.tasks, e.previousIndex, e.currentIndex);
        this.save();
    }

    enableEditing(i) {
        this.editIndex = i;
        this.editorValue = this.tasks[i].text;
        const element = this.nodeInputs.toArray()[i];
        setTimeout(() => {
            element.nativeElement.focus();
        }, 0);
    }

    update(i) {
        this.editIndex = -1;
        this.tasks[i].text = this.editorValue;
        this.editorValue = '';
    }

    cancel() {
        this.editIndex = -1;
        this.editorValue = '';
    }

}
