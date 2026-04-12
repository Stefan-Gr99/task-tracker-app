package de.stefan.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Task {
    
    @Id
    @GeneratedValue
    private long id;
    private String title;
    @Enumerated(EnumType.STRING)
    private TaskStatus status;

    public Task() {}

    public Task(String title, TaskStatus status) {
        this.status = status;
        this.title = title;
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

    public void setTitle(String newTitle) {
        this.title = newTitle;
    }

    public void setStatus(TaskStatus newStatus) {
        this.status = newStatus;
    }
}
