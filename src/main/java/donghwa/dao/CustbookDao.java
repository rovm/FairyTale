package donghwa.dao;

import donghwa.domain.Custbook;

public interface CustbookDao {
  int insert(Custbook custbook);
  int update(Custbook custbook);
}
