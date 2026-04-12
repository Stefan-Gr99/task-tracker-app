package de.stefan.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import de.stefan.backend.model.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {}
