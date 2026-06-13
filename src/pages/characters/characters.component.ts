import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SlicePipe } from '@angular/common';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import {
  injectQuery,
  keepPreviousData,
  QueryClient,
} from '@tanstack/angular-query-experimental';
import { CharactersService } from '../../services/characters.service';

const PAGE_SIZE = 8;
const STALE_TIME = 1000 * 60 * 5; // 5 minutos de caché fresca

@Component({
  selector: 'app-characters',
  imports: [PaginatorModule, SlicePipe],
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharactersComponent {
  private charactersService = inject(CharactersService);
  private queryClient = inject(QueryClient);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  // La página vive en el query param (?page=) para sobrevivir a la navegación.
  page = signal<number>(this.readPageFromUrl());
  first = computed(() => (this.page() - 1) * PAGE_SIZE);

  query = injectQuery(() => ({
    ...this.charactersQueryOptions(this.page()),
    // Mantiene visibles los datos previos mientras llega la nueva página.
    placeholderData: keepPreviousData,
  }));

  constructor() {
    // Prefetch de la página siguiente en cuanto sabemos cuántas hay.
    effect(() => {
      const meta = this.query.data()?.meta;
      const next = this.page() + 1;
      if (meta && next <= meta.totalPages) {
        this.queryClient.prefetchQuery(this.charactersQueryOptions(next));
      }
    });
  }

  private charactersQueryOptions(page: number) {
    return {
      queryKey: ['characters', page] as const,
      queryFn: () => this.charactersService.getCharacters(page),
      staleTime: STALE_TIME,
    };
  }

  private readPageFromUrl(): number {
    const raw = Number(this.route.snapshot.queryParamMap.get('page'));
    return Number.isInteger(raw) && raw > 0 ? raw : 1;
  }

  onPageChange(event: PaginatorState) {
    const nextPage = (event.page ?? 0) + 1;
    this.page.set(nextPage);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: nextPage },
      queryParamsHandling: 'merge',
    });
  }

  handleViewCharacterDetails(characterId: number) {
    // Llevamos la página actual para poder regresar a ella desde el detalle.
    this.router.navigate(['characters', characterId], {
      queryParams: { page: this.page() },
    });
  }
}
