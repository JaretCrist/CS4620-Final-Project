import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { SourcesComponent } from './sources/sources.component';
import { SourceComponent } from './sources/source/source.component';
import { SpellsComponent } from './spells/spells.component';
import { SpellComponent } from './spells/spell/spell.component';
import { MonstersComponent } from './monsters/monsters.component';
import { MonsterComponent } from './monsters/monster/monster.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'Home',
    pathMatch: 'full',
  },
  {
    path: 'Home',
    component: HomePageComponent,
  },
  {
    path: 'sources',
    component: SourcesComponent,
  },
  {
    path: 'sources/:sourceId',
    component: SourceComponent,
  },
  {
    path: 'spells',
    component: SpellsComponent,
  },
  {
    path: 'spells/:spellId',
    component: SpellComponent,
  },
  {
    path: 'monsters',
    component: MonstersComponent,
  },
  {
    path: 'monsters/:monsterId',
    component: MonsterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
