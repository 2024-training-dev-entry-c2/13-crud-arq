import { Component, input, output, viewChild } from '@angular/core';
import { IBlog } from '../../../../domain/model/blog.model';
import { NgFor } from '@angular/common';
import { BlogFormComponent } from '../../forms/blog-form/blog-form.component';
import { ModalComponent } from 'shared';

@Component({
  selector: 'lib-list-blogs',
  imports: [ModalComponent, NgFor, BlogFormComponent],
  templateUrl: './list-blogs.component.html',
  styleUrl: './list-blogs.component.scss'
})
export class ListBlogsComponent {
  public modal = viewChild<ModalComponent>('modal');
  public blogs = input.required<IBlog[]>();
  public currentBlog = input<IBlog>();
  public onCreateBlog = output<{blog: IBlog; modal: ModalComponent}>();
  public onSelectBlog = output<string>();

  handleSubmit(blog: IBlog) {
    this.onCreateBlog.emit({blog, modal: this.modal()});
  }

  selectBlog(id: string) {
    this.onSelectBlog.emit(id);
    this.modal().toggle();
  }
}
