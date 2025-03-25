import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventCardComponent } from './event-card.component';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('EventCardComponent', () => {
  let component: EventCardComponent;
  let fixture: ComponentFixture<EventCardComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [EventCardComponent],
      providers: [{ provide: Router, useValue: routerSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(EventCardComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the event title', () => {
    component.event = {
      id: '1',
      title: 'Test Concert',
      subtitle: 'Don’t miss it!',
      image: 'test.jpg',
      startDate: '2025-03-28',
      endDate: '2025-03-29',
      description: 'A highly anticipated event.',
    };
    fixture.detectChanges();

    const titleElement = fixture.nativeElement.querySelector('.event-card__title');
    expect(titleElement.textContent).toContain('Test Concert');
  });

  it('should navigate to the session page on button click', () => {
    component.event = {
      id: '1',
      title: 'Concert',
      subtitle: '',
      image: '',
      startDate: '',
      endDate: '',
      description: '',
    };
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/sessions', '1']);
  });

  it('should not navigate if the event has no id', () => {
    spyOn(console, 'error');
    component.event = {
      id: '',
      title: 'Event without ID',
      subtitle: '',
      image: '',
      startDate: '',
      endDate: '',
      description: '',
    };
    fixture.detectChanges();

    component.goToSessionPage();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith('eventId is undefined or null');
  });
});
