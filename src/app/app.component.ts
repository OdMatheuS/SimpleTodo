import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Todo } from 'src/models/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public todos: Todo[] = [];
  public title: String = 'Minhas Tarefas';
  public form: FormGroup;

  constructor(private fb:FormBuilder) {
    this.form = this.fb.group({
      title:['',Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.required,
      ])]
    });
    this.loadLocalStrg();
  }

  add(){
    const title = this.form.controls['title'].value;
    const id = this.todos.length + 1;
    this.todos.push(new Todo(id,title,false));
    this.saveInLocalStrg();
    this.clear();
  }

  clear(){
    this.form.reset();
  }
  // tslint:disable-next-line:typedef
  remover(todo: Todo){
    const index = this.todos.indexOf(todo);
    if (index !== -1){
      this.todos.splice(index, 1);
    }
    this.saveInLocalStrg();
  }

  // tslint:disable-next-line:typedef
  concluido(todo: Todo){
    todo.done = true;
    this.saveInLocalStrg();
  }

  // tslint:disable-next-line:typedef
  notConcluido(todo: Todo){
    todo.done = false;
    this.saveInLocalStrg();
  }

  saveInLocalStrg(){
    const data = JSON.stringify(this.todos);
    localStorage.setItem('todos',data);
  }

  loadLocalStrg(){
    const data = localStorage.getItem('todos');
    if (data){
      const items = JSON.parse(data);
    }else {
      this.todos = [];
    }
  }

}
