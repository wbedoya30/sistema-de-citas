import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilClientePage } from './perfil-cliente.page';

describe('PerfilPage', () => {
  let component: PerfilClientePage;
  let fixture: ComponentFixture<PerfilClientePage>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(PerfilClientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
