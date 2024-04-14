package nl.axians.training.containers.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ViewController {

    @RequestMapping({"/accounts", "/opportunities"})
    public String index() {
        return "forward:/index.html";
    }

}