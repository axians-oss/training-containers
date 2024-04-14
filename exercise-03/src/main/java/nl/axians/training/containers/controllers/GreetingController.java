package nl.axians.training.containers.controllers;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
public class GreetingController {

    /**
     * Returns a greeting.
     *
     * @param name The name to greet.
     * @return The greeting.
     */
    @GetMapping("/hello")
    public String sayHello(@RequestParam(value = "name", defaultValue = "World") String name) {
        log.info("Saying hello to " + name);
        return "Hello " + name + ", greeting from GreetingController!";
    }

}
