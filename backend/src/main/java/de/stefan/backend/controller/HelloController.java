package de.stefan.backend.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class HelloController {

    @GetMapping("/api/hallo")
    public String hallo(){
        return "Hallo";
    }

}
