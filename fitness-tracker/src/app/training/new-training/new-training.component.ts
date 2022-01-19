import { UIService } from './../../shared/ui.services';
import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Exercise } from './../exercise.model';
import { TrainingService } from './../training.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss'],
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  @Output()
  trainingStart = new EventEmitter<void>();
  isLoading = true;
  exercises!: Exercise[];
  private exerciseSubscription!: Subscription;
  private loadingSubscription!: Subscription;

  constructor(
    private trainingService: TrainingService,
    private uiService: UIService
  ) {}

  ngOnInit(): void {
    this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(
      (isLoading) => {
        this.isLoading = isLoading;
      }
    );
    this.fetchExercises();
    this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(
      (exercises) => {
        this.exercises = exercises;
      }
    );
  }

  ngOnDestroy(): void {
    this.exerciseSubscription.unsubscribe();
    this.loadingSubscription.unsubscribe();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

  fetchExercises() {
    this.trainingService.fetchAvailableExercises();
  }
}
