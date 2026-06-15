package de.stefan.backend.model;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;

@Entity
public class Task {

    @Id
    @GeneratedValue
    private long id;
    private String title;
    private String description;
    private LocalDate createdAt;
    private LocalDate updatedAt;
    private LocalDate completedAt;
    @Enumerated(EnumType.STRING)
    private TaskStatus status;

    public Task() {
    }

    public Task(String title, TaskStatus status) {
        this.status = status;
        this.title = title;
        this.description = "";
    }

    @PrePersist
    public void prePersist() {
        if (createdAt == null) {
            createdAt = LocalDate.now();
        }
    }

    @PreUpdate
    public void preUpdate() {
        updatedAt = LocalDate.now();
    }

    public long getId() {
        return this.id;
    }

    public String getTitle() {
        return this.title;
    }

    public TaskStatus getStatus() {
        return this.status;
    }

    public String getDescription() {
        return this.description;
    }

    public LocalDate getCreatedAt() {
        return this.createdAt;
    }

    public LocalDate getUpdatedAt() {
        return this.updatedAt;
    }

    public LocalDate getCompletedAt() {
        return this.completedAt;
    }

    public void setTitle(String newTitle) {
        this.title = newTitle;
    }

    public void setStatus(TaskStatus newStatus) {
        this.status = newStatus;
    }

    public void setDescription(String newDescription) {
        this.description = newDescription;
    }

    public void setCompletedAt(LocalDate newCompletedAt) {
        this.completedAt = newCompletedAt;
    }
}
