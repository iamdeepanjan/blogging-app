import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBlogDialogComponent } from './my-blog-dialog.component';

describe('MyBlogDialogComponent', () => {
  let component: MyBlogDialogComponent;
  let fixture: ComponentFixture<MyBlogDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyBlogDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyBlogDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
