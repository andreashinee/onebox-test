import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SessionsPageComponent } from './sessions-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { DatePipe } from '@angular/common';
import { SessionListComponent } from '../../components/sessions/session-list/session-list.component';
import { ShoppingCartComponent } from '../../components/sessions/shopping-cart/shopping-cart.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('SessionsPageComponent', () => {
  let component: SessionsPageComponent;
  let fixture: ComponentFixture<SessionsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SessionsPageComponent,
        HttpClientTestingModule,
        RouterTestingModule,
        SessionListComponent,
        ShoppingCartComponent
      ],
      providers: [
        DatePipe,
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(new Map([['eventId', '1']]))
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SessionsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize eventId from the route', () => {
    expect(component.eventId).toBe('1');
  });
});
