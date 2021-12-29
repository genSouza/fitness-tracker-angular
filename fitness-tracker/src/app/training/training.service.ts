import { Exercise } from './exercise.model';
import { Subject } from 'rxjs';
export class TrainingService {
  exerciseChanged = new Subject<Exercise>();

  private availableExercises: Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
    { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 },
  ];

  private runningExercise!: Exercise;

  getAvailableExercises() {
    return this.availableExercises.slice();
  }

  startExercise(selectId: string) {
    const find = this.availableExercises.find((item) => item.id === selectId);
    if (find) {
      this.runningExercise = find;
    }
    this.exerciseChanged.next({ ...this.runningExercise });
  }
}
