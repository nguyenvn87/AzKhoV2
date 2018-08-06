package com.kito.madina.test.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.kito.madina.test.vo.*;
import com.kito.madina.test.dao.*;
import com.kito.madina.test.service.PersonService;;

@Controller
@RequestMapping(value = "/person")
public class PersonController {
  private Logger logger = LoggerFactory.getLogger(PersonController.class);

  @Autowired
  private PersonService personService;

  @RequestMapping(value = "/person/list", method = RequestMethod.GET)
  public String getAddressList(Model model) {
    model.addAttribute("people", personService.selectAllPerson());
    return "person/list";
  }

  @RequestMapping(value = "/person/new", method = RequestMethod.GET)
  public String createForm(Model model) {
    model.addAttribute("person", new PersonVO());
    return "person/form";
  }
}
