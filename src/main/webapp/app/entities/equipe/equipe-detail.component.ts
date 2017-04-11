import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager , JhiLanguageService  } from 'ng-jhipster';

import { Equipe } from './equipe.model';
import { EquipeService } from './equipe.service';

@Component({
    selector: 'jhi-equipe-detail',
    templateUrl: './equipe-detail.component.html'
})
export class EquipeDetailComponent implements OnInit, OnDestroy {

    equipe: Equipe;
    private subscription: any;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private jhiLanguageService: JhiLanguageService,
        private equipeService: EquipeService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['equipe']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
        this.registerChangeInEquipes();
    }

    load (id) {
        this.equipeService.find(id).subscribe(equipe => {
            this.equipe = equipe;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEquipes() {
        this.eventSubscriber = this.eventManager.subscribe('equipeListModification', response => this.load(this.equipe.id));
    }

}
