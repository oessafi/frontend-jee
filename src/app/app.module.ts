import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// --- AJOUTS ---
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
// --- FIN DES AJOUTS ---

@NgModule({
  declarations: [
    AppComponent
    // Vos composants (comme LoginComponent) seront ajoutés ici par le CLI
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // --- AJOUTS ---
    HttpClientModule,
    ReactiveFormsModule
    // --- FIN DES AJOUTS ---
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }