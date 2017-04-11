import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils, EventManager } from 'ng-jhipster';
import { PronosticsTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { EquipeDetailComponent } from '../../../../../../main/webapp/app/entities/equipe/equipe-detail.component';
import { EquipeService } from '../../../../../../main/webapp/app/entities/equipe/equipe.service';
import { Equipe } from '../../../../../../main/webapp/app/entities/equipe/equipe.model';

describe('Component Tests', () => {

    describe('Equipe Management Detail Component', () => {
        let comp: EquipeDetailComponent;
        let fixture: ComponentFixture<EquipeDetailComponent>;
        let service: EquipeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PronosticsTestModule],
                declarations: [EquipeDetailComponent],
                providers: [
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    EquipeService,
                    EventManager
                ]
            }).overrideComponent(EquipeDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EquipeDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EquipeService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Equipe(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.equipe).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
