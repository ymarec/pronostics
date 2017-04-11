import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { Equipe } from './equipe.model';
import { EquipePopupService } from './equipe-popup.service';
import { EquipeService } from './equipe.service';

@Component({
    selector: 'jhi-equipe-dialog',
    templateUrl: './equipe-dialog.component.html'
})
export class EquipeDialogComponent implements OnInit {

    equipe: Equipe;
    authorities: any[];
    isSaving: boolean;
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private equipeService: EquipeService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['equipe']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
    }
    clear () {
        this.activeModal.dismiss('cancel');
    }

    save () {
        this.isSaving = true;
        if (this.equipe.id !== undefined) {
            this.equipeService.update(this.equipe)
                .subscribe((res: Equipe) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        } else {
            this.equipeService.create(this.equipe)
                .subscribe((res: Equipe) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        }
    }

    private onSaveSuccess (result: Equipe) {
        this.eventManager.broadcast({ name: 'equipeListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError (error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    }

    private onError (error) {
        this.alertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-equipe-popup',
    template: ''
})
export class EquipePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private equipePopupService: EquipePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.equipePopupService
                    .open(EquipeDialogComponent, params['id']);
            } else {
                this.modalRef = this.equipePopupService
                    .open(EquipeDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
