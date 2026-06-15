package de.stefan.backend.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import de.stefan.backend.model.Task;
import de.stefan.backend.model.TaskStatus;
import de.stefan.backend.repository.TaskRepository;

// TODO:
// - 404 Handling vereinheitlichen
// - Service Layer einführen

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class TaskController {

    private final TaskRepository taskRepository;

    public TaskController(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @GetMapping("/api/tasks")
    public List<Task> getTasks() {
        return taskRepository.findAll();
    }

    @GetMapping("/api/tasks/{id}")
    public Task getTask(@PathVariable Long id) {
        return taskRepository.findById(id).orElse(null); // TODO: später auf ResponseEntity mit 404 umstellen
    }

    @PostMapping("/api/tasks")
    public ResponseEntity<Task> createTask(@RequestBody Task savedTask) {
        Task task = taskRepository.save(savedTask);
        return ResponseEntity.status(201).body(task);
    }

    @PatchMapping("/api/tasks/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable Long id, @RequestBody Task changedTask) {
        Task task = taskRepository.findById(id).orElse(null);

        if (task == null) {
            return ResponseEntity.notFound().build();
        }

        if (changedTask.getTitle() != null) {
            task.setTitle(changedTask.getTitle());
        }

        if (changedTask.getStatus() != null) {
            task.setStatus(changedTask.getStatus());

            if (changedTask.getStatus() == TaskStatus.FERTIG) {
                task.setCompletedAt(LocalDate.now());
            } else {
                task.setCompletedAt(null);
            }

        }

        if (changedTask.getDescription() != null) {
            task.setDescription(changedTask.getDescription());
        }

        Task savedTask = taskRepository.save(task);

        return ResponseEntity.ok().body(savedTask);
    }

    @DeleteMapping("/api/tasks/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        if (taskRepository.findById(id).isPresent()) {
            taskRepository.deleteById(id);

            return ResponseEntity.status(204).build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
