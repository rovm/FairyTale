package donghwa.control.json;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import donghwa.domain.Create;
import donghwa.service.CreateService;

@RestController
@RequestMapping("/p-desktop/")
public class CreateControl {
  
  @Autowired ServletContext servletContext;
  @Autowired CreateService createService;
  
  @RequestMapping("create")
  public JsonResult add(Create create, String filenames) throws Exception {
    createService.create(create);
    return new JsonResult(JsonResult.SUCCESS, "ok");
  }
  
}









