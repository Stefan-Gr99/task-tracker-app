package de.stefan.backend.controller;

import de.stefan.backend.model.Task;
import de.stefan.backend.model.TaskStatus;
import de.stefan.backend.repository.TaskRepository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(TaskController.class)
class TaskControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private TaskRepository repository;

    @Test
    void leererTitelWirdAbgelehnt() throws Exception {
        mockMvc.perform(post("/api/tasks")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                    {
                        "title": "   ",
                        "status": "NICHT_ANGEFANGEN"
                    }
                    """))
                .andExpect(status().isBadRequest());

        verify(repository, never()).save(any());
    }

    @Test
    void zuLangerTitelWirdAbgelehnt() throws Exception {
        String title = "a".repeat(256);

        mockMvc.perform(post("/api/tasks")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                    {
                        "title": "%s",
                        "status": "IN_ARBEIT"
                    }
                    """.formatted(title)))
                .andExpect(status().isBadRequest());

        verify(repository, never()).save(any());
    }

    @Test
    void unbekannteIdGibt404() throws Exception {
        when(repository.findById(99999L))
                .thenReturn(Optional.empty());

        mockMvc.perform(get("/api/tasks/99999"))
                .andExpect(status().isNotFound());
    }

    @Test
    void fertigerTaskBekommtAbschlussdatum() throws Exception {
        when(repository.save(any(Task.class)))
                .thenAnswer(call -> call.getArgument(0));

        mockMvc.perform(post("/api/tasks")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                    {
                        "title": "Testaufgabe",
                        "status": "FERTIG"
                    }
                    """))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.completedAt")
                        .value(LocalDate.now().toString()));
    }

    @Test
    void fertigerTaskBehaeltSeinAbschlussdatum() throws Exception {
        Task task = new Task("Testaufgabe", TaskStatus.FERTIG);
        LocalDate datum = LocalDate.now().minusDays(5);
        task.setCompletedAt(datum);

        when(repository.findById(1L))
                .thenReturn(Optional.of(task));

        when(repository.save(any(Task.class)))
                .thenAnswer(call -> call.getArgument(0));

        mockMvc.perform(patch("/api/tasks/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                    {
                        "status": "FERTIG"
                    }
                    """))
                .andExpect(status().isOk());

        assertEquals(datum, task.getCompletedAt());
    }
}
