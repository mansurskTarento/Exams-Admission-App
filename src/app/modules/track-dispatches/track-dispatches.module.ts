//#region (imports)

//#region ()
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared';
import { MaterialModule } from 'src/material/material.module';
//#endregion

//#region (created modules && components)
import { TrackDispatchesRoutingModule } from './track-dispatches-routing.module';
import { ManageTrackDispatchesComponent } from './manage-track-dispatches/manage-track-dispatches.component';
import { UpdateTrackDispatchesInstituteComponent } from './update-track-dispatches-institute/update-track-dispatches-institute.component';
//#endregion

//#endregion



@NgModule({
  declarations: [
    ManageTrackDispatchesComponent,
    UpdateTrackDispatchesInstituteComponent
  ],
  imports: [
    CommonModule,
    TrackDispatchesRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class TrackDispatchesModule { }
