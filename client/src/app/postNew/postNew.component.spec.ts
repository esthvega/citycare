/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PostNewComponent } from './postNew.component';

describe('PostNewComponent', () => {
  let component: PostNewComponent;
  let fixture: ComponentFixture<PostNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
