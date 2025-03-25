import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CatalogPageComponent } from './catalog-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EventCardComponent } from '../../components/catalog/event-card/event-card.component';

describe('CatalogPageComponent', () => {
  let component: CatalogPageComponent;
  let fixture: ComponentFixture<CatalogPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CatalogPageComponent,
        EventCardComponent,
        HttpClientTestingModule 
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CatalogPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
