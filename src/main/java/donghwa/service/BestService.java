package donghwa.service;

import java.util.List;

import donghwa.domain.Together;


public interface BestService {
  List<Together> list(int year, int month) throws Exception;
}







