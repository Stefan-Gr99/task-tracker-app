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
    public ResponseEntity<Task> getTask(@PathVariable Long id) {
        Task task = taskRepository.findById(id).orElse(null);
 
        if (task == null) {
            return ResponseEntity.notFound().build();
        }
 
        return ResponseEntity.ok(task);
    }
 
    @PostMapping("/api/tasks")
    public ResponseEntity<Task> createTask(@RequestBody Task newTask) {
 
        if (isInvalidTitle(newTask.getTitle())
                || newTask.getStatus() == null
                || isInvalidDescription(newTask.getDescription())) {
            return ResponseEntity.badRequest().build();
        }
 
        Task task = new Task(
                newTask.getTitle().trim(),
                newTask.getStatus()
        );
 
        if (newTask.getDescription() != null) {
            task.setDescription(newTask.getDescription());
        }
 
        if (task.getStatus() == TaskStatus.FERTIG) {
            task.setCompletedAt(LocalDate.now());
        }
 
        Task savedTask = taskRepository.save(task);
 
        return ResponseEntity.status(201).body(savedTask);
    }
 
    @PatchMapping("/api/tasks/{id}")
    public ResponseEntity<Task> updateTask(
            @PathVariable Long id,
            @RequestBody Task changedTask) {
 
        Task task = taskRepository.findById(id).orElse(null);
 
        if (task == null) {
            return ResponseEntity.notFound().build();
        }
 
        if (changedTask.getTitle() != null
                && isInvalidTitle(changedTask.getTitle())) {
            return ResponseEntity.badRequest().build();
        }
 
        if (isInvalidDescription(changedTask.getDescription())) {
            return ResponseEntity.badRequest().build();
        }
 
        if (changedTask.getTitle() != null) {
            task.setTitle(changedTask.getTitle().trim());
        }
 
        if (changedTask.getDescription() != null) {
            task.setDescription(changedTask.getDescription());
        }
 
        if (changedTask.getStatus() != null) {
            TaskStatus newStatus = changedTask.getStatus();
 
            if (newStatus == TaskStatus.FERTIG
                    && task.getStatus() != TaskStatus.FERTIG) {
                task.setCompletedAt(LocalDate.now());
            } else if (newStatus != TaskStatus.FERTIG) {
                task.setCompletedAt(null);
            }
 
            task.setStatus(newStatus);
        }
 
        Task savedTask = taskRepository.save(task);
 
        return ResponseEntity.ok(savedTask);
    }
 
    @DeleteMapping("/api/tasks/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
 
        if (!taskRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
 
        taskRepository.deleteById(id);
 
        return ResponseEntity.noContent().build();
    }
 
    private boolean isInvalidTitle(String title) {
        return title == null
                || title.isBlank()
                || title.trim().length() > 255;
    }
 
    private boolean isInvalidDescription(String description) {
        return description != null && description.length() > 255;
    }
}