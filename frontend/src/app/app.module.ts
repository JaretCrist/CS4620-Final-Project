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

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NavbarComponent,
    SourcesComponent,
    SourceComponent,
    SpellsComponent,
    SpellComponent,
    MonstersComponent,
    MonsterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
