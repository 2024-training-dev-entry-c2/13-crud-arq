import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ListBlogsComponent } from '../../components/list-blogs/list-blogs.component';
import { Observable } from 'rxjs';
import { IBlog } from '../../../../domain/model/blog.model';
import { GetBlogsUseCase } from '../../../../application/get-blogs.usecase';
import { AsyncPipe } from '@angular/common';
import { CreateBlogUseCase } from '../../../../application/create-blog.usecase';
import { ModalComponent } from 'shared';
import { UpdateBlogUseCase } from '../../../../application/update-blog.usecase';

@Component({
  selector: 'lib-blogs-container',
  imports: [ListBlogsComponent, AsyncPipe],
  templateUrl: './blogs-container.component.html'
})
export class BlogsContainerComponent implements OnInit, OnDestroy {
  private readonly _getUseCase = inject(GetBlogsUseCase);
  private readonly _createUseCase = inject(CreateBlogUseCase);
  private readonly _updateUseCase = inject(UpdateBlogUseCase);
  public blogs$: Observable<IBlog[]>;
  public currentBlog$: Observable<IBlog>;

  ngOnInit(): void {
    this._getUseCase.initSubscriptions();
    this._createUseCase.initSubscriptions();
    this._updateUseCase.initSubscriptions();
    this._getUseCase.execute();
    this.blogs$ = this._getUseCase.blogs$();
    this.currentBlog$ = this._updateUseCase.currentBlog$();
  }

  ngOnDestroy(): void {
    this._getUseCase.destroySubscriptions();
    this._createUseCase.destroySubscriptions();
    this._updateUseCase.destroySubscriptions();
  }

  handlePatchBlog({ blog, modal }: { blog: IBlog; modal: ModalComponent }) {
    const usecase = blog.id ? this._updateUseCase : this._createUseCase;
    usecase.execute(blog, modal);
  }

  handleSelectBlog(id: string) {
    this._updateUseCase.selectBlog(id);
  }
}
