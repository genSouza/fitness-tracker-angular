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

  exercises!: Exercise[];
  exerciseSubscription!: Subscription;

  constructor(private trainingService: TrainingService) {}

  ngOnInit(): void {
    this.trainingService.fetchAvailableExercises();
    this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(
      (exercises) => {
        this.exercises = exercises;
      }
    );
  }

  ngOnDestroy(): void {
    this.exerciseSubscription.unsubscribe();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }
}
