import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomePageComponent } from './home-page/home-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SourcesComponent } from './sources/sources.component';
import { SpellsComponent } from './spells/spells.component';
import { MonstersComponent } from './monsters/monsters.component';
import { SourceComponent } from './sources/source/source.component';
import { SpellComponent } from './spells/spell/spell.component';
import { MonsterComponent } from './monsters/monster/monster.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { CreateSourceDialogComponent } from './sources/create-source-dialog/create-source-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpellTableComponent } from './tables/spell-table/spell-table.component';
import { MonsterTableComponent } from './tables/monster-table/monster-table.component';
import { CreateSpellDialogComponent } from './spells/create-spell-dialog/create-spell-dialog.component';
import { CreateMonsterDialogComponent } from './monsters/create-monster-dialog/create-monster-dialog.component';
import { ItemsComponent } from './items/items.component';
import { ItemComponent } from './items/item/item.component';
import { ItemTableComponent } from './tables/item-table/item-table.component';
import { CreateItemDialogComponent } from './items/create-item-dialog/create-item-dialog.component';
import { RacesComponent } from './races/races.component';
import { RaceComponent } from './races/race/race.component';
import { RaceTableComponent } from './tables/race-table/race-table.component';
import { CreateRaceDialogComponent } from './races/create-race-dialog/create-race-dialog.component';
import { FilterDialogComponent } from './filter-dialog/filter-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NavbarComponent,
    ConfirmationDialogComponent,
    SourcesComponent,
    CreateSourceDialogComponent,
    SourceComponent,
    SpellsComponent,
    SpellComponent,
    SpellTableComponent,
    CreateSpellDialogComponent,
    MonstersComponent,
    MonsterComponent,
    MonsterTableComponent,
    CreateMonsterDialogComponent,
    ItemsComponent,
    ItemComponent,
    ItemTableComponent,
    CreateItemDialogComponent,
    RacesComponent,
    RaceComponent,
    RaceTableComponent,
    CreateRaceDialogComponent,
    FilterDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
