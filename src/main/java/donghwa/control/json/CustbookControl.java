package donghwa.control.json;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import donghwa.domain.Custbook;
import donghwa.service.CustbookService;

@RestController
@RequestMapping("/p-desktop/")
public class CustbookControl {
  
  @Autowired ServletContext servletContext;
  @Autowired CustbookService custbookService;
  
  
  @RequestMapping("addCustbook")
  public JsonResult addCustbook(Custbook custbook) throws Exception {
	  System.out.println("control:" +custbook);
	  custbookService.addCustbook(custbook);
	  int ctno = custbook.getNo();
	  System.out.println(ctno);
	  
    return new JsonResult(JsonResult.SUCCESS, ctno);
  }
  
  @RequestMapping("updateCustbook")
  public JsonResult updateCustbook(Custbook custbook) throws Exception {
	  custbookService.updateCustbook(custbook);
    return new JsonResult(JsonResult.SUCCESS, "ok");
  }

  
}









