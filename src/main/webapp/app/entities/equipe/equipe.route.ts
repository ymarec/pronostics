import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { EquipeComponent } from './equipe.component';
import { EquipeDetailComponent } from './equipe-detail.component';
import { EquipePopupComponent } from './equipe-dialog.component';
import { EquipeDeletePopupComponent } from './equipe-delete-dialog.component';

import { Principal } from '../../shared';

@Injectable()
export class EquipeResolvePagingParams implements Resolve<any> {

  constructor(private paginationUtil: PaginationUtil) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      let page = route.queryParams['page'] ? route.queryParams['page'] : '1';
      let sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
      return {
          page: this.paginationUtil.parsePage(page),
          predicate: this.paginationUtil.parsePredicate(sort),
          ascending: this.paginationUtil.parseAscending(sort)
    };
  }
}

export const equipeRoute: Routes = [
  {
    path: 'equipe',
    component: EquipeComponent,
    resolve: {
      'pagingParams': EquipeResolvePagingParams
    },
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'pronosticsApp.equipe.home.title'
    },
    canActivate: [UserRouteAccessService]
  }, {
    path: 'equipe/:id',
    component: EquipeDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'pronosticsApp.equipe.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const equipePopupRoute: Routes = [
  {
    path: 'equipe-new',
    component: EquipePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'pronosticsApp.equipe.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'equipe/:id/edit',
    component: EquipePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'pronosticsApp.equipe.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'equipe/:id/delete',
    component: EquipeDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'pronosticsApp.equipe.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
