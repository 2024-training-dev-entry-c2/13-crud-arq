import { Component, inject, Input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IBlog } from '../../../../domain/model/blog.model';

@Component({
  selector: 'lib-blog-form',
  imports: [ReactiveFormsModule],
  templateUrl: './blog-form.component.html',
  styleUrl: './blog-form.component.scss'
})
export class BlogFormComponent {
  private readonly _fb = inject(FormBuilder);
  public onSubmit = output<IBlog>();

  @Input()
  set blog(value: IBlog) {
    this.form.patchValue(value);
  }

  public form = this._fb.group({
    name: ['', Validators.required],
    location: ['', Validators.required],
    review: ['', Validators.required],
    rating: [0, Validators.required],
    // --------------------------------
    id: [null],
    createdAt: [null]
  });

  submit() {
    if (!this.form.valid) return;
    this.onSubmit.emit(this.form.getRawValue());
  }
}
