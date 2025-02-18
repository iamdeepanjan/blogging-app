import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBlogCommentsComponent } from './my-blog-comments.component';

describe('MyBlogCommentsComponent', () => {
  let component: MyBlogCommentsComponent;
  let fixture: ComponentFixture<MyBlogCommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyBlogCommentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyBlogCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
