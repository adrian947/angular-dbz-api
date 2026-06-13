import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PlanetsService } from '../../services/planets.service';
import { SlicePipe } from '@angular/common';
import { injectQuery } from '@tanstack/angular-query-experimental';

@Component({
  selector: 'app-planets',
  standalone: true,
  imports: [SlicePipe],
  templateUrl: './planets.component.html',
  styleUrl: './planets.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanetsComponent {
  constructor(private planetsService: PlanetsService) {}

  query = injectQuery(() => ({
    queryKey: ['planets'],
    queryFn: () => this.planetsService.getPlanets(),
    staleTime: 1000 * 60 * 5, // 5 minutos
  }));
}
