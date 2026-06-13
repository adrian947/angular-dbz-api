import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SlicePipe } from '@angular/common';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { CharactersService } from '../../services/characters.service';

@Component({
  selector: 'app-character-details',
  imports: [RouterLink, SlicePipe],
  templateUrl: './character-details.component.html',
  styleUrl: './character-details.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterDetailsComponent {
  private activeRoute = inject(ActivatedRoute);
  private charactersService = inject(CharactersService);

  private id = Number(this.activeRoute.snapshot.params['id']);

  // Página de la que veníamos, para regresar a ella sin perder la paginación.
  backQueryParams = {
    page: this.activeRoute.snapshot.queryParamMap.get('page') ?? 1,
  };

  query = injectQuery(() => ({
    queryKey: ['character', this.id],
    queryFn: () => this.charactersService.getCharacter(this.id),
    staleTime: 1000 * 60 * 5, // 5 minutos de caché fresca
  }));
}
