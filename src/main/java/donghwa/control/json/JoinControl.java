package donghwa.control.json;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import donghwa.domain.User;
import donghwa.service.UserService;

@RestController
@RequestMapping("/p-desktop/")
public class JoinControl {
  
  @Autowired ServletContext servletContext;
  @Autowired UserService userService;
  
  @RequestMapping("join")
  public JsonResult add(User user, String filenames) throws Exception {
    userService.join(user);
    return new JsonResult(JsonResult.SUCCESS, "ok");
  }
  
}









