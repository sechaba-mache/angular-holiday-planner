import {isDevMode, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { CalendarComponent } from './components/calendar/calendar.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NzCalendarModule} from "ng-zorro-antd/calendar";
import { LoginComponent } from './forms/login/login.component';
import { RegisterComponent } from './forms/register/register.component';
import {AuthService} from "./services/auth/auth.service";
import {NzIconModule} from "ng-zorro-antd/icon";
import { TripTileComponent } from './components/trip-tile/trip-tile.component';
import { NavComponent } from './components/nav/nav.component';
import {HomePageComponent} from "./pages/home-page/home-page.component";
import { EffectsModule } from '@ngrx/effects';
import { FirestoreEffects } from './store/effects/firestore.effects';
import {StoreModule} from "@ngrx/store";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import * as fromFirestore from "./store/reducers/firestore.reducer";
import { ActivityFormComponent } from './forms/activity-form/activity-form.component';
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";
import { AddTripComponent } from './pages/add-trip/add-trip.component';
import { TripFormComponent } from './forms/trip-form/trip-form.component';
import { ActivityTileComponent } from './components/activity-tile/activity-tile.component';
import { DatePipePipe } from './pipes/date-pipe.pipe';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    LoginComponent,
    RegisterComponent,
    TripTileComponent,
    NavComponent,
    HomePageComponent,
    ActivityFormComponent,
    AddTripComponent,
    TripFormComponent,
    ActivityTileComponent,
    DatePipePipe,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    CalendarModule.forRoot({provide: DateAdapter, useFactory: adapterFactory}),
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzCalendarModule,
    ReactiveFormsModule,
    NzIconModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: !isDevMode()}),
    StoreModule.forFeature(fromFirestore.firestoreFeatureKey, fromFirestore.reducer),
    EffectsModule.forFeature([FirestoreEffects]),
    NzDropDownModule,
    NzDatePickerModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
